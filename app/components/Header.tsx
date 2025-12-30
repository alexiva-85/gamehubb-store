import Link from 'next/link';
import CartIcon from './CartIcon';

export default function Header() {
  return (
    <header className="border-b border-[#3a3a3a] bg-[#1a1a1a]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white hover:text-[#4DA3FF] transition-colors">
            GameHubb
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

