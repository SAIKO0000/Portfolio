import Link from 'next/link';

interface FrameMarkProps {
  compact?: boolean;
}

export function FrameMark({ compact = false }: FrameMarkProps) {
  return (
    <Link className="frame-mark" href="/" aria-label="Mark Daniel Iguban — home">
      <span aria-hidden="true">MI</span>
      {!compact && <span className="frame-mark__name">Mark Daniel Iguban</span>}
    </Link>
  );
}
