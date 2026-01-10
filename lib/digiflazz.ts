import { ProxyAgent, request } from 'undici';
import crypto from 'crypto';

const DIGIFLAZZ_BASE_URL = 'https://api.digiflazz.com/v1';
const DIGIFLAZZ_USERNAME = process.env.DIGIFLAZZ_USERNAME;
const DIGIFLAZZ_API_KEY = process.env.DIGIFLAZZ_API_KEY;
const FIXIE_URL = process.env.FIXIE_URL;

// Create proxy agent for Digiflazz requests
const getProxyAgent = () => {
  if (!FIXIE_URL) {
    console.warn('[digiflazz] FIXIE_URL not set, requests will not use proxy');
    return undefined;
  }
  return new ProxyAgent(FIXIE_URL);
};

/**
 * Generate Digiflazz signature
 * Format: md5(username + apiKey + refId)
 */
function generateSignature(refId: string): string {
  if (!DIGIFLAZZ_USERNAME || !DIGIFLAZZ_API_KEY) {
    throw new Error('DIGIFLAZZ_USERNAME and DIGIFLAZZ_API_KEY must be set');
  }
  const data = `${DIGIFLAZZ_USERNAME}${DIGIFLAZZ_API_KEY}${refId}`;
  return crypto.createHash('md5').update(data).digest('hex');
}

interface DigiflazzResponse {
  rc?: string | number;
  data?: unknown;
  [key: string]: unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Make a request to Digiflazz API through Fixie proxy
 */
async function digiflazzRequest(path: string, body: Record<string, unknown>): Promise<DigiflazzResponse> {
  if (!DIGIFLAZZ_USERNAME || !DIGIFLAZZ_API_KEY) {
    throw new Error('DIGIFLAZZ_USERNAME and DIGIFLAZZ_API_KEY must be set');
  }

  const url = `${DIGIFLAZZ_BASE_URL}${path}`;
  const proxyAgent = getProxyAgent();

  try {
    const response = await request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      dispatcher: proxyAgent,
    });

    const data = await response.body.json() as unknown;
    if (!isRecord(data)) {
      throw new Error('Invalid response format');
    }
    const responseData = data as DigiflazzResponse;

    // Check for IP whitelist error (rc: 45)
    if (responseData.rc === '45' || (typeof responseData.data === 'string' && responseData.data.toLowerCase().includes('ip'))) {
      console.warn('[digiflazz] rc45 ip not whitelisted');
    }

    return responseData;
  } catch (error) {
    console.error('[digiflazz] request failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      path,
    });
    throw error;
  }
}

/**
 * Get Digiflazz price list
 * Signature for /v1/daftar-harga: md5(username + apiKey + "pricelist")
 */
export async function digiflazzPriceList(): Promise<DigiflazzResponse> {
  if (!DIGIFLAZZ_USERNAME || !DIGIFLAZZ_API_KEY) {
    throw new Error('DIGIFLAZZ_USERNAME and DIGIFLAZZ_API_KEY must be set');
  }
  
  // For daftar-harga, signature is md5(username + apiKey + "pricelist")
  const signatureData = `${DIGIFLAZZ_USERNAME}${DIGIFLAZZ_API_KEY}pricelist`;
  const signature = crypto.createHash('md5').update(signatureData).digest('hex');

  return digiflazzRequest('/price-list', {
    cmd: 'prepaid',
    username: DIGIFLAZZ_USERNAME,
    sign: signature,
  });
}

/**
 * Get Digiflazz price list for pasca (postpaid)
 * Signature for /v1/daftar-harga: md5(username + apiKey + "pricelist")
 */
export async function digiflazzPriceListPasca(): Promise<DigiflazzResponse> {
  if (!DIGIFLAZZ_USERNAME || !DIGIFLAZZ_API_KEY) {
    throw new Error('DIGIFLAZZ_USERNAME and DIGIFLAZZ_API_KEY must be set');
  }
  
  // For daftar-harga, signature is md5(username + apiKey + "pricelist")
  const signatureData = `${DIGIFLAZZ_USERNAME}${DIGIFLAZZ_API_KEY}pricelist`;
  const signature = crypto.createHash('md5').update(signatureData).digest('hex');

  return digiflazzRequest('/price-list', {
    cmd: 'pasca',
    username: DIGIFLAZZ_USERNAME,
    sign: signature,
  });
}

/**
 * Get Digiflazz balance
 * Signature for /v1/cek-saldo: md5(username + apiKey + "depo")
 */
export async function digiflazzBalance(): Promise<DigiflazzResponse> {
  if (!DIGIFLAZZ_USERNAME || !DIGIFLAZZ_API_KEY) {
    throw new Error('DIGIFLAZZ_USERNAME and DIGIFLAZZ_API_KEY must be set');
  }
  
  // For cek-saldo, signature is md5(username + apiKey + "depo")
  const signatureData = `${DIGIFLAZZ_USERNAME}${DIGIFLAZZ_API_KEY}depo`;
  const signature = crypto.createHash('md5').update(signatureData).digest('hex');

  return digiflazzRequest('/cek-saldo', {
    cmd: 'deposit',
    username: DIGIFLAZZ_USERNAME,
    sign: signature,
  });
}

/**
 * Create Digiflazz topup transaction
 * Signature: md5(username + apiKey + refId)
 * Endpoint: POST /v1/transaction
 */
export async function digiflazzTopup(params: {
  refId: string;
  buyerSkuCode: string;
  customerNo: string;
}): Promise<DigiflazzResponse> {
  if (!DIGIFLAZZ_USERNAME || !DIGIFLAZZ_API_KEY) {
    throw new Error('DIGIFLAZZ_USERNAME and DIGIFLAZZ_API_KEY must be set');
  }
  
  // Signature: md5(username + apiKey + refId)
  const signature = generateSignature(params.refId);

  return digiflazzRequest('/transaction', {
    username: DIGIFLAZZ_USERNAME,
    buyer_sku_code: params.buyerSkuCode,
    customer_no: params.customerNo,
    ref_id: params.refId,
    sign: signature,
  });
}

/**
 * Create Digiflazz transaction (legacy alias)
 * @deprecated Use digiflazzTopup() instead
 */
export async function digiflazzTransaction(payload: {
  sku_code: string;
  customer_no: string;
  ref_id: string;
  [key: string]: unknown;
}): Promise<DigiflazzResponse> {
  return digiflazzTopup({
    refId: payload.ref_id,
    buyerSkuCode: payload.sku_code,
    customerNo: payload.customer_no,
  });
}

/**
 * Get Digiflazz transaction status
 * Signature: md5(username + apiKey + refId)
 * Endpoint: POST /v1/transaction with cmd: "status"
 */
export async function digiflazzStatus(refId: string): Promise<DigiflazzResponse> {
  if (!DIGIFLAZZ_USERNAME || !DIGIFLAZZ_API_KEY) {
    throw new Error('DIGIFLAZZ_USERNAME and DIGIFLAZZ_API_KEY must be set');
  }
  
  // Signature: md5(username + apiKey + refId)
  const signature = generateSignature(refId);

  return digiflazzRequest('/transaction', {
    cmd: 'status',
    username: DIGIFLAZZ_USERNAME,
    ref_id: refId,
    sign: signature,
  });
}

/**
 * Get Digiflazz transaction status (legacy alias)
 * @deprecated Use digiflazzStatus() instead
 */
export async function digiflazzTransactionStatus(refId: string): Promise<DigiflazzResponse> {
  return digiflazzStatus(refId);
}

