'use client';

/* eslint-disable @next/next/no-img-element -- Native image dimensions are required for the Actual size evidence view. */
import { useEffect, useRef, useState } from 'react';
import type { MediaAsset } from '@/data/portfolio';

interface EvidenceImageDialogProps {
  asset: MediaAsset | null;
  onClose: () => void;
  returnFocusTo: React.RefObject<HTMLElement | null>;
}

export function EvidenceImageDialog({ asset, onClose, returnFocusTo }: EvidenceImageDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [size, setSize] = useState<'fit' | 'actual'>('fit');

  useEffect(() => {
    if (!asset) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const priorOverflow = document.body.style.overflow;
    const focusTarget = returnFocusTo.current;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = priorOverflow;
      focusTarget?.focus();
    };
  }, [asset, returnFocusTo]);

  if (!asset) return null;

  return (
    <dialog
      ref={dialogRef}
      className="evidence-dialog"
      aria-label={`${asset.label ?? 'Evidence image'} enlarged view`}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="evidence-dialog__panel">
        <div className="evidence-dialog__toolbar">
          <div><p className="eyebrow">Evidence image</p><h2>{asset.label ?? 'Image'}</h2></div>
          <div className="evidence-dialog__actions">
            <button type="button" aria-pressed={size === 'fit'} onClick={() => setSize('fit')}>Fit</button>
            <button type="button" aria-pressed={size === 'actual'} onClick={() => setSize('actual')}>Actual size</button>
            <button type="button" onClick={onClose} aria-label="Close enlarged image">Close <span aria-hidden="true">×</span></button>
          </div>
        </div>
        <div className={`evidence-dialog__image evidence-dialog__image--${size}`}>
          <img src={asset.src} alt={asset.alt} />
        </div>
        <p className="evidence-dialog__caption">{asset.caption}</p>
      </div>
    </dialog>
  );
}
