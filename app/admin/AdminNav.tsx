'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function AdminNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Build search params preserving all existing params (especially 'key')
  const buildHref = (path: string) => {
    const sp = new URLSearchParams(searchParams.toString());
    const key = sp.get('key');
    
    if (key) {
      // Preserve key and any other params
      return `${path}?${sp.toString()}`;
    }
    
    // If no key, return path without params
    return path;
  };

  const navItems = [
    { label: 'Цены', path: '/admin/prices' },
    { label: 'Выводы', path: '/admin/withdrawals' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#3a3a3a] mb-6 -mx-4 px-4 py-3">
      <div className="flex items-center gap-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          const href = buildHref(item.path);
          return (
            <Link
              key={item.path}
              href={href}
              className={`font-medium text-sm transition-all duration-200 px-4 py-2.5 rounded-lg ${
                isActive
                  ? 'text-[#4DA3FF] bg-[#4DA3FF]/15 border border-[#4DA3FF]/30 shadow-sm shadow-[#4DA3FF]/10'
                  : 'text-[#a0a0a0] hover:text-[#4DA3FF] hover:bg-[#4DA3FF]/5 border border-transparent'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
