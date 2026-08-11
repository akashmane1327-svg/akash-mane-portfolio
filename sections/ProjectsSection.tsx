'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Github, ExternalLink, CheckCircle2, ArrowRight, ArrowUpRight } from 'lucide-react';
import { MotionReveal } from '@/components/MotionReveal';
import { SectionHeading } from '@/components/SectionHeading';
import { site } from '@/data/site';
import type { Project } from '@/types';

/* ─── Decorative project visual (replaces missing screenshots) ───
   Every project shares the same graphite+copper family; intensity steps
   slightly per index so the grid still reads as a set, not a rainbow. */
const projectPalettes: { bg: string; grid: string; glow: string; accent: string }[] = [
  {
    bg: 'from-[rgba(180,106,60,0.16)] to-[var(--card)]',
    grid: 'rgba(180, 106, 60, 0.09)',
    glow: 'rgba(180, 106, 60, 0.12)',
    accent: 'text-[var(--copper-hover)]',
  },
  {
    bg: 'from-[rgba(180,106,60,0.09)] to-[var(--card)]',
    grid: 'rgba(255,255,255,0.05)',
    glow: 'rgba(180, 106, 60, 0.08)',
    accent: 'text-[var(--text-secondary)]',
  },
  {
    bg: 'from-[rgba(255,255,255,0.05)] to-[var(--card)]',
    grid: 'rgba(255,255,255,0.04)',
    glow: 'rgba(255,255,255,0.05)',
    accent: 'text-[var(--text-secondary)]',
  },
];

function ProjectVisual({ title, tags, index = 0 }: { title: string; tags: string[]; index?: number }) {
  const palette = projectPalettes[index % projectPalettes.length];

  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br ${palette.bg} p-6`}>
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${palette.grid} 1px, transparent 1px), linear-gradient(90deg, ${palette.grid} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />
      {/* Glow */}
      <div
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: `radial-gradient(circle, ${palette.glow} 0%, transparent 70%)` }}
        aria-hidden="true"
      />
      <div className="relative z-10 text-center">
        <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${palette.accent}`}>
          {tags[0]}
        </p>
        <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{title}</p>
      </div>
    </div>
  );
}

/* ─── Project card ────────────────────────────────────────────── */
function ProjectCard({
  project,
  onClick,
  index = 0,
}: {
  project: Project;
  onClick: (p: Project) => void;
  index?: number;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.article
      whileHover={shouldReduce ? {} : { y: -6 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project);
        }
      }}
      className="card group flex h-full cursor-pointer flex-col overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      aria-label={`View details for ${project.title}`}
    >
      {/* Visual area */}
      <div className="relative h-48 overflow-hidden">
        <ProjectVisual title={project.title} tags={project.tags} index={index} />
        {project.featured && (
          <span className="absolute left-3 top-3 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--accent)]">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Category */}
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--text-secondary)]">
          {project.category}
        </span>

        <h3 className="text-[1.0625rem] font-semibold leading-snug text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
          {project.title}
        </h3>

        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-[11px] text-[var(--text-secondary)]"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-[11px] text-[var(--muted)]">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[var(--border)] pt-3">
          <div className="flex gap-2">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
                onClick={(e) => e.stopPropagation()}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
              >
                <Github size={14} />
              </a>
            ) : (
              <span
                className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted)]"
                title="Source code not public"
                aria-label="Source code not available"
              >
                <Github size={14} />
              </span>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live demo"
                onClick={(e) => e.stopPropagation()}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
          <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)] transition-colors group-hover:text-[var(--text-primary)]">
            Details <ArrowUpRight size={11} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Detail Modal ────────────────────────────────────────────── */
function ProjectModal({
  project,
  onClose,
  index = 0,
}: {
  project: Project;
  onClose: () => void;
  index?: number;
}) {
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      key="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-end justify-center bg-[var(--background)]/85 backdrop-blur-xl sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        key="modal-panel"
        initial={shouldReduce ? undefined : { opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={shouldReduce ? undefined : { opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.21, 0.45, 0.27, 0.9] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-t-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_40px_80px_var(--shadow)] sm:rounded-3xl"
      >
        {/* Close btn */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Visual */}
        <div className="h-44">
          <ProjectVisual title={project.title} tags={project.tags} index={index} />
        </div>

        {/* Content */}
        <div className="space-y-5 p-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-widest text-[var(--text-secondary)]">
                {project.category}
              </span>
              {project.featured && (
                <span className="rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--accent)]">
                  Featured
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">{project.title}</h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Features */}
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              Key Features
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[var(--copper)]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3 border-t border-[var(--border)] pt-4">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
              >
                <Github size={14} /> View Source
              </a>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--muted)] select-none">
                <Github size={14} /> Source Private
              </span>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--background)] transition hover:bg-[var(--accent-hover)]"
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Section ────────────────────────────────────────────── */
const ALL_CATEGORIES = ['All', 'Full Stack', 'Frontend', 'Backend', 'Web App'];

export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const shouldReduce = useReducedMotion();

  const filtered =
    filter === 'All'
      ? site.projects
      : site.projects.filter((p) => p.category === filter);

  const usedCategories = ['All', ...Array.from(new Set(site.projects.map((p) => p.category)))];
  const filterTabs = ALL_CATEGORIES.filter((c) => usedCategories.includes(c));

  return (
    <section id="projects" className="section">
      <div className="mx-auto max-w-7xl px-4 sm:px-4 sm:px-5 md:px-8">
        {/* Heading */}
        <MotionReveal>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Projects"
              title="Selected work"
              description="Full-stack applications built for real business needs — healthcare to HR, powered by React, Django, and solid data architecture."
            />
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {filterTabs.map((cat) => (
                <motion.button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  whileHover={shouldReduce ? {} : { scale: 1.03 }}
                  whileTap={shouldReduce ? {} : { scale: 0.97 }}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
                    filter === cat
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

        {/* Grid */}
        <motion.div
          layout
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <MotionReveal key={project.title} delay={i * 0.07}>
                <ProjectCard project={project} onClick={setSelected} index={i} />
              </MotionReveal>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-10 py-16 text-center text-[var(--text-secondary)]">
            No projects in this category yet.
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
            index={site.projects.findIndex((p) => p.title === selected.title)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
