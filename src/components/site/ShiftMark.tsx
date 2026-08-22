interface ShiftMarkProps {
  className?: string;
}

export function ShiftMark({ className }: ShiftMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="shift-mark__fixed"
        d="M3 16V3H16M3 21V29H11"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
      />
      <path
        className="shift-mark__moving"
        d="M29 16V29H16M29 11V3H21"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
      />
      <path
        className="shift-mark__signal"
        d="M11 11H21V21H11Z"
        fill="currentColor"
      />
    </svg>
  );
}
