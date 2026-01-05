import Link from 'next/link';
import CartIcon from './CartIcon';

export default function Header() {
  return (
    <header className="border-b border-[#3a3a3a] bg-[#1a1a1a]">
      <div className="container mx-auto px-3 py-4">
        <div className="flex items-center justify-between">
          {/* LEFT: Brand */}
          <Link href="/" className="flex items-center gap-2 min-w-0 hover:opacity-80 transition-opacity">
            <div className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 overflow-hidden rounded-[12px] border border-white/[0.08] bg-black/20 flex items-center justify-center flex-shrink-0 p-1">
              <picture>
                <source srcSet="/brand/logo-glyph-256.png" media="(min-width: 768px)" />
                <img
                  src="/brand/logo-glyph-128.png"
                  alt="GameHubb"
                  className="w-full h-full object-contain block"
                />
              </picture>
            </div>
            <span className="text-sm sm:text-base md:text-xl font-semibold tracking-tight text-white truncate hidden sm:block">
              GameHubb
            </span>
          </Link>

          {/* RIGHT: Navigation + Cart */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Navigation */}
            <nav className="flex items-center gap-2 sm:gap-3 md:gap-4 text-base sm:text-sm md:text-base max-w-[70vw] sm:max-w-none overflow-x-auto sm:overflow-visible">
              <Link
                href="/catalog"
                className="font-medium text-[#a0a0a0] hover:text-[#4DA3FF] transition-colors whitespace-nowrap px-2 py-2 sm:px-0 sm:py-0"
              >
                Каталог
              </Link>
              <Link
                href="/profile"
                className="font-medium text-[#a0a0a0] hover:text-[#4DA3FF] transition-colors whitespace-nowrap px-2 py-2 sm:px-0 sm:py-0"
                aria-label="Профиль"
              >
                Профиль
              </Link>
              <Link
                href="/contacts"
                className="font-medium text-[#a0a0a0] hover:text-[#4DA3FF] transition-colors whitespace-nowrap hidden sm:inline"
              >
                Контакты
              </Link>
            </nav>

            {/* Cart */}
            <div className="flex items-center flex-shrink-0">
              <CartIcon />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

