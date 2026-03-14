'use client';

import { useCallback, useEffect, useRef } from 'react';

interface MouseRevealProps {
  imageUrl: string;
  children: React.ReactNode;
  className?: string;
}

interface Ripple {
  x: number;
  y: number;
  born: number;
  maxR: number;
  duration: number;
}

const RIPPLE_INTERVAL = 180;
const MAX_RIPPLES = 60;
const PERSISTENCE = 0.92; // how much old mask persists each frame (0-1)

export function MouseReveal({ imageUrl, children, className }: MouseRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const maskCanvas = useRef<HTMLCanvasElement>(null);
  const ringCanvas = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);
  const ripples = useRef<Ripple[]>([]);
  const lastSpawn = useRef(0);
  const mousePos = useRef({ x: -999, y: -999 });
  const isInside = useRef(false);

  // Main render loop
  useEffect(() => {
    const tick = () => {
      const mc = maskCanvas.current;
      const rc = ringCanvas.current;
      const bd = backdropRef.current;
      if (!mc || !rc || !bd) { raf.current = requestAnimationFrame(tick); return; }

      const dpr = window.devicePixelRatio || 1;
      const w = mc.offsetWidth;
      const h = mc.offsetHeight;

      // Resize canvases if needed
      if (mc.width !== w * dpr || mc.height !== h * dpr) {
        mc.width = w * dpr; mc.height = h * dpr;
        rc.width = w * dpr; rc.height = h * dpr;
      }

      const mctx = mc.getContext('2d')!;
      const rctx = rc.getContext('2d')!;
      mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Fade the mask slightly each frame for persistence (old ripples linger)
      mctx.globalCompositeOperation = 'destination-in';
      mctx.fillStyle = `rgba(0,0,0,${PERSISTENCE})`;
      mctx.fillRect(0, 0, w, h);
      mctx.globalCompositeOperation = 'source-over';

      // Clear ring canvas each frame
      rctx.clearRect(0, 0, w, h);

      const now = Date.now();
      ripples.current = ripples.current.filter(r => now - r.born < r.duration);

      for (const r of ripples.current) {
        const age = (now - r.born) / r.duration;
        const radius = r.maxR * easeOutCubic(age);
        const fadeIn = Math.min(age / 0.15, 1);
        const fadeOut = age > 0.5 ? 1 - (age - 0.5) / 0.5 : 1;

        // Draw on mask canvas - white filled circle = reveal area
        const maskAlpha = fadeIn * 0.6;
        const grad = mctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, radius);
        grad.addColorStop(0, `rgba(255,255,255,${maskAlpha})`);
        grad.addColorStop(0.6, `rgba(255,255,255,${maskAlpha * 0.5})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        mctx.fillStyle = grad;
        mctx.beginPath();
        mctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        mctx.fill();

        // Draw ring outline on visible canvas
        const ringAlpha = fadeIn * fadeOut * 0.35;
        if (ringAlpha > 0.01) {
          rctx.beginPath();
          rctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
          rctx.strokeStyle = `rgba(201, 169, 110, ${ringAlpha})`;
          rctx.lineWidth = 1.2 * (1 - age * 0.7);
          rctx.stroke();

          // Inner ring
          if (radius > 30) {
            rctx.beginPath();
            rctx.arc(r.x, r.y, radius * 0.6, 0, Math.PI * 2);
            rctx.strokeStyle = `rgba(201, 169, 110, ${ringAlpha * 0.4})`;
            rctx.lineWidth = 0.6;
            rctx.stroke();
          }
        }
      }

      // Also draw a soft glow at cursor position
      if (isInside.current) {
        const cx = mousePos.current.x;
        const cy = mousePos.current.y;
        const cursorGrad = mctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
        cursorGrad.addColorStop(0, 'rgba(255,255,255,0.5)');
        cursorGrad.addColorStop(0.4, 'rgba(255,255,255,0.2)');
        cursorGrad.addColorStop(1, 'rgba(255,255,255,0)');
        mctx.fillStyle = cursorGrad;
        mctx.beginPath();
        mctx.arc(cx, cy, 120, 0, Math.PI * 2);
        mctx.fill();
      }

      // Apply the mask canvas as CSS mask on the backdrop
      bd.style.maskImage = `url(${mc.toDataURL()})`;
      bd.style.webkitMaskImage = `url(${mc.toDataURL()})`;
      bd.style.maskSize = `${w}px ${h}px`;
      bd.style.webkitMaskSize = `${w}px ${h}px`;

      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const spawnRipple = useCallback((x: number, y: number, large?: boolean) => {
    const baseR = large ? 280 : 160 + Math.random() * 80;
    const dur = large ? 2800 : 1800 + Math.random() * 600;
    ripples.current.push({ x, y, born: Date.now(), maxR: baseR, duration: dur });
    if (ripples.current.length > MAX_RIPPLES) {
      ripples.current = ripples.current.slice(-MAX_RIPPLES);
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePos.current = { x, y };
    isInside.current = true;

    const now = Date.now();
    if (now - lastSpawn.current > RIPPLE_INTERVAL) {
      lastSpawn.current = now;
      spawnRipple(x, y);
    }
  }, [spawnRipple]);

  const handleMouseLeave = useCallback(() => {
    isInside.current = false;
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a, button')) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    spawnRipple(e.clientX - rect.left, e.clientY - rect.top, true);
  }, [spawnRipple]);

  return (
    <div
      ref={containerRef}
      className={`pond-container ${className ?? ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="pond-content">{children}</div>

      <div
        ref={backdropRef}
        className="pond-backdrop"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      {/* Hidden canvas used to generate the mask */}
      <canvas ref={maskCanvas} className="pond-mask-canvas" />
      {/* Visible canvas for ring outlines */}
      <canvas ref={ringCanvas} className="pond-ring-canvas" />
    </div>
  );
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
