import { Suspense } from 'react';
import AdminNav from './AdminNav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Suspense
          fallback={
            <div className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#3a3a3a] mb-6 -mx-4 px-4 py-3 h-14" />
          }
        >
          <AdminNav />
        </Suspense>
        <div className="pt-2">
          {children}
        </div>
      </div>
    </div>
  );
}
