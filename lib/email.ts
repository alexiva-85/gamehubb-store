import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Send email notification to admin about new withdrawal request
 */
export async function sendWithdrawalRequestEmail(
  requestId: string,
  username: string | null,
  tgUserId: string,
  amountRub: number,
  asset: 'TON' | 'USDT_TON',
  tonAddress: string,
  adminUrl: string
): Promise<void> {
  if (!resend) {
    console.warn('[withdrawals/request] RESEND_API_KEY not set, skipping admin email notification');
    return;
  }

  // Hardcoded admin email as per requirements
  const adminEmail = 'gamehubb.store@gmail.com';
  const fromEmail = process.env.EMAIL_FROM || 'GameHubb Store <noreply@gamehubb.store>';

  const assetName = asset === 'TON' ? 'TON (legacy)' : 'USDT (TON)';
  const displayUsername = username ? `@${username.replace('@', '')}` : `ID: ${tgUserId}`;

  try {
    await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `Новая заявка на вывод: ${amountRub}₽ (${assetName})`,
      html: `
        <h2>Новая заявка на вывод средств</h2>
        <p><strong>ID заявки:</strong> ${requestId}</p>
        <p><strong>Пользователь:</strong> ${displayUsername}</p>
        <p><strong>Telegram User ID:</strong> ${tgUserId}</p>
        <p><strong>Сумма:</strong> ${amountRub}₽</p>
        <p><strong>Актив:</strong> ${assetName}</p>
        <p><strong>TON адрес:</strong> <code>${tonAddress}</code></p>
        <p><a href="${adminUrl}">Открыть админ-панель</a></p>
      `,
    });
    console.log('[withdrawals/request] admin email sent');
  } catch (error) {
    console.error('[withdrawals/request] admin email failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    });
    // Don't throw - email failure shouldn't break the request
  }
}

