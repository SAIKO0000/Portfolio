'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const navigation = [
  { label: 'Home', id: 'home' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Education', id: 'education' },
  { label: 'Contact', id: 'contact' },
];

export function DesktopNav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(pathname === '/' ? 'home' : 'projects');
  const [underline, setUnderline] = useState({ x: 0, width: 0 });

  useEffect(() => {
    if (pathname !== '/') return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const headerHeight = document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 72;
      const probe = headerHeight + Math.min(136, window.innerHeight * 0.2);
      const sections = navigation.map(({ id }) => document.getElementById(id)).filter((element): element is HTMLElement => Boolean(element));
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) {
        setActiveId('contact');
        return;
      }
      const current = sections.reduce((id, section) => section.getBoundingClientRect().top <= probe ? section.id : id, 'home');
      setActiveId(current);
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    queue();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    window.addEventListener('hashchange', queue);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      window.removeEventListener('hashchange', queue);
    };
  }, [pathname]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const update = () => {
      const link = nav.querySelector<HTMLAnchorElement>(`a[data-section="${activeId}"]`);
      if (!link) return;
      setUnderline({ x: link.offsetLeft, width: link.offsetWidth });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [activeId]);

  return <>
    <nav ref={navRef} className="desktop-nav" aria-label="Primary navigation">
      {navigation.map(({ label, id }) => <a
        key={id}
        data-section={id}
        href={`/#${id}`}
        aria-current={activeId === id ? 'location' : undefined}
        onClick={() => setActiveId(id)}
      >{label}</a>)}
      <span className="desktop-nav__underline" style={{ transform: `translateX(${underline.x}px)`, width: underline.width }} aria-hidden="true" />
    </nav>
    <div className="desktop-nav__tools">
      <ThemeToggle compact />
    </div>
  </>;
}
