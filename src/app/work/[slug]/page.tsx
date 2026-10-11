import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CaseStudyNav, type CaseNavItem } from '@/components/site/CaseStudyNav';
import { FrozenShoulderEvidence } from '@/components/site/FrozenShoulderEvidence';
import { ProjectCover } from '@/components/site/ProjectCover';
import { ProductTour } from '@/components/site/ProductTour';
import { ProjectVideoPreview } from '@/components/site/ProjectVideoPreview';
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

export async function generateMetadata(
  { params }: CaseStudyPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) return {};

  const parentMetadata = await parent;
  const socialImages = parentMetadata.openGraph?.images ?? [];

  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title: `${study.title} — ${siteConfig.name}`,
      description: study.summary,
      url: `/work/${study.slug}`,
      type: 'article',
      locale: 'en_US',
      siteName: siteConfig.name,
      images: socialImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${study.title} — ${siteConfig.name}`,
      description: study.summary,
      images: parentMetadata.twitter?.images ?? socialImages,
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
  const coverVariant = study.slug === 'relay' ? 'product' : 'vision';
  const isFrozenShoulder = study.slug === 'frozen-shoulder-dss';
  const hasFrozenShoulderShowcase = isFrozenShoulder
    && ['frozen-interface', 'frozen-session-report', 'frozen-field-context']
      .every((id) => publicMedia.some((asset) => asset.id === id));
  const hasProductShowcase = !isFrozenShoulder && publicMedia.length > 1;
  const navItems: CaseNavItem[] = [
    ...(hasProductShowcase || hasFrozenShoulderShowcase ? [{ id: 'showcase', label: 'Showcase' }] : []),
    ...study.sections.map((section) => ({ id: section.id, label: section.label })),
  ];

  return (
    <>
      <div id="case-page-top" aria-hidden="true" />
      <a className="skip-link" href="#case-study">Skip to case study</a>
      <SiteHeader />
      <main id="case-study">
        <header className="case-hero site-container">
          <div className="case-hero__breadcrumb">
            <Link href="/#projects">Projects</Link>
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
                  {publicLinks.map((link) => link.kind === 'live' ? (
                    <div className="case-live-cta-shell" key={link.href}>
                      <span className="case-live-cta__meta">Public demo</span>
                      <a
                        className="case-live-cta"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="case-live-cta__label">{link.label}</span>
                        <span className="case-live-cta__arrow" aria-hidden="true">↗</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </div>
                  ) : (
                    <a key={link.href} className="arrow-link" href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label} <span aria-hidden="true">↗</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <dl className="case-meta">
              <div><dt>Role</dt><dd>{study.role}</dd></div>
              <div><dt>Period</dt><dd>{study.year}</dd></div>
              <div><dt>Stack</dt><dd>{study.technologies.join(' · ')}</dd></div>
            </dl>
          </div>
        </header>

        <CaseStudyNav items={navItems} />

        {hasFrozenShoulderShowcase ? (
          <section id="showcase" className="case-showcase site-container" aria-label="Frozen Shoulder DSS evidence showcase">
            <FrozenShoulderEvidence assets={publicMedia} />
          </section>
        ) : hasProductShowcase ? (
          <section id="showcase" className="case-showcase site-container" aria-label={`${study.title} evidence showcase`}>
            <ProductTour assets={publicMedia} product={study.title} />
          </section>
        ) : (
          <div className="case-cover-stage site-container">
            <ProjectCover project={study.title} variant={coverVariant} />
          </div>
        )}

        {study.recordings && study.recordings.length > 0 && (
          <section className="case-recordings site-container" aria-label="Controlled local recordings">
            <div className="case-recordings__intro">
              <p className="eyebrow">Recorded local tests</p>
              <h2>Two entry paths, one human-review boundary.</h2>
              <p>Full-length recordings with their original audio show controlled local runs. Only unrelated chat lists are blurred in the Messenger recording. Messenger uses an app-role account; neither recording is a public hosted demo.</p>
            </div>
            <div className="case-recordings__grid">
              {study.recordings.map((recording) => (
                <article key={recording.src}>
                  <h3>{recording.title}</h3>
                  <ProjectVideoPreview title={recording.title} preview={recording} label={recording.context} videoAriaLabel={`${recording.title} controlled local recording`} />
                </article>
              ))}
            </div>
          </section>
        )}

        {study.previewVideo && study.slug !== 'autodev' && (
          <section className="case-film site-container" aria-label={`${study.title} animated overview`}>
            <div>
              <p className="eyebrow">Optional explainer</p>
              <h2>See the workflow at a glance</h2>
              <p>{study.previewVideo.description}</p>
            </div>
            <ProjectVideoPreview title={study.title} preview={study.previewVideo} />
          </section>
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
            <div className="case-next__actions">
              <Link href="/#contact">Start a conversation <span aria-hidden="true">↘</span></Link>
              <a className="case-next__back-to-top" href="#case-page-top">Back to top <span aria-hidden="true">↑</span></a>
            </div>
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
