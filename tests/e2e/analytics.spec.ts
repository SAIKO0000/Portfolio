import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Exercise tag loading and consent state without sending test visits to the live GA4 property.
  await page.route('https://www.googletagmanager.com/gtag/js?**', (route) =>
    route.fulfill({ status: 200, contentType: 'text/javascript', body: '' }));
  await page.route('https://www.google-analytics.com/**', (route) => route.abort());
});

test('declining analytics makes no Google requests and remains reversible', async ({ page }) => {
  const googleRequests: string[] = [];
  page.on('request', (request) => {
    if (/googletagmanager\.com|google-analytics\.com/.test(request.url())) googleRequests.push(request.url());
  });

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Optional analytics' })).toBeVisible();
  expect(googleRequests).toHaveLength(0);

  await page.getByRole('button', { name: 'No thanks' }).click();
  await expect(page.getByRole('heading', { name: 'Optional analytics' })).toHaveCount(0);
  await page.goto('/work/autodev');
  expect(googleRequests).toHaveLength(0);
  await expect(page.locator('script[data-portfolio-ga4]')).toHaveCount(0);

  await page.getByRole('button', { name: 'Analytics settings' }).click();
  await expect(page.getByText('Current choice: not allowed.')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Optional analytics' })).toBeFocused();
  await page.getByRole('button', { name: 'Close settings' }).click();
  await expect(page.getByRole('button', { name: 'Analytics settings' })).toBeFocused();
});

test('accepting loads one tag, queues consent before GA4 config, and can be withdrawn', async ({ page }) => {
  const googleRequests: string[] = [];
  page.on('request', (request) => {
    if (/googletagmanager\.com|google-analytics\.com/.test(request.url())) googleRequests.push(request.url());
  });

  await page.goto('/');
  await page.getByRole('button', { name: 'Allow analytics' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('script[data-portfolio-ga4]')).toHaveCount(1);
  await expect.poll(() => googleRequests.length).toBe(1);

  const commands = await page.evaluate(() => window.dataLayer ?? []);
  expect(commands.map((command) => command[0])).toEqual(['consent', 'consent', 'js', 'config']);
  expect(commands[0][1]).toBe('default');
  expect(commands[1][1]).toBe('update');
  expect(commands[1][2]).toMatchObject({ analytics_storage: 'granted', ad_storage: 'denied' });
  expect(commands[3][1]).toBe('G-D8BD8TFGQY');
  expect(commands[3][2]).toMatchObject({
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  await page.locator('a[href="/work/autodev"]').first().click();
  await expect(page).toHaveURL(/\/work\/autodev$/);
  await expect(page.locator('script[data-portfolio-ga4]')).toHaveCount(1);
  expect((await page.evaluate(() => window.dataLayer ?? [])).filter((command) => command[0] === 'config')).toHaveLength(1);

  await page.getByRole('button', { name: 'Analytics settings' }).click();
  await page.getByRole('button', { name: 'No thanks' }).click();
  await expect(page.locator('script[data-portfolio-ga4]')).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem('portfolio-analytics-consent-v1'))).toBe('declined');
});

test('privacy disclosure is available and the consent panel stays within the viewport', async ({ page }) => {
  await page.goto('/privacy');
  await expect(page.getByRole('heading', { name: 'Privacy, clearly.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Privacy details', exact: true })).toHaveAttribute('href', '/privacy');
  await expect(page.getByRole('button', { name: 'Allow analytics' })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);

  const panel = await page.locator('.analytics-consent__inner').boundingBox();
  const viewport = page.viewportSize();
  expect(panel).not.toBeNull();
  expect(viewport).not.toBeNull();
  if (!panel || !viewport) return;
  expect(panel.x).toBeGreaterThanOrEqual(0);
  expect(panel.x + panel.width).toBeLessThanOrEqual(viewport.width);
  if (viewport.width >= 1280) {
    expect(panel.width).toBeGreaterThanOrEqual(1200);
    expect(panel.height).toBeLessThan(130);
  }
  if (viewport.width <= 390) expect(panel.height).toBeLessThan(230);

  await expect.poll(() => page.evaluate(() => parseFloat(getComputedStyle(document.body).paddingBottom)))
    .toBeGreaterThanOrEqual(panel.height);
  await page.getByRole('button', { name: 'No thanks' }).click();
  await expect.poll(() => page.evaluate(() => parseFloat(getComputedStyle(document.body).paddingBottom)))
    .toBe(0);
});

test('consent controls stay legible in dark mode', async ({ page }) => {
  await page.addInitScript(() => window.localStorage.setItem('portfolio-theme', 'dark'));
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('button', { name: 'No thanks' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Allow analytics' })).toBeVisible();
  const colors = await page.locator('.analytics-consent__inner').evaluate((element) => ({
    background: getComputedStyle(element).backgroundColor,
    text: getComputedStyle(element).color,
  }));
  expect(colors.background).not.toBe(colors.text);
});
