import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import styles from './compliance.module.css';
import { jobHuntAutomationContent as content } from './content';

const description =
  'Transparency information for Job Hunt Automation, a private, locally operated opportunity-management tool.';

export const metadata: Metadata = {
  title: content.name,
  description,
  alternates: { canonical: content.homepagePath },
};

export default function JobHuntAutomationPage() {
  return (
    <>
      <a className="skip-link" href="#job-hunt-content">Skip to application information</a>
      <SiteHeader />
      <main id="job-hunt-content" className={styles.page}>
        <div className={`site-container ${styles.shell}`}>
          <header>
            <p className={styles.breadcrumb}>
              <Link href="/">Portfolio</Link>
              <span aria-hidden="true">/</span>
              <span>Application information</span>
            </p>
            <div className={styles.hero}>
              <p className={styles.heroLabel}>Private local application</p>
              <div className={styles.heroCopy}>
                <h1>{content.name}</h1>
                <p className={styles.lead}>
                  A private, human-in-the-loop opportunity-management tool operated locally by the portfolio owner.
                </p>
              </div>
              <dl className={styles.facts} aria-label="Application summary">
                <div><dt>Environment</dt><dd>Local Windows computer</dd></div>
                <div><dt>Primary workspace</dt><dd>Owner-selected Google Sheet</dd></div>
                <div><dt>Decision model</dt><dd>Human review and approval</dd></div>
              </dl>
            </div>
          </header>

          <div className={styles.sections}>
            <section className={styles.section} aria-labelledby="purpose-title">
              <div className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>01</span>
                <h2 id="purpose-title">Purpose</h2>
              </div>
              <div className={styles.prose}>
                <p>
                  Job Hunt Automation helps its owner collect permitted public job opportunities, apply consistent
                  eligibility and fit rules, and organize the results for manual review. It is a personal workflow
                  tool rather than a public job board, recruiting service, or hosted application.
                </p>
              </div>
            </section>

            <section className={styles.section} aria-labelledby="sheets-access-title">
              <div className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>02</span>
                <h2 id="sheets-access-title">Why Google Sheets Access Is Requested</h2>
              </div>
              <div className={styles.prose}>
                <p>
                  Google Sheets provides the operational workbook used to review opportunities, preserve owner-entered
                  decisions, track runs, and recover from interrupted updates. The application reads and writes
                  spreadsheet data to create and maintain that workflow.
                </p>
                <p>
                  The application code is designed to operate on the spreadsheet ID explicitly supplied by its owner.
                  The Google Sheets OAuth permission itself grants spreadsheet access according to the authorization
                  screen; it is not technically restricted to a single spreadsheet.
                </p>
              </div>
            </section>

            <section className={styles.section} aria-labelledby="features-title">
              <div className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>03</span>
                <h2 id="features-title">What the Tool Does</h2>
              </div>
              <div className={styles.prose}>
                <ul>
                  <li>Ingests opportunities from approved public feeds.</li>
                  <li>Applies deterministic eligibility and fit scoring.</li>
                  <li>Preserves a human review and approval workflow.</li>
                  <li>Synchronizes an operational dashboard in Google Sheets.</li>
                  <li>Maintains local backups and conflict-recovery records.</li>
                  <li>Supports optional, separately enabled AI-assisted analysis.</li>
                </ul>
              </div>
            </section>

            <section className={styles.section} aria-labelledby="boundary-title">
              <div className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>04</span>
                <h2 id="boundary-title">Human-Controlled Boundary</h2>
              </div>
              <div className={styles.prose}>
                <p className={styles.boundary}>
                  The tool never automatically applies for jobs, submits proposals, sends messages, or contacts
                  employers. Its output remains subject to the owner’s review and decision.
                </p>
              </div>
            </section>

            <section className={styles.section} aria-labelledby="details-title">
              <div className={styles.sectionHeading}>
                <span className={styles.sectionNumber}>05</span>
                <h2 id="details-title">Privacy and Contact</h2>
              </div>
              <div className={styles.prose}>
                <p>
                  The privacy policy explains what Google data the application accesses, how it is used and stored,
                  and how access and local credentials can be removed.
                </p>
                <div className={styles.actions}>
                  <Link className={styles.primaryLink} href={content.privacyPath}>
                    Read the privacy policy <span aria-hidden="true">↗</span>
                  </Link>
                  <Link className={styles.inlineLink} href="/#contact">Contact through the portfolio</Link>
                </div>
              </div>
            </section>
          </div>

          <p className={styles.updated}>
            Last updated <time dateTime={content.lastUpdated.machine}>{content.lastUpdated.display}</time>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
