'use client';

import Image from 'next/image';

export function RobloxCoverImage({ target, alt, className, style }: { target: string; alt: string; className?: string; style?: React.CSSProperties }) {
  const src = `/api/roblox-thumbnail?target=${encodeURIComponent(target)}`;
  const containerClass = className ?? 'relative h-40 w-full overflow-hidden rounded-t-[16px] bg-surface-warm';

  return (
    <div className={containerClass} style={style}>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" unoptimized />
    </div>
  );
}
