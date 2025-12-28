import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-auto bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex flex-wrap justify-center gap-4 text-sm">
          <Link 
            href="/contacts" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Контакты
          </Link>
          <span className="text-gray-400">|</span>
          <Link 
            href="/terms" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Условия
          </Link>
          <span className="text-gray-400">|</span>
          <Link 
            href="/refund" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Возврат
          </Link>
          <span className="text-gray-400">|</span>
          <Link 
            href="/requisites" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Реквизиты
          </Link>
        </nav>
        <div className="text-center text-xs text-gray-500 mt-4">
          © {new Date().getFullYear()} GameHubb Store. Все права защищены.
        </div>
      </div>
    </footer>
  );
}

