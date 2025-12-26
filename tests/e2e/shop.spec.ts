import { test, expect } from '@playwright/test';

test('E2E: catalog -> cart -> checkout -> order status, auth header & server-side pricing', async ({
  page,
}) => {
  const postOrderRequests: any[] = [];

  await page.route('**/api/orders', async (route, request) => {
    if (request.method() === 'POST') {
      postOrderRequests.push(request);
    }
    await route.continue();
  });

  await page.goto('/catalog');

  // Ждём, пока появится хотя бы один товар и добавляем его в корзину.
  const firstAddButton = page.getByRole('button', { name: 'Добавить' }).first();
  await firstAddButton.click();

  // Переходим в корзину и проверяем, что там есть позиция.
  await page.getByText('Корзина').click();
  await expect(page).toHaveURL(/\/cart/);
  const cartItem = page.getByRole('cell').first();
  await expect(cartItem).toBeVisible();

  // Переходим к оплате.
  await page.getByRole('button', { name: 'Перейти к оплате' }).click();
  await expect(page).toHaveURL(/\/checkout/);

  // Создаём заказ.
  const createButton = page.getByRole('button', { name: /Создать заказ/ });
  await createButton.click();

  // Ждём редиректа на страницу статуса.
  await page.waitForURL(/\/orders\/\d+/, { timeout: 15000 });

  // Проверяем, что POST /api/orders ушёл с заголовком x-telegram-init-data.
  expect(postOrderRequests.length).toBeGreaterThan(0);
  const headers = postOrderRequests[0].headers();
  expect(headers['x-telegram-init-data']).toBeDefined();

  // Server-side pricing: проверяем, что в теле запроса нет поля price.
  const postBody = postOrderRequests[0].postDataJSON();
  expect(postBody).not.toHaveProperty('price');
  expect(postBody).not.toHaveProperty('totalAmount');
  expect(postBody.items).toBeDefined();
  expect(Array.isArray(postBody.items)).toBe(true);
  // Каждый item должен иметь только productId и qty, без price.
  for (const item of postBody.items) {
    expect(item).toHaveProperty('productId');
    expect(item).toHaveProperty('qty');
    expect(item).not.toHaveProperty('price');
  }
});

test('E2E: double click create order results in single POST /api/orders', async ({ page }) => {
  const postRequests: any[] = [];

  await page.route('**/api/orders', async (route, request) => {
    if (request.method() === 'POST') {
      postRequests.push(request);
    }
    await route.continue();
  });

  await page.goto('/catalog');
  await page.getByRole('button', { name: 'Добавить' }).first().click();
  await page.getByText('Корзина').click();
  await page.getByRole('button', { name: 'Перейти к оплате' }).click();

  const createButton = page.getByRole('button', { name: /Создать заказ/ });

  await Promise.all([createButton.click(), createButton.click()]);

  await page.waitForURL(/\/orders\/\d+/, { timeout: 15000 });

  // Кнопка и client-side guard должны позволить максимум один POST.
  expect(postRequests.length).toBe(1);
});

test('E2E: cart persists after reload', async ({ page }) => {
  await page.goto('/catalog');
  await page.getByRole('button', { name: 'Добавить' }).first().click();
  await page.getByText('Корзина').click();
  await expect(page).toHaveURL(/\/cart/);

  const firstRowBefore = await page.getByRole('cell').first().innerText();

  // Эмулируем reload страницы корзины.
  await page.reload();
  await expect(page).toHaveURL(/\/cart/);

  const firstRowAfter = await page.getByRole('cell').first().innerText();
  expect(firstRowAfter).toContain(firstRowBefore.split('\n')[0]);
});

test('E2E: polling stops after terminal status', async ({ page }) => {
  let calls = 0;

  await page.route('**/api/orders/*', async (route, request) => {
    calls += 1;

    // Возвращаем терминальный статус PAID сразу.
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 1,
        status: 'PAID',
        totalAmountKopeks: 990,
        currency: 'RUB',
        items: [],
      }),
    });
  });

  await page.goto('/orders/1');

  // Даём времени на начальный запрос + возможные повторные.
  await page.waitForTimeout(4000);

  const callsAfterWait = calls;

  // Ещё немного ждём и убеждаемся, что количество запросов не растёт.
  await page.waitForTimeout(2000);
  expect(calls).toBe(callsAfterWait);
});

test('E2E: no initData shows error and does not send POST', async ({ page }) => {
  const postRequests: any[] = [];

  await page.route('**/api/orders', async (route, request) => {
    if (request.method() === 'POST') {
      postRequests.push(request);
    }
    await route.continue();
  });

  // Эмулируем отсутствие initData на клиенте.
  await page.addInitScript(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).Telegram = { WebApp: { initData: '' } };
  });

  await page.goto('/catalog');
  await page.getByRole('button', { name: 'Добавить' }).first().click();
  await page.getByText('Корзина').click();
  await page.getByRole('button', { name: 'Перейти к оплате' }).click();

  const createButton = page.getByRole('button', { name: /Создать заказ/ });
  await createButton.click();

  // Ожидаем, что появится сообщение об ошибке и POST не отправится.
  await expect(
    page.getByText(/Не удалось подтвердить авторизацию в Telegram/i),
  ).toBeVisible();
  expect(postRequests.length).toBe(0);
});


