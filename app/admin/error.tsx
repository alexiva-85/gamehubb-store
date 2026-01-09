'use client';

import { useEffect } from 'react';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('Admin error:', error);
  }, [error]);

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Ошибка в админке</h2>
        <p className="text-red-300 mb-4">
          Произошла ошибка при загрузке страницы. Попробуйте перезагрузить страницу.
        </p>
        {error.message && (
          <p className="text-sm text-red-400/80 mb-4 font-mono bg-black/20 p-2 rounded">
            {error.message}
          </p>
        )}
        <button
          onClick={reset}
          className="px-4 py-2 bg-[#4DA3FF] text-white rounded hover:bg-[#3d8fdf] transition-colors"
        >
          Перезагрузить
        </button>
      </div>
    </div>
  );
}
