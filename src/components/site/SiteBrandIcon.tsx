import Image from 'next/image';

export function SiteBrandIcon() {
  return (
    <span className="site-brand-icon" aria-hidden="true">
      <Image
        className="site-brand-icon__light"
        src="/icons/oneworks-avatar-cat-256%20(11).svg"
        alt=""
        width={34}
        height={34}
        unoptimized
      />
      <Image
        className="site-brand-icon__dark"
        src="/icons/oneworks-avatar-cat-256%20(10).svg"
        alt=""
        width={34}
        height={34}
        unoptimized
      />
    </span>
  );
}
