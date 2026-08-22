'use client';

import { useEffect, useState } from 'react';
import { siteConfig } from '@/data/portfolio';

const navigation = [
  { label: 'Work', href: '/#work', sectionId: 'work' },
  { label: 'About', href: '/#about', sectionId: 'about' },
  { label: 'Contact', href: '/#contact', sectionId: 'contact' },
  { label: 'Résumé', href: siteConfig.resumePath, utility: true },
];

export function DesktopNav() {
  const [activeSection, setActiveSection] = useState<string>();

  useEffect(() => {
    const sections = navigation
      .map((item) => item.sectionId && document.getElementById(item.sectionId))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) setActiveSection(visibleSection.target.id);
      },
      { rootMargin: '-18% 0px -68% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="desktop-nav" aria-label="Primary navigation">
      {navigation.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={item.utility ? 'desktop-nav__utility' : undefined}
          aria-current={item.sectionId && item.sectionId === activeSection ? 'location' : undefined}
          target={item.utility ? '_blank' : undefined}
          rel={item.utility ? 'noreferrer noopener' : undefined}
        >
          <span>{item.label}</span>
          {item.utility && <span aria-hidden="true">↗</span>}
        </a>
      ))}
    </nav>
  );
}
