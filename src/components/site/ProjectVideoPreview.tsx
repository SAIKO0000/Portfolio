'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { PreviewVideo } from '@/data/portfolio';

interface ProjectVideoPreviewProps {
  title: string;
  preview: PreviewVideo;
  label?: string;
  videoAriaLabel?: string;
}

export function ProjectVideoPreview({ title, preview, label = 'Animated overview', videoAriaLabel }: ProjectVideoPreviewProps) {
  const [activated, setActivated] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!activated) return;
    videoRef.current?.play().catch(() => {
      // Browser autoplay policies can require one more press on native controls.
    });
  }, [activated]);

  return (
    <div className="project-preview">
      <div className="project-preview__frame">
        {activated ? (
          <video ref={videoRef} controls playsInline preload="none" poster={preview.poster} aria-label={videoAriaLabel ?? `${title} animated overview`} onClick={(event) => event.stopPropagation()}>
            <source src={preview.src} type="video/mp4" />
            Your browser does not support this video.{preview.description ? ` ${preview.description}` : ''}
          </video>
        ) : (
          <>
            <Image src={preview.poster} alt={preview.posterAlt} fill sizes="(min-width: 1280px) 640px, (min-width: 1024px) 55vw, (min-width: 768px) calc(100vw - 48px), calc(100vw - 32px)" loading="lazy" />
            <button type="button" onClick={() => setActivated(true)} aria-label={`Watch ${title} video`}>
              <span aria-hidden="true">▶</span> Watch video
            </button>
          </>
        )}
      </div>
      <p className="project-preview__label">{label}</p>
      {preview.description && <p className="project-preview__description">{preview.description}</p>}
    </div>
  );
}
