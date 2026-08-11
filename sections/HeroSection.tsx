'use client';

import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';
import {
  ArrowRight,
  Code2,
  Database,
  GitBranch,
  Globe,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
  TerminalSquare,
  Paintbrush2,
  Download,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { site } from '@/data/site';
import { TextReveal } from '@/components/TextReveal';
import { PrimaryLink } from '@/components/Button';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { downloadResume } from '@/utils/resume';

const orbitSkills = {
  outer: [
    { name: 'React',      Icon: Code2,          note: 'Frontend Framework' },
    { name: 'Python',     Icon: TerminalSquare,  note: 'Backend Language'  },
    { name: 'PostgreSQL', Icon: Database,        note: 'Relational DB'     },
  ],
  middle: [
    { name: 'Django',     Icon: ShieldCheck,  note: 'Backend Framework' },
    { name: 'Tailwind',   Icon: Paintbrush2,  note: 'Design System'     },
    { name: 'Git',        Icon: GitBranch,    note: 'Version Control'   },
  ],
  inner: [
    { name: 'REST API',    Icon: Globe,  note: 'Integration Layer' },
    { name: 'TypeScript',  Icon: Code2,  note: 'Typed JavaScript'  },
  ],
};

function orbitPos(angle: number, radiusPct: number) {
  return {
    left: `${(50 + Math.cos(angle) * radiusPct).toFixed(2)}%`,
    top:  `${(50 + Math.sin(angle) * radiusPct).toFixed(2)}%`,
  };
}

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0  },
  transition: { delay, duration: 0.6, ease: [0.21, 0.45, 0.27, 0.9] },
});

export function HeroSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const shouldReduce = useReducedMotion();
  const paused = hoveredSkill !== null;

  // Subtle mouse parallax on the tech-stack panel
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 150, damping: 22 });
  const springY = useSpring(mvY, { stiffness: 150, damping: 22 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (shouldReduce) return;
    const { innerWidth, innerHeight } = window;
    const relX = (e.clientX / innerWidth - 0.5) * 2;
    const relY = (e.clientY / innerHeight - 0.5) * 2;
    mvX.set(relX * 14);
    mvY.set(relY * 10);
  }

  function renderOrbitRow(
    skills: typeof orbitSkills.outer,
    ringClass: string,
    chipClass: string,
    insetClass: string,
    radiusPct: number
  ) {
    return (
      <div className={`orbit-ring ${ringClass} ${insetClass} ${paused ? 'orbit-paused' : ''}`}>
        {skills.map((item, i) => {
          const angle = (i / skills.length) * Math.PI * 2;
          const { Icon } = item;
          const isHovered = hoveredSkill === item.name;
          return (
            <button
              key={item.name}
              type="button"
              onMouseEnter={() => setHoveredSkill(item.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              onFocus={()  => setHoveredSkill(item.name)}
              onBlur={()   => setHoveredSkill(null)}
              title={item.note}
              aria-label={`${item.name}: ${item.note}`}
              className={`orbit-chip ${chipClass} ${paused ? 'orbit-paused' : ''} rounded-full border border-[var(--border)] bg-[var(--card)]/90 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-primary)] backdrop-blur-md transition-all duration-200 hover:border-[var(--copper)] hover:bg-[var(--card-elevated)] hover:scale-110`}
              style={orbitPos(angle, radiusPct)}
            >
              <span className="flex items-center gap-1.5">
                <Icon size={11} className="opacity-70" />
                {item.name}
              </span>
              {isHovered && (
                <span className="mt-0.5 block text-[9px] normal-case tracking-[0.08em] text-[var(--text-secondary)]">
                  {item.note}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <section
      id="home"
      aria-label="Hero"
      onMouseMove={handleMouseMove}
      className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 pb-16 md:px-8"
      style={{ paddingTop: 'calc(var(--nav-h) + 3.5rem)' }}
    >
      {/* Floating copper accent shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={shouldReduce ? undefined : { y: [0, -16, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[8%] top-[18%] h-2.5 w-2.5 rounded-full bg-[var(--copper)] opacity-60 blur-[1px]"
        />
        <motion.div
          animate={shouldReduce ? undefined : { y: [0, 14, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute left-[6%] top-[62%] h-1.5 w-1.5 rounded-full bg-[var(--copper-hover)] opacity-50 blur-[1px]"
        />
        <motion.div
          animate={shouldReduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute right-[22%] bottom-[12%] h-2 w-2 rounded-full bg-[var(--copper)] opacity-40 blur-[1px]"
        />
      </div>

      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        {/* ── Left ── */}
        <div className="space-y-7">
          {/* Badge */}
          <motion.div
            {...(shouldReduce ? {} : fadeUp(0.05))}
            className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--text-secondary)]"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--copper)] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--copper)]" />
            </span>
            {site.availabilityNote}
          </motion.div>

          {/* Headline */}
          <h1 className="text-display">
            <span className="block">
              Hi, I&apos;m{' '}
              <span className="relative inline-block">
                <span className="text-[var(--text-secondary)]">
                  <TextReveal text={site.name} delay={0.1} />
                </span>
                <span
                  className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--copper)] to-transparent opacity-50"
                  aria-hidden="true"
                />
              </span>
              .
            </span>
            <span className="block text-[var(--text-secondary)] opacity-80">
              <TextReveal text="I build modern web products." delay={0.32} />
            </span>
          </h1>

          {/* Intro */}
          <motion.p
            {...(shouldReduce ? {} : fadeUp(0.55))}
            className="max-w-lg text-[1.0625rem] leading-relaxed text-[var(--text-secondary)]"
          >
            {site.intro}
          </motion.p>

          {/* CTAs */}
          <motion.div {...(shouldReduce ? {} : fadeUp(0.65))} className="flex flex-wrap gap-3">
            <PrimaryLink href="#projects">
              View My Work
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </PrimaryLink>
            <button
              type="button"
              onClick={downloadResume}
              className="btn-outline inline-flex items-center gap-2"
              aria-label="Download resume"
            >
              <Download size={14} />
              Resume
            </button>
          </motion.div>

          {/* Social + location */}
          <motion.div {...(shouldReduce ? {} : fadeUp(0.75))} className="flex items-center gap-3">
            {[
              { href: site.github,            Icon: Github,   label: 'GitHub'   },
              { href: site.linkedin,           Icon: Linkedin, label: 'LinkedIn' },
              { href: `mailto:${site.email}`,  Icon: Mail,     label: 'Email'    },
            ].map(({ href, Icon, label }) => (
              <motion.a
                key={label}
                whileHover={shouldReduce ? {} : { y: -3 }}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto')    ? undefined : 'noopener noreferrer'}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-secondary)] transition-all hover:border-[var(--copper)] hover:text-[var(--copper)]"
              >
                <Icon size={16} />
              </motion.a>
            ))}
            <span className="ml-1 text-xs text-[var(--muted)]">{site.location}</span>
          </motion.div>
        </div>

        {/* ── Right: orbit card ── */}
        <motion.div
          style={{ x: springX, y: springY }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: 'easeOut' }}
            className="w-full max-w-sm rounded-3xl border border-[var(--border)] bg-[var(--card)]/50 p-4 shadow-[0_28px_72px_var(--shadow)] backdrop-blur-xl"
          >
            {/* Header */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles size={11} className="text-[var(--copper)]" aria-hidden="true" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--text-secondary)]">
                  Tech Stack
                </p>
              </div>
              <div className="flex gap-1.5" aria-hidden="true">
                {['bg-[var(--muted)]/60', 'bg-[var(--muted)]/60', 'bg-[var(--copper)]/60'].map((c, i) => (
                  <span key={i} className={`h-2.5 w-2.5 rounded-full ${c}`} />
                ))}
              </div>
            </div>

            {/* Orbit */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
              <div
                className="orbit-system relative mx-auto"
                style={{ width: 'min(285px,100%)', height: 'min(285px,58vw)' }}
              >
                <div
                  className="absolute inset-[22%] rounded-full"
                  style={{ background: 'radial-gradient(circle,rgba(180,106,60,0.08) 0%,transparent 70%)' }}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                      Full Stack
                    </p>
                    <p className="mt-0.5 font-heading text-[13px] font-bold text-[var(--text-primary)]">Dev</p>
                  </div>
                </div>
                {renderOrbitRow(orbitSkills.outer,  'orbit-ring-outer',  'orbit-ring-outer .orbit-chip',  'absolute inset-0',      42)}
                {renderOrbitRow(orbitSkills.middle, 'orbit-ring-middle', 'orbit-ring-middle .orbit-chip', 'absolute inset-[16%]',  37)}
                {renderOrbitRow(orbitSkills.inner,  'orbit-ring-inner',  'orbit-ring-inner .orbit-chip',  'absolute inset-[30%]',  30)}
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[var(--border)] pt-4">
                {[{ n: '1+', l: 'Years' }, { n: '4+', l: 'Projects' }, { n: '2+', l: 'Tech areas' }].map(({ n, l }) => (
                  <div key={l} className="text-center">
                    <p className="font-heading text-base font-bold text-[var(--text-primary)]">
                      <AnimatedCounter value={n} />
                    </p>
                    <p className="text-[10px] text-[var(--text-secondary)]">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
