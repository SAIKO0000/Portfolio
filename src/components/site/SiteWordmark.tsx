import Link from 'next/link';
import { ShiftMark } from './ShiftMark';

export function SiteWordmark() {
  return (
    <Link className="site-wordmark" href="/">
      <span className="site-wordmark__icon" aria-hidden="true">
        <ShiftMark />
      </span>
      <span className="site-wordmark__keyline" aria-hidden="true" />
      <span className="site-wordmark__copy">
        <span className="site-wordmark__name">Mark Daniel Iguban</span>
        <span className="site-wordmark__role">Software engineer</span>
      </span>
      <span className="sr-only">Home</span>
    </Link>
  );
}
