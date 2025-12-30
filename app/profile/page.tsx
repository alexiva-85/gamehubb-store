'use client';

import { useState, useEffect } from 'react';
import Card from '@/app/components/Card';

interface UserData {
  tgId: string;
  referralCode: string;
  referredById: string | null;
}

export default function ProfilePage() {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [loading, setLoading] = useState(true);

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
        const initData = tg?.initData || '';
        const initDataUnsafe = tg?.initDataUnsafe || null;
        const startParam = initDataUnsafe?.start_param || 
          new URLSearchParams(window.location.search).get('tgWebAppStartParam') || 
          null;

        const response = await fetch('/api/me', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            initData,
            startParam,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user?.referralCode) {
            setReferralCode(data.user.referralCode);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const referralLink = referralCode 
    ? `https://t.me/GameHubb_TopUp_bot?startapp=r${referralCode}`
    : null;

  const handleCopy = async () => {
    if (!referralLink) return;

    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
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
    } catch (error) {
      // User cancelled or share failed, fallback to copy
      if ((error as Error).name !== 'AbortError') {
        handleCopy();
      }
    }
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
          <p className="text-xs text-zinc-400 mb-4">
            Начисления и скидка включатся после запуска программы.
          </p>

          {loading ? (
            <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
              <p className="text-sm text-zinc-400 text-center">Загрузка...</p>
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

