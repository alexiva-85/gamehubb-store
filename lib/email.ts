import { Resend } from 'resend';
import { getContactInfo } from './contacts';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Send email notification about new withdrawal request
 */
export async function sendWithdrawalRequestEmail(
  username: string | null,
  tgUserId: string,
  amountRub: number,
  asset: 'TON' | 'USDT_TON',
  tonAddress: string,
  adminUrl: string
): Promise<void> {
  if (!resend) {
    console.warn('RESEND_API_KEY not set, skipping email notification');
    return;
  }

  const contactInfo = getContactInfo();
  const toEmail = process.env.SUPPORT_EMAIL || contactInfo.email;

  const assetName = asset === 'TON' ? 'TON (legacy)' : 'USDT (TON)';
  const displayUsername = username ? `@${username.replace('@', '')}` : `ID: ${tgUserId}`;

  try {
    await resend.emails.send({
      from: 'GameHubb Store <noreply@gamehubb.store>',
      to: toEmail,
      subject: `Новая заявка на вывод: ${amountRub}₽ (${assetName})`,
      html: `
        <h2>Новая заявка на вывод средств</h2>
        <p><strong>Пользователь:</strong> ${displayUsername}</p>
        <p><strong>Telegram User ID:</strong> ${tgUserId}</p>
        <p><strong>Сумма:</strong> ${amountRub}₽</p>
        <p><strong>Актив:</strong> ${assetName}</p>
        <p><strong>TON адрес:</strong> <code>${tonAddress}</code></p>
        <p><a href="${adminUrl}">Открыть админ-панель</a></p>
      `,
    });
  } catch (error) {
    console.error('Error sending withdrawal request email:', error);
    // Don't throw - email failure shouldn't break the request
  }
}

