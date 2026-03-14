'use client';

import { useCallback, useEffect, useRef } from 'react';

interface MouseRevealProps {
  imageUrl: string;
  children: React.ReactNode;
  className?: string;
}

export function MouseReveal({ imageUrl, children, className }: MouseRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const lastRipple = useRef(0);
  const raf = useRef(0);
  const target = useRef({ x: -300, y: -300 });
  const current = useRef({ x: -300, y: -300 });

  /* Smooth lerp loop for the mask position */
  useEffect(() => {
    const tick = () => {
      const cx = current.current;
      const tx = target.current;
      cx.x += (tx.x - cx.x) * 0.12;
      cx.y += (tx.y - cx.y) * 0.12;
      backdropRef.current?.style.setProperty('--px', `${cx.x}px`);
      backdropRef.current?.style.setProperty('--py', `${cx.y}px`);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const spawnRipple = useCallback((x: number, y: number) => {
    const surface = surfaceRef.current;
    if (!surface) return;
    const ring = document.createElement('div');
    ring.className = 'pond-ripple';
    ring.style.left = `${x - 150}px`;
    ring.style.top = `${y - 150}px`;
    surface.appendChild(ring);
    ring.addEventListener('animationend', () => ring.remove());
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.current = { x, y };

    /* Spawn a ripple every ~220ms of movement */
    const now = Date.now();
    if (now - lastRipple.current > 220) {
      lastRipple.current = now;
      spawnRipple(x, y);
    }
  }, [spawnRipple]);

  const handleMouseLeave = useCallback(() => {
    target.current = { x: -300, y: -300 };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pond-container ${className ?? ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        ref={backdropRef}
        className="pond-backdrop"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div ref={surfaceRef} className="pond-surface" />
    </div>
  );
}
