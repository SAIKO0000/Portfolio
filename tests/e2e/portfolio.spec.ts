import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

function watchRuntimeErrors(page: Page) {
  const errors: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  return errors;
}

test.describe('homepage', () => {
  test('keeps the recruiter journey visible, ordered, and accessible', async ({ page }, testInfo) => {
    const runtimeErrors = watchRuntimeErrors(page);
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('dependable software');
    await expect(page.getByRole('link', { name: /view selected work/i })).toBeVisible();
    await expect(page.locator('.desktop-nav a', { hasText: 'Résumé' })).not.toHaveAttribute('aria-current');
    await expect(page.getByRole('heading', { name: 'Selected work' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Relay' })).toBeVisible();
    await expect(page.getByRole('img', { name: /Relay project cover/i })).toBeVisible();

    await expect(page.locator('#about .developer-credential')).toHaveCount(0);
    await expect(page.locator('#contact .developer-credential')).toHaveCount(1);

    const contact = page.locator('#contact');
    await expect(contact.getByRole('button', { name: 'Copy email' })).toBeVisible();
    await expect(contact.getByText('igubanmark0@gmail.com', { exact: true })).not.toHaveAttribute('href');
    const gmailLink = contact.getByRole('link', { name: 'Open Gmail' });
    await expect(gmailLink).toHaveAttribute(
      'href',
      /^https:\/\/mail\.google\.com\/mail\/\?view=cm&fs=1&to=igubanmark0%40gmail\.com&su=Software%20engineering%20opportunity/,
    );
    await expect(gmailLink).toHaveAttribute('target', '_blank');
    await expect(gmailLink).toHaveAttribute('rel', 'noreferrer');

    const elsewhere = page.getByRole('navigation', { name: 'Elsewhere' });
    const profileLinks = elsewhere.getByRole('link');
    await expect(profileLinks).toHaveCount(4);
    await expect(profileLinks.filter({ hasText: 'LinkedIn' })).toHaveAttribute('href', /linkedin\.com/);
    await expect(profileLinks.filter({ hasText: 'GitHub' })).toHaveAttribute('href', /github\.com/);
    await expect(profileLinks.filter({ hasText: 'Instagram' })).toHaveAttribute('href', /instagram\.com/);
    await expect(profileLinks.filter({ hasText: 'Facebook' })).toHaveAttribute('href', /facebook\.com/);
    for (const profileLink of await profileLinks.all()) {
      await expect(profileLink).toHaveAttribute('target', '_blank');
      await expect(profileLink).toHaveAttribute('rel', /noopener/);
    }

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);

    const primaryAction = page.getByRole('link', { name: /view selected work/i });
    const actionBox = await primaryAction.boundingBox();
    expect(actionBox).not.toBeNull();
    expect((actionBox?.y ?? Infinity) + (actionBox?.height ?? 0)).toBeLessThanOrEqual(testInfo.project.use.viewport?.height ?? Infinity);

    if (testInfo.project.name === 'desktop-1440') {
      const previewBox = await page.locator('.project-panel__visual-link').first().boundingBox();
      expect(previewBox).not.toBeNull();
      expect(previewBox?.y ?? Infinity).toBeLessThan(900);
    }

    if (testInfo.project.name === 'mobile-390') {
      await page.getByRole('button', { name: /menu/i }).click();
      await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden();
      await expect(page.getByRole('button', { name: /menu/i })).toBeFocused();
    }

    const accessibility = await new AxeBuilder({ page }).analyze();
    const seriousViolations = accessibility.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical');
    expect(seriousViolations).toEqual([]);
    expect(runtimeErrors).toEqual([]);
  });

  test('preserves the reduced-motion path', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const animationDuration = await page.locator('.hero').evaluate((element) => getComputedStyle(element).animationDuration);
    expect(Number.parseFloat(animationDuration)).toBeLessThanOrEqual(0.01);
    await expect(page.getByRole('link', { name: /view selected work/i })).toBeVisible();
  });

  test('switches and persists the selected appearance', async ({ page }, testInfo) => {
    await page.goto('/');

    if (testInfo.project.name === 'mobile-390') {
      await page.getByRole('button', { name: /menu/i }).click();
    }

    const appearanceToggle = page.getByRole('button', { name: /switch to dark mode/i });
    await expect(appearanceToggle).toBeVisible();
    await appearanceToggle.click();

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#181815');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('copies the email address with useful feedback', async ({ page }) => {
    await page.goto('/#contact');
    await page.getByRole('button', { name: 'Copy email' }).click();
    await expect(page.getByRole('button', { name: 'Copied' })).toBeVisible();
  });
});

for (const path of ['/work/projtrack', '/work/frozen-shoulder-dss']) {
  test(`${path} renders its case study without runtime failures`, async ({ page }, testInfo) => {
    const runtimeErrors = watchRuntimeErrors(page);
    const response = await page.goto(path);

    expect(response?.ok()).toBe(true);
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Start a conversation' })).toHaveAttribute('href', '/#contact');

    if (path === '/work/projtrack') {
      await expect(page.getByRole('img', { name: /Relay demo dashboard/i })).toBeVisible();
      await expect(page.locator('.product-stage__active').getByRole('heading', { name: 'Dashboard' })).toBeVisible();

      const showcaseBox = await page.locator('#showcase').boundingBox();
      const challengeBox = await page.locator('#challenge').boundingBox();
      expect(showcaseBox).not.toBeNull();
      expect(challengeBox).not.toBeNull();
      expect(showcaseBox?.y ?? Infinity).toBeLessThan(challengeBox?.y ?? 0);

      const tablist = page.getByRole('tablist', { name: /Relay product features/i });
      const productTabs = tablist.getByRole('tab');
      await expect(productTabs).toHaveCount(6);
      await expect(productTabs.filter({ hasText: 'Dashboard' })).toHaveAttribute('aria-selected', 'true');
      await expect(productTabs.filter({ hasText: 'Calendar' })).toBeVisible();
      await productTabs.filter({ hasText: 'Timeline' }).click();
      await expect(productTabs.filter({ hasText: 'Timeline' })).toHaveAttribute('aria-selected', 'true');
      await expect(page.getByRole('img', { name: /Relay demo Gantt chart/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /open full image/i })).toHaveAttribute('href', /04-gantt-project-timeline\.png/);

      const tabOverflow = await tablist.evaluate((element) => ({
        horizontal: element.scrollWidth > element.clientWidth,
        vertical: element.scrollHeight > element.clientHeight,
      }));
      expect(tabOverflow.vertical).toBe(false);

      if (testInfo.project.name === 'mobile-390') {
        await expect(page.locator('.case-jump')).toBeVisible();
      } else if (testInfo.project.name === 'laptop-1280' || testInfo.project.name === 'desktop-1440') {
        expect(tabOverflow.horizontal).toBe(false);
        const stageBox = await page.locator('.product-stage__media').boundingBox();
        expect(stageBox?.width ?? 0).toBeGreaterThan(800);
        await page.locator('#challenge').scrollIntoViewIfNeeded();
        const navBox = await page.locator('.case-nav-shell').boundingBox();
        expect(navBox).not.toBeNull();
        expect(navBox?.y ?? 0).toBeGreaterThanOrEqual(72);
        expect((navBox?.y ?? 0) + (navBox?.height ?? Infinity)).toBeLessThanOrEqual(testInfo.project.use.viewport?.height ?? Infinity);
      }
    }

    if (path === '/work/frozen-shoulder-dss') {
      await expect(page.getByRole('heading', { name: /From movement capture to reviewable session evidence/i })).toBeVisible();
      await expect(page.getByRole('img', { name: /Sanitized Frozen Shoulder DSS interface/i })).toBeVisible();
      await expect(page.getByRole('img', { name: /Synthetic Frozen Shoulder DSS session report/i })).toBeVisible();
      await expect(page.getByRole('img', { name: /Privacy-edited photograph/i })).toBeVisible();
      await expect(page.getByRole('list', { name: 'Pose-processing pipeline' })).toBeVisible();
      await expect(page.getByText('Pending re-enacted evidence')).toHaveCount(0);
    }

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
    expect(runtimeErrors).toEqual([]);
  });
}
