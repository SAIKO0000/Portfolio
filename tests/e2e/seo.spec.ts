import { expect, test } from '@playwright/test';

const canonicalOrigin = 'https://markiguban.dev';

test('homepage presents a consistent, crawlable professional identity', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Mark Daniel Iguban — Software Engineer | Workflow Automation');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Mark Daniel Iguban.*workflow automation/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonicalOrigin);
  await expect(page.locator('.hero__introduction')).toContainText('computer science graduate in the Philippines');
  await expect(page.locator('.hero__introduction')).toContainText('rule-based n8n and Python automations');
  await expect(page.locator('#about-me')).toHaveCount(0);
  await expect(page.locator('#about')).toHaveClass(/legacy-anchor/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width);

  const structuredData = await page.locator('script[type="application/ld+json"]').allTextContents();
  const records = structuredData.map((value) => JSON.parse(value) as Record<string, unknown>);
  const website = records.find((value) => value['@type'] === 'WebSite');
  const person = records.find((value) => value['@type'] === 'Person');

  expect(website).toMatchObject({
    '@id': `${canonicalOrigin}/#website`,
    name: 'Mark Daniel Iguban',
    url: `${canonicalOrigin}/`,
  });
  expect(person).toMatchObject({
    '@id': `${canonicalOrigin}/#person`,
    name: 'Mark Daniel Iguban',
    jobTitle: 'Software Engineer',
  });
  expect(person?.sameAs).toContain('https://github.com/SAIKO0000');
  expect(person?.sameAs).toContain('https://www.linkedin.com/in/mark-daniel-iguban-aa07751b6/');
});

for (const [slug, contribution, limit] of [
  ['autodev', 'shared n8n intake', 'app-role account'],
  ['job-hunt-automation', 'Windows-scheduled Python collector', 'applications and outreach stay manual'],
  ['relay', 'one of two full-stack developers', 'synthetic records'],
  ['frozen-shoulder-dss', 'CPU-only pose processing', 'not been clinically validated'],
]) {
  test(`${slug} opens with contribution, evidence, and an honest limit`, async ({ page }) => {
    await page.goto(`/work/${slug}`);
    const opening = page.locator('.case-hero__opening');
    await expect(opening).toBeVisible();
    await expect(opening).toContainText(contribution);
    await expect(opening).toContainText(limit);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width);
  });
}

test('case-study facts keep the same top position across different introduction lengths', async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) < 1024, 'Desktop case-study layout only');

  for (const slug of ['autodev', 'job-hunt-automation', 'relay', 'frozen-shoulder-dss']) {
    await page.goto(`/work/${slug}`);
    const alignment = await page.locator('.case-hero__grid').evaluate((grid) => {
      const facts = grid.querySelector('.case-meta');
      if (!facts) throw new Error('Case-study facts are missing');
      return facts.getBoundingClientRect().top - grid.getBoundingClientRect().top;
    });
    expect(alignment).toBeGreaterThanOrEqual(31);
    expect(alignment).toBeLessThanOrEqual(33);
  }
});

test('case study points back to the same person and canonical domain', async ({ page }) => {
  await page.goto('/work/autodev');

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${canonicalOrigin}/work/autodev`);
  const structuredData = await page.locator('script[type="application/ld+json"]').allTextContents();
  const work = structuredData.map((value) => JSON.parse(value) as Record<string, unknown>)
    .find((value) => value['@type'] === 'CreativeWork');

  expect(work).toMatchObject({
    name: 'AutoDev Lead Intake',
    creator: { '@id': `${canonicalOrigin}/#person` },
    isPartOf: { '@id': `${canonicalOrigin}/#website` },
  });
});

test('sitemap contains current case studies without misleading modification dates', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBe(true);

  const sitemap = await response.text();
  for (const path of ['', '/work/autodev', '/work/job-hunt-automation', '/work/relay', '/work/frozen-shoulder-dss']) {
    expect(sitemap).toContain(`${canonicalOrigin}${path}`);
  }
  expect(sitemap).not.toContain('<lastmod>');
});

test('robots file advertises the canonical sitemap', async ({ request }) => {
  const response = await request.get('/robots.txt');
  expect(response.ok()).toBe(true);
  expect(await response.text()).toContain(`Sitemap: ${canonicalOrigin}/sitemap.xml`);
});
