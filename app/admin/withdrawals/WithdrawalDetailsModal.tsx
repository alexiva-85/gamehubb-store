'use client';

import { useState, useEffect, useCallback } from 'react';
import WithdrawalDetailsCard from './WithdrawalDetailsCard';

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
  payoutSnapshot: Record<string, unknown> | null;
}

interface WithdrawalDetailsModalProps {
  id: string | null;
  open: boolean;
  onClose: () => void;
  adminKey: string;
  onUpdate: () => void;
}

export default function WithdrawalDetailsModal({
  id,
  open,
  onClose,
  adminKey,
  onUpdate,
}: WithdrawalDetailsModalProps) {
  const [request, setRequest] = useState<WithdrawalRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const withKey = useCallback((path: string) => {
    if (!adminKey) return path;
    const sep = path.includes('?') ? '&' : '?';
    return `${path}${sep}key=${encodeURIComponent(adminKey)}`;
  }, [adminKey]);

  const adminFetch = useCallback((path: string, init: RequestInit = {}) => {
    const url = withKey(path);
    return fetch(url, {
      ...init,
      cache: 'no-store',
      headers: {
        ...(init.headers || {}),
        'Content-Type': 'application/json',
        'x-admin-key': adminKey,
      },
    });
  }, [withKey, adminKey]);

  useEffect(() => {
    if (!open || !id) {
      setRequest(null);
      setError(null);
      return;
    }

    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await adminFetch(`/api/admin/withdrawals/${id}`);
        
        if (cancelled) return;

        if (!response.ok) {
          if (response.status === 404) {
            setError('Заявка не найдена');
          } else if (response.status === 401) {
            setError('Неверный admin key');
          } else {
            setError('Ошибка загрузки деталей');
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        if (!cancelled) {
          setRequest(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Error fetching withdrawal details:', err);
          setError('Ошибка загрузки деталей');
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [open, id, adminFetch]);

  const handleUpdate = useCallback(async () => {
    onUpdate();
    // Refetch details after update
    if (id) {
      setLoading(true);
      try {
        const response = await adminFetch(`/api/admin/withdrawals/${id}`);
        if (response.ok) {
          const data = await response.json();
          setRequest(data);
        }
      } catch (err) {
        console.error('Error refetching withdrawal details:', err);
      } finally {
        setLoading(false);
      }
    }
  }, [id, adminFetch, onUpdate]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-[#3a3a3a] rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#0a0a0a] border-b border-[#3a3a3a] p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-zinc-200">Детали заявки</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-200 text-2xl leading-none"
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>
        <div className="p-4">
          {loading && !request ? (
            <div className="text-center py-8">
              <p className="text-zinc-400">Загрузка...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-400">{error}</p>
            </div>
          ) : request ? (
            <WithdrawalDetailsCard
              request={request}
              adminKey={adminKey}
              onUpdate={handleUpdate}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
