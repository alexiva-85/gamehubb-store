'use client';

import Link from 'next/link';
import { useCart } from '@/app/providers/CartProvider';

export default function CartPage() {
  const { cart, updateQuantity, removeItem, total } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Корзина</h1>
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Корзина</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="border border-[#3a3a3a] rounded-lg p-4 bg-[#2a2a2a]"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 text-white">{item.title}</h3>
                  <p className="text-sm text-[#a0a0a0] mb-2">
                    {item.priceRub}₽ за единицу
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 text-[#666] hover:text-[#ff4444] transition-colors"
                  aria-label="Удалить товар"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center border border-[#3a3a3a] rounded hover:bg-[#333] hover:border-[#4DA3FF] transition-colors text-white"
                    aria-label="Уменьшить количество"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                  </button>
                  <span className="text-lg font-medium w-12 text-center text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center border border-[#3a3a3a] rounded hover:bg-[#333] hover:border-[#4DA3FF] transition-colors text-white"
                    aria-label="Увеличить количество"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
                <div className="text-xl font-bold text-white">
                  {item.priceRub * item.quantity}₽
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="border border-[#3a3a3a] rounded-lg p-6 bg-[#2a2a2a] sticky top-4">
            <h2 className="text-xl font-bold mb-4 text-white">Итого</h2>
            <div className="space-y-2 mb-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-[#a0a0a0]">
                    {item.title} × {item.quantity}
                  </span>
                  <span className="text-white">{item.priceRub * item.quantity}₽</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#3a3a3a] pt-4 mb-4">
              <div className="flex justify-between text-xl font-bold text-white">
                <span>Всего:</span>
                <span>{total}₽</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="w-full block text-center px-6 py-3 bg-[#4DA3FF] text-white rounded-lg hover:bg-[#3d8fdf] transition-colors font-medium"
            >
              Перейти к оформлению
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

