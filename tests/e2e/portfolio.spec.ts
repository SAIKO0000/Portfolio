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
  test('loads illustrative video only after an explicit play action', async ({ page }) => {
    const videoRequests: string[] = [];
    page.on('request', (request) => {
      if (request.url().endsWith('/illustrative-film.mp4')) videoRequests.push(request.url());
    });
    await page.goto('/');
    await expect(page.locator('video')).toHaveCount(0);
    await expect(page.locator('.project-panel .project-preview__frame img')).toHaveCount(2);
    for (const poster of await page.locator('.project-panel .project-preview__frame img').all()) {
      await expect(poster).toHaveAttribute('loading', 'lazy');
    }
    expect(videoRequests).toHaveLength(0);
    const play = page.getByRole('button', { name: 'Watch AutoDev Lead Intake video' });
    await play.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('video[aria-label="AutoDev Lead Intake animated overview"]')).toBeVisible();
  });

  test('keeps the recruiter journey visible, ordered, and accessible', async ({ page }, testInfo) => {
    const runtimeErrors = watchRuntimeErrors(page);
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('reliable automations');
    await expect(page.getByRole('link', { name: /view projects/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /get in touch/i })).toHaveAttribute('href', '#contact');
    await expect(page.locator('.desktop-nav__utility')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Featured Projects', exact: true })).toBeVisible();
    await expect(page.locator('.project-group__heading h3')).toHaveText(['Automation', 'Development']);
    await expect(page.getByRole('navigation', { name: 'Project categories' }).getByRole('link')).toHaveCount(2);
    await expect(page.getByRole('heading', { name: 'AutoDev Lead Intake' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Job Hunt Automation' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Relay' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Frozen Shoulder DSS' })).toBeVisible();
    await expect(page.locator('.project-panel h3')).toHaveText(['AutoDev Lead Intake', 'Job Hunt Automation', 'Relay', 'Frozen Shoulder DSS']);
    await expect(page.getByRole('heading', { name: 'More engineering work' })).toHaveCount(0);
    await expect(page.locator('.project-panel[data-project="relay"] img')).toBeVisible();
    await expect(page.locator('.project-panel[data-project="frozen-shoulder-dss"] img')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Accounting Modernization' })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Resource Hive' })).toHaveCount(0);
    await expect(page.locator('.project-panel').first().getByRole('img', { name: /AutoDev animated overview poster/i })).toBeVisible();
    await expect(page.locator('.project-panel').nth(1).getByRole('img', { name: /Job Hunt animated overview poster/i })).toBeVisible();
    await expect(page.locator('.project-preview__label')).toHaveText([
      'Animated overview',
      'Animated overview',
    ]);
    await expect(page.locator('.project-panel .arrow-link')).toHaveCount(0);
    await expect(page.locator('.project-panel[data-project="relay"] .project-panel__body > p')).not.toContainText('I co-developed');
    for (const image of await page.locator('.project-preview__frame img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element) => element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0)).toBe(true);
    }
    await expect(page.locator('.project-panel .project-facts')).toHaveCount(0);
    await expect(page.locator('.project-preview__frame').first()).toHaveCSS('aspect-ratio', '16 / 9');

    await expect(page.getByRole('heading', { name: 'Core Skills', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Experience', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Education', exact: true })).toBeVisible();
    await expect(page.locator('#education')).toContainText('Senior High School');
    await expect(page.locator('#education')).toContainText('2020–2022');
    await expect(page.locator('#experience')).toContainText('60 scholars from 800+ applicants');
    await expect(page.locator('#experience')).toContainText('Current training · not employment');
    await expect(page.locator('#experience a').filter({ hasText: 'About AWS re/Start' })).toHaveAttribute('href', 'https://aws.amazon.com/training/restart/');
    await expect(page.getByRole('heading', { name: 'Personal interests' })).toHaveCount(0);
    await expect(page.locator('#contact .developer-credential')).toHaveCount(1);

    const contact = page.locator('#contact');
    await expect(contact.getByRole('button', { name: 'Copy email' })).toBeVisible();
    await expect(contact.getByText('igubanmark0@gmail.com', { exact: true })).not.toHaveAttribute('href');
    const gmailLink = contact.getByRole('link', { name: 'Open Gmail' });
    await expect(gmailLink).toHaveAttribute(
      'href',
      /^https:\/\/mail\.google\.com\/mail\/\?view=cm&fs=1&to=igubanmark0%40gmail\.com&su=Automation%20or%20engineering%20project/,
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

    const primaryAction = page.getByRole('link', { name: /view projects/i });
    const actionBox = await primaryAction.boundingBox();
    expect(actionBox).not.toBeNull();
    expect((actionBox?.y ?? Infinity) + (actionBox?.height ?? 0)).toBeLessThanOrEqual(testInfo.project.use.viewport?.height ?? Infinity);

    if (testInfo.project.name === 'desktop-1440') {
      const previewBox = await page.locator('.project-preview').first().boundingBox();
      expect(previewBox).not.toBeNull();
      expect(previewBox?.y ?? Infinity).toBeLessThan(1100);
      const widths = await page.locator('.project-panel').evaluateAll((cards) => cards.map((card) => card.getBoundingClientRect().width));
      expect(widths[0]).toBeGreaterThan(widths[1]);
      expect(widths[2]).toBeGreaterThan(widths[3]);
    }

    if (testInfo.project.name === 'mobile-390') {
      await page.getByRole('button', { name: /menu/i }).click();
      const mobileNavigation = page.getByRole('navigation', { name: 'Mobile navigation' });
      await expect(mobileNavigation).toBeVisible();
      const dialog = page.getByRole('dialog', { name: 'Site menu' });
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole('link', { name: 'Download résumé' })).toBeVisible();
      await expect(dialog.getByRole('link', { name: 'GitHub' })).toBeVisible();
      await expect(dialog.getByRole('link', { name: 'LinkedIn' })).toBeVisible();
      expect(await mobileNavigation.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe('rgb(245, 242, 234)');
      await page.keyboard.press('Escape');
      await expect(mobileNavigation).toBeHidden();
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
    await expect(page.getByRole('link', { name: /view projects/i })).toBeVisible();

    await page.evaluate(() => window.scrollTo({ top: 640, behavior: 'auto' }));
    await expect(page.locator('.site-header')).not.toHaveAttribute('data-mobile-hidden', 'true');
  });

  test('yields mobile space on downward scroll and returns on upward intent', async ({ page }, testInfo) => {
    await page.goto('/');

    const header = page.locator('.site-header');
    await page.evaluate(() => window.scrollTo({ top: 640, behavior: 'auto' }));

    if (testInfo.project.name !== 'mobile-390') {
      await expect(header).not.toHaveAttribute('data-mobile-hidden', 'true');
      return;
    }

    await expect(header).toHaveAttribute('data-mobile-hidden', 'true');

    await page.evaluate(() => window.scrollBy({ top: -48, behavior: 'auto' }));
    await expect(header).not.toHaveAttribute('data-mobile-hidden', 'true');

    await page.getByRole('button', { name: /menu/i }).click();
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
    await page.evaluate(() => window.scrollBy({ top: 160, behavior: 'auto' }));
    await expect(header).not.toHaveAttribute('data-mobile-hidden', 'true');
  });

  test('full-screen mobile menu locks background scroll and closes on navigation', async ({ page }, testInfo) => {
    test.skip(!['mobile-390', 'tablet-768'].includes(testInfo.project.name), 'Collapsible menu interaction only');
    await page.goto('/');
    await page.getByRole('button', { name: 'Menu' }).click();
    const dialog = page.getByRole('dialog', { name: 'Site menu' });
    await expect(dialog).toBeVisible();
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
    await expect(dialog.getByRole('link', { name: 'Home' })).toBeFocused();
    const bounds = await dialog.boundingBox();
    expect(bounds?.width).toBeCloseTo(testInfo.project.use.viewport?.width ?? 0, 2);
    expect(bounds?.height).toBeCloseTo(testInfo.project.use.viewport?.height ?? 0, 2);
    await dialog.getByRole('link', { name: 'Projects' }).click();
    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  });

  test('switches and persists the selected appearance', async ({ page }, testInfo) => {
    await page.goto('/');

    if (['mobile-390', 'tablet-768'].includes(testInfo.project.name)) {
      await page.getByRole('button', { name: /menu/i }).click();
    }

    const appearance = page.getByRole('group', { name: 'Appearance' });
    const system = appearance.getByRole('button', { name: 'Follow system appearance' });
    await expect(appearance).toBeVisible();
    await expect(system).toHaveAttribute('aria-pressed', 'true');
    await appearance.getByRole('button', { name: 'Switch to dark mode' }).click();

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#181815');
    await expect(system).toHaveAttribute('aria-pressed', 'false');
    expect(await page.evaluate(() => localStorage.getItem('portfolio-theme'))).toBe('dark');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    if (['mobile-390', 'tablet-768'].includes(testInfo.project.name)) {
      await page.getByRole('button', { name: /menu/i }).click();
    }
    await expect(appearance.getByRole('button', { name: 'Switch to light mode' })).toBeVisible();
    await system.focus();
    await page.keyboard.press('Enter');
    await expect(system).toHaveAttribute('aria-pressed', 'true');
    expect(await page.evaluate(() => localStorage.getItem('portfolio-theme'))).toBeNull();
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(appearance.getByRole('button', { name: 'Switch to light mode' })).toBeVisible();
    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(appearance.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible();
    await appearance.getByRole('button', { name: 'Switch to dark mode' }).click();
    await expect(system).toHaveAttribute('aria-pressed', 'false');
    expect(await page.evaluate(() => localStorage.getItem('portfolio-theme'))).toBe('dark');
  });

  test('follows system dark on first load but preserves a legacy Light choice', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.evaluate(() => localStorage.setItem('portfolio-theme', 'light'));
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('still follows system dark when theme storage is unavailable', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.addInitScript(() => {
      const getItem = Storage.prototype.getItem;
      Storage.prototype.getItem = function (key) {
        if (key === 'portfolio-theme') throw new DOMException('Storage blocked', 'SecurityError');
        return getItem.call(this, key);
      };
    });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('desktop section indicator follows the viewport after clicks and manual scroll', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440', 'Desktop navigation only');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/#contact');
    const navigation = page.getByRole('navigation', { name: 'Primary navigation' });
    const skillsLink = navigation.getByRole('link', { name: 'Skills' });
    const contactLink = navigation.getByRole('link', { name: 'Contact' });

    await expect(contactLink).toHaveAttribute('aria-current', 'location');
    await skillsLink.click();
    await expect(skillsLink).toHaveAttribute('aria-current', 'location');
    await expect(contactLink).not.toHaveAttribute('aria-current', 'location');
    await contactLink.click();
    await expect(contactLink).toHaveAttribute('aria-current', 'location');

    await page.locator('#skills').evaluate((element) => element.scrollIntoView({ behavior: 'instant' }));
    await expect(skillsLink).toHaveAttribute('aria-current', 'location');
    await page.locator('#projects').evaluate((element) => element.scrollIntoView({ behavior: 'instant' }));
    await expect(navigation.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'location');
    await page.goto('/#about');
    await expect(skillsLink).toHaveAttribute('aria-current', 'location');
  });

  test('category jumps keep all four projects visible', async ({ page }) => {
    await page.goto('/');
    const categories = page.getByRole('navigation', { name: 'Project categories' });
    await categories.getByRole('link', { name: /development/i }).click();
    await expect(page).toHaveURL(/#development-projects$/);
    await expect(page.locator('.project-panel')).toHaveCount(4);
    await expect(page.locator('#development-projects .project-panel h3')).toHaveText(['Relay', 'Frozen Shoulder DSS']);
    await categories.getByRole('link', { name: /automation/i }).click();
    await expect(page).toHaveURL(/#automation-projects$/);
    await expect(page.locator('#automation-projects .project-panel h3')).toHaveText(['AutoDev Lead Intake', 'Job Hunt Automation']);
  });

  test('project cards navigate from their surface without stealing video controls', async ({ page }) => {
    await page.goto('/');
    const autodev = page.locator('.project-panel[data-project="autodev"]');
    await expect(autodev.getByRole('link', { name: 'Read AutoDev Lead Intake case study' })).toHaveCount(1);
    await autodev.getByRole('button', { name: 'Watch AutoDev Lead Intake video' }).click();
    await expect(page).toHaveURL('/');
    await expect(autodev.locator('video')).toBeVisible();
    await autodev.getByRole('link', { name: 'Read AutoDev Lead Intake case study' }).focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/work\/autodev$/);
    await page.goto('/');
    await page.locator('.project-panel[data-project="relay"] .project-panel__hit-area').click({ position: { x: 20, y: 20 } });
    await expect(page).toHaveURL(/\/work\/relay$/);
  });

  test('expanded skills tabs expose all three groups by mouse and keyboard', async ({ page }) => {
    await page.goto('/#skills');
    const skills = page.locator('#skills');
    const ai = skills.getByRole('tab', { name: 'AI & Data' });
    const development = skills.getByRole('tab', { name: 'Development' });
    const delivery = skills.getByRole('tab', { name: 'Delivery' });
    await expect(ai).toHaveAttribute('aria-selected', 'true');
    await expect(skills.getByRole('tabpanel', { name: 'AI & Data' }).locator('li')).toHaveCount(23);
    await ai.focus();
    await page.keyboard.press('ArrowRight');
    await expect(development).toBeFocused();
    await expect(skills.getByRole('tabpanel', { name: 'Development' }).locator('li')).toHaveCount(21);
    await delivery.click();
    await expect(skills.getByRole('tabpanel', { name: 'Delivery' }).locator('li')).toHaveCount(19);
    await expect(skills).toContainText('Learning now · AWS re/Start');
    await expect(skills).not.toContainText('Coursework in progress');
    await expect(skills.getByRole('link')).toHaveCount(0);
  });

  test('desktop projects rail sits right of the cards and video fills its frame', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440', 'Desktop rail layout only');
    await page.goto('/#projects');
    const layout = await page.locator('.projects-layout').evaluate((element) => {
      const rail = element.querySelector('.project-category-nav')!.getBoundingClientRect();
      const groups = element.querySelector('.project-groups')!.getBoundingClientRect();
      return { railLeft: rail.left, groupsRight: groups.right };
    });
    expect(layout.railLeft).toBeGreaterThan(layout.groupsRight);
    for (const slug of ['autodev', 'job-hunt-automation']) {
      const card = page.locator(`.project-panel[data-project="${slug}"]`);
      await card.scrollIntoViewIfNeeded();
      const poster = await card.locator('.project-preview__frame').boundingBox();
      expect(poster).not.toBeNull();
      await page.mouse.move((poster?.x ?? 0) + (poster?.width ?? 0) / 2, (poster?.y ?? 0) + (poster?.height ?? 0) / 2);
      await expect(card.locator('h3')).toHaveCSS('color', 'rgb(36, 87, 230)');
      await expect(card.locator('.project-preview__label')).toHaveCSS('color', 'rgb(36, 87, 230)');
    }
    await page.getByRole('button', { name: 'Watch AutoDev Lead Intake video' }).click();
    const frame = page.locator('.project-panel[data-project="autodev"] .project-preview__frame');
    await expect(frame.locator('video')).toHaveCSS('object-fit', 'cover');
    const dimensions = await frame.evaluate((element) => {
      const frameBox = element.getBoundingClientRect();
      const videoBox = element.querySelector('video')!.getBoundingClientRect();
      return { widthDelta: Math.abs(frameBox.width - videoBox.width), heightDelta: Math.abs(frameBox.height - videoBox.height) };
    });
    expect(dimensions.widthDelta).toBeLessThan(1);
    expect(dimensions.heightDelta).toBeLessThan(1);
  });

  test('six-link header tracks each section in both directions', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1440', 'Centered desktop header only');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Primary navigation' });
    const labels = ['Home', 'Projects', 'Skills', 'Experience', 'Education', 'Contact'];
    await expect(nav.getByRole('link')).toHaveText(labels);
    for (const label of [...labels, ...[...labels].reverse()]) {
      const link = nav.getByRole('link', { name: label, exact: true });
      await link.click();
      await expect(link).toHaveAttribute('aria-current', 'location');
      await expect.poll(() => page.evaluate((name) => {
        const anchor = document.querySelector<HTMLAnchorElement>(`.desktop-nav a[data-section="${name.toLowerCase()}"]`);
        const underline = document.querySelector<HTMLElement>('.desktop-nav__underline');
        return anchor && underline ? Math.abs(anchor.getBoundingClientRect().left - underline.getBoundingClientRect().left) : Infinity;
      }, label)).toBeLessThan(2);
    }
    await page.goto('/#work');
    await expect(nav.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'location');
  });

  test('copies the email address with useful feedback', async ({ page }) => {
    await page.goto('/#contact');
    await page.getByRole('button', { name: 'Copy email' }).click();
    await expect(page.getByRole('button', { name: 'Copied' })).toBeVisible();
  });

  test('serves the reviewed résumé from every résumé link', async ({ page, request }) => {
    await page.goto('/');

    const resumeLinks = page.locator('a[href="/Mark-Daniel-Iguban-Resume.pdf"]');
    expect(await resumeLinks.count()).toBeGreaterThan(0);

    const response = await request.get('/Mark-Daniel-Iguban-Resume.pdf');
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toContain('application/pdf');

    const pdf = (await response.body()).toString('latin1');
    expect(pdf).toContain('https://markiguban.dev/');
    expect(pdf).toContain('https://www.linkedin.com/in/mark-daniel-iguban-aa07751b6/');
    expect(pdf).toContain('https://github.com/SAIKO0000');
  });

  test('brand home control resets the homepage and cross-route scroll position', async ({ page }) => {
    await page.goto('/#contact');
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);

    await page.locator('.site-wordmark').click();

    await expect(page).toHaveURL('/');
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2);

    await page.goto('/work/relay');
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'auto' }));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);

    await page.locator('.site-wordmark').click();

    await expect(page).toHaveURL('/');
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'auto' }));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);

    await page.locator('.site-wordmark').focus();
    await page.keyboard.press('Enter');

    expect(await page.evaluate(() => window.scrollY)).toBeLessThan(2);
  });
});

for (const path of ['/work/autodev', '/work/job-hunt-automation', '/work/relay', '/work/frozen-shoulder-dss']) {
  test(`${path} renders its case study without runtime failures`, async ({ page }, testInfo) => {
    const runtimeErrors = watchRuntimeErrors(page);
    const response = await page.goto(path);
    const expectedTitle = ({ '/work/autodev': 'AutoDev Lead Intake', '/work/job-hunt-automation': 'Job Hunt Automation', '/work/relay': 'Relay', '/work/frozen-shoulder-dss': 'Frozen Shoulder DSS' } as Record<string, string>)[path];

    expect(response?.ok()).toBe(true);
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Start a conversation' })).toHaveAttribute('href', '/#contact');
    await expect(page.getByRole('link', { name: /Back to top/i })).toHaveAttribute('href', '#case-page-top');
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', `${expectedTitle} — Mark Daniel Iguban`);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /opengraph-image/);
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', `${expectedTitle} — Mark Daniel Iguban`);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', /opengraph-image/);

    const heroColumnCount = await page.locator('.case-hero__grid').evaluate(
      (element) => getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/).length,
    );
    if (testInfo.project.name === 'tablet-768') expect(heroColumnCount).toBe(1);
    if (testInfo.project.name === 'laptop-1280' || testInfo.project.name === 'desktop-1440') {
      expect(heroColumnCount).toBe(2);
    }

    if (path === '/work/relay') {
      await expect(page.getByRole('img', { name: /Relay demo dashboard/i })).toBeVisible();
      await expect(page.locator('.product-stage__caption').getByRole('heading', { name: 'Dashboard' })).toBeVisible();

      const showcaseBox = await page.locator('#showcase').boundingBox();
      const challengeBox = await page.locator('#challenge').boundingBox();
      expect(showcaseBox).not.toBeNull();
      expect(challengeBox).not.toBeNull();
      expect(showcaseBox?.y ?? Infinity).toBeLessThan(challengeBox?.y ?? 0);

      const gallery = page.getByLabel('Relay evidence gallery');
      await expect(gallery.getByRole('button', { name: 'Previous image' })).toBeVisible();
      await expect(gallery.getByRole('button', { name: 'Next image' })).toBeVisible();
      await expect(gallery.locator('.product-stage__caption h2')).toHaveText('Dashboard');
      for (let index = 0; index < 3; index += 1) await gallery.getByRole('button', { name: 'Next image' }).click();
      await expect(page.getByRole('img', { name: /Relay demo Gantt chart/i })).toBeVisible();
      await expect(gallery.locator('.product-stage__controls')).toContainText('04 / 06');
      const controlY = await gallery.locator('.product-stage__controls').evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
      await gallery.getByRole('button', { name: 'Next image' }).click();
      expect(await gallery.locator('.product-stage__controls').evaluate((element) => element.getBoundingClientRect().top + window.scrollY)).toBe(controlY);
      await gallery.getByRole('button', { name: /Enlarge/i }).click();
      const dialog = page.getByRole('dialog', { name: /enlarged view/i });
      await expect(dialog).toBeVisible();
      await dialog.getByRole('button', { name: 'Actual size' }).click();
      await expect(dialog.getByRole('button', { name: 'Actual size' })).toHaveAttribute('aria-pressed', 'true');
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
      await expect(gallery.getByRole('button', { name: /Enlarge/i })).toBeFocused();

      if (testInfo.project.name === 'mobile-390') {
        await expect(page.locator('.case-jump')).toBeVisible();
      } else if (testInfo.project.name === 'laptop-1280' || testInfo.project.name === 'desktop-1440') {
        const stageBox = await page.locator('.product-stage__canvas').boundingBox();
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
      await page.getByRole('button', { name: /Enlarge the sanitized Frozen Shoulder DSS interface/i }).click();
      await expect(page.getByRole('dialog', { name: /enlarged view/i })).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByText('Pending re-enacted evidence')).toHaveCount(0);
    }

    if (path === '/work/autodev' || path === '/work/job-hunt-automation') {
      await expect(page.getByLabel(`${expectedTitle} evidence gallery`)).toBeVisible();
      if (path === '/work/autodev') {
        await expect(page.locator('.product-stage__controls')).toContainText('01 / 11');
        await expect(page.locator('.product-stage__caption h2')).toHaveText('Lead Intake workflow');
        await expect(page.getByRole('button', { name: 'Watch Web intake run video' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Watch Messenger intake run video' })).toBeVisible();
        await expect(page.locator('.case-recordings video')).toHaveCount(0);
        await expect(page.locator('.case-film')).toHaveCount(0);
        await expect(page.getByRole('link', { name: /View source/i })).toHaveCount(0);
        await expect(page.getByRole('link', { name: /public demo/i })).toHaveCount(0);
      } else {
        await expect(page.getByRole('button', { name: new RegExp(`Watch ${expectedTitle} video`) })).toBeVisible();
        await expect(page.locator('.case-film video')).toHaveCount(0);
        await expect(page.getByRole('link', { name: /View source/i })).toHaveAttribute('href', 'https://github.com/SAIKO0000/jobhunt-automation');
      }
    }

    const expectedNext = ({ '/work/autodev': 'Job Hunt Automation', '/work/job-hunt-automation': 'Relay', '/work/relay': 'Frozen Shoulder DSS', '/work/frozen-shoulder-dss': 'AutoDev Lead Intake' } as Record<string, string>)[path];
    await expect(page.getByRole('link', { name: `Next: ${expectedNext}` })).toHaveAttribute('href', `/work/${({ 'Job Hunt Automation': 'job-hunt-automation', 'Relay': 'relay', 'Frozen Shoulder DSS': 'frozen-shoulder-dss', 'AutoDev Lead Intake': 'autodev' } as Record<string, string>)[expectedNext]}`);

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
    const accessibility = await new AxeBuilder({ page }).analyze();
    const seriousViolations = accessibility.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical');
    expect(seriousViolations).toEqual([]);
    expect(runtimeErrors).toEqual([]);
  });
}

test('AutoDev tells the engineering story before loading real recordings', async ({ page, request }) => {
  const videoRequests: string[] = [];
  page.on('request', (entry) => { if (entry.url().endsWith('-local-demo.mp4')) videoRequests.push(entry.url()); });
  await page.goto('/work/autodev');
  const gallery = page.getByLabel('AutoDev Lead Intake evidence gallery');
  const labels = ['Lead Intake workflow', 'System architecture', 'Lead Operations', 'Messenger Intake', 'Human-review queue', 'Private Sheet', 'Telegram alerts', 'Calendar reminder', 'Operations ledger', 'Retention workflow', 'Workflow inventory'];
  for (const [index, label] of labels.entries()) {
    await expect(gallery.locator('.product-stage__caption h2')).toHaveText(label);
    await expect(gallery.locator('.product-stage__controls')).toContainText(`${String(index + 1).padStart(2, '0')} / 11`);
    if (label === 'Lead Operations') {
      await expect(gallery.locator('.product-stage__canvas img')).toHaveAttribute('src', /lead-operations-workflow\.png/);
    }
    if (index < labels.length - 1) await gallery.getByRole('button', { name: 'Next image' }).click();
  }
  await gallery.getByRole('button', { name: 'Next image' }).click();
  await expect(gallery.locator('.product-stage__caption h2')).toHaveText(labels[0]);
  await gallery.getByRole('button', { name: 'Enlarge Lead Intake workflow' }).focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: /enlarged view/i });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Actual size' }).click();
  await expect(dialog.getByRole('button', { name: 'Actual size' })).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('Escape');
  await expect(gallery.getByRole('button', { name: 'Enlarge Lead Intake workflow' })).toBeFocused();
  await expect(gallery.getByText('View full size')).toHaveCount(0);
  await expect(page.getByText('Supporting engineering evidence')).toHaveCount(0);
  expect(videoRequests).toHaveLength(0);
  await page.getByRole('button', { name: 'Watch Web intake run video' }).click();
  const webRecording = page.locator('video[aria-label="Web intake run controlled local recording"]');
  await expect(webRecording).toBeVisible();
  await expect(webRecording).toHaveJSProperty('muted', false);
  await expect(webRecording).toHaveJSProperty('volume', 1);
  await expect.poll(() => webRecording.evaluate((video: HTMLVideoElement) => video.paused)).toBe(false);
  await expect.poll(() => webRecording.evaluate((video: HTMLVideoElement) => video.duration)).toBeGreaterThan(42);
  await webRecording.evaluate((video: HTMLVideoElement) => { video.currentTime = 20; });
  await expect.poll(() => webRecording.evaluate((video: HTMLVideoElement) => video.currentTime)).toBeGreaterThan(19);
  await expect.poll(() => videoRequests.length).toBeGreaterThan(0);
  await page.getByRole('button', { name: 'Watch Messenger intake run video' }).click();
  const messengerRecording = page.locator('video[aria-label="Messenger intake run controlled local recording"]');
  await expect(messengerRecording).toHaveJSProperty('muted', false);
  await expect(messengerRecording).toHaveJSProperty('volume', 1);
  await expect.poll(() => messengerRecording.evaluate((video: HTMLVideoElement) => video.paused)).toBe(false);
  await expect.poll(() => messengerRecording.evaluate((video: HTMLVideoElement) => video.duration)).toBeGreaterThan(60);
  expect((await request.get('/projects/autodev/backup/05-n8n-workflow-overview.png')).status()).toBe(404);
  expect((await request.get('/projects/autodev/web%20intake%20demo.mp4')).status()).toBe(404);
  expect((await request.get('/projects/autodev/messnger%20demo.mp4')).status()).toBe(404);
  expect((await request.get('/projects/autodev/telegram.png')).status()).toBe(404);
  expect((await request.get('/projects/autodev/lead-operations-detail.png')).status()).toBe(404);
});

test('case-study closing action returns to the top', async ({ page }) => {
  await page.goto('/work/relay');
  await page.locator('.case-next').scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);

  await page.getByRole('link', { name: /Back to top/i }).click();

  await expect(page).toHaveURL('/work/relay#case-page-top');
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2);
});

test('next-project navigation starts at the destination page top', async ({ page }) => {
  await page.goto('/work/relay');
  await page.locator('.case-next').scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

  await page.getByRole('link', { name: /Next: Frozen Shoulder DSS/i }).click();

  await expect(page).toHaveURL('/work/frozen-shoulder-dss');
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2);
});

test('/work/projtrack permanently redirects to the Relay case study', async ({ request }) => {
  const response = await request.get('/work/projtrack', { maxRedirects: 0 });

  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe('/work/relay');
});

test('unknown case-study slugs return 404', async ({ request }) => {
  const response = await request.get('/work/not-a-published-case-study');

  expect(response.status()).toBe(404);
});

test('unknown routes return the branded recovery page', async ({ page }, testInfo) => {
  const runtimeErrors = watchRuntimeErrors(page);
  const response = await page.goto('/missing-page-for-acceptance');

  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1, name: 'This page slipped out of frame.' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Return home/i })).toHaveAttribute('href', '/');
  await expect(page.getByRole('link', { name: /View projects/i })).toHaveAttribute('href', '/#projects');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.locator('.not-found-code')).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);

  const recoveryBox = await page.locator('.not-found-actions').boundingBox();
  expect(recoveryBox).not.toBeNull();
  expect((recoveryBox?.y ?? Infinity) + (recoveryBox?.height ?? 0)).toBeLessThanOrEqual(
    testInfo.project.use.viewport?.height ?? Infinity,
  );

  const accessibility = await new AxeBuilder({ page }).analyze();
  const seriousViolations = accessibility.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical');
  expect(seriousViolations).toEqual([]);
  const unexpectedRuntimeErrors = runtimeErrors.filter(
    (message) => !/^Failed to load resource: the server responded with a status of 404 \((?:Not Found)?\)$/.test(message),
  );
  expect(unexpectedRuntimeErrors).toEqual([]);
});

test.describe('Job Hunt Automation transparency pages', () => {
  test('application homepage explains the tool and its human-controlled boundary', async ({ page }) => {
    const runtimeErrors = watchRuntimeErrors(page);
    const response = await page.goto('/job-hunt-automation');

    expect(response?.ok()).toBe(true);
    await expect(page.getByRole('heading', { level: 1, name: 'Job Hunt Automation' })).toBeVisible();
    await expect(page.getByText(/private, human-in-the-loop opportunity-management tool/i)).toBeVisible();
    await expect(page.getByText(/never automatically applies for jobs/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Read the privacy policy/i })).toHaveAttribute(
      'href',
      '/job-hunt-automation/privacy',
    );
    await expect(page.getByRole('link', { name: /Contact through the portfolio/i })).toHaveAttribute(
      'href',
      '/#contact',
    );
    await expect(page.getByRole('link', { name: /View the project case study/i })).toHaveAttribute('href', '/work/job-hunt-automation');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      /\/job-hunt-automation$/,
    );
    await expect(page.locator('main form')).toHaveCount(0);

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);

    const accessibility = await new AxeBuilder({ page }).analyze();
    const seriousViolations = accessibility.violations.filter(
      ({ impact }) => impact === 'serious' || impact === 'critical',
    );
    expect(seriousViolations).toEqual([]);
    expect(runtimeErrors).toEqual([]);
  });

  test('privacy policy discloses Google data handling and recovery controls', async ({ page }) => {
    const runtimeErrors = watchRuntimeErrors(page);
    const response = await page.goto('/job-hunt-automation/privacy');

    expect(response?.ok()).toBe(true);
    await expect(page.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeVisible();
    await expect(page.getByText('https://www.googleapis.com/auth/spreadsheets')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Credential Storage' })).toBeVisible();
    await expect(page.getByText(/Windows Credential Manager/i)).toBeVisible();
    await expect(page.getByText(/AI-assisted analysis is optional and disabled by default/i)).toBeVisible();
    await expect(page.getByText(/not used to develop, improve, or train generalized/i)).toBeVisible();
    await expect(page.getByText(/Revoking Google authorization and deleting local credentials are separate/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /contact section/i })).toHaveAttribute('href', '/#contact');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      /\/job-hunt-automation\/privacy$/,
    );

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);

    const accessibility = await new AxeBuilder({ page }).analyze();
    const seriousViolations = accessibility.violations.filter(
      ({ impact }) => impact === 'serious' || impact === 'critical',
    );
    expect(seriousViolations).toEqual([]);
    expect(runtimeErrors).toEqual([]);
  });
});
