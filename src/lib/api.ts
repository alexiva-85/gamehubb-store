import { getInitData } from './tg';

type ApiOptions = {
  auth?: boolean;
  signal?: AbortSignal;
  idempotencyKey?: string;
};

async function handleResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get('Content-Type') ?? '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await res.json().catch(() => ({})) : await res.text();

  if (!res.ok) {
    const message =
      (isJson && (payload as any)?.error) ||
      (typeof payload === 'string' ? payload : 'Request failed');

    const error = new Error(message);
    (error as any).status = res.status;
    (error as any).payload = payload;
    throw error;
  }

  return payload as T;
}

function buildHeaders(options?: ApiOptions): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (options?.auth) {
    let initData = getInitData();

    // In E2E / test mode we can provide initData via compile-time env.
    if (!initData) {
      const testInitData =
        process.env.NEXT_PUBLIC_E2E_TG_INIT_DATA ?? process.env.E2E_TG_INIT_DATA;
      if (typeof testInitData === 'string' && testInitData.length > 0) {
        initData = testInitData;
      }
    }

    if (initData) {
      (headers as Record<string, string>)['x-telegram-init-data'] = initData;
    }
  }

  if (options?.idempotencyKey) {
    (headers as Record<string, string>)['x-idempotency-key'] = options.idempotencyKey;
  }

  return headers;
}

export async function apiGet<T>(url: string, options?: ApiOptions): Promise<T> {
  const res = await fetch(url, {
    method: 'GET',
    headers: buildHeaders(options),
    signal: options?.signal,
  });

  return handleResponse<T>(res);
}

export async function apiPost<T>(
  url: string,
  body: unknown,
  options?: ApiOptions,
): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: buildHeaders(options),
    body: JSON.stringify(body ?? {}),
    signal: options?.signal,
  });

  return handleResponse<T>(res);
}


