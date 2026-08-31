'use client';

import { useEffect, useRef } from 'react';
import { siteConfig } from '@/data/portfolio';
import { ThemeToggle } from './ThemeToggle';

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const navigation = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Résumé', href: siteConfig.resumePath, utility: true },
];

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [onOpenChange, open]);

  return (
    <div className="mobile-nav">
      <button
        ref={buttonRef}
        className="nav-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-haspopup="true"
        onClick={() => onOpenChange(!open)}
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
              onClick={() => onOpenChange(false)}
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
