import { siteConfig } from '@/data/portfolio';
import { FrameMark } from './FrameMark';
import { MobileNav } from './MobileNav';

const navigation = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Résumé', href: siteConfig.resumePath },
  { label: 'Contact', href: '/#contact' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container site-header__inner">
        <FrameMark />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
