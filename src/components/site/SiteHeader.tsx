import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { SiteWordmark } from './SiteWordmark';

export function SiteHeader() {
  return (
    <header id="site-top" className="site-header">
      <div className="site-container site-header__inner">
        <SiteWordmark />
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
}
