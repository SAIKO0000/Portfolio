import Link from 'next/link';
import { CopyEmail } from '@/components/site/CopyEmail';
import { ProjectPlaceholder } from '@/components/site/ProjectPlaceholder';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import { StructuredData } from '@/components/site/StructuredData';
import {
  capabilities,
  caseStudies,
  getProjectTitle,
  siteConfig,
  supportingProjects,
  verifiedLinks,
} from '@/data/portfolio';

export default function Home() {
  const [projTrack, frozenShoulder] = caseStudies;

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <section className="hero site-container" aria-labelledby="hero-title">
          <div className="hero__statement">
            <p className="eyebrow">Software engineer · Philippines</p>
            <h1 id="hero-title">{siteConfig.headline}</h1>
            <p className="hero__introduction">{siteConfig.introduction}</p>
            <a className="arrow-link" href="#work">Explore selected work <span aria-hidden="true">↘</span></a>
          </div>

          <aside className="evidence-index" aria-label="Professional summary">
            <p className="eyebrow eyebrow--inverse">At a glance</p>
            <dl>
              <div>
                <dt>Focus</dt>
                <dd>Full-stack software engineering</dd>
              </div>
              <div>
                <dt>Education</dt>
                <dd>Recent computer science graduate</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{siteConfig.location}</dd>
              </div>
              <div>
                <dt>Opportunity</dt>
                <dd>Full-time roles</dd>
              </div>
            </dl>
            <a className="inverse-link" href={siteConfig.resumePath} download>
              Download résumé <span aria-hidden="true">↓</span>
            </a>
          </aside>
        </section>

        <section id="work" className="section site-container" aria-labelledby="selected-work-title">
          <div className="section-heading">
            <p className="eyebrow">01 / Selected work</p>
            <h2 id="selected-work-title">Products shaped around real constraints.</h2>
          </div>

          <div className="selected-work-grid">
            <article className="project-panel project-panel--featured">
              <ProjectPlaceholder project={projTrack.title} variant="product" />
              <div className="project-panel__body">
                <div className="project-panel__meta">
                  <span>{projTrack.label}</span>
                  <span>{projTrack.year}</span>
                </div>
                <h3>{projTrack.title}</h3>
                <p>{projTrack.summary}</p>
                <dl className="project-facts">
                  <div><dt>Role</dt><dd>{projTrack.role}</dd></div>
                  <div><dt>Learning</dt><dd>{projTrack.outcome}</dd></div>
                </dl>
                <div className="tag-list" aria-label={`${projTrack.title} technologies`}>
                  {projTrack.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                </div>
                <Link className="arrow-link" href={`/work/${projTrack.slug}`}>
                  Read case study <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>

            <article className="project-panel project-panel--complementary">
              <ProjectPlaceholder project={frozenShoulder.title} variant="vision" />
              <div className="project-panel__body">
                <div className="project-panel__meta">
                  <span>{frozenShoulder.label}</span>
                  <span>{frozenShoulder.year}</span>
                </div>
                <h3>{frozenShoulder.title}</h3>
                <p>{frozenShoulder.summary}</p>
                <dl className="project-facts">
                  <div><dt>Role</dt><dd>{frozenShoulder.role}</dd></div>
                  <div><dt>Learning</dt><dd>{frozenShoulder.outcome}</dd></div>
                </dl>
                <div className="tag-list" aria-label={`${frozenShoulder.title} technologies`}>
                  {frozenShoulder.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                </div>
                <Link className="arrow-link" href={`/work/${frozenShoulder.slug}`}>
                  Read case study <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          </div>

          <div className="supporting-work" aria-labelledby="supporting-work-title">
            <div className="supporting-work__heading">
              <p className="eyebrow">Supporting work</p>
              <h3 id="supporting-work-title">More systems, kept concise.</h3>
            </div>
            <div>
              {supportingProjects.map((project, index) => (
                <article className="project-row" key={project.slug}>
                  <span className="project-row__number">0{index + 3}</span>
                  <div>
                    <p className="project-row__label">{project.label}</p>
                    <h4>{project.title}</h4>
                  </div>
                  <p>{project.summary}</p>
                  <div className="project-row__links">
                    {verifiedLinks(project.links).map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                        {link.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--ruled site-container" aria-labelledby="capabilities-title">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">02 / Capabilities</p>
            <h2 id="capabilities-title">Skills connected to work, not percentages.</h2>
          </div>
          <div className="capability-list">
            {capabilities.map((capability, index) => {
              const isCaseStudy = caseStudies.some((study) => study.slug === capability.evidenceProjectSlug);
              const href = isCaseStudy ? `/work/${capability.evidenceProjectSlug}` : 'https://github.com/SAIKO0000/accounting-system';
              return (
                <article key={capability.id} className="capability">
                  <span className="capability__number">0{index + 1}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                  <a href={href} {...(!isCaseStudy ? { target: '_blank', rel: 'noreferrer' } : {})}>
                    Evidence: {getProjectTitle(capability.evidenceProjectSlug)} <span aria-hidden="true">↗</span>
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <section id="about" className="section about site-container" aria-labelledby="about-title">
          <div className="section-heading">
            <p className="eyebrow">03 / About</p>
            <h2 id="about-title">I like software that earns trust through clarity.</h2>
          </div>
          <div className="about__content">
            <div className="about__lead">
              <p>
                I’m a recent BS Computer Science graduate from Cavite State University. I enjoy the point where a complicated process becomes a product someone can actually understand and use.
              </p>
            </div>
            <div className="about__details">
              <p>
                My projects have taken me from full-stack workflow tools to computer-vision research and backend modernization. Across them, I care about explicit constraints, dependable behavior, and being honest about what the evidence does—or does not—show.
              </p>
              <p>
                Outside software, I’m usually reading manga or manhwa, playing games, watching animation, or training calisthenics.
              </p>
              <dl>
                <div><dt>Education</dt><dd>BS Computer Science</dd></div>
                <div><dt>University</dt><dd>Cavite State University</dd></div>
                <div><dt>Graduated</dt><dd>August 2026</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="site-container contact-section__inner">
            <p className="eyebrow">04 / Contact</p>
            <h2 id="contact-title">Have a software problem worth making clearer?</h2>
            <p>I’m looking for a full-time software-engineering role in the Philippines or with a remote team.</p>
            <div className="contact-actions">
              <a className="primary-link" href={`mailto:${siteConfig.email}`}>{siteConfig.email} <span aria-hidden="true">↗</span></a>
              <CopyEmail email={siteConfig.email} />
            </div>
            <div className="social-links" aria-label="Social profiles">
              <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: siteConfig.name,
          url: siteConfig.siteUrl,
          email: `mailto:${siteConfig.email}`,
          jobTitle: 'Software Engineer',
          alumniOf: { '@type': 'CollegeOrUniversity', name: 'Cavite State University' },
          sameAs: [siteConfig.githubUrl, siteConfig.linkedinUrl],
        }}
      />
    </>
  );
}
