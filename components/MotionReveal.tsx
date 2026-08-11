'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface MotionRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'none';
}

export function MotionReveal({
  children,
  delay = 0,
  duration = 0.5,
  className,
  direction = 'up',
}: MotionRevealProps) {
  const shouldReduce = useReducedMotion();

  const yOffset = direction === 'up' ? 20 : 0;
  const xOffset = direction === 'left' ? -20 : direction === 'right' ? 20 : 0;

  return (
    <motion.div
      initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: shouldReduce ? 0 : duration,
        delay,
        ease: [0.21, 0.45, 0.27, 0.9],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
