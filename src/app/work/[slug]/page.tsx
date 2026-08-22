import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProjectPlaceholder } from '@/components/site/ProjectPlaceholder';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import { StructuredData } from '@/components/site/StructuredData';
import { caseStudies, getCaseStudy, siteConfig, verifiedEvidence, verifiedLinks } from '@/data/portfolio';

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
  const publicEvidence = verifiedEvidence(study.evidence);
  const placeholderVariant = study.slug === 'projtrack' ? 'product' : 'vision';

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
            </div>
            <dl className="case-meta">
              <div><dt>Role</dt><dd>{study.role}</dd></div>
              <div><dt>Year</dt><dd>{study.year}</dd></div>
              <div><dt>Stack</dt><dd>{study.technologies.join(' · ')}</dd></div>
            </dl>
          </div>
          <ProjectPlaceholder project={study.title} variant={placeholderVariant} />
        </header>

        <div className="case-layout site-container">
          <aside className="case-toc" aria-label="Case study chapters">
            <p className="eyebrow">On this page</p>
            <a href="#summary">60-second summary</a>
            {study.sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.label}</a>)}
            <a href="#limitations">Limitations</a>
          </aside>

          <div className="case-content">
            <section id="summary" className="case-section case-section--summary">
              <p className="eyebrow">00 / 60-second summary</p>
              <p className="case-summary">{study.sixtySecondSummary}</p>
              {publicLinks.length > 0 && (
                <div className="case-actions">
                  {publicLinks.map((link) => (
                    <a key={link.href} className="arrow-link" href={link.href} target="_blank" rel="noreferrer">
                      {link.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              )}
            </section>

            {study.sections.map((section, index) => (
              <section id={section.id} className="case-section" key={section.id}>
                <p className="eyebrow">{String(index + 1).padStart(2, '0')} / {section.label}</p>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.points && (
                  <ul className="case-points">
                    {section.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                )}
              </section>
            ))}

            {publicEvidence.length > 0 && (
              <section className="case-section" aria-labelledby="evidence-title">
                <p className="eyebrow">Verified evidence</p>
                <h2 id="evidence-title">Artifacts available for inspection.</h2>
                <ul className="evidence-list">
                  {publicEvidence.map((item) => (
                    <li key={item.id}>
                      <strong>{item.title}</strong>
                      <span>{item.description}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section id="limitations" className="case-section case-section--limitations">
              <p className="eyebrow">Limitations and next validation</p>
              <h2>What this case study does not claim.</h2>
              <ul className="case-points">
                {study.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
              </ul>
            </section>
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
        }}
      />
    </>
  );
}
