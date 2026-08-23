interface ProjectCoverProps {
  project: string;
  variant: 'product' | 'vision';
}

export function ProjectCover({ project, variant }: ProjectCoverProps) {
  const content = variant === 'product'
    ? {
        index: '01',
        eyebrow: 'Project operations',
        meta: '2025 / Live demo',
        annotation: 'Plan / Schedule / Report',
        category: 'Full-stack · Two-person build',
      }
    : {
        index: '02',
        eyebrow: 'Rehabilitation DSS',
        meta: '2026 / Research',
        annotation: 'Measure / Track / Report',
        category: 'Applied computer vision · CPU-friendly',
      };

  return (
    <div
      className={`project-cover project-cover--${variant}`}
      role="img"
      aria-label={`${project} project cover. ${content.eyebrow}. ${content.meta}. ${content.index}. ${content.annotation}. ${content.category}.`}
    >
      <div className="project-cover__canvas" aria-hidden="true">
        <span className="project-cover__rail">
          <span>{content.eyebrow}</span>
          <span>{content.meta}</span>
        </span>
        <span className="project-cover__frame" />
        <span className="project-cover__index">{content.index}</span>
        <span className="project-cover__annotation">{content.annotation}</span>
        <span className="project-cover__title">{project}</span>
        <span className="project-cover__category">{content.category}</span>
      </div>
    </div>
  );
}
