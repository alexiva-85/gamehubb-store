import Link from 'next/link';
import CartIcon from './CartIcon';

export default function Header() {
  return (
    <header className="border-b border-[#3a3a3a] bg-[#1a1a1a]">
      <div className="container mx-auto px-3 py-4">
        <div className="flex items-center justify-between">
          {/* LEFT: Brand */}
          <Link href="/" className="flex items-center gap-2 min-w-0 hover:opacity-80 transition-opacity">
            <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 overflow-hidden rounded-xl ring-1 ring-white/10 bg-black/20 flex items-center justify-center flex-shrink-0">
              <picture className="block">
                <source srcSet="/brand/logo-mark.webp" type="image/webp" />
                <img
                  src="/brand/logo-mark.png"
                  alt="GameHubb"
                  className="h-full w-full object-contain scale-[1.35] block"
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
            <nav className="flex items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base max-w-[70vw] sm:max-w-none overflow-x-auto sm:overflow-visible">
              <Link
                href="/catalog"
                className="font-medium text-[#a0a0a0] hover:text-[#4DA3FF] transition-colors whitespace-nowrap"
              >
                Каталог
              </Link>
              <Link
                href="/profile"
                className="font-medium text-[#a0a0a0] hover:text-[#4DA3FF] transition-colors whitespace-nowrap"
                aria-label="Профиль"
              >
                Профиль
              </Link>
              <Link
                href="/contacts"
                className="font-medium text-[#a0a0a0] hover:text-[#4DA3FF] transition-colors whitespace-nowrap"
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

