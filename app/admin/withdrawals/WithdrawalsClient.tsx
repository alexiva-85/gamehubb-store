'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '@/app/components/Card';

interface WithdrawalRequest {
  id: string;
  tgUserId: string;
  username: string | null;
  amountRub: number;
  asset: 'TON' | 'USDT_TON';
  tonAddress: string;
  status: 'PENDING' | 'APPROVED' | 'PAID' | 'REJECTED';
  adminNote: string | null;
  txHash: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  // Payout snapshot fields
  payoutAsset: 'RUB' | 'USDT' | 'TON' | null;
  payoutAmount: number | null;
  payoutBaseRub: number | null;
  exchangeRate: number | null;
  rateSource: string | null;
  rateCapturedAt: string | null;
  payoutFeeRub: number | null;
  payoutNotes: string | null;
  payoutSnapshot: any;
}

// Deterministic date/time formatter (fixes hydration mismatch)
const formatDateTime = (value: string | Date) => {
  const d = value instanceof Date ? value : new Date(value);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// Deterministic number formatter (fixes hydration mismatch)
const formatInt = (v: number | null | undefined): string => {
  if (v === null || v === undefined) return '-';
  const n = Math.round(v);
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

// Deterministic decimal formatter (2 decimal places)
const formatDecimal = (v: number | null | undefined): string => {
  if (v === null || v === undefined) return '-';
  const n = Math.round(v * 100) / 100;
  const parts = n.toString().split('.');
  const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts[1] ? `${intPart}.${parts[1].padEnd(2, '0')}` : intPart;
};

interface WithdrawalsClientProps {
  adminKey: string;
}

export default function WithdrawalsClient({ adminKey: propsAdminKey }: WithdrawalsClientProps) {
  const params = useSearchParams();
  const key = params.get('key') ?? '';

  const [requests, setRequests] = useState<WithdrawalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adminNote, setAdminNote] = useState('');
  const [txHash, setTxHash] = useState('');
  // Payout form state
  const [payoutAsset, setPayoutAsset] = useState<'RUB' | 'USDT' | 'TON'>('RUB');
  const [payoutAmount, setPayoutAmount] = useState('');
  const [payoutBaseRub, setPayoutBaseRub] = useState('');
  const [exchangeRate, setExchangeRate] = useState('');
  const [rateSource, setRateSource] = useState('MANUAL');
  const [payoutFeeRub, setPayoutFeeRub] = useState('');
  const [payoutNotes, setPayoutNotes] = useState('');

  // Helper to add key to URL
  const withKey = (path: string) => {
    if (!key) return path;
    const sep = path.includes('?') ? '&' : '?';
    return `${path}${sep}key=${encodeURIComponent(key)}`;
  };

  // Wrapper for admin fetch requests
  async function adminFetch(path: string, init: RequestInit = {}) {
    const url = withKey(path);
    return fetch(url, {
      ...init,
      cache: 'no-store',
      headers: {
        ...(init.headers || {}),
        'Content-Type': 'application/json',
        // fallback, чтобы даже при ошибке URL ключ дошёл:
        'x-admin-key': key,
      },
    });
  }

  useEffect(() => {
    fetchRequests();
  }, [key]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await adminFetch('/api/admin/withdrawals');
      
      if (response.status === 401) {
        setError('Неверный или отсутствует admin key. Добавьте ?key=... к URL (используйте ADMIN_KEY из .env.local)');
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
    // Validate adminNote for REJECTED
    if (status === 'REJECTED' && !adminNote.trim()) {
      alert('Укажите причину отказа');
      return;
    }

    // Validate payout for PAID
    if (status === 'PAID') {
      if (!payoutAmount || !payoutBaseRub) {
        alert('Заполните сумму выплаты (payoutAmount) и учётную сумму в RUB (payoutBaseRub)');
        return;
      }
      if (payoutAsset !== 'RUB' && (!exchangeRate || !rateSource)) {
        alert('При выплате не в RUB необходимо указать курс (exchangeRate) и источник курса (rateSource)');
        return;
      }
    }

    try {
      const body: any = {
        status,
        adminNote: adminNote || null,
        txHash: txHash || null,
      };

      // Add payout snapshot for PAID status
      if (status === 'PAID') {
        body.payout = {
          asset: payoutAsset,
          amount: payoutAmount,
          baseRub: payoutBaseRub,
          rate: payoutAsset !== 'RUB' ? exchangeRate : null,
          rateSource: payoutAsset !== 'RUB' ? rateSource : null,
          feeRub: payoutFeeRub || null,
          notes: payoutNotes || null,
        };
      }

      // Use endpoint with trailing slash
      const endpoint = `/api/admin/withdrawals/${id}/`;
      const response = await adminFetch(endpoint, {
        method: 'PATCH',
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || 'Ошибка обновления');
        return;
      }

      setEditingId(null);
      setAdminNote('');
      setTxHash('');
      setPayoutAsset('RUB');
      setPayoutAmount('');
      setPayoutBaseRub('');
      setExchangeRate('');
      setRateSource('MANUAL');
      setPayoutFeeRub('');
      setPayoutNotes('');
      fetchRequests();
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
    return <p className="text-zinc-400">Загрузка...</p>;
  }

  if (error && !requests.length) {
    return (
      <Card>
        <p className="text-red-400">{error}</p>
      </Card>
    );
  }

  // Show error if key is missing
  if (!key) {
    return (
      <Card>
        <p className="text-red-400">Missing admin key. Добавьте ?key=... к URL</p>
      </Card>
    );
  }

  return (
    <>
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
                      {formatDateTime(request.createdAt)}
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

                {/* Payout snapshot display (for PAID requests) */}
                {request.status === 'PAID' && request.payoutAsset && (
                  <div className="pt-3 border-t border-[#3a3a3a] space-y-2">
                    <p className="text-sm font-medium text-zinc-300">Параметры выплаты (snapshot)</p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-zinc-400 text-xs">Валюта выплаты</p>
                        <p className="text-zinc-200">{request.payoutAsset}</p>
                      </div>
                      <div>
                        <p className="text-zinc-400 text-xs">Сумма выплаты</p>
                        <p className="text-zinc-200">{formatDecimal(request.payoutAmount)} {request.payoutAsset}</p>
                      </div>
                      <div>
                        <p className="text-zinc-400 text-xs">Учётная сумма (RUB)</p>
                        <p className="text-zinc-200">{formatDecimal(request.payoutBaseRub)} ₽</p>
                      </div>
                      {request.exchangeRate && (
                        <div>
                          <p className="text-zinc-400 text-xs">Курс обмена</p>
                          <p className="text-zinc-200">{formatDecimal(request.exchangeRate)} ₽/{request.payoutAsset}</p>
                        </div>
                      )}
                      {request.rateSource && (
                        <div>
                          <p className="text-zinc-400 text-xs">Источник курса</p>
                          <p className="text-zinc-200">{request.rateSource}</p>
                        </div>
                      )}
                      {request.rateCapturedAt && (
                        <div>
                          <p className="text-zinc-400 text-xs">Курс зафиксирован</p>
                          <p className="text-zinc-200 text-xs">{formatDateTime(request.rateCapturedAt)}</p>
                        </div>
                      )}
                      {request.payoutFeeRub && (
                        <div>
                          <p className="text-zinc-400 text-xs">Комиссия (RUB)</p>
                          <p className="text-zinc-200">{formatDecimal(request.payoutFeeRub)} ₽</p>
                        </div>
                      )}
                      {request.paidAt && (
                        <div>
                          <p className="text-zinc-400 text-xs">Оплачено</p>
                          <p className="text-zinc-200 text-xs">{formatDateTime(request.paidAt)}</p>
                        </div>
                      )}
                    </div>
                    {request.payoutNotes && (
                      <div>
                        <p className="text-zinc-400 text-xs">Примечания к выплате</p>
                        <p className="text-zinc-200 text-sm">{request.payoutNotes}</p>
                      </div>
                    )}
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

                    {/* Payout form (only for PAID status) */}
                    {request.status === 'APPROVED' && (
                      <div className="space-y-3 pt-3 border-t border-[#3a3a3a]">
                        <p className="text-sm font-medium text-zinc-300">Параметры выплаты</p>
                        
                        <div>
                          <label className="block text-sm text-zinc-400 mb-1">
                            Валюта выплаты <span className="text-red-400">*</span>
                          </label>
                          <select
                            value={payoutAsset}
                            onChange={(e) => {
                              setPayoutAsset(e.target.value as 'RUB' | 'USDT' | 'TON');
                              if (e.target.value === 'RUB') {
                                setExchangeRate('');
                                setRateSource('MANUAL');
                              }
                            }}
                            className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded text-white text-sm"
                          >
                            <option value="RUB">RUB</option>
                            <option value="USDT">USDT</option>
                            <option value="TON">TON</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm text-zinc-400 mb-1">
                              Сумма выплаты <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              value={payoutAmount}
                              onChange={(e) => setPayoutAmount(e.target.value)}
                              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded text-white text-sm"
                              placeholder="0.00"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-zinc-400 mb-1">
                              Учётная сумма (RUB) <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              value={payoutBaseRub}
                              onChange={(e) => setPayoutBaseRub(e.target.value)}
                              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded text-white text-sm"
                              placeholder="0.00"
                            />
                          </div>
                        </div>

                        {payoutAsset !== 'RUB' && (
                          <>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-sm text-zinc-400 mb-1">
                                  Курс обмена (RUB/{payoutAsset}) <span className="text-red-400">*</span>
                                </label>
                                <input
                                  type="number"
                                  step="0.01"
                                  value={exchangeRate}
                                  onChange={(e) => setExchangeRate(e.target.value)}
                                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded text-white text-sm"
                                  placeholder="0.00"
                                />
                              </div>
                              <div>
                                <label className="block text-sm text-zinc-400 mb-1">
                                  Источник курса <span className="text-red-400">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={rateSource}
                                  onChange={(e) => setRateSource(e.target.value)}
                                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded text-white text-sm"
                                  placeholder="MANUAL"
                                />
                              </div>
                            </div>
                          </>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm text-zinc-400 mb-1">Комиссия (RUB)</label>
                            <input
                              type="number"
                              step="0.01"
                              value={payoutFeeRub}
                              onChange={(e) => setPayoutFeeRub(e.target.value)}
                              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded text-white text-sm"
                              placeholder="0.00"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-zinc-400 mb-1">Примечания к выплате</label>
                          <textarea
                            value={payoutNotes}
                            onChange={(e) => setPayoutNotes(e.target.value)}
                            className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded text-white text-sm"
                            rows={2}
                            placeholder="Опционально"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {request.status === 'PENDING' && (
                        <button
                          onClick={() => updateStatus(request.id, 'APPROVED')}
                          disabled={!key}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Одобрить
                        </button>
                      )}
                      {request.status === 'APPROVED' && (
                        <button
                          onClick={() => updateStatus(request.id, 'PAID')}
                          disabled={!key}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Отметить как оплачено
                        </button>
                      )}
                      <button
                        onClick={() => updateStatus(request.id, 'REJECTED')}
                        disabled={!key}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Отклонить
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setAdminNote('');
                          setTxHash('');
                          setPayoutAsset('RUB');
                          setPayoutAmount('');
                          setPayoutBaseRub('');
                          setExchangeRate('');
                          setRateSource('MANUAL');
                          setPayoutFeeRub('');
                          setPayoutNotes('');
                        }}
                        className="px-4 py-2 bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded hover:bg-[#333] text-sm"
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-3 border-t border-[#3a3a3a]">
                    {request.status !== 'PAID' ? (
                      <button
                        onClick={() => {
                          setEditingId(request.id);
                          setAdminNote(request.adminNote || '');
                          setTxHash(request.txHash || '');
                          // Pre-fill payout with request amount if available
                          if (request.status === 'APPROVED') {
                            setPayoutAsset('RUB');
                            setPayoutBaseRub(String(request.amountRub));
                            setPayoutAmount(String(request.amountRub));
                          }
                        }}
                        disabled={!key}
                        className="px-4 py-2 bg-[#4DA3FF] text-white rounded hover:bg-[#3d8fdf] text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Изменить статус
                      </button>
                    ) : (
                      <p className="text-xs text-zinc-500">Заявка оплачена. Параметры выплаты неизменяемы.</p>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
