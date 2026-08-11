'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

/** Parses strings like "10+", "100%", "3+" into a numeric target + suffix. */
function parseValue(value: string): { target: number; suffix: string } {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { target: 0, suffix: value };
  return { target: parseFloat(match[1]), suffix: match[2] };
}

export function AnimatedCounter({ value, duration = 1.4 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const shouldReduce = useReducedMotion();
  const [display, setDisplay] = useState('0');
  const { target, suffix } = parseValue(value);

  useEffect(() => {
    if (!inView) return;
    if (shouldReduce) {
      setDisplay(`${target}${suffix}`);
      return;
    }

    let raf: number;
    const start = performance.now();
    const durationMs = duration * 1000;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, shouldReduce, target, suffix, duration]);

  return (
    <span ref={ref} className="font-code tabular-nums">
      {display}
    </span>
  );
}
