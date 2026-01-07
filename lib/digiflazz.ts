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

/**
 * Make a request to Digiflazz API through Fixie proxy
 */
async function digiflazzRequest(path: string, body: any): Promise<any> {
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

    const data = await response.body.json() as any;

    // Check for IP whitelist error (rc: 45)
    if (data.rc === '45' || (typeof data.data === 'string' && data.data.toLowerCase().includes('ip'))) {
      console.warn('[digiflazz] rc45 ip not whitelisted');
    }

    return data;
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
export async function digiflazzPriceList(): Promise<any> {
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
 * Get Digiflazz balance
 * Signature for /v1/cek-saldo: md5(username + apiKey + "depo")
 */
export async function digiflazzBalance(): Promise<any> {
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
 * Create Digiflazz transaction
 */
export async function digiflazzTransaction(payload: {
  sku_code: string;
  customer_no: string;
  ref_id: string;
  [key: string]: any;
}): Promise<any> {
  const signature = generateSignature(payload.ref_id);

  return digiflazzRequest('/transaction', {
    username: DIGIFLAZZ_USERNAME,
    sign: signature,
    ...payload,
  });
}

/**
 * Get Digiflazz transaction status
 */
export async function digiflazzTransactionStatus(refId: string): Promise<any> {
  const signature = generateSignature(refId);

  return digiflazzRequest('/transaction-status', {
    username: DIGIFLAZZ_USERNAME,
    sign: signature,
    ref_id: refId,
  });
}

