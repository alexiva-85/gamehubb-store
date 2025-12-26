import crypto from 'crypto';

const DEFAULT_API_BASE_URL = 'https://auth.robokassa.ru/Merchant/Index.aspx';
const TEST_API_BASE_URL = 'https://auth.robokassa.ru/Merchant/Index.aspx';

export type InitPaymentParams = {
  orderId: number;
  amountKopeks: number;
  description: string;
  successUrl: string;
  failUrl: string;
  notificationUrl: string;
  email?: string;
  culture?: string; // ru, en
};

export type InitPaymentResult = {
  paymentId: string;
  paymentUrl: string;
};

/**
 * Формирует подпись для запроса на оплату
 * Signature = MD5(MerchantLogin:OutSum:InvId:Password1)
 */
export function buildPaymentSignature(
  merchantLogin: string,
  outSum: number,
  invId: number,
  password1: string,
): string {
  const signatureString = `${merchantLogin}:${outSum}:${invId}:${password1}`;
  return crypto.createHash('md5').update(signatureString).digest('hex').toUpperCase();
}

/**
 * Проверяет подпись уведомления от Robokassa
 * SignatureValue = MD5(OutSum:InvId:Password2)
 */
export function verifyNotificationSignature(
  outSum: number,
  invId: number,
  signatureValue: string,
  password2: string,
): boolean {
  const expectedSignature = crypto
    .createHash('md5')
    .update(`${outSum}:${invId}:${password2}`)
    .digest('hex')
    .toUpperCase();

  return expectedSignature.toUpperCase() === signatureValue.toUpperCase();
}

/**
 * Инициализирует платеж в Robokassa
 * Возвращает URL для редиректа пользователя на страницу оплаты
 */
export function initPayment(params: InitPaymentParams): InitPaymentResult {
  const merchantLogin = process.env.ROBOKASSA_MERCHANT_LOGIN;
  const password1 = process.env.ROBOKASSA_PASSWORD1;
  const isTest = process.env.ROBOKASSA_TEST_MODE === 'true';
  const baseUrl = process.env.ROBOKASSA_API_BASE_URL || (isTest ? TEST_API_BASE_URL : DEFAULT_API_BASE_URL);

  if (!merchantLogin || !password1) {
    throw new Error('ROBOKASSA_MERCHANT_LOGIN or ROBOKASSA_PASSWORD1 is not configured');
  }

  // Robokassa принимает сумму в рублях (не копейки)
  const outSum = (params.amountKopeks / 100).toFixed(2);
  const invId = params.orderId;

  // Формируем подпись
  const signature = buildPaymentSignature(merchantLogin, parseFloat(outSum), invId, password1);

  // Формируем URL для оплаты
  const urlParams = new URLSearchParams({
    MerchantLogin: merchantLogin,
    OutSum: outSum,
    InvId: String(invId),
    Description: params.description,
    SignatureValue: signature,
    IsTest: isTest ? '1' : '0',
  });

  // Опциональные параметры
  if (params.email) {
    urlParams.append('Email', params.email);
  }

  if (params.culture) {
    urlParams.append('Culture', params.culture);
  }

  // SuccessURL и FailURL можно передать в параметрах или настроить в личном кабинете
  if (params.successUrl) {
    urlParams.append('SuccessURL', params.successUrl);
  }

  if (params.failUrl) {
    urlParams.append('FailURL', params.failUrl);
  }

  const paymentUrl = `${baseUrl}?${urlParams.toString()}`;

  return {
    paymentId: String(invId), // В Robokassa paymentId = InvId (номер заказа)
    paymentUrl,
  };
}

/**
 * Парсит параметры из ResultURL уведомления
 */
export function parseNotificationParams(
  params: URLSearchParams | Record<string, string | string[] | undefined>,
): {
  outSum: number;
  invId: number;
  signatureValue: string;
  culture?: string;
} {
  // Поддержка как URLSearchParams, так и обычного объекта
  const getParam = (key: string): string => {
    if (params instanceof URLSearchParams) {
      return params.get(key) || '';
    }
    const value = params[key];
    if (Array.isArray(value)) {
      return value[0] || '';
    }
    return value || '';
  };

  const outSumStr = getParam('OutSum');
  const invIdStr = getParam('InvId');
  const signatureValue = getParam('SignatureValue');
  const culture = getParam('Culture');

  if (!outSumStr || !invIdStr || !signatureValue) {
    throw new Error('Missing required parameters in Robokassa notification');
  }

  const outSum = parseFloat(outSumStr);
  const invId = parseInt(invIdStr, 10);

  if (isNaN(outSum) || isNaN(invId)) {
    throw new Error('Invalid OutSum or InvId in Robokassa notification');
  }

  return {
    outSum,
    invId,
    signatureValue,
    culture: culture || undefined,
  };
}

