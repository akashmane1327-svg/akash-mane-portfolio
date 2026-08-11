'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Code2, Database, Layers, Zap, MapPin, Calendar } from 'lucide-react';
import { MotionReveal } from '@/components/MotionReveal';
import { SectionHeading } from '@/components/SectionHeading';
import { TiltCard } from '@/components/TiltCard';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { site } from '@/data/site';

const whatIDo = [
  {
    Icon: Code2,
    title: 'Frontend Development',
    body: 'Responsive, accessible interfaces with React and TypeScript — clean component architecture, smooth animations, and performance-first design.',
  },
  {
    Icon: Database,
    title: 'Backend Engineering',
    body: 'REST APIs and business logic with Django and Python — secure auth, clean data models, and efficient database queries.',
  },
  {
    Icon: Layers,
    title: 'Full Stack Delivery',
    body: 'Bridging UI and backend into cohesive, production-ready products — from initial architecture through deployment.',
  },
  {
    Icon: Zap,
    title: 'Performance & Quality',
    body: 'Well-typed, maintainable code that scales — database optimisation, code reviews, and things that just work reliably.',
  },
];

const codeLines = [
  { indent: 0, text: 'const developer = {',              tone: 'primary' as const },
  { indent: 1, text: 'name: "Akash Mane",',               tone: 'copper'  as const },
  { indent: 1, text: 'role: "Full Stack Developer",',     tone: 'copper'  as const },
  { indent: 1, text: 'location: "Pune, India",',          tone: 'copper'  as const },
  { indent: 1, text: 'stack: [',                          tone: 'primary' as const },
  { indent: 2, text: '"React",',                          tone: 'muted'   as const },
  { indent: 2, text: '"Python",',                         tone: 'muted'   as const },
  { indent: 2, text: '"Django",',                         tone: 'muted'   as const },
  { indent: 2, text: '"MySQL",',                          tone: 'muted'   as const },
  { indent: 2, text: '"REST API"',                        tone: 'muted'   as const },
  { indent: 1, text: '],',                                tone: 'primary' as const },
  { indent: 1, text: 'available: true,',                  tone: 'copperHover' as const },
  { indent: 1, text: 'passion: "clean code",',             tone: 'copper'  as const },
  { indent: 0, text: '};',                                tone: 'primary' as const },
];

const toneClass: Record<string, string> = {
  primary: 'text-[var(--text-primary)]',
  copper: 'text-[var(--copper)]',
  copperHover: 'text-[var(--copper-hover)]',
  muted: 'text-[var(--text-secondary)]',
};

export function AboutSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="about" className="section">
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* ── Two-column top ── */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">

          {/* Left: heading + code panel + badges */}
          <div className="space-y-6">
            <MotionReveal>
              <SectionHeading
                eyebrow="About"
                title="Engineering ideas into reliable products"
                description="Full-stack developer based in Pune, India — building web applications that are fast, accessible, and easy to maintain."
              />
            </MotionReveal>

            {/* Code block */}
            <MotionReveal delay={0.09}>
              <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_6px_28px_var(--shadow)]">
                {/* Chrome bar */}
                <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--section-bg)] px-4 py-2.5">
                  {['bg-[var(--muted)]/60', 'bg-[var(--muted)]/60', 'bg-[var(--copper)]/70'].map((c, i) => (
                    <span key={i} className={`h-2.5 w-2.5 rounded-full ${c}`} aria-hidden="true" />
                  ))}
                  <span className="ml-2 flex-1 text-center text-[11px] text-[var(--muted)]">developer.ts</span>
                </div>
                {/* Code */}
                <div className="p-5 font-code text-[12px] leading-[1.65]">
                  <div className="flex gap-5">
                    <div
                      className="flex flex-col text-right text-[11px] text-[var(--muted)] select-none"
                      aria-hidden="true"
                    >
                      {codeLines.map((_, i) => <span key={i}>{i + 1}</span>)}
                    </div>
                    <div className="flex-1 overflow-x-auto">
                      {codeLines.map((line, i) => (
                        <motion.div
                          key={i}
                          initial={shouldReduce ? undefined : { opacity: 0, x: -6 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.045, duration: 0.28 }}
                          style={{ paddingLeft: `${line.indent * 1.25}rem` }}
                          className={toneClass[line.tone]}
                        >
                          {line.text}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </MotionReveal>

            {/* Quick-fact badges */}
            <MotionReveal delay={0.14}>
              <div className="flex flex-wrap gap-2.5">
                <div className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs text-[var(--text-secondary)]">
                  <MapPin size={12} />
                  {site.location}
                </div>
                <div className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs text-[var(--text-secondary)]">
                  <Calendar size={12} />
                  1+ years building
                </div>
                <div className="inline-flex items-center gap-2 rounded-xl border border-[var(--copper)]/25 bg-[var(--copper)]/[0.08] px-3 py-1.5 text-xs text-[var(--copper-hover)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--copper)]" aria-hidden="true" />
                  Open to opportunities
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Right: story + stats */}
          <div className="space-y-7">
            <MotionReveal delay={0.07}>
              <div className="space-y-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[1.0125rem]">
                <p className="text-[1.0125rem] leading-relaxed">{site.summary}</p>
                <p className="leading-relaxed">
                  I started as a frontend developer, learning to build interfaces that feel natural and
                  look polished. Over time I expanded into backend engineering — picking up Django,
                  building REST APIs, and designing the database schemas that power them.
                </p>
                <p className="leading-relaxed">
                  My two biggest projects are a Hospital Management System and an HR platform — both
                  real-world applications handling data, workflows, and user roles in production.
                </p>
              </div>
            </MotionReveal>

            {/* Stats */}
            <MotionReveal delay={0.13}>
              <div className="grid grid-cols-2 gap-3 xs:grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {site.stats.map(({ value, label }) => (
                  <motion.div
                    key={label}
                    whileHover={shouldReduce ? {} : { y: -3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-center transition-colors hover:border-[var(--copper)]"
                  >
                    <p className="font-heading text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                      <AnimatedCounter value={value} />
                    </p>
                    <p className="mt-0.5 text-[11px] text-[var(--text-secondary)]">{label}</p>
                  </motion.div>
                ))}
              </div>
            </MotionReveal>
          </div>
        </div>

        {/* ── What I Do cards ── */}
        <div className="mt-14">
          <MotionReveal>
            <div className="mb-6 flex items-center gap-4">
              <p className="text-eyebrow">What I do</p>
              <div className="h-px flex-1 bg-gradient-to-r from-[var(--border)] to-transparent" aria-hidden="true" />
            </div>
          </MotionReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whatIDo.map(({ Icon, title, body }, i) => (
              <MotionReveal key={title} delay={i * 0.06}>
                <TiltCard max={6} className="card group h-full space-y-3.5 p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card-elevated)] text-[var(--text-secondary)] transition-all group-hover:border-[var(--copper)] group-hover:text-[var(--copper)]">
                    <Icon size={16} />
                  </div>
                  <h3 className="text-sm font-semibold leading-tight text-[var(--text-primary)]">{title}</h3>
                  <p className="text-[13px] leading-relaxed text-[var(--text-secondary)]">{body}</p>
                </TiltCard>
              </MotionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
