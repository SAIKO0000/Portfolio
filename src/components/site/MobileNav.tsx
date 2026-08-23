'use client';

import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/data/portfolio';
import { ThemeToggle } from './ThemeToggle';

const navigation = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Résumé', href: siteConfig.resumePath, utility: true },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <div className="mobile-nav">
      <button
        ref={buttonRef}
        className="nav-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-haspopup="true"
        onClick={() => setOpen((current) => !current)}
      >
        <span>{open ? 'Close' : 'Menu'}</span>
        <span aria-hidden="true">{open ? '×' : '+'}</span>
      </button>

      {open && (
        <nav id="mobile-navigation" className="mobile-nav__panel" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={item.utility ? 'mobile-nav__utility' : undefined}
              target={item.utility ? '_blank' : undefined}
              rel={item.utility ? 'noreferrer noopener' : undefined}
              onClick={() => setOpen(false)}
            >
              <span>{item.label}</span>
              <span aria-hidden="true">{item.utility ? 'PDF ↗' : '·'}</span>
            </a>
          ))}
          <ThemeToggle />
        </nav>
      )}
    </div>
  );
}
