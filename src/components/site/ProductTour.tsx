'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { MediaAsset } from '@/data/portfolio';

interface ProductTourProps {
  assets: MediaAsset[];
  product: string;
}

const featureLabels: Record<string, string> = {
  'projtrack-dashboard': 'Dashboard',
  'projtrack-portfolio': 'Projects',
  'projtrack-create': 'Create project',
  'projtrack-gantt': 'Timeline',
  'projtrack-calendar': 'Calendar',
  'projtrack-documents': 'Reports',
};

export function ProductTour({ assets, product }: ProductTourProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeAsset = assets[activeIndex];

  useEffect(() => {
    const tabList = tabListRef.current;
    const activeTab = tabRefs.current[activeIndex];
    if (!tabList || !activeTab || tabList.scrollWidth <= tabList.clientWidth) return;

    const preferredLeft = activeTab.offsetLeft - ((tabList.clientWidth - activeTab.offsetWidth) / 2);
    const maximumLeft = tabList.scrollWidth - tabList.clientWidth;
    const left = Math.min(maximumLeft, Math.max(0, preferredLeft));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    tabList.scrollTo({
      left,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  }, [activeIndex]);

  if (!activeAsset) return null;

  const select = (index: number) => {
    setActiveIndex((index + assets.length) % assets.length);
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % assets.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + assets.length) % assets.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = assets.length - 1;

    if (nextIndex === undefined) return;
    event.preventDefault();
    select(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="product-stage">
      <div className="product-stage__active">
        <p className="eyebrow">Product view / {String(activeIndex + 1).padStart(2, '0')}</p>
        <h2>{featureLabels[activeAsset.id] ?? `View ${activeIndex + 1}`}</h2>
        <p>{activeAsset.caption}</p>
        <a href={activeAsset.src} target="_blank" rel="noreferrer">
          Open full image <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div
        ref={tabListRef}
        className="product-stage__tabs"
        role="tablist"
        aria-label={`${product} product features`}
      >
        {assets.map((asset, index) => (
          <button
            key={asset.id}
            ref={(element) => { tabRefs.current[index] = element; }}
            id={`${asset.id}-tab`}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`${asset.id}-panel`}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => select(index)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{featureLabels[asset.id] ?? `View ${index + 1}`}</strong>
            <i aria-hidden="true" />
          </button>
        ))}
      </div>

      {assets.map((asset, index) => {
        const isActive = activeIndex === index;

        return (
          <div
            key={asset.id}
            id={`${asset.id}-panel`}
            className="product-stage__media"
            role="tabpanel"
            aria-labelledby={`${asset.id}-tab`}
            tabIndex={isActive ? 0 : -1}
            hidden={!isActive}
          >
            {isActive && (
              <div className="product-stage__canvas">
                <Image
                  src={asset.src}
                  alt={asset.alt}
                  width={1600}
                  height={1000}
                  sizes="(min-width: 1280px) 900px, (min-width: 1024px) 72vw, (min-width: 768px) calc(100vw - 48px), calc(100vw - 32px)"
                />
              </div>
            )}
          </div>
        );
      })}

      <div className="product-stage__controls" aria-label={`${product} showcase controls`}>
        <button type="button" onClick={() => select(activeIndex - 1)} aria-label="Show previous feature">
          <span aria-hidden="true">←</span>
        </button>
        <p aria-live="polite">
          <span className="sr-only">{featureLabels[activeAsset.id] ?? `View ${activeIndex + 1}`}, feature </span>
          {String(activeIndex + 1).padStart(2, '0')} / {String(assets.length).padStart(2, '0')}
        </p>
        <button type="button" onClick={() => select(activeIndex + 1)} aria-label="Show next feature">
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
