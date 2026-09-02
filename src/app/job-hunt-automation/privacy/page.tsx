import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import styles from '../compliance.module.css';
import { jobHuntAutomationContent as content } from '../content';

const description =
  'Privacy policy explaining how the locally operated Job Hunt Automation application accesses, uses, stores, and protects Google Sheets data.';

export const metadata: Metadata = {
  title: `${content.name} Privacy Policy`,
  description,
  alternates: { canonical: content.privacyPath },
};

const sections = [
  {
    id: 'overview',
    title: 'Overview',
    content: (
      <p>
        {content.name} is a private, locally operated tool used by its owner to manage job opportunities in a Google
        Sheets workbook. It does not provide a public account, hosted job service, or automated application service.
      </p>
    ),
  },
  {
    id: 'google-data-accessed',
    title: 'Google Data Accessed',
    content: (
      <>
        <p>The application requests the following Google Sheets OAuth scope:</p>
        <code className={styles.scope}>{content.sheetsScope}</code>
        <p>
          This permission allows spreadsheet reading and writing as described by Google’s authorization screen. The
          application code is designed to operate on the spreadsheet ID explicitly supplied by the owner, but the
          OAuth permission is not technically restricted to only that spreadsheet.
        </p>
      </>
    ),
  },
  {
    id: 'google-data-use',
    title: 'How Google Data Is Used',
    content: (
      <>
        <p>Google Sheets data is used only to support the owner-requested workflow:</p>
        <ul>
          <li>Create and validate the workbook structure.</li>
          <li>Add or update opportunity records.</li>
          <li>Preserve human-owned review fields.</li>
          <li>Maintain deduplication records and run logs.</li>
          <li>Generate dashboard information.</li>
          <li>Perform owner-requested backup and recovery operations.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'credentials',
    title: 'Credential Storage',
    content: (
      <p>
        OAuth credentials are stored locally using Windows Credential Manager. The application does not intentionally
        write OAuth refresh tokens to ordinary JSON token files, application logs, this portfolio website, or a
        hosted application server. These measures reduce exposure but do not guarantee absolute security.
      </p>
    ),
  },
  {
    id: 'local-storage',
    title: 'Local Data Storage',
    content: (
      <p>
        Workbook snapshots, pending recovery records, quota state, and sanitized operational logs may be stored on
        the owner’s computer. These local records support troubleshooting, recovery, and consistent scheduled runs.
      </p>
    ),
  },
  {
    id: 'ai-processing',
    title: 'Optional AI Processing',
    content: (
      <>
        <p>AI-assisted analysis is optional and disabled by default.</p>
        <p>
          If the owner separately enables it, only permitted job-listing excerpts and owner-verified profile claims
          are submitted for analysis. OAuth credentials are never submitted to an AI provider, and general
          spreadsheet contents are not used as unrestricted AI context. The configured provider may be Gemini Free
          or an approved local Ollama model; provider-specific data policies apply when an external provider is used.
        </p>
        <p>
          Google Workspace API data is not used to develop, improve, or train generalized or non-personalized AI or
          machine-learning models.
        </p>
      </>
    ),
  },
  {
    id: 'sharing',
    title: 'Data Sharing and Sale',
    content: (
      <p>
        The application does not sell Google user data, use it for advertising, or share it with data brokers.
        Google processes data as necessary to provide its services. If external AI analysis is separately enabled,
        the limited inputs described above are processed by the configured provider solely to provide the requested
        application feature and remain subject to that provider’s data policies.
      </p>
    ),
  },
  {
    id: 'retention',
    title: 'Retention and Deletion',
    content: (
      <>
        <p>
          Locally stored operational data remains on the owner’s computer until the owner deletes it or removes it
          through normal local maintenance.
        </p>
        <ul>
          <li>Google access can be revoked through the Google Account security or connected-app settings.</li>
          <li>Locally stored Google credentials can be deleted using the application’s credential-removal feature.</li>
          <li>Local runtime snapshots and logs can be deleted by the owner.</li>
          <li>Revoking Google authorization and deleting local credentials are separate operations.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    content: (
      <p>
        The project uses data minimization, local credential storage, explicit activation gates, sanitized logs, and
        human review to reduce risk. No technical system can guarantee complete security or eliminate every risk.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    content: (
      <p>
        Questions about this application or policy can be sent through the portfolio’s existing{' '}
        <Link className={styles.inlineLink} href="/#contact">contact section</Link>.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Policy Changes',
    content: (
      <p>
        This policy may be updated as the application’s features or data practices change. The last-updated date on
        this page identifies the current published version.
      </p>
    ),
  },
] as const;

export default function JobHuntAutomationPrivacyPage() {
  return (
    <>
      <a className="skip-link" href="#privacy-content">Skip to privacy policy</a>
      <SiteHeader />
      <main id="privacy-content" className={styles.page}>
        <div className={`site-container ${styles.shell}`}>
          <header>
            <p className={styles.breadcrumb}>
              <Link href={content.homepagePath}>{content.name}</Link>
              <span aria-hidden="true">/</span>
              <span>Privacy policy</span>
            </p>
            <div className={styles.hero}>
              <p className={styles.heroLabel}>Application privacy</p>
              <div className={styles.heroCopy}>
                <h1>Privacy Policy</h1>
                <p className={styles.lead}>
                  How {content.name} accesses, uses, stores, and protects Google Sheets data in its local,
                  owner-operated workflow.
                </p>
              </div>
              <dl className={styles.facts} aria-label="Privacy policy summary">
                <div><dt>Application</dt><dd>{content.name}</dd></div>
                <div><dt>Operation</dt><dd>Private and locally operated</dd></div>
                <div><dt>AI assistance</dt><dd>Optional and disabled by default</dd></div>
              </dl>
            </div>
          </header>

          <div className={styles.sections}>
            {sections.map((section, index) => (
              <section className={styles.section} aria-labelledby={`${section.id}-title`} key={section.id}>
                <div className={styles.sectionHeading}>
                  <span className={styles.sectionNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <h2 id={`${section.id}-title`}>{section.title}</h2>
                </div>
                <div className={styles.prose}>{section.content}</div>
              </section>
            ))}
          </div>

          <div>
            <p className={styles.updated}>
              Last updated <time dateTime={content.lastUpdated.machine}>{content.lastUpdated.display}</time>
            </p>
            <div className={styles.actions}>
              <Link className={styles.primaryLink} href={content.homepagePath}>
                Return to application information <span aria-hidden="true">↙</span>
              </Link>
              <Link className={styles.inlineLink} href="/">Return to portfolio</Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
