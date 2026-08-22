interface ProjectPlaceholderProps {
  project: string;
  variant: 'product' | 'vision';
}

export function ProjectPlaceholder({ project, variant }: ProjectPlaceholderProps) {
  return (
    <div className={`project-placeholder project-placeholder--${variant}`} role="img" aria-label={`${project} visual evidence composition placeholder`}>
      <div className="project-placeholder__bar">
        <span>V0 / evidence slot</span>
        <span>{project}</span>
      </div>
      <div className="project-placeholder__canvas" aria-hidden="true">
        <span className="placeholder-line placeholder-line--a" />
        <span className="placeholder-line placeholder-line--b" />
        <span className="placeholder-line placeholder-line--c" />
        <span className="placeholder-node placeholder-node--a" />
        <span className="placeholder-node placeholder-node--b" />
        <span className="placeholder-node placeholder-node--c" />
      </div>
      <p>Composition only. Real, reviewed project evidence is required before launch.</p>
    </div>
  );
}
