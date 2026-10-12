import Link from 'next/link';
import { AnalyticsSettingsButton } from '@/components/site/AnalyticsConsent';
import { siteConfig } from '@/data/portfolio';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer__inner">
        <p>© {new Date().getFullYear()} {siteConfig.name}</p>
        <div className="site-footer__links">
          <Link href="/privacy">Privacy</Link>
          <AnalyticsSettingsButton />
        </div>
      </div>
    </footer>
  );
}
