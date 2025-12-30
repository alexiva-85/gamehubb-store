import Link from 'next/link';
import CartIcon from './CartIcon';

export default function Header() {
  return (
    <header className="border-b border-[#3a3a3a] bg-[#1a1a1a]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="h-12 w-12 md:h-14 md:w-14 overflow-hidden rounded-xl ring-1 ring-white/10 bg-black/20 flex items-center justify-center">
              <picture className="block">
                <source srcSet="/brand/logo-mark.webp" type="image/webp" />
                <img
                  src="/brand/logo-mark.png"
                  alt="GameHubb"
                  className="h-full w-full object-contain scale-[1.35] block"
                />
              </picture>
            </div>
            <span className="text-base md:text-xl font-semibold tracking-tight text-white">
              GameHubb
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/catalog"
              className="text-sm font-medium text-[#a0a0a0] hover:text-[#4DA3FF] transition-colors"
            >
              Каталог
            </Link>
            <Link
              href="/contacts"
              className="text-sm font-medium text-[#a0a0a0] hover:text-[#4DA3FF] transition-colors"
            >
              Контакты
            </Link>
            <CartIcon />
          </nav>
        </div>
      </div>
    </header>
  );
}

