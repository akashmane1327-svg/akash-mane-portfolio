'use client';

import { useState, useEffect } from 'react';

// Nav height token in px — must match --nav-h in globals.css
const NAV_H = 61;

export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>();

    // Root margin: account for fixed navbar at top (-NAV_H px),
    // trigger when the section occupies more than ~30% of visible viewport.
    const rootMarginTop = `-${NAV_H + 4}px`;
    const rootMarginBottom = '-45%';

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        {
          rootMargin: `${rootMarginTop} 0px ${rootMarginBottom} 0px`,
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.set(id, observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [sectionIds]);

  return active;
}
