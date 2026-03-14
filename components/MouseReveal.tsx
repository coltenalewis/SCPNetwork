'use client';

import { useCallback, useEffect, useRef } from 'react';

interface MouseRevealProps {
  imageUrl: string;
  children: React.ReactNode;
  className?: string;
}

/* ── Ripple ring config ── */
const RING_SETS = [
  { delay: 0,   maxSize: 360, duration: 2.0, thickness: 1.5, opacity: 0.50 },
  { delay: 80,  maxSize: 260, duration: 1.6, thickness: 1.0, opacity: 0.35 },
  { delay: 160, maxSize: 180, duration: 1.3, thickness: 0.5, opacity: 0.22 },
];

/* ── Trail droplet config ── */
const TRAIL_INTERVAL = 40;   // ms between trail dots
const TRAIL_LIFETIME  = 900; // ms before a trail dot fades

export function MouseReveal({ imageUrl, children, className }: MouseRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef  = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const lastRipple   = useRef(0);
  const lastTrail    = useRef(0);
  const raf          = useRef(0);
  const target       = useRef({ x: -400, y: -400 });
  const current      = useRef({ x: -400, y: -400 });
  const active       = useRef(false);
  const trails       = useRef<{ x: number; y: number; born: number }[]>([]);

  /* ── Smooth lerp loop for reveal mask + trail paint ── */
  useEffect(() => {
    const tick = () => {
      const cx = current.current;
      const tx = target.current;
      cx.x += (tx.x - cx.x) * 0.10;
      cx.y += (tx.y - cx.y) * 0.10;
      backdropRef.current?.style.setProperty('--px', `${cx.x}px`);
      backdropRef.current?.style.setProperty('--py', `${cx.y}px`);

      /* Draw trail droplets on canvas */
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const dpr = window.devicePixelRatio || 1;
          if (canvas.width !== canvas.offsetWidth * dpr || canvas.height !== canvas.offsetHeight * dpr) {
            canvas.width  = canvas.offsetWidth * dpr;
            canvas.height = canvas.offsetHeight * dpr;
            ctx.scale(dpr, dpr);
          }
          ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

          const now = Date.now();
          trails.current = trails.current.filter(t => now - t.born < TRAIL_LIFETIME);

          for (const t of trails.current) {
            const age = (now - t.born) / TRAIL_LIFETIME; // 0→1
            const r   = 3 + age * 18;
            const a   = (1 - age) * 0.18;
            ctx.beginPath();
            ctx.arc(t.x, t.y, r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(155, 126, 78, ${a})`;
            ctx.lineWidth = 0.8 * (1 - age);
            ctx.stroke();
          }
        }
      }

      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  /* ── Spawn a set of concentric ripple rings ── */
  const spawnRipple = useCallback((x: number, y: number) => {
    const container = containerRef.current;
    if (!container) return;

    for (const cfg of RING_SETS) {
      const ring = document.createElement('div');
      ring.className = 'pond-ripple';
      ring.style.left = `${x}px`;
      ring.style.top  = `${y}px`;
      ring.style.setProperty('--ripple-size', `${cfg.maxSize}px`);
      ring.style.setProperty('--ripple-dur', `${cfg.duration}s`);
      ring.style.setProperty('--ripple-thick', `${cfg.thickness}px`);
      ring.style.setProperty('--ripple-opacity', `${cfg.opacity}`);
      ring.style.animationDelay = `${cfg.delay}ms`;

      container.appendChild(ring);
      ring.addEventListener('animationend', () => ring.remove());
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.current = { x, y };
    active.current = true;

    /* Custom cursor dot follows the real cursor */
    el.style.setProperty('--cursor-x', `${e.clientX}px`);
    el.style.setProperty('--cursor-y', `${e.clientY}px`);

    const now = Date.now();

    /* Concentric ripple set every ~280ms */
    if (now - lastRipple.current > 280) {
      lastRipple.current = now;
      spawnRipple(x, y);
    }

    /* Wake trail droplet every ~40ms */
    if (now - lastTrail.current > TRAIL_INTERVAL) {
      lastTrail.current = now;
      trails.current.push({ x, y, born: now });
    }
  }, [spawnRipple]);

  const handleMouseLeave = useCallback(() => {
    active.current = false;
    target.current = { x: -400, y: -400 };
    containerRef.current?.style.setProperty('--cursor-x', '-100px');
    containerRef.current?.style.setProperty('--cursor-y', '-100px');
  }, []);

  /* ── Spawn a ripple on click for a satisfying splash ── */
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    /* Don't steal clicks from actual links/buttons */
    if ((e.target as HTMLElement).closest('a, button')) return;
    const rect = el.getBoundingClientRect();
    spawnRipple(e.clientX - rect.left, e.clientY - rect.top);
  }, [spawnRipple]);

  return (
    <div
      ref={containerRef}
      className={`pond-container ${className ?? ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Content (children sit above the water) */}
      <div className="pond-content">{children}</div>

      {/* Game cover revealed underneath */}
      <div
        ref={backdropRef}
        className="pond-backdrop"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      {/* Canvas for wake trail droplets */}
      <canvas ref={canvasRef} className="pond-trail-canvas" />

      {/* Ripple rings are appended here by JS (they live at container level) */}
    </div>
  );
}
