import Link from 'next/link';
import Image from 'next/image';
import { CopyEmail } from '@/components/site/CopyEmail';
import { DeveloperCredential } from '@/components/site/DeveloperCredential';
import { ProjectVideoPreview } from '@/components/site/ProjectVideoPreview';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SkillsSection } from '@/components/site/SkillsSection';
import { SocialProfileIndex } from '@/components/site/SocialProfileIndex';
import { StructuredData } from '@/components/site/StructuredData';
import { caseStudies, siteConfig } from '@/data/portfolio';

export default function Home() {
  const [autodev, jobHunt, relay, frozenShoulder] = caseStudies;
  const selectedWork = [
    { project: autodev, evidence: 'Controlled local workflow runs', signal: '01 / Workflow systems', identity: 'Intake → review' },
    { project: jobHunt, evidence: 'Working local review queue', signal: '02 / Personal automation', identity: 'Collect → decide' },
    { project: relay, evidence: 'Public demo with synthetic records', signal: '03 / Product engineering', identity: 'Plan → deliver' },
    { project: frozenShoulder, evidence: 'Sanitized research prototype', signal: '04 / Applied vision', identity: 'Observe → explain' },
  ];
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteConfig.email)}&su=${encodeURIComponent('Automation or engineering project — Mark Daniel Iguban')}`;

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <section id="home" className="hero site-container" aria-labelledby="hero-title">
          <div className="hero__statement">
            <p className="hero__kicker">Automation specialist <span aria-hidden="true">/</span> Full-stack engineer <span aria-hidden="true">/</span> Philippines</p>
            <h1 id="hero-title">{siteConfig.headline}</h1>
            <p className="hero__introduction">{siteConfig.introduction}</p>
            <div className="hero__actions">
              <a className="primary-action" href="#projects">View projects <span aria-hidden="true">↘</span></a>
              <a className="secondary-action" href="#contact">Get in touch <span aria-hidden="true">↘</span></a>
            </div>
          </div>

          <aside className="evidence-index" aria-label="Professional summary">
            <div className="evidence-index__heading">
              <p className="eyebrow eyebrow--inverse">At a glance</p>
              <p>Product-minded engineering, grounded in real workflows.</p>
            </div>
            <dl>
              <div>
                <dt>Focus</dt>
                <dd>Automation + full-stack tools</dd>
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
                <dd>Freelance + relevant roles</dd>
              </div>
            </dl>
            <a className="inverse-link" href={siteConfig.resumePath} download>
              Download résumé <span aria-hidden="true">↓</span>
            </a>
          </aside>
        </section>

        <section id="projects" className="section site-container projects-section" aria-labelledby="projects-title">
          <span id="work" className="legacy-anchor" aria-hidden="true" />
          <header className="section-intro section-intro--work">
            <h2 id="projects-title">Featured Projects</h2>
            <p>Four case studies, grouped by what they build. Start with workflow automation, then explore full-stack product work and applied vision.</p>
          </header>
          <div className="projects-layout">
            <nav className="project-category-nav" aria-label="Project categories">
              <a href="#automation-projects">Automation <span aria-hidden="true">↘</span></a>
              <a href="#development-projects">Development <span aria-hidden="true">↘</span></a>
            </nav>
            <div className="project-groups">
              {[
                { id: 'automation-projects', title: 'Automation', description: 'Connected workflows and a local decision-supporting tool.', projects: selectedWork.slice(0, 2) },
                { id: 'development-projects', title: 'Development', description: 'A full-stack product and an applied computer-vision prototype.', projects: selectedWork.slice(2) },
              ].map((group) => <div className="project-group" id={group.id} key={group.id}>
                <div className="project-group__heading"><h3>{group.title}</h3><p>{group.description}</p></div>
                <div className="selected-work-grid">
                {group.projects.map(({ project, evidence, signal, identity }, index) => {
              const still = project.media.find((asset) => asset.kind === 'image' && asset.publicationState === 'verified');
              return <article className={`project-panel project-panel--${index === 0 ? 'featured' : 'complementary'}`} data-project={project.slug} key={project.slug}>
                <div className="project-panel__identity" aria-hidden="true"><span>{signal}</span><span>{identity}</span></div>
                <Link className="project-panel__hit-area" href={`/work/${project.slug}`} aria-label={`Read ${project.title} case study`}><span className="sr-only">Read {project.title} case study</span></Link>
                {project.previewVideo ? <ProjectVideoPreview title={project.title} preview={project.previewVideo} /> : still && (
                  <div className="project-panel__visual-link">
                    <div className="project-panel__still">
                      <Image src={still.src} alt={still.alt} fill sizes="(min-width: 1024px) 54vw, 100vw" />
                    </div>
                    <p className="project-panel__capture-label">Real project capture <span aria-hidden="true">/</span> {evidence}</p>
                  </div>
                )}
                <div className="project-panel__body">
                  <div className="project-panel__meta"><span>{project.label}</span><span>{project.year}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="tag-list" aria-label={`${project.title} technologies`}>
                    {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                  </div>
                </div>
              </article>;
                })}
                </div>
              </div>)}
            </div>
          </div>
        </section>
        <SkillsSection />

        <section id="experience" className="section section--ruled site-container" aria-labelledby="experience-title">
          <header className="section-intro">
            <h2 id="experience-title">Experience</h2>
            <p>Professional work and current training, clearly separated.</p>
          </header>
          <div className="experience-list">
            <article className="experience-entry">
              <div className="experience-entry__side"><span className="eyebrow">Professional role</span><span>July 2025 – August 2026</span></div>
              <div><h3>Fullstack Engineer <span>· GYG Power Systems Inc.</span></h3>
                <p className="experience-entry__project">GYG Management / Relay — project management system</p>
                <ul>
                  <li>Built GYG Management / Relay with Next.js, TypeScript, and Supabase, bringing engineering tasks, real-time collaboration, files, and reporting into one workflow.</li>
                  <li>Developed structured report exports that bring together project analytics and technical documentation.</li>
                  <li>Optimized data access by batching database queries and reducing redundant API requests.</li>
                </ul>
                <Link className="arrow-link" href="/work/relay">Explore Relay <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
            <article className="experience-entry experience-entry--training">
              <div className="experience-entry__side"><span className="eyebrow">Current training</span><span>October 2026 – present</span></div>
              <div><h3>AWS re/Start Scholar <span>· FutureSmart Year 2 Batch 31</span></h3>
                <ul>
                  <li>Selected as one of 60 scholars from 800+ applicants for a 12-week cloud-computing program.</li>
                  <li>Building hands-on foundations in AWS, Linux, Python, networking, security, databases, and cloud operations.</li>
                  <li>Preparing for the AWS Certified Cloud Practitioner (CLF-C02) exam while developing technical and professional skills.</li>
                </ul>
                <a className="arrow-link" href="https://aws.amazon.com/training/restart/" target="_blank" rel="noopener noreferrer">About AWS re/Start <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          </div>
        </section>

        <section id="education" className="section section--ruled site-container" aria-labelledby="education-title">
          <header className="section-intro"><h2 id="education-title">Education</h2><p>The academic foundation behind the work.</p></header>
          <div className="education-list">
            <article className="education-entry"><div><p className="eyebrow">Cavite State University · Indang, Cavite</p><h3>Bachelor of Science in Computer Science</h3></div><p>September 2022 – August 2026</p></article>
            <article className="education-entry education-entry--secondary"><div><p className="eyebrow">Cavite State University · Indang, Cavite</p><h3>Senior High School</h3></div><p>2020–2022</p></article>
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="site-container contact-section__inner">
            <div className="contact-section__main">
              <div className="contact-section__copy">
                <p className="contact-section__label">Open to freelance projects and relevant roles</p>
                <h2 id="contact-title">Have a workflow or product to build?</h2>
                <p>I’m available for freelance automation work and relevant full-stack engineering opportunities in the Philippines or with remote teams.</p>
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
          '@type': 'WebSite',
          '@id': `${siteConfig.siteUrl}/#website`,
          name: siteConfig.name,
          alternateName: 'markiguban.dev',
          url: `${siteConfig.siteUrl}/`,
          publisher: { '@id': `${siteConfig.siteUrl}/#person` },
        }}
      />
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          '@id': `${siteConfig.siteUrl}/#person`,
          name: siteConfig.name,
          url: `${siteConfig.siteUrl}/`,
          description: siteConfig.description,
          image: `${siteConfig.siteUrl}/portrait2.jpg`,
          email: `mailto:${siteConfig.email}`,
          jobTitle: 'Software Engineer',
          knowsAbout: ['Workflow automation', 'n8n', 'Python automation', 'Full-stack development', 'Next.js', 'TypeScript'],
          alumniOf: { '@type': 'CollegeOrUniversity', name: 'Cavite State University' },
          sameAs: siteConfig.socialProfiles.map(({ href }) => href),
        }}
      />
    </>
  );
}
