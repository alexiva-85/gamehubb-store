'use client';

import { PropsWithChildren } from 'react';
import { Button } from '@telegram-apps/telegram-ui';
import { useRouter, usePathname } from 'next/navigation';

import { Link } from './Link/Link';
import { useCart } from '@/lib/useCart';

import './AppShell.css';

type AppShellProps = PropsWithChildren<{
  title?: string;
  showHeader?: boolean;
  showBottomNav?: boolean;
  stickyBottom?: React.ReactNode;
}>;

/**
 * Общий layout для всех страниц приложения.
 * Включает header с корзиной и опциональную нижнюю навигацию.
 */
export function AppShell({
  children,
  title = 'Магазин',
  showHeader = true,
  showBottomNav = false,
  stickyBottom,
}: AppShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { totalQty } = useCart();

  const isCatalog = pathname === '/catalog';
  const isCart = pathname === '/cart';

  return (
    <div className="app-shell">
      {showHeader && (
        <header className="app-shell__header">
          <div className="app-shell__header-content">
            <h1 className="app-shell__title">{title}</h1>
            <Link href="/cart" className="app-shell__cart-link">
              <Button
                size="s"
                mode="bezeled"
                className="app-shell__cart-button"
              >
                Корзина
                {totalQty > 0 && (
                  <span className="app-shell__cart-badge">{totalQty}</span>
                )}
              </Button>
            </Link>
          </div>
        </header>
      )}

      <main className="app-shell__main">
        {children}
      </main>

      {stickyBottom && (
        <div className="app-shell__sticky-bottom">
          {stickyBottom}
        </div>
      )}

      {showBottomNav && (
        <nav className="app-shell__bottom-nav">
          <Link
            href="/catalog"
            className={`app-shell__nav-item ${isCatalog ? 'app-shell__nav-item--active' : ''}`}
          >
            Каталог
          </Link>
          <Link
            href="/cart"
            className={`app-shell__nav-item ${isCart ? 'app-shell__nav-item--active' : ''}`}
          >
            Корзина
            {totalQty > 0 && (
              <span className="app-shell__nav-badge">{totalQty}</span>
            )}
          </Link>
        </nav>
      )}

      {/* Футер с ссылками на юридические документы */}
      <footer className="app-shell__footer">
        <Link href="/oferta" className="app-shell__footer-link">
          Публичная оферта
        </Link>
      </footer>
    </div>
  );
}


