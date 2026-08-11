'use client';

import { useEffect, useRef } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'span';
}

/**
 * Splits text into words and reveals them with a GSAP stagger on mount —
 * the hero's signature entrance moment. Falls back to a static render
 * when the user prefers reduced motion.
 */
export function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = containerRef.current;
    if (!el || prefersReducedMotion) return;

    let cancelled = false;
    const wordEls = el.querySelectorAll<HTMLSpanElement>('.reveal-word');

    import('gsap').then(({ gsap }) => {
      if (cancelled) return;
      gsap.fromTo(
        wordEls,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          delay,
          ease: 'power4.out',
          stagger: 0.06,
        }
      );
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top">
          <span className="reveal-word inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </span>
  );
}
