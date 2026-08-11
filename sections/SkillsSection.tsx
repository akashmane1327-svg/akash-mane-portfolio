'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { MotionReveal } from '@/components/MotionReveal';
import { SectionHeading } from '@/components/SectionHeading';
import { TiltCard } from '@/components/TiltCard';
import { site } from '@/data/site';

const categoryOrder = ['Frontend', 'Backend', 'Database', 'Tools & Deployment'];

// Skill tech icons mapping (using text symbols for reliable rendering)
const skillMeta: Record<string, { abbr: string }> = {
  'React': { abbr: 'Re' },
  'TypeScript': { abbr: 'TS' },
  'JavaScript': { abbr: 'JS' },
  'Next.js': { abbr: 'Nx' },
  'Tailwind CSS': { abbr: 'Tw' },
  'Framer Motion': { abbr: 'FM' },
  'HTML5': { abbr: 'H5' },
  'CSS3': { abbr: 'C3' },
  'Django': { abbr: 'Dj' },
  'Python': { abbr: 'Py' },
  'Django REST Framework': { abbr: 'DRF' },
  'REST APIs': { abbr: 'API' },
  'Node.js': { abbr: 'Nd' },
  'JWT Auth': { abbr: 'JWT' },
  'PostgreSQL': { abbr: 'Pg' },
  'MySQL': { abbr: 'My' },
  'SQLite': { abbr: 'SQ' },
  'Database Design': { abbr: 'DB' },
  'Query Optimization': { abbr: 'QO' },
  'Git': { abbr: 'Gt' },
  'GitHub': { abbr: 'GH' },
  'VS Code': { abbr: 'VS' },
  'Postman': { abbr: 'Pm' },
  'Linux': { abbr: 'Lx' },
  'Vercel': { abbr: 'Vc' },
  'Docker (basics)': { abbr: 'Dk' },
};

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const shouldReduce = useReducedMotion();

  const categories = ['All', ...categoryOrder];

  const filtered =
    activeCategory === 'All'
      ? site.skillGroups
      : site.skillGroups.filter((g) => g.category === activeCategory);

  return (
    <section id="skills" className="section section-bg-alt">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        {/* Heading */}
        <MotionReveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Skills"
              title="Tools I work with"
              description="Technologies and tools I use to build production-ready web applications."
            />
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  whileHover={shouldReduce ? {} : { scale: 1.03 }}
                  whileTap={shouldReduce ? {} : { scale: 0.97 }}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-[var(--accent)] text-[var(--background)] shadow-[0_4px_16px_rgba(255,255,255,0.12)]'
                      : 'border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </MotionReveal>

        {/* Skill groups */}
        <motion.div
          layout
          className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {filtered.map((group, gi) => (
            <MotionReveal key={group.category} delay={gi * 0.06}>
              <TiltCard max={5} className="card h-full overflow-hidden">
                {/* Category header */}
                <div className="border-b border-[var(--border)] bg-[var(--section-bg)] px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--copper)]" aria-hidden="true" />
                    <h3 className="text-[13px] font-semibold tracking-wide text-[var(--text-primary)]">
                      {group.category}
                    </h3>
                    <span className="ml-auto text-[11px] text-[var(--muted)]">
                      {group.skills.length} skills
                    </span>
                  </div>
                </div>

                {/* Skills grid */}
                <div className="flex flex-wrap gap-2 p-5">
                  {group.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={shouldReduce ? undefined : { opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.04 + si * 0.035, duration: 0.28 }}
                      whileHover={shouldReduce ? {} : { scale: 1.06, y: -1 }}
                      title={skill}
                      className="group relative cursor-default"
                    >
                      <span className="flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--card-elevated)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-secondary)] transition-all group-hover:border-[var(--copper)] group-hover:bg-[var(--card)] group-hover:text-[var(--text-primary)]">
                        {skillMeta[skill] && (
                          <span className="font-code text-[9px] font-bold text-[var(--muted)] group-hover:text-[var(--copper)]">
                            {skillMeta[skill].abbr}
                          </span>
                        )}
                        {skill}
                      </span>
                    </motion.span>
                  ))}
                </div>
              </TiltCard>
            </MotionReveal>
          ))}
        </motion.div>

        {/* Bottom highlight strip */}
        <MotionReveal delay={0.2}>
          <div className="mt-8 grid gap-0 overflow-hidden rounded-2xl border border-[var(--border)] sm:grid-cols-3">
            {[
              { label: 'Primary language', value: 'Python & TypeScript' },
              { label: 'Core frameworks', value: 'React & Django' },
              { label: 'Database expertise', value: 'PostgreSQL & MySQL' },
            ].map(({ label, value }, i) => (
              <div
                key={label}
                className={`p-5 text-center ${
                  i > 0 ? 'border-t sm:border-l sm:border-t-0 border-[var(--border)]' : ''
                }`}
              >
                <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--text-secondary)]">
                  {label}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-[var(--text-primary)]">{value}</p>
              </div>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
