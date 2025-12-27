'use client';

import { useState } from 'react';
import ErrorPanel from './ErrorPanel';

export default function CatalogClient() {
  const [error, setError] = useState<string | null>(null);

  const handleThrowError = () => {
    try {
      throw new Error('Test error from catalog page');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  return (
    <div className="space-y-4">
      <ErrorPanel error={error} />
      <button
        onClick={handleThrowError}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Throw test error
      </button>
    </div>
  );
}

