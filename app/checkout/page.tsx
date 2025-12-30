'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/app/providers/CartProvider';

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const [playerId, setPlayerId] = useState('');
  const [server, setServer] = useState('');
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = playerId.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Show toast/alert
    alert('Платёж подключается');

    setIsSubmitting(false);
  };

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Оформление заказа</h1>
        <div className="text-center py-12">
          <p className="text-[#a0a0a0] mb-4">Ваша корзина пуста</p>
          <Link
            href="/catalog"
            className="inline-block px-6 py-3 bg-[#4DA3FF] text-white rounded-lg hover:bg-[#3d8fdf] transition-colors"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-white">Оформление заказа</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">Данные для пополнения</h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="playerId"
                    className="block text-sm font-medium mb-2 text-[#d0d0d0]"
                  >
                    Player ID <span className="text-[#ff4444]">*</span>
                  </label>
                  <input
                    id="playerId"
                    type="text"
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-[#3a3a3a] rounded-lg bg-[#2a2a2a] text-white placeholder-[#666] focus:outline-none focus:ring-2 focus:ring-[#4DA3FF] focus:border-[#4DA3FF]"
                    placeholder="Введите Player ID"
                  />
                  {!isValid && playerId.length > 0 && (
                    <p className="mt-1 text-sm text-[#ff4444]">Player ID обязателен для заполнения</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="server"
                    className="block text-sm font-medium mb-2 text-[#d0d0d0]"
                  >
                    Server
                  </label>
                  <input
                    id="server"
                    type="text"
                    value={server}
                    onChange={(e) => setServer(e.target.value)}
                    className="w-full px-4 py-2 border border-[#3a3a3a] rounded-lg bg-[#2a2a2a] text-white placeholder-[#666] focus:outline-none focus:ring-2 focus:ring-[#4DA3FF] focus:border-[#4DA3FF]"
                    placeholder="Название сервера (необязательно)"
                  />
                </div>

                <div>
                  <label
                    htmlFor="nickname"
                    className="block text-sm font-medium mb-2 text-[#d0d0d0]"
                  >
                    Nickname
                  </label>
                  <input
                    id="nickname"
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full px-4 py-2 border border-[#3a3a3a] rounded-lg bg-[#2a2a2a] text-white placeholder-[#666] focus:outline-none focus:ring-2 focus:ring-[#4DA3FF] focus:border-[#4DA3FF]"
                    placeholder="Игровой никнейм (необязательно)"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Order summary */}
        <div>
          <div className="border border-[#3a3a3a] rounded-lg p-6 bg-[#2a2a2a] sticky top-4">
            <h2 className="text-xl font-bold mb-4 text-white">Ваш заказ</h2>
            <div className="space-y-3 mb-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm pb-3 border-b border-[#3a3a3a] last:border-0">
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="text-[#a0a0a0]">
                      {item.priceRub}₽ × {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium text-white">{item.priceRub * item.quantity}₽</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#3a3a3a] pt-4 mb-4">
              <div className="flex justify-between text-xl font-bold text-white">
                <span>Всего:</span>
                <span>{total}₽</span>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!isValid || isSubmitting}
              className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
                isValid && !isSubmitting
                  ? 'bg-[#4DA3FF] text-white hover:bg-[#3d8fdf]'
                  : 'bg-[#333] text-[#666] cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Обработка...' : 'Оплатить'}
            </button>
            {!isValid && (
              <p className="mt-2 text-sm text-[#ff4444] text-center">
                Заполните Player ID для продолжения
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

