import Link from 'next/link';
import { ShiftMark } from './ShiftMark';

export function SiteWordmark() {
  return (
    <Link className="site-wordmark" href="/" aria-label="Mark Daniel Iguban — home">
      <span className="site-wordmark__icon" aria-hidden="true">
        <ShiftMark />
      </span>
      <span className="site-wordmark__keyline" aria-hidden="true" />
      <span className="site-wordmark__copy" aria-hidden="true">
        <span className="site-wordmark__name">Mark Daniel Iguban</span>
        <span className="site-wordmark__role">Software engineer</span>
      </span>
    </Link>
  );
}
