import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/portfolio';

export default function robots(): MetadataRoute.Robots {
  const indexingApproved = process.env.NEXT_PUBLIC_ENABLE_INDEXING === 'true';

  return {
    rules: indexingApproved
      ? { userAgent: '*', allow: '/' }
      : { userAgent: '*', disallow: '/' },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
