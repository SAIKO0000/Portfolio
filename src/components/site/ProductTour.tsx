'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent } from 'react';
import type { MediaAsset } from '@/data/portfolio';
import { EvidenceImageDialog } from './EvidenceImageDialog';

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
  const [enlarged, setEnlarged] = useState<MediaAsset | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const activeAsset = assets[activeIndex];
  if (!activeAsset) return null;

  const select = (index: number) => setActiveIndex((index + assets.length) % assets.length);
  const open = (asset: MediaAsset, button: HTMLElement) => {
    openerRef.current = button;
    setEnlarged(asset);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); select(activeIndex + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); select(activeIndex - 1); }
    if (event.key === 'Home') { event.preventDefault(); select(0); }
    if (event.key === 'End') { event.preventDefault(); select(assets.length - 1); }
  };

  return (
    <>
      <div className="product-stage" aria-label={`${product} evidence gallery`} onKeyDown={onKeyDown}>
        <div className="product-stage__controls" aria-label={`${product} image controls`}>
          <p className="eyebrow">Evidence gallery</p>
          <div>
            <button type="button" onClick={() => select(activeIndex - 1)} aria-label="Previous image">←</button>
            <span aria-live="polite" aria-atomic="true">{String(activeIndex + 1).padStart(2, '0')} / {String(assets.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => select(activeIndex + 1)} aria-label="Next image">→</button>
          </div>
        </div>
        <button
          className="product-stage__canvas"
          type="button"
          onClick={(event) => open(activeAsset, event.currentTarget)}
          aria-label={`Enlarge ${activeAsset.label ?? featureLabels[activeAsset.id] ?? `image ${activeIndex + 1}`}`}
          title="Enlarge image"
        >
          <Image key={activeAsset.id} src={activeAsset.src} alt={activeAsset.alt} fill sizes="(min-width: 1280px) 1100px, calc(100vw - 32px)" />
        </button>
        <div className="product-stage__caption">
          <p className="eyebrow">{String(activeIndex + 1).padStart(2, '0')} / {activeAsset.kind === 'diagram' ? 'Illustrated diagram' : product === 'Relay' ? 'Project capture' : 'Controlled local capture'}</p>
          <h2>{activeAsset.label ?? featureLabels[activeAsset.id] ?? `Image ${activeIndex + 1}`}</h2>
          <p>{activeAsset.caption}</p>
        </div>
      </div>
      <EvidenceImageDialog asset={enlarged} onClose={() => setEnlarged(null)} returnFocusTo={openerRef} />
    </>
  );
}
