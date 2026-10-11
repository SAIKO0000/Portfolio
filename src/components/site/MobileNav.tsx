'use client';

import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { siteConfig } from '@/data/portfolio';
import { SiteBrandIcon } from './SiteBrandIcon';
import { ThemeToggle } from './ThemeToggle';

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const navigation = [
  { label: 'Home', href: '/#home' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Education', href: '/#education' },
  { label: 'Contact', href: '/#contact' },
];

const socialLinks = siteConfig.socialProfiles.filter(
  (profile) => profile.platform === 'github' || profile.platform === 'linkedin',
);

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const previousOverflowRef = useRef('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    let frame = 0;
    let closeTimer = 0;

    if (open) {
      if (!dialog.open) {
        previousOverflowRef.current = document.body.style.overflow;
        dialog.showModal();
      }
      document.body.style.overflow = 'hidden';
      frame = window.requestAnimationFrame(() => {
        setVisible(true);
        firstLinkRef.current?.focus();
      });
    } else if (dialog.open) {
      setVisible(false);
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      closeTimer = window.setTimeout(() => {
        dialog.close();
        document.body.style.overflow = previousOverflowRef.current;
        buttonRef.current?.focus();
      }, reducedMotion ? 0 : 260);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(closeTimer);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const desktopQuery = window.matchMedia('(min-width: 1180px)');
    const closeOnDesktop = () => {
      if (desktopQuery.matches) onOpenChange(false);
    };
    desktopQuery.addEventListener('change', closeOnDesktop);
    return () => desktopQuery.removeEventListener('change', closeOnDesktop);
  }, [onOpenChange, open]);

  useEffect(() => () => {
    if (dialogRef.current?.open) dialogRef.current.close();
    document.body.style.overflow = previousOverflowRef.current;
  }, []);

  return (
    <div className="mobile-nav">
      <button
        ref={buttonRef}
        className="nav-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => onOpenChange(true)}
      >
        <span>Menu</span>
        <span aria-hidden="true">+</span>
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        className="mobile-nav__dialog"
        data-visible={visible ? 'true' : 'false'}
        aria-label="Site menu"
        onCancel={(event) => {
          event.preventDefault();
          onOpenChange(false);
        }}
      >
        <div className="mobile-nav__dialog-inner">
          <div className="mobile-nav__topbar">
            <span className="mobile-nav__brand" aria-label={siteConfig.name}>
              <SiteBrandIcon />
              <span className="mobile-nav__brand-name">{siteConfig.name}</span>
            </span>
            <div className="mobile-nav__top-actions">
              <ThemeToggle compact />
              <button type="button" className="mobile-nav__close" aria-label="Close menu" onClick={() => onOpenChange(false)}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>

          <nav className="mobile-nav__panel" aria-label="Mobile navigation">
            {navigation.map((item, index) => (
              <a
                key={item.label}
                ref={index === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={() => onOpenChange(false)}
              >
                <span>{item.label}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>

          <div className="mobile-nav__bottom">
            <div className="mobile-nav__socials" aria-label="Social profiles">
              {socialLinks.map((profile) => {
                const Icon = profile.platform === 'github' ? FaGithub : FaLinkedin;
                return <a key={profile.platform} href={profile.href} target="_blank" rel="noopener noreferrer" aria-label={profile.label}>
                  <Icon aria-hidden="true" focusable="false" />
                  <span>{profile.label}</span>
                </a>;
              })}
            </div>
            <a className="mobile-nav__resume" href={siteConfig.resumePath} download onClick={() => onOpenChange(false)}>
              Download résumé <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </dialog>
    </div>
  );
}
