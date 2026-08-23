import Link from 'next/link';
import { CopyEmail } from '@/components/site/CopyEmail';
import { DeveloperCredential } from '@/components/site/DeveloperCredential';
import { ProjectCover } from '@/components/site/ProjectCover';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SocialProfileIndex } from '@/components/site/SocialProfileIndex';
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
  const [relay, frozenShoulder] = caseStudies;
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteConfig.email)}&su=${encodeURIComponent('Software engineering opportunity — Mark Daniel Iguban')}`;

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <section className="hero site-container" aria-labelledby="hero-title">
          <div className="hero__statement">
            <p className="hero__kicker">Software engineer <span aria-hidden="true">/</span> Philippines</p>
            <h1 id="hero-title">{siteConfig.headline}</h1>
            <p className="hero__introduction">{siteConfig.introduction}</p>
            <a className="primary-action" href="#work">View selected work <span aria-hidden="true">↘</span></a>
          </div>

          <aside className="evidence-index" aria-label="Professional summary">
            <div className="evidence-index__heading">
              <p className="eyebrow eyebrow--inverse">At a glance</p>
              <p>Product-minded engineering, grounded in real workflows.</p>
            </div>
            <dl>
              <div>
                <dt>Focus</dt>
                <dd>Full-stack products</dd>
              </div>
              <div>
                <dt>Education</dt>
                <dd>Computer science graduate</dd>
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
          <header className="section-intro section-intro--work">
            <h2 id="selected-work-title">Selected work</h2>
            <p>Two projects that show how I turn operational and technical constraints into software people can understand and use.</p>
          </header>

          <div className="selected-work-grid">
            <article className="project-panel project-panel--featured">
              <Link className="project-panel__visual-link" href={`/work/${relay.slug}`}>
                <ProjectCover project={relay.title} variant="product" />
              </Link>
              <div className="project-panel__body">
                <div className="project-panel__meta">
                  <span>{relay.label}</span>
                  <span>{relay.year}</span>
                </div>
                <h3><Link href={`/work/${relay.slug}`}>{relay.title}</Link></h3>
                <p>{relay.summary}</p>
                <dl className="project-facts">
                  <div><dt>Role</dt><dd>{relay.role}</dd></div>
                  <div><dt>Evidence</dt><dd>Working public product demo</dd></div>
                </dl>
                <div className="tag-list" aria-label={`${relay.title} technologies`}>
                  {relay.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                </div>
                <Link className="arrow-link" href={`/work/${relay.slug}`}>
                  Read case study <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>

            <article className="project-panel project-panel--complementary">
              <Link className="project-panel__visual-link" href={`/work/${frozenShoulder.slug}`}>
                <ProjectCover project={frozenShoulder.title} variant="vision" />
              </Link>
              <div className="project-panel__body">
                <div className="project-panel__meta">
                  <span>{frozenShoulder.label}</span>
                  <span>{frozenShoulder.year}</span>
                </div>
                <h3><Link href={`/work/${frozenShoulder.slug}`}>{frozenShoulder.title}</Link></h3>
                <p>{frozenShoulder.summary}</p>
                <dl className="project-facts">
                  <div><dt>Role</dt><dd>{frozenShoulder.role}</dd></div>
                  <div><dt>Constraint</dt><dd>CPU-friendly, privacy-conscious feedback</dd></div>
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
              <h3 id="supporting-work-title">Supporting work</h3>
              <p>Additional systems presented at the level their current evidence supports.</p>
            </div>
            <div>
              {supportingProjects.map((project, index) => (
                <article className="project-row" key={project.slug}>
                  <span className="project-row__number" aria-hidden="true">0{index + 3}</span>
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

        <section className="section section--compact section--ruled site-container" aria-labelledby="capabilities-title">
          <header className="section-intro">
            <h2 id="capabilities-title">Capabilities backed by work</h2>
            <p>No percentage bars or keyword clouds—each capability points to a project where it had to work in practice.</p>
          </header>
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

        <section id="about" className="section section--compact about site-container" aria-labelledby="about-title">
          <header className="section-intro">
            <h2 id="about-title">About</h2>
            <p>I like software that earns trust through clear behavior, explicit constraints, and honest evidence.</p>
          </header>
          <div className="about__content">
            <div className="about__lead">
              <p>
                I’m a computer science graduate from Cavite State University. I enjoy the point where a complicated process becomes a product someone can actually understand and use.
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
            <div className="contact-section__main">
              <div className="contact-section__copy">
                <p className="contact-section__label">Available for full-time roles</p>
                <h2 id="contact-title">I’m ready to contribute to a product team.</h2>
                <p>I’m looking for a full-time software-engineering role in the Philippines or with a remote team.</p>
                <div className="contact-rail" aria-label="Email contact options">
                  <div className="contact-rail__address">
                    <span>Direct email</span>
                    <p>{siteConfig.email}</p>
                  </div>
                  <CopyEmail email={siteConfig.email} />
                  <a
                    className="contact-rail__gmail"
                    href={gmailComposeUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>Open Gmail</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
              <DeveloperCredential />
            </div>
            <SocialProfileIndex profiles={siteConfig.socialProfiles} />
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
          sameAs: siteConfig.socialProfiles.map(({ href }) => href),
        }}
      />
    </>
  );
}
