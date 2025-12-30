import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-foreground hover:opacity-80 transition-opacity">
            GameHubb
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/catalog"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Каталог
            </Link>
            <Link
              href="/contacts"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Контакты
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

