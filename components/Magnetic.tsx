'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Wraps any element (typically a button or link) and gives it a subtle
 * magnetic pull toward the cursor, powered by GSAP's quickTo for buttery
 * interpolation. Automatically disabled for touch devices and users who
 * prefer reduced motion.
 */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) return;

    let quickX: ((v: number) => void) | null = null;
    let quickY: ((v: number) => void) | null = null;
    let cancelled = false;

    import('gsap').then(({ gsap }) => {
      if (cancelled) return;
      quickX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      quickY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    });

    function onMove(e: MouseEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      quickX?.(relX * strength);
      quickY?.(relY * strength);
    }

    function onLeave() {
      quickX?.(0);
      quickY?.(0);
    }

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      cancelled = true;
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return (
    <div ref={wrapRef} className={className} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
}
