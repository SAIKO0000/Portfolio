import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CaseStudyNav, type CaseNavItem } from '@/components/site/CaseStudyNav';
import { ProjectCover } from '@/components/site/ProjectCover';
import { ProductTour } from '@/components/site/ProductTour';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import { StructuredData } from '@/components/site/StructuredData';
import { caseStudies, getCaseStudy, siteConfig, verifiedLinks, verifiedMedia } from '@/data/portfolio';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) return {};

  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title: `${study.title} — ${siteConfig.name}`,
      description: study.summary,
      url: `/work/${study.slug}`,
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const nextStudy = study.nextSlug ? getCaseStudy(study.nextSlug) : undefined;
  const publicLinks = verifiedLinks(study.links);
  const publicMedia = verifiedMedia(study.media);
  const coverVariant = study.slug === 'projtrack' ? 'product' : 'vision';
  const hasShowcase = publicMedia.length > 1;
  const navItems: CaseNavItem[] = [
    ...(hasShowcase ? [{ id: 'showcase', label: 'Showcase' }] : []),
    ...study.sections.map((section) => ({ id: section.id, label: section.label })),
  ];

  return (
    <>
      <a className="skip-link" href="#case-study">Skip to case study</a>
      <SiteHeader />
      <main id="case-study">
        <header className="case-hero site-container">
          <div className="case-hero__breadcrumb">
            <Link href="/#work">Selected work</Link>
            <span aria-hidden="true">/</span>
            <span>{study.title}</span>
          </div>
          <div className="case-hero__grid">
            <div>
              <p className="eyebrow">{study.label}</p>
              <h1>{study.title}</h1>
              <p className="case-hero__summary">{study.summary}</p>
              {publicLinks.length > 0 && (
                <div className="case-actions">
                  {publicLinks.map((link) => (
                    <a key={link.href} className="arrow-link" href={link.href} target="_blank" rel="noreferrer">
                      {link.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <dl className="case-meta">
              <div><dt>Role</dt><dd>{study.role}</dd></div>
              <div><dt>Year</dt><dd>{study.year}</dd></div>
              <div><dt>Stack</dt><dd>{study.technologies.join(' · ')}</dd></div>
            </dl>
          </div>
        </header>

        <CaseStudyNav items={navItems} />

        {hasShowcase ? (
          <section id="showcase" className="case-showcase site-container" aria-label={`${study.title} product showcase`}>
            <ProductTour assets={publicMedia} product={study.title} />
          </section>
        ) : (
          <div className="case-cover-stage site-container">
            <ProjectCover project={study.title} variant={coverVariant} />
          </div>
        )}

        <div className="case-layout site-container">
          <div className="case-content">
            {study.sections.map((section) => (
              <section key={section.id} id={section.id} className="case-section">
                <p className="eyebrow">
                  {String(navItems.findIndex((item) => item.id === section.id) + 1).padStart(2, '0')} / {section.label}
                </p>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.points && (
                  <ul className="case-points">
                    {section.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                )}
                {section.id === 'result' && (
                  <div className="case-improvements">
                    <p className="eyebrow">What I would improve next</p>
                    <ul className="case-points">
                      {study.improvements.map((improvement) => <li key={improvement}>{improvement}</li>)}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>

        <section className="case-next">
          <div className="site-container case-next__inner">
            <div>
              <p className="eyebrow">Continue</p>
              {nextStudy && <Link href={`/work/${nextStudy.slug}`}>Next: {nextStudy.title} <span aria-hidden="true">↗</span></Link>}
            </div>
            <a href={`mailto:${siteConfig.email}`}>Discuss a role <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>
      <SiteFooter />
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: study.title,
          description: study.summary,
          url: `${siteConfig.siteUrl}/work/${study.slug}`,
          creator: { '@type': 'Person', name: siteConfig.name, url: siteConfig.siteUrl },
          keywords: study.technologies,
          ...(publicMedia[0] ? { image: `${siteConfig.siteUrl}${publicMedia[0].src}` } : {}),
        }}
      />
    </>
  );
}
