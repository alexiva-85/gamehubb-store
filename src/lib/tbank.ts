import crypto from 'crypto';

const DEFAULT_API_BASE_URL = 'https://securepay.tinkoff.ru';

export type InitPaymentParams = {
  orderId: number;
  amountKopeks: number;
  description: string;
  successUrl: string;
  failUrl: string;
  notificationUrl: string;
};

export type InitPaymentResult = {
  paymentId: string;
  paymentUrl: string;
  status: string;
};

type TBankInitRequest = {
  TerminalKey: string;
  Amount: number;
  OrderId: string | number;
  Description: string;
  NotificationURL: string;
  SuccessURL?: string;
  FailURL?: string;
  Token?: string;
};

export function buildTokenForRequest(payload: Record<string, unknown>, password: string): string {
  const entries = Object.entries(payload)
    .filter(([key, value]) => {
      if (key === 'Token') return false;
      if (value === null || value === undefined) return false;
      if (typeof value === 'object') return false;
      return true;
    })
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));

  const concatenated = entries.map(([, value]) => String(value)).join('') + password;

  return crypto.createHash('sha256').update(concatenated).digest('hex');
}

export function verifyNotification(payload: Record<string, unknown>, password: string): boolean {
  const { Token } = payload as { Token?: string };

  if (!Token) {
    return false;
  }

  const entries = Object.entries(payload)
    .filter(([key, value]) => {
      if (key === 'Token' || key === 'DATA' || key === 'Data' || key === 'Receipt') return false;
      if (value === null || value === undefined) return false;
      if (typeof value === 'object') return false;
      return true;
    })
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));

  const concatenated = entries.map(([, value]) => String(value)).join('') + password;
  const expected = crypto.createHash('sha256').update(concatenated).digest('hex');

  return expected === Token;
}

export async function initPayment(params: InitPaymentParams): Promise<InitPaymentResult> {
  const terminalKey = process.env.TBANK_TERMINAL_KEY;
  const password = process.env.TBANK_PASSWORD;
  const baseUrl = process.env.TBANK_API_BASE_URL ?? DEFAULT_API_BASE_URL;

  if (!terminalKey || !password) {
    throw new Error('TBANK_TERMINAL_KEY or TBANK_PASSWORD is not configured');
  }

  const requestPayload: TBankInitRequest = {
    TerminalKey: terminalKey,
    Amount: params.amountKopeks,
    OrderId: params.orderId,
    Description: params.description,
    NotificationURL: params.notificationUrl,
    SuccessURL: params.successUrl,
    FailURL: params.failUrl,
  };

  const token = buildTokenForRequest(requestPayload as Record<string, unknown>, password);
  requestPayload.Token = token;

  const response = await fetch(`${baseUrl}/v2/Init`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestPayload),
  });

  if (!response.ok) {
    throw new Error(`T-Bank Init request failed with status ${response.status}`);
  }

  const json = (await response.json()) as {
    Success: boolean;
    Message?: string;
    Details?: string;
    Status?: string;
    PaymentId?: string;
    PaymentURL?: string;
  };

  if (!json.Success || !json.PaymentId || !json.PaymentURL || !json.Status) {
    throw new Error(
      `T-Bank Init response is invalid: ${json.Message ?? 'Unknown error'} ${json.Details ?? ''}`,
    );
  }

  return {
    paymentId: String(json.PaymentId),
    paymentUrl: String(json.PaymentURL),
    status: json.Status,
  };
}



