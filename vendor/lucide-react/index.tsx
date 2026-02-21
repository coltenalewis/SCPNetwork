import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

function icon(path: React.ReactNode) {
  return function Icon({ size = 18, ...props }: IconProps) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        {path}
      </svg>
    );
  };
}

export const ArrowRight = icon(<path d="M5 12h14M13 5l7 7-7 7" />);
export const Copy = icon(<><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>);
export const ExternalLink = icon(<><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M21 14v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" /></>);
export const Linkedin = icon(<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>);
export const ChevronDown = icon(<path d="m6 9 6 6 6-6" />);
