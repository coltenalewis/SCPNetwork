'use client';

import Image from 'next/image';

export function RobloxCoverImage({ target, alt, className }: { target: string; alt: string; className?: string }) {
  const src = `/api/roblox-thumbnail?target=${encodeURIComponent(target)}`;
  return (
    <div className={`relative h-40 w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-zinc-800 to-zinc-700 ${className ?? ''}`}>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" unoptimized />
    </div>
  );
}
