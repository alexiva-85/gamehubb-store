'use client';

import { useState, useEffect } from 'react';

interface WithdrawalDetails {
  id: string;
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

interface WithdrawalDetailsDialogProps {
  withdrawalId: string | null;
  onClose: () => void;
  initData: string;
}

// Deterministic date/time formatter (fixes hydration mismatch)
const formatDateTime = (value: string | Date) => {
  const d = value instanceof Date ? value : new Date(value);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// Deterministic decimal formatter (2 decimal places)
const formatDecimal = (v: number | null | undefined): string => {
  if (v === null || v === undefined) return '-';
  const n = Math.round(v * 100) / 100;
  const parts = n.toString().split('.');
  const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts[1] ? `${intPart}.${parts[1].padEnd(2, '0')}` : intPart;
};

const getStatusText = (status: string): string => {
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

const getStatusColor = (status: string): string => {
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

export default function WithdrawalDetailsDialog({
  withdrawalId,
  onClose,
  initData,
}: WithdrawalDetailsDialogProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<WithdrawalDetails | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!withdrawalId) {
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/withdrawals/my/${withdrawalId}?initData=${encodeURIComponent(initData)}`
        );

        if (response.status === 404) {
          setError('Выплата не найдена');
          return;
        }

        if (!response.ok) {
          setError('Ошибка загрузки деталей');
          return;
        }

        const data = await response.json();
        setDetails(data);
      } catch (err) {
        console.error('Error fetching withdrawal details:', err);
        setError('Ошибка загрузки деталей');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [withdrawalId, initData]);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!withdrawalId) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#1a1a1a] border-t border-[#3a3a3a] rounded-t-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#1a1a1a] border-b border-[#3a3a3a] px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-medium text-zinc-100">Детали выплаты</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-200 text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {loading && (
            <div className="text-center py-8">
              <p className="text-zinc-400">Загрузка...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {details && (
            <div className="space-y-4">
              {/* Status */}
              <div>
                <p className="text-xs text-zinc-400 mb-1">Статус</p>
                <p className={`text-sm font-medium ${getStatusColor(details.status)}`}>
                  {getStatusText(details.status)}
                </p>
              </div>

              {/* Created At */}
              <div>
                <p className="text-xs text-zinc-400 mb-1">Создано</p>
                <p className="text-sm text-zinc-200">{formatDateTime(details.createdAt)}</p>
              </div>

              {/* Paid At */}
              {details.paidAt && (
                <div>
                  <p className="text-xs text-zinc-400 mb-1">Оплачено</p>
                  <p className="text-sm text-zinc-200">{formatDateTime(details.paidAt)}</p>
                </div>
              )}

              {/* Payout Details (if PAID) */}
              {details.status === 'PAID' && details.payoutAsset && (
                <>
                  <div className="pt-3 border-t border-[#3a3a3a]">
                    <p className="text-sm font-medium text-zinc-300 mb-3">Параметры выплаты</p>
                    
                    {/* Payout Asset */}
                    <div className="mb-3">
                      <p className="text-xs text-zinc-400 mb-1">Валюта выплаты</p>
                      <p className="text-sm text-zinc-200">{details.payoutAsset}</p>
                    </div>

                    {/* Payout Amount */}
                    {details.payoutAmount && (
                      <div className="mb-3">
                        <p className="text-xs text-zinc-400 mb-1">Сумма к выплате</p>
                        <p className="text-sm text-zinc-200 font-medium">
                          {formatDecimal(details.payoutAmount)} {details.payoutAsset}
                        </p>
                      </div>
                    )}

                    {/* Base Rub */}
                    {details.payoutBaseRub && (
                      <div className="mb-3">
                        <p className="text-xs text-zinc-400 mb-1">Учётная сумма</p>
                        <p className="text-sm text-zinc-200">
                          {formatDecimal(details.payoutBaseRub)} ₽
                        </p>
                      </div>
                    )}

                    {/* Exchange Rate */}
                    {details.exchangeRate && details.payoutAsset && (
                      <div className="mb-3">
                        <p className="text-xs text-zinc-400 mb-1">Курс обмена</p>
                        <p className="text-sm text-zinc-200">
                          {formatDecimal(details.exchangeRate)} ₽/{details.payoutAsset}
                        </p>
                      </div>
                    )}

                    {/* Rate Source */}
                    {details.rateSource && (
                      <div className="mb-3">
                        <p className="text-xs text-zinc-400 mb-1">Источник курса</p>
                        <p className="text-sm text-zinc-200">{details.rateSource}</p>
                      </div>
                    )}

                    {/* Rate Captured At */}
                    {details.rateCapturedAt && (
                      <div className="mb-3">
                        <p className="text-xs text-zinc-400 mb-1">Курс зафиксирован</p>
                        <p className="text-sm text-zinc-200">
                          {formatDateTime(details.rateCapturedAt)}
                        </p>
                      </div>
                    )}

                    {/* Fee */}
                    {details.payoutFeeRub && details.payoutFeeRub > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-zinc-400 mb-1">Комиссия</p>
                        <p className="text-sm text-zinc-200">
                          {formatDecimal(details.payoutFeeRub)} ₽
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Admin Note */}
              {details.adminNote && (
                <div className="pt-3 border-t border-[#3a3a3a]">
                  <p className="text-xs text-zinc-400 mb-1">Комментарий</p>
                  <p className="text-sm text-zinc-200">{details.adminNote}</p>
                </div>
              )}

              {/* TX Hash */}
              {details.txHash && (
                <div className="pt-3 border-t border-[#3a3a3a]">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-xs text-zinc-400 mb-1">TxHash</p>
                      <p className="text-xs text-zinc-200 font-mono break-all">
                        {details.txHash}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(details.txHash!, 'txHash')}
                      className="ml-2 px-2 py-1 text-xs bg-[#2a2a2a] border border-[#3a3a3a] rounded hover:bg-[#333] text-zinc-300"
                    >
                      {copied === 'txHash' ? '✓' : 'Копировать'}
                    </button>
                  </div>
                </div>
              )}

              {/* Address */}
              {details.tonAddress && (
                <div className="pt-3 border-t border-[#3a3a3a]">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-xs text-zinc-400 mb-1">Адрес</p>
                      <p className="text-xs text-zinc-200 font-mono break-all">
                        {details.tonAddress}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(details.tonAddress, 'address')}
                      className="ml-2 px-2 py-1 text-xs bg-[#2a2a2a] border border-[#3a3a3a] rounded hover:bg-[#333] text-zinc-300"
                    >
                      {copied === 'address' ? '✓' : 'Копировать'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
