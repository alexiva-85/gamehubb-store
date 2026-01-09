import WithdrawalsClient from './WithdrawalsClient';

export const dynamic = 'force-dynamic'; // Required because we use searchParams

interface SearchParams {
  key?: string;
}

function checkAdminKey(searchParams: SearchParams): boolean {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) {
    // If ADMIN_KEY not set, allow (dev mode)
    return true;
  }

  const keyFromQuery = searchParams.key;
  return keyFromQuery === adminKey;
}

export default async function AdminWithdrawalsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Wrap entire function in try-catch to prevent any 500 errors
  try {
    const rawParams = await searchParams;

    // Normalize searchParams: convert arrays to single strings
    const params = Object.fromEntries(
      Object.entries(rawParams ?? {}).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
    ) as SearchParams;

    // Check admin key - return UI error, never throw
    if (!checkAdminKey(params)) {
      return (
        <>
          <h1 className="text-3xl font-bold mb-6 text-white">Админ-панель: Заявки на вывод</h1>
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-400">
              Неверный admin key. Добавьте ?key=... к URL (используйте ADMIN_KEY из .env.local)
            </p>
          </div>
        </>
      );
    }

    // Get admin key for client component
    const adminKey = params.key || '';

    return (
      <>
        <h1 className="text-3xl font-bold mb-6 text-white">Админ-панель: Заявки на вывод</h1>
        <WithdrawalsClient adminKey={adminKey} />
      </>
    );
  } catch (error) {
    // Catch any unexpected errors
    console.error('[admin/withdrawals] Unexpected error:', error);
    return (
      <>
        <h1 className="text-3xl font-bold mb-6 text-white">Админ-панель: Заявки на вывод</h1>
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-400">
            Произошла ошибка при загрузке страницы. Попробуйте перезагрузить страницу.
          </p>
          {error instanceof Error && (
            <p className="text-sm text-red-400/80 mt-2 font-mono">{error.message}</p>
          )}
        </div>
      </>
    );
  }
}
