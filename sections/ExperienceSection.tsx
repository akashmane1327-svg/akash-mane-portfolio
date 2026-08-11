'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';
import { MotionReveal } from '@/components/MotionReveal';
import { SectionHeading } from '@/components/SectionHeading';
import { site } from '@/data/site';

export function ExperienceSection() {
  const shouldReduce = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger: the copper line fills in sync with scroll progress
  // through the timeline — a quiet, premium signature rather than a static rule.
  useEffect(() => {
    if (shouldReduce || !timelineRef.current || !progressRef.current) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !timelineRef.current || !progressRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              end: 'bottom 65%',
              scrub: 0.6,
            },
          }
        );
      }, timelineRef);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [shouldReduce]);

  return (
    <section id="experience" className="section section-bg-alt">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Heading */}
        <MotionReveal>
          <SectionHeading
            eyebrow="Experience"
            title="Journey so far"
            description="My professional path — the roles, projects, and milestones that shaped how I build software today."
          />
        </MotionReveal>

        {/* Timeline */}
        <div ref={timelineRef} className="mt-10 relative">
          {/* Base line */}
          <div
            className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-px bg-[var(--divider)] md:left-8"
            aria-hidden="true"
          />
          {/* Copper progress line, scroll-scrubbed via GSAP ScrollTrigger */}
          <div
            ref={progressRef}
            className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-px origin-top bg-gradient-to-b from-[var(--copper)] via-[var(--copper)] to-transparent md:left-8"
            style={{ transform: shouldReduce ? 'scaleY(0.55)' : 'scaleY(0)' }}
            aria-hidden="true"
          />

          <div className="space-y-6">
            {site.experience.map((item, i) => {
              const isWork = item.type === 'work';
              const Icon = isWork ? Briefcase : GraduationCap;
              const isLast = i === site.experience.length - 1;

              return (
                <MotionReveal key={`${item.role}-${i}`} delay={i * 0.1}>
                  <div className="relative flex gap-6 md:gap-10">
                    {/* Icon */}
                    <div className="relative z-10 shrink-0">
                      <motion.div
                        whileHover={shouldReduce ? {} : { scale: 1.08 }}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border md:h-16 md:w-16 md:rounded-2xl shadow-[0_4px_16px_var(--shadow)] ${
                          isLast
                            ? 'border-[var(--copper)]/40 bg-[var(--copper)]/10 text-[var(--copper)]'
                            : 'border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)]'
                        }`}
                      >
                        <Icon size={16} className="md:hidden" />
                        <Icon size={22} className="hidden md:block" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <motion.div
                      whileHover={shouldReduce ? {} : { x: 3 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                      className="card flex-1 overflow-hidden min-w-0"
                    >
                      {/* Accent strip */}
                      <div
                        className={`h-[2px] w-full bg-gradient-to-r to-transparent ${
                          isWork ? 'from-[var(--border-hover)]' : 'from-[var(--copper)]/50'
                        }`}
                        aria-hidden="true"
                      />

                      <div className="p-5 md:p-6">
                        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--text-secondary)]">
                              {item.period}
                            </p>
                            <h3 className="mt-1 text-[1.0625rem] font-semibold text-[var(--text-primary)]">
                              {item.role}
                            </h3>
                            {item.company && (
                              <p className="text-sm text-[var(--text-secondary)]">{item.company}</p>
                            )}
                          </div>
                          <span
                            className={`mt-2 self-start rounded-xl border px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest sm:mt-0 ${
                              isWork
                                ? 'border-[var(--border)] bg-[var(--section-bg)] text-[var(--text-secondary)]'
                                : 'border-[var(--copper)]/25 bg-[var(--copper)]/10 text-[var(--copper)]'
                            }`}
                          >
                            {isWork ? 'Work' : 'Education'}
                          </span>
                        </div>

                        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {item.summary}
                        </p>

                        {item.highlights && item.highlights.length > 0 && (
                          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                            {item.highlights.map((h) => (
                              <li
                                key={h}
                                className="flex items-start gap-2 text-xs text-[var(--text-secondary)]"
                              >
                                <CheckCircle2
                                  size={12}
                                  className="mt-0.5 shrink-0 text-[var(--copper)]"
                                />
                                {h}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
