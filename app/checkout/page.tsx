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
        <h1 className="text-3xl font-bold mb-6">Оформление заказа</h1>
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Ваша корзина пуста</p>
          <Link
            href="/catalog"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Оформление заказа</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Данные для пополнения</h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="playerId"
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                  >
                    Player ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="playerId"
                    type="text"
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Введите Player ID"
                  />
                  {!isValid && playerId.length > 0 && (
                    <p className="mt-1 text-sm text-red-500">Player ID обязателен для заполнения</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="server"
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                  >
                    Server
                  </label>
                  <input
                    id="server"
                    type="text"
                    value={server}
                    onChange={(e) => setServer(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Название сервера (необязательно)"
                  />
                </div>

                <div>
                  <label
                    htmlFor="nickname"
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                  >
                    Nickname
                  </label>
                  <input
                    id="nickname"
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Игровой никнейм (необязательно)"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Order summary */}
        <div>
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-black sticky top-4">
            <h2 className="text-xl font-bold mb-4">Ваш заказ</h2>
            <div className="space-y-3 mb-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm pb-3 border-b border-gray-200 dark:border-gray-800 last:border-0">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.priceRub}₽ × {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium">{item.priceRub * item.quantity}₽</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mb-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Всего:</span>
                <span>{total}₽</span>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!isValid || isSubmitting}
              className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
                isValid && !isSubmitting
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Обработка...' : 'Оплатить'}
            </button>
            {!isValid && (
              <p className="mt-2 text-sm text-red-500 text-center">
                Заполните Player ID для продолжения
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

