'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '@/app/components/Card';
import WithdrawalDetailsModal from './WithdrawalDetailsModal';

interface WithdrawalRequest {
  id: string;
  tgUserId: string;
  username: string | null;
  amountRub: number;
  asset: 'TON' | 'USDT_TON';
  status: 'PENDING' | 'APPROVED' | 'PAID' | 'REJECTED';
  createdAt: string;
}

// Deterministic date/time formatter
const formatDateTime = (value: string | Date) => {
  const d = value instanceof Date ? value : new Date(value);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'text-yellow-400 bg-yellow-400/10';
    case 'APPROVED':
      return 'text-blue-400 bg-blue-400/10';
    case 'PAID':
      return 'text-green-400 bg-green-400/10';
    case 'REJECTED':
      return 'text-red-400 bg-red-400/10';
    default:
      return 'text-zinc-400 bg-zinc-400/10';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'Ожидает';
    case 'APPROVED':
      return 'Одобрена';
    case 'PAID':
      return 'Оплачена';
    case 'REJECTED':
      return 'Отклонена';
    default:
      return status;
  }
};

export default function WithdrawalsClient() {
  const params = useSearchParams();
  const key = params.get('key') ?? '';

  const [requests, setRequests] = useState<WithdrawalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Helper to add key to URL
  const withKey = useCallback((path: string) => {
    if (!key) return path;
    const sep = path.includes('?') ? '&' : '?';
    return `${path}${sep}key=${encodeURIComponent(key)}`;
  }, [key]);

  // Wrapper for admin fetch requests
  const adminFetch = useCallback((path: string, init: RequestInit = {}) => {
    const url = withKey(path);
    return fetch(url, {
      ...init,
      cache: 'no-store',
      headers: {
        ...(init.headers || {}),
        'Content-Type': 'application/json',
        'x-admin-key': key,
      },
    });
  }, [withKey, key]);

  const fetchRequests = useCallback(async () => {
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
  }, [adminFetch]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const openModal = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };

  const handleUpdate = () => {
    fetchRequests();
  };

  const copyId = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy ID:', err);
    }
  };

  const getShortId = (id: string) => {
    return id.substring(0, 10);
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

      <div className="overflow-x-auto">
        {requests.length === 0 ? (
          <Card>
            <p className="text-zinc-400 text-center">Заявок нет</p>
          </Card>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#3a3a3a]">
                <th className="text-left p-3 text-sm font-medium text-zinc-400">ID</th>
                <th className="text-left p-3 text-sm font-medium text-zinc-400">Пользователь</th>
                <th className="text-left p-3 text-sm font-medium text-zinc-400">Сумма</th>
                <th className="text-left p-3 text-sm font-medium text-zinc-400">Дата</th>
                <th className="text-left p-3 text-sm font-medium text-zinc-400">Статус</th>
                <th className="text-left p-3 text-sm font-medium text-zinc-400">Действие</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b border-[#3a3a3a] hover:bg-[#1a1a1a] cursor-pointer transition-colors"
                  onClick={() => openModal(request.id)}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-200 font-mono text-xs">
                        {getShortId(request.id)}
                      </span>
                      <button
                        onClick={(e) => copyId(request.id, e)}
                        className="text-zinc-400 hover:text-zinc-200 text-xs"
                        title={copiedId === request.id ? 'Скопировано!' : 'Копировать ID'}
                      >
                        {copiedId === request.id ? '✓' : '📋'}
                      </button>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="text-zinc-200 text-sm">
                      {request.username || `ID: ${request.tgUserId}`}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="text-zinc-200 text-sm font-medium">
                      {request.amountRub}₽ ({request.asset === 'TON' ? 'TON' : 'USDT'})
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="text-zinc-200 text-xs">
                      {formatDateTime(request.createdAt)}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(request.status)}`}>
                      {getStatusLabel(request.status)}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(request.id);
                      }}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                    >
                      Подробнее
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <WithdrawalDetailsModal
        id={selectedId}
        open={isModalOpen}
        onClose={closeModal}
        adminKey={key}
        onUpdate={handleUpdate}
      />
    </>
  );
}
