import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import { siteConfig } from '@/data/portfolio';
import styles from './privacy.module.css';

export const metadata: Metadata = {
  title: 'Portfolio Privacy',
  description: 'How optional Google Analytics works on Mark Daniel Iguban’s portfolio and how visitors can change their choice.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <a className="skip-link" href="#privacy-content">Skip to privacy details</a>
      <SiteHeader />
      <main id="privacy-content" className={styles.page}>
        <div className={`site-container ${styles.shell}`}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>Portfolio / Privacy</p>
            <h1>Privacy, clearly.</h1>
            <p className={styles.lead}>
              This notice covers analytics on <strong>markiguban.dev</strong>. The separate{' '}
              <Link href="/job-hunt-automation/privacy">Job Hunt Automation privacy policy</Link> covers that
              application’s Google Sheets access.
            </p>
          </header>

          <div className={styles.sections}>
            <section aria-labelledby="analytics-title">
              <h2 id="analytics-title">Optional analytics</h2>
              <p>
                This portfolio uses Google Analytics 4 only after you choose <strong>Allow analytics</strong>. Before
                that choice, the Google Analytics tag is not loaded and no portfolio analytics data is sent to Google.
                Declining does not limit access to the website.
              </p>
              <p>
                After you opt in, Google Analytics can collect page views and enabled interactions such as external
                link clicks and file downloads. It can also receive page URLs, approximate location, browser and device
                information, and set first-party analytics cookies. I use these reports to understand which portfolio
                pages and resources visitors find useful. This site’s tag disables Google Signals and ad-personalization
                signals.
              </p>
              <p>
                Read more about{' '}
                <a href="https://support.google.com/analytics/answer/11593727?hl=en">Google Analytics data collection</a>{' '}
                and <a href="https://policies.google.com/technologies/partner-sites">how Google uses information from partner sites</a>.
              </p>
            </section>

            <section aria-labelledby="choice-title">
              <h2 id="choice-title">Your choice</h2>
              <p>
                Your choice is saved in this browser’s local storage so the site can remember it. Use{' '}
                <strong>Analytics settings</strong> in the footer to change it later. Withdrawing consent stops future
                tracking on this site and attempts to remove its Analytics cookies; it cannot erase information already
                collected. If you clear your browser storage, you will be asked again.
              </p>
            </section>

            <section aria-labelledby="contact-title">
              <h2 id="contact-title">Questions</h2>
              <p>
                For questions about this portfolio’s analytics, contact{' '}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
              </p>
            </section>
          </div>

          <div className={styles.bottom}>
            <p>Last updated <time dateTime="2026-10-13">13 October 2026</time></p>
            <Link href="/">Return to portfolio <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
