# Telegram Mini Apps Next.js Template

This template demonstrates how developers can implement a web application on the
Telegram Mini Apps platform using the following technologies and libraries:

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TON Connect](https://docs.ton.org/develop/dapps/ton-connect/overview)
- [@telegram-apps SDK](https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/2-x)
- [Telegram UI](https://github.com/Telegram-Mini-Apps/TelegramUI)

> The template was created using [pnpm](https://pnpm.io/). Therefore, it is
> required to use it for this project as well. Using other package managers, you
> will receive a corresponding error.

## Install Dependencies

If you have just cloned this template, you should install the project
dependencies using the command:

```Bash
pnpm install
```

## Scripts

This project contains the following scripts:

- `dev`. Runs the application in development mode.
- `dev:https`. Runs the application in development mode using self-signed SSL
  certificate.
- `build`. Builds the application for production.
- `start`. Starts the Next.js server in production mode.
- `lint`. Runs [eslint](https://eslint.org/) to ensure the code quality meets
  the required
  standards.

To run a script, use the `pnpm run` command:

```Bash
pnpm run {script}
# Example: pnpm run build
```

## Create Bot and Mini App

Before you start, make sure you have already created a Telegram Bot. Here is
a [comprehensive guide](https://docs.telegram-mini-apps.com/platform/creating-new-app)
on how to do it.

## Run

Although Mini Apps are designed to be opened
within [Telegram applications](https://docs.telegram-mini-apps.com/platform/about#supported-applications),
you can still develop and test them outside of Telegram during the development
process.

To run the application in the development mode, use the `dev` script:

```bash
pnpm run dev
```

After this, you will see a similar message in your terminal:

```bash
▲ Next.js 14.2.3
- Local:        http://localhost:3000

✓ Starting...
✓ Ready in 2.9s
```

To view the application, you need to open the `Local`
link (`http://localhost:3000` in this example) in your browser.

It is important to note that some libraries in this template, such as
`@telegram-apps/sdk`, are not intended for use outside of Telegram.

Nevertheless, they appear to function properly. This is because the
`src/hooks/useTelegramMock.ts` file, which is imported in the application's
`Root` component, employs the `mockTelegramEnv` function to simulate the
Telegram environment. This trick convinces the application that it is
running in a Telegram-based environment. Therefore, be cautious not to use this
function in production mode unless you fully understand its implications.

### Run Inside Telegram

Although it is possible to run the application outside of Telegram, it is
recommended to develop it within Telegram for the most accurate representation
of its real-world functionality.

To run the application inside Telegram, [@BotFather](https://t.me/botfather)
requires an HTTPS link.

This template already provides a solution.

To retrieve a link with the HTTPS protocol, consider using the `dev:https`
script:

```bash
$ pnpm run dev:https

▲ Next.js 14.2.3
- Local:        https://localhost:3000

✓ Starting...
✓ Ready in 2.4s
```

Visiting the `Local` link (`https://localhost:3000` in this example) in your
browser, you will see the following warning:

![SSL Warning](assets/ssl-warning.png)

This browser warning is normal and can be safely ignored as long as the site is
secure. Click the `Proceed to localhost (unsafe)` button to continue and view
the application.

Once the application is displayed correctly, submit the
link `https://127.0.0.1:3000` (`https://localhost:3000` is considered as invalid
by BotFather) as the Mini App link to [@BotFather](https://t.me/botfather).
Then, navigate to [https://web.telegram.org/k/](https://web.telegram.org/k/),
find your bot, and launch the Telegram Mini App. This approach provides the full
development experience.

## Deploy

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out
the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for
more details.

## Payments (Robokassa) & Fulfillment

This template has been extended with a simple shop, Robokassa payments integration, and fulfillment system.

- **Backend**
  - **Prisma models**: `Product`, `Order`, `OrderItem`, `PaymentNotificationLog`.
  - **API routes**:
    - `GET /api/products` – returns active products.
    - `POST /api/orders` – creates an order for the current Telegram user and initializes a Robokassa payment.
    - `GET /api/orders/[id]` – returns order status, items, and fulfillment status (only for the owner).
    - `POST /api/admin/orders/[id]/retry-fulfillment` – admin endpoint to manually retry fulfillment (requires `x-admin-key` header).
    - `POST /api/payments/robokassa/notification` – webhook for Robokassa payment status notifications.
- **Telegram auth**
  - Server-side validation of `Telegram.WebApp.initData` is required for creating and reading orders.
  - Init data is expected in the `x-telegram-init-data` HTTP header and is validated with `@tma.js/init-data-node`.
- **Fulfillment system**
  - **Provider interface**: Extensible fulfillment provider system (`src/lib/fulfillment/types.ts`).
  - **Mock provider**: Development/testing provider that simulates order fulfillment (`src/lib/fulfillment/mock.ts`).
  - **Digiflazz provider**: Placeholder for Digiflazz API integration (`src/lib/fulfillment/digiflazz.ts`).
  - **Automatic fulfillment**: After payment confirmation, orders are automatically fulfilled using the configured provider.
  - **Idempotent fulfillment**: Uses `fulfillmentStatus` (NOT_STARTED/PENDING/SUCCESS/FAILED) to prevent duplicate processing.
  - **Retry mechanism**: Failed fulfillments can be retried via admin endpoint.
  - **Provider selection**: Controlled via `FULFILLMENT_PROVIDER` environment variable (`mock` or `digiflazz`).
  - See `src/lib/fulfillment/README.md` for detailed documentation.

### Health Check Endpoints

The application provides feature-specific health check endpoints to diagnose environment variable configuration:

- **`GET /api/health/payments`** - Checks Robokassa payment configuration
  ```bash
  curl https://your-domain.com/api/health/payments
  ```
  Returns: `{ status: "ok"|"warn", feature: "payments", env: {...}, missingRequired: [], timestamp: "..." }`

- **`GET /api/health/telegram`** - Checks Telegram bot configuration
  ```bash
  curl https://your-domain.com/api/health/telegram
  ```
  Returns: `{ status: "ok"|"warn", feature: "telegram", env: {...}, missingRequired: [], timestamp: "..." }`

All endpoints return only presence flags (`present: boolean`) for environment variables, never exposing actual values.

### Environment variables

Create a `.env` file (do not commit it to git) and configure:

- `TG_BOT_TOKEN` – token of your Telegram bot (used to validate initData).
- `ROBOKASSA_MERCHANT_LOGIN` – Robokassa merchant login (get from Robokassa dashboard).
- `ROBOKASSA_PASSWORD1` – Robokassa password #1 (used for signing payment requests).
- `ROBOKASSA_PASSWORD2` – Robokassa password #2 (used for verifying webhook notifications).
- `ROBOKASSA_API_BASE_URL` – optional, default is `https://auth.robokassa.ru/Merchant/Index.aspx`.
- `ROBOKASSA_TEST_MODE` – optional, set to `true` for test mode.
- `APP_BASE_URL` – base URL of this app, e.g. `https://example.com`, used to build Success/Fail/Notification URLs.
- `FULFILLMENT_PROVIDER` – fulfillment provider type: `mock` (default) or `digiflazz`.
- `DIGIFLAZZ_API_KEY` – Digiflazz API key (required if using `digiflazz` provider).
- `DIGIFLAZZ_USERNAME` – Digiflazz username (required if using `digiflazz` provider).
- `DIGIFLAZZ_BASE_URL` – optional, default is `https://api.digiflazz.com/v1`.
- `ADMIN_KEY` – secret key for admin endpoints (required for `/api/admin/*` routes).
- `NEXT_PUBLIC_SUPPORT_BOT_USERNAME` – optional, username of support bot (default: `support`), used for support button.

### Testing the webhook locally

- Run the app with `pnpm dev` or `pnpm dev:https` and expose it to the internet with a tunneling tool (e.g. `ngrok`).
- Configure Robokassa in your dashboard so that the Result URL points to:
  - `https://<your-tunnel-domain>/api/payments/robokassa/notification`
- Set `ROBOKASSA_TEST_MODE=true` for testing.
- Make a test payment; you should see order status transitions after Robokassa sends notifications.

## Client flow

- **Telegram initData**
  - On the client, `Telegram.WebApp.initData` (or `initData` from the URL query during local development) is read by `src/lib/tg.ts:getInitData`.
  - All requests which require authorization (orders) use the `x-telegram-init-data` header, added automatically by `src/lib/api.ts` when `auth: true` is passed.
- **Creating an order**
  - The catalog page (`/catalog`) loads products from `GET /api/products` and allows adding them to a local cart stored in `localStorage` (`src/lib/cart.ts`).
  - The cart page (`/cart`) shows current items and total, and navigates to `/checkout`.
  - The checkout page (`/checkout`) calls `POST /api/orders` with `{ items: [{ productId, qty }] }` and `auth: true`, then opens `paymentUrl` using `Telegram.WebApp.openLink` (or `window.open` as a fallback) and redirects to `/orders/[orderId]`.
- **Order status**
  - The order status page (`/orders/[id]`) polls `GET /api/orders/[id]` with `auth: true` every 1500 ms until the status becomes `PAID`, `FULFILLED`, or `CANCELED`, and then stops polling.
  - For `PAID`/`FULFILLED` it shows “Оплата получена” and a button to go back to the catalog; for `401`/`403` it shows a clear error about invalid or foreign `initData`.

> Cart persistence uses `localStorage` key `cart:v1`.

## Testing

### Unit Tests

Run unit tests with Vitest:

```bash
pnpm test:unit
```

Tests cover:
- Cart persistence in `localStorage` (key `cart:v1`)
- Cart qty rules (qty <= 0 removes items, no negative values)
- Corrupted JSON handling

### E2E Tests

E2E tests use Playwright and require a test database setup. The `global-setup.ts` script automatically:
1. Generates Prisma Client (`pnpm prisma:generate`)
2. Applies database schema (`pnpm prisma migrate deploy` or `db push`)
3. Seeds test data (`pnpm seed:test`)

Run E2E tests:

```bash
pnpm test:e2e
```

This will:
- Set `NODE_ENV=test` and `TG_INITDATA_BYPASS_FOR_E2E=true` for test environment
- Automatically set up the test database before running tests
- Run Playwright tests covering:
  - Catalog → cart → checkout → order status flow
  - Double-click protection on checkout
  - Cart persistence after page reload
  - Polling stops after terminal order status
  - Missing initData error handling
  - Server-side pricing validation

### Manual Test Database Setup

If you need to manually set up the test database:

```bash
# 1. Generate Prisma Client
pnpm prisma:generate

# 2. Apply schema (choose one):
pnpm prisma migrate deploy    # If using migrations
# OR
pnpm prisma db push          # If using db push

# 3. Seed test data
pnpm seed:test
```

### All Tests

Run both unit and E2E tests:

```bash
pnpm test:all
```


## Useful Links

- [Platform documentation](https://docs.telegram-mini-apps.com/)
- [@telegram-apps/sdk-react documentation](https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk-react)
- [Telegram developers community chat](https://t.me/devs)