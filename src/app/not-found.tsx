import type { Metadata } from 'next';
import Link from 'next/link';
import { ShiftMark } from '@/components/site/ShiftMark';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import { siteConfig } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'Page not found',
  description: `The requested page could not be found on ${siteConfig.name}'s portfolio.`,
};

export default function NotFound() {
  return (
    <>
      <a className="skip-link" href="#not-found">Skip to recovery options</a>
      <SiteHeader />
      <main id="not-found" className="not-found-page">
        <section className="not-found-shell site-container" aria-labelledby="not-found-title">
          <div className="not-found-copy">
            <p className="eyebrow">404 / Route not found</p>
            <h1 id="not-found-title">This page slipped out of frame.</h1>
            <p>
              The address may have changed, or the page may never have existed. You can return to the
              portfolio or continue directly to the selected work.
            </p>
            <div className="not-found-actions">
              <Link className="primary-action" href="/">
                Return home <span aria-hidden="true">↙</span>
              </Link>
              <Link className="arrow-link" href="/#work">
                View selected work <span aria-hidden="true">↘</span>
              </Link>
            </div>
          </div>

          <div className="not-found-visual" aria-hidden="true">
            <div className="not-found-visual__header">
              <span>Route status</span>
              <span>Recovery ready</span>
            </div>
            <div className="not-found-code">
              <span>4</span>
              <span className="not-found-code__mark"><ShiftMark /></span>
              <span>4</span>
            </div>
            <div className="not-found-visual__footer">
              <span>Requested path / unavailable</span>
              <span>MI / 404</span>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
