import type { IssueCategory } from '../data/issues';

type IconProps = {
  className?: string;
};

const paths: Record<IssueCategory, React.ReactNode> = {
  pothole: <><ellipse cx="12" cy="14" rx="8" ry="4" /><path d="m7 13 2-2 3 2 3-2 2 2" /></>,
  streetlight: <><path d="M9 21h6M10 17h4M8 9a4 4 0 1 1 8 0c0 2-2 3-2 5h-4c0-2-2-3-2-5Z" /></>,
  graffiti: <><path d="m4 17 9-9 3 3-9 9-4 1 1-4Z" /><path d="m14 7 2-2 3 3-2 2" /></>,
  sidewalk: <><circle cx="12" cy="5" r="2" /><path d="m9 21 2-7-3-3 3-3 4 3 3 1M13 14l3 7" /></>,
  drainage: <><path d="M3 8h18M5 12h14M7 16h10" /><path d="M6 5v14M12 5v14M18 5v14" /></>,
  signage: <><path d="M6 4h12v8H6zM12 12v9" /></>,
  parks: <><path d="M12 3 5 12h4l-3 5h12l-3-5h4L12 3ZM12 17v4" /></>,
  water: <><path d="M12 3s6 7 6 12a6 6 0 0 1-12 0c0-5 6-12 6-12Z" /><path d="M9 16c.5 1.3 1.5 2 3 2" /></>,
  electricity: <path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z" />,
  other: <><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></>,
};

export function CategoryIcon({ category, className = 'h-5 w-5' }: IconProps & { category: IssueCategory }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {paths[category]}
    </svg>
  );
}

export function PinIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function GridIcon({ className = 'h-4 w-4' }: IconProps) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>;
}

export function MapIcon({ className = 'h-4 w-4' }: IconProps) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" /><path d="M9 3v15M15 6v15" /></svg>;
}

export function SearchIcon({ className = 'h-5 w-5' }: IconProps) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
}
