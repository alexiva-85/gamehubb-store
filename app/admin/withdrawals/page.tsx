'use client';

import { useState, useEffect } from 'react';
import Card from '@/app/components/Card';

interface WithdrawalRequest {
  id: string;
  tgUserId: string;
  username: string | null;
  amountRub: number;
  asset: 'TON' | 'USDT_TON'; // TON is legacy, new requests only USDT_TON
  tonAddress: string;
  status: 'PENDING' | 'APPROVED' | 'PAID' | 'REJECTED';
  adminNote: string | null;
  txHash: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminWithdrawalsPage() {
  const [requests, setRequests] = useState<WithdrawalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adminNote, setAdminNote] = useState('');
  const [txHash, setTxHash] = useState('');
  const [adminKey, setAdminKey] = useState('');

  useEffect(() => {
    // Get admin key from URL params
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    if (key) {
      setAdminKey(key);
      fetchRequests(key);
    } else {
      setLoading(false);
      setError('Admin key required. Add ?key=... to URL');
    }
  }, []);

  const fetchRequests = async (key: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/withdrawals?key=${encodeURIComponent(key)}`);
      
      if (response.status === 401) {
        setError('Неверный admin key');
        return;
      }

      if (!response.ok) {
        setError('Ошибка загрузки заявок');
        return;
      }

      const data = await response.json();
      setRequests(data.requests || []);
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError('Ошибка загрузки заявок');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'APPROVED' | 'PAID' | 'REJECTED') => {
    if (!adminKey) {
      alert('Admin key required');
      return;
    }

    // Validate adminNote for REJECTED
    if (status === 'REJECTED' && !adminNote.trim()) {
      alert('Укажите причину отказа');
      return;
    }

    try {
      const response = await fetch(`/api/admin/withdrawals/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: adminKey,
          status,
          adminNote: adminNote || null,
          txHash: txHash || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || 'Ошибка обновления');
        return;
      }

      setEditingId(null);
      setAdminNote('');
      setTxHash('');
      fetchRequests(adminKey);
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Ошибка обновления');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'text-yellow-400';
      case 'APPROVED':
        return 'text-blue-400';
      case 'PAID':
        return 'text-green-400';
      case 'REJECTED':
        return 'text-red-400';
      default:
        return 'text-zinc-400';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 text-white">Админ-панель: Заявки на вывод</h1>
        <p className="text-zinc-400">Загрузка...</p>
      </div>
    );
  }

  if (error && !requests.length) {
    return (
      <div className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 text-white">Админ-панель: Заявки на вывод</h1>
        <Card>
          <p className="text-red-400">{error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 text-white">Админ-панель: Заявки на вывод</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-500/50 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {requests.length === 0 ? (
          <Card>
            <p className="text-zinc-400 text-center">Заявок нет</p>
          </Card>
        ) : (
          requests.map((request) => (
            <Card key={request.id}>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-zinc-400">ID заявки</p>
                    <p className="text-zinc-200 font-mono text-xs">{request.id}</p>
                  </div>
                  <span className={`font-medium ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-zinc-400">Пользователь</p>
                    <p className="text-zinc-200">
                      {request.username || `ID: ${request.tgUserId}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">Сумма</p>
                    <p className="text-zinc-200 font-medium">
                      {request.amountRub}₽ ({request.asset === 'TON' ? 'TON (legacy)' : 'USDT (TON)'})
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-zinc-400">TON адрес</p>
                    <p className="text-zinc-200 font-mono text-xs break-all">{request.tonAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">Создано</p>
                    <p className="text-zinc-200 text-xs">
                      {new Date(request.createdAt).toLocaleString('ru-RU')}
                    </p>
                  </div>
                  {request.txHash && (
                    <div>
                      <p className="text-sm text-zinc-400">TX Hash</p>
                      <p className="text-zinc-200 font-mono text-xs break-all">{request.txHash}</p>
                    </div>
                  )}
                </div>

                {request.adminNote && (
                  <div>
                    <p className="text-sm text-zinc-400">Примечание админа</p>
                    <p className="text-zinc-200 text-sm">{request.adminNote}</p>
                  </div>
                )}

                {editingId === request.id ? (
                  <div className="space-y-3 pt-3 border-t border-[#3a3a3a]">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-1">
                        Примечание
                        <span className="text-zinc-500 text-xs ml-1">(обязательно при отклонении)</span>
                      </label>
                      <textarea
                        value={adminNote}
                        onChange={(e) => setAdminNote(e.target.value)}
                        className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded text-white text-sm"
                        rows={2}
                        placeholder="Укажите причину при отклонении заявки"
                      />
                      {!adminNote.trim() && (
                        <p className="text-xs text-zinc-500 mt-1">
                          При отклонении заявки необходимо указать причину
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-1">TX Hash (для статуса PAID)</label>
                      <input
                        type="text"
                        value={txHash}
                        onChange={(e) => setTxHash(e.target.value)}
                        className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded text-white text-sm"
                        placeholder="Опционально"
                      />
                    </div>
                    <div className="flex gap-2">
                      {request.status === 'PENDING' && (
                        <button
                          onClick={() => updateStatus(request.id, 'APPROVED')}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        >
                          Одобрить
                        </button>
                      )}
                      {request.status === 'APPROVED' && (
                        <button
                          onClick={() => updateStatus(request.id, 'PAID')}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                        >
                          Отметить как оплачено
                        </button>
                      )}
                      <button
                        onClick={() => updateStatus(request.id, 'REJECTED')}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                      >
                        Отклонить
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setAdminNote('');
                          setTxHash('');
                        }}
                        className="px-4 py-2 bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded hover:bg-[#333] text-sm"
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-3 border-t border-[#3a3a3a]">
                    <button
                      onClick={() => {
                        setEditingId(request.id);
                        setAdminNote(request.adminNote || '');
                        setTxHash(request.txHash || '');
                      }}
                      className="px-4 py-2 bg-[#4DA3FF] text-white rounded hover:bg-[#3d8fdf] text-sm"
                    >
                      Изменить статус
                    </button>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

