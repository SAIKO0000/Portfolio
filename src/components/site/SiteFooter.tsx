import { siteConfig } from '@/data/portfolio';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer__inner">
        <p>© {new Date().getFullYear()} {siteConfig.name}</p>
        <p>Designed and built in the Philippines.</p>
      </div>
    </footer>
  );
}
