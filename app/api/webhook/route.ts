import { NextRequest, NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegram';

/**
 * Telegram Bot Webhook Handler
 * 
 * Handles incoming updates from Telegram Bot API.
 * 
 * To test in a group chat, send: /ping
 */
export async function POST(request: NextRequest) {
  try {
    const botToken = process.env.TG_BOT_TOKEN;
    if (!botToken) {
      console.error('TG_BOT_TOKEN is not set');
      return NextResponse.json({ error: 'Bot token not configured' }, { status: 500 });
    }

    const update = await request.json();

    // Log update for debugging
    console.log('Telegram webhook update received:', JSON.stringify(update, null, 2));

    // Handle message updates
    if (update.message) {
      const message = update.message;
      const chat = message.chat;
      const from = message.from;
      const text = message.text;

      // Log message details
      console.log('Message received:', {
        chatId: chat.id,
        chatType: chat.type,
        fromId: from?.id,
        fromUsername: from?.username,
        text: text,
      });

      // Handle /ping command
      if (text === '/ping' || text?.startsWith('/ping ')) {
        // Only respond in groups or supergroups
        if (chat.type === 'group' || chat.type === 'supergroup') {
          const fromDisplay = from?.username 
            ? `@${from.username}` 
            : `id${from?.id || 'unknown'}`;
          
          const responseText = `pong ✅ chatId=${chat.id} from=${fromDisplay}`;

          try {
            await sendTelegramMessage(botToken, chat.id, responseText);
            console.log('Ping response sent successfully');
          } catch (error) {
            console.error('Error sending ping response:', error);
            return NextResponse.json(
              { error: 'Failed to send message' },
              { status: 500 }
            );
          }
        } else {
          console.log('Ping command ignored: not a group chat (type:', chat.type, ')');
        }
      }
    }

    // Always return 200 OK to acknowledge receipt
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Allow GET for webhook verification (optional)
export async function GET() {
  return NextResponse.json({ 
    message: 'Telegram webhook endpoint',
    status: 'ready',
    note: 'Send /ping in a group chat to test'
  });
}

