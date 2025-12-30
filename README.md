# GameHubb Store

Telegram Mini App "GameHubb Store" - M0.1 Clean Foundation

## Getting Started

Install dependencies:

```bash
pnpm i
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## URLs for Testing

- `/api/build-info` - API endpoint returning build information
- `/debug` - Debug page with build info, user agent, and Telegram initData status
- `/catalog` - Catalog page with ErrorPanel (M0 stub)
- `/api/webhook` - Telegram bot webhook endpoint

## Telegram Bot Commands

### Testing in Group Chat

To test that the bot can read and write in a group (e.g., "GameHubb Support"):

1. Add the bot to the group
2. Send the command: `/ping`
3. The bot should respond with: `pong ✅ chatId=<id> from=@<username or id>`

**Note:** The `/ping` command only works in group or supergroup chats, not in private messages.
