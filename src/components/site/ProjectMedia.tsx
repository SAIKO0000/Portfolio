import Image from 'next/image';
import type { MediaAsset } from '@/data/portfolio';

interface ProjectMediaProps {
  asset: MediaAsset;
  priority?: boolean;
  showCaption?: boolean;
  sizes?: string;
}

export function ProjectMedia({
  asset,
  priority = false,
  showCaption = false,
  sizes = '(min-width: 1024px) 75vw, 100vw',
}: ProjectMediaProps) {
  return (
    <figure className="project-media">
      <div className="project-media__frame">
        <Image
          src={asset.src}
          alt={asset.alt}
          width={1600}
          height={1000}
          sizes={sizes}
          priority={priority}
          quality={90}
        />
      </div>
      {showCaption && <figcaption>{asset.caption}</figcaption>}
    </figure>
  );
}
