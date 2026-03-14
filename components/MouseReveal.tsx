'use client';

import { useCallback, useRef } from 'react';

interface MouseRevealProps {
  imageUrl: string;
  children: React.ReactNode;
  className?: string;
}

export function MouseReveal({ imageUrl, children, className }: MouseRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    const bd = backdropRef.current;
    if (!el || !bd) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    bd.style.setProperty('--mx', `${x}px`);
    bd.style.setProperty('--my', `${y}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const bd = backdropRef.current;
    if (!bd) return;
    bd.style.setProperty('--mx', '-200px');
    bd.style.setProperty('--my', '-200px');
  }, []);

  return (
    <div
      ref={containerRef}
      className={`mouse-reveal-container ${className ?? ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        ref={backdropRef}
        className="mouse-reveal-backdrop"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
    </div>
  );
}
