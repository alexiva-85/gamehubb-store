'use client';

import { useState, useEffect } from 'react';
import Card from '@/app/components/Card';

interface ReferralSummary {
  referralCode: string;
  referralsCount: number;
  rewards: {
    lockedAmount: number;
    availableAmount: number;
    paidAmount: number;
    canceledAmount: number;
  };
  note: string;
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [referralLink, setReferralLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [referralSummary, setReferralSummary] = useState<ReferralSummary | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState<{ status: number | null; message: string } | null>(null);

  // Check feature flag (client-side)
  const isReferralProgramEnabled = typeof window !== 'undefined' 
    ? process.env.NEXT_PUBLIC_REFERRAL_PROGRAM_ENABLED === 'true'
    : false;

  // Check for debug mode
  const isDebug = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === '1';

  useEffect(() => {
    // Check if Web Share API is available
    if (typeof window !== 'undefined' && 'share' in navigator && typeof navigator.share === 'function') {
      setCanShare(true);
    }

    // Fetch user data from /api/me
    const fetchUserData = async () => {
      if (typeof window === 'undefined') {
        setLoading(false);
        return;
      }

      try {
        const tg = (window as any).Telegram?.WebApp;
        const initData = tg?.initData ?? '';
        const startParamFromInit = tg?.initDataUnsafe?.start_param;
        const startParamFromUrl = new URLSearchParams(window.location.search).get('tgWebAppStartParam');
        const startParam = startParamFromInit || startParamFromUrl || '';

        // If no initData, don't call API, show placeholder
        if (!initData) {
          setLoading(false);
          setReferralLink(null);
          return;
        }

        const response = await fetch('/api/me', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ initData, startParam }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user?.referralCode) {
            const link = `https://t.me/GameHubb_TopUp_bot?startapp=r${data.user.referralCode}`;
            setReferralLink(link);
          } else {
            setReferralLink(null);
          }
        } else {
          setError('Не удалось загрузить данные');
          setReferralLink(null);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Ошибка при загрузке данных');
        setReferralLink(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    // Fetch referral summary if feature flag is enabled
    if (isReferralProgramEnabled) {
      fetchReferralSummary();
    }
  }, [isReferralProgramEnabled]);

  const handleCopy = async () => {
    if (!referralLink) return;

    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setError('Не удалось скопировать ссылку');
    }
  };

  const handleShare = async () => {
    if (!referralLink) return;

    try {
      await navigator.share({
        title: 'Присоединяйся к GameHubb',
        text: 'Получи скидку 5% на первую покупку!',
        url: referralLink,
      });
    } catch (err) {
      // User cancelled or share failed, fallback to copy
      if ((err as Error).name !== 'AbortError') {
        handleCopy();
      }
    }
  };

  const fetchReferralSummary = async () => {
    if (typeof window === 'undefined') return;

    const tg = (window as any).Telegram?.WebApp;
    const initData = tg?.initData ?? '';

    // If no initData, don't make request at all
    if (!initData) {
      setSummaryLoading(false);
      setSummaryError({ status: null, message: 'Telegram initData не найден' });
      return;
    }

    try {
      setSummaryLoading(true);
      setSummaryError(null);

      const response = await fetch('/api/referrals/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ initData }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.enabled === false) {
          // Feature flag disabled on server
          setReferralSummary(null);
          setSummaryError(null);
        } else {
          setReferralSummary(data);
          setSummaryError(null);
        }
      } else {
        // Handle error responses (401, 405, 500, etc.)
        const status = response.status;
        let errorMessage = `Статистика временно недоступна (код: ${status}).`;
        
        // Try to get error message from response
        try {
          const errorData = await response.json();
          if (errorData?.error) {
            if (status === 401 && errorData.error === 'Telegram initData not found') {
              errorMessage = 'Telegram initData не найден';
            } else {
              errorMessage = errorData.error;
            }
          }
        } catch {
          // Ignore JSON parse errors, use default message
        }
        
        setReferralSummary(null);
        setSummaryError({
          status,
          message: errorMessage,
        });
      }
    } catch (err) {
      // Network error or other exception
      console.error('Error fetching referral summary:', err);
      setReferralSummary(null);
      setSummaryError({
        status: null,
        message: 'Статистика временно недоступна (ошибка сети).',
      });
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleRetrySummary = () => {
    fetchReferralSummary();
  };

  // Debug info
  const getDebugInfo = () => {
    if (typeof window === 'undefined') return null;
    const tg = (window as any).Telegram?.WebApp;
    const initData = tg?.initData ?? '';
    const startParamFromInit = tg?.initDataUnsafe?.start_param;
    const startParamFromUrl = new URLSearchParams(window.location.search).get('tgWebAppStartParam');
    const startParam = startParamFromInit || startParamFromUrl || '';

    return {
      hasInitData: initData.length > 0,
      startParam: startParam || 'none',
      error: error || 'none',
    };
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-white">Профиль</h1>

      <div className="space-y-6">
        <Card>
          <h2 className="text-xl font-medium mb-2 text-zinc-100">Пригласи друга</h2>
          <p className="text-sm text-zinc-300 mb-4">
            Друг получит скидку 5% на первую покупку. Ты получишь 5% с его первой покупки и 1% с последующих.
          </p>
          {!isReferralProgramEnabled && (
            <p className="text-xs text-zinc-400 mb-4">
              Начисления и скидка включатся после запуска программы.
            </p>
          )}

          {isReferralProgramEnabled && summaryLoading && (
            <div className="mb-4 p-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg">
              <p className="text-sm text-zinc-400 text-center">Загружаем статистику…</p>
            </div>
          )}

          {isReferralProgramEnabled && summaryError && !summaryLoading && (
            <div className="mb-4 p-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg space-y-2">
              <p className="text-sm text-zinc-300">{summaryError.message}</p>
              <p className="text-xs text-zinc-500">
                Проверь: включены ли флаги и открыт ли магазин внутри Telegram.
              </p>
              <button
                onClick={handleRetrySummary}
                className="w-full mt-2 px-4 py-2 bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded-lg hover:bg-[#333] transition-colors text-sm font-medium"
              >
                Повторить
              </button>
            </div>
          )}

          {isReferralProgramEnabled && referralSummary && !summaryLoading && !summaryError && (
            <div className="mb-4 p-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Приглашено друзей:</span>
                <span className="text-zinc-100 font-medium">{referralSummary.referralsCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Заблокировано:</span>
                <span className="text-zinc-100 font-medium">{(referralSummary.rewards.lockedAmount / 100).toFixed(2)}₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Доступно к выводу:</span>
                <span className="text-zinc-100 font-medium">{(referralSummary.rewards.availableAmount / 100).toFixed(2)}₽</span>
              </div>
              <div className="pt-2 border-t border-[#3a3a3a]">
                <p className="text-xs text-zinc-500">{referralSummary.note}</p>
              </div>
            </div>
          )}

          {isDebug && (() => {
            const debugInfo = getDebugInfo();
            return debugInfo ? (
              <div className="mb-4 p-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded text-xs text-zinc-400">
                Telegram initData: {debugInfo.hasInitData ? 'yes' : 'no'}; startParam: {debugInfo.startParam}; error: {debugInfo.error}
              </div>
            ) : null;
          })()}

          {loading ? (
            <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
              <p className="text-sm text-zinc-400 text-center">Загружаем ссылку…</p>
            </div>
          ) : referralLink ? (
            <div className="space-y-4">
              <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-3">
                <p className="text-xs text-zinc-400 mb-1">Твоя реферальная ссылка:</p>
                <p className="text-sm text-zinc-200 break-all font-mono">
                  {referralLink}
                </p>
              </div>

              <div className="flex gap-3">
                {canShare && (
                  <button
                    onClick={handleShare}
                    className="flex-1 px-4 py-2 bg-[#4DA3FF] text-white rounded-lg hover:bg-[#3d8fdf] transition-colors text-sm font-medium"
                  >
                    Поделиться
                  </button>
                )}
                <button
                  onClick={handleCopy}
                  className="flex-1 px-4 py-2 bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded-lg hover:bg-[#333] transition-colors text-sm font-medium"
                >
                  {copied ? 'Скопировано' : 'Скопировать'}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
              <p className="text-sm text-zinc-400 text-center">
                Твоя ссылка появится здесь после запуска реферальной программы.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

