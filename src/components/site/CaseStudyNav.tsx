'use client';

import { useEffect, useRef, useState } from 'react';

export interface CaseNavItem {
  id: string;
  label: string;
}

interface CaseStudyNavProps {
  items: CaseNavItem[];
}

export function CaseStudyNav({ items }: CaseStudyNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -66% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  const activeLabel = items.find((item) => item.id === activeId)?.label ?? items[0]?.label;

  const links = (onNavigate?: () => void) => items.map((item, index) => (
    <a
      key={item.id}
      href={`#${item.id}`}
      aria-current={activeId === item.id ? 'location' : undefined}
      onClick={onNavigate}
    >
      <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      {item.label}
    </a>
  ));

  return (
    <div className="case-nav-shell">
      <div className="case-nav site-container">
        <p className="eyebrow">Case navigation</p>
        <nav className="case-nav__desktop" aria-label="Case study chapters">{links()}</nav>

        <details className="case-jump" ref={detailsRef}>
          <summary>
            <span>Jump to</span>
            <span className="case-jump__current">{activeLabel}</span>
            <span className="case-jump__icon" aria-hidden="true">+</span>
          </summary>
          <nav aria-label="Case study chapters">
            {links(() => detailsRef.current?.removeAttribute('open'))}
          </nav>
        </details>
      </div>
    </div>
  );
}
