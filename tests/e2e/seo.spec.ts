import { expect, test } from '@playwright/test';

const canonicalOrigin = 'https://markiguban.dev';

test('homepage presents a consistent, crawlable professional identity', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Mark Daniel Iguban — Software Engineer | Workflow Automation');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Mark Daniel Iguban.*workflow automation/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonicalOrigin);
  await expect(page.locator('.hero__introduction')).toContainText('rule-based n8n and Python automations');

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
