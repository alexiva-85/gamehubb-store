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

function ErrorMessage({ message, detail }: { message: string; detail?: string }) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-white">Админ-панель: Заявки на вывод</h1>
      <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
        <p className="text-red-400">{message}</p>
        {detail && (
          <p className="text-sm text-red-400/80 mt-2 font-mono">{detail}</p>
        )}
      </div>
    </>
  );
}

function SuccessContent() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-white">Админ-панель: Заявки на вывод</h1>
      <WithdrawalsClient />
    </>
  );
}

export default async function AdminWithdrawalsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  let rawParams;
  try {
    rawParams = await searchParams;
  } catch (error) {
    console.error('[admin/withdrawals] Error resolving searchParams:', error);
    return <ErrorMessage 
      message="Ошибка при обработке параметров запроса" 
      detail={error instanceof Error ? error.message : undefined}
    />;
  }

  // Normalize searchParams: convert arrays to single strings
  let params: SearchParams;
  try {
    params = Object.fromEntries(
      Object.entries(rawParams ?? {}).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
    ) as SearchParams;
  } catch (error) {
    console.error('[admin/withdrawals] Error normalizing params:', error);
    return <ErrorMessage 
      message="Ошибка при обработке параметров запроса" 
      detail={error instanceof Error ? error.message : undefined}
    />;
  }

  // Check admin key - return UI error, never throw
  if (!checkAdminKey(params)) {
    return <ErrorMessage message="Неверный admin key. Добавьте ?key=... к URL (используйте ADMIN_KEY из .env.local)" />;
  }

  return <SuccessContent />;
}
