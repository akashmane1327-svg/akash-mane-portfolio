'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) return;

    document.documentElement.classList.add('has-custom-cursor');

    let quickDotX: ((v: number) => void) | null = null;
    let quickDotY: ((v: number) => void) | null = null;
    let quickRingX: ((v: number) => void) | null = null;
    let quickRingY: ((v: number) => void) | null = null;
    let cancelled = false;

    import('gsap').then(({ gsap }) => {
      if (cancelled || !dotRef.current || !ringRef.current) return;
      quickDotX = gsap.quickTo(dotRef.current, 'x', { duration: 0.12, ease: 'power3.out' });
      quickDotY = gsap.quickTo(dotRef.current, 'y', { duration: 0.12, ease: 'power3.out' });
      quickRingX = gsap.quickTo(ringRef.current, 'x', { duration: 0.35, ease: 'power3.out' });
      quickRingY = gsap.quickTo(ringRef.current, 'y', { duration: 0.35, ease: 'power3.out' });
    });

    function onMove(e: MouseEvent) {
      quickDotX?.(e.clientX);
      quickDotY?.(e.clientY);
      quickRingX?.(e.clientX);
      quickRingY?.(e.clientY);
    }

    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, input, textarea, [role="button"], .cursor-interactive');
      ringRef.current?.classList.toggle('is-active', Boolean(interactive));
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      cancelled = true;
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
