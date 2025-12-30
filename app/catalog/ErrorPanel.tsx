'use client';

interface ErrorPanelProps {
  error: string | null;
}

export default function ErrorPanel({ error }: ErrorPanelProps) {
  return (
    <div
      className={`p-4 rounded border ${
        error
          ? 'bg-red-50 border-red-300 text-red-800'
          : 'bg-gray-50 border-gray-300 text-gray-600'
      }`}
    >
      <h3 className="font-semibold mb-2">Error Panel</h3>
      {error ? (
        <p className="text-sm">{error}</p>
      ) : (
        <p className="text-sm">No errors</p>
      )}
    </div>
  );
}

