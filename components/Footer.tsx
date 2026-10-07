'use client';

import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react';
import { site } from '@/data/site';

const NAV = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

export function Footer() {
  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <footer className="relative border-t border-[var(--divider)] bg-[var(--background)]">
      {/* Copper divider */}
      <div
        className="h-px bg-gradient-to-r from-transparent via-[var(--copper)] to-transparent opacity-60"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-5 md:px-8 md:py-16">
        {/* Large branding */}
        <div className="mb-12">
          <p className="font-heading text-[clamp(2.5rem,8vw,5.5rem)] font-semibold leading-none tracking-tight text-[var(--text-primary)]">
            Let&apos;s build<span className="text-[var(--copper)]">.</span>
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1.5fr_auto_auto] md:items-start">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] font-heading text-xs font-bold tracking-tight text-[var(--text-primary)]">
                AM
              </span>
              <div>
                <span className="block font-heading font-semibold text-[var(--text-primary)]">{site.name}</span>
                <span className="text-[11px] text-[var(--muted)]">{site.role}</span>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[var(--text-secondary)]">
              Full Stack Developer crafting modern web products with React, Django, and clean APIs.
            </p>
            <div className="flex gap-2 pt-1">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-secondary)] transition hover:border-[var(--copper)] hover:text-[var(--copper)]"
              >
                <Github size={15} />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-secondary)] transition hover:border-[var(--copper)] hover:text-[var(--copper)]"
              >
                <Linkedin size={15} />
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label="Send email"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-secondary)] transition hover:border-[var(--copper)] hover:text-[var(--copper)]"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Quick nav */}
          <div className="space-y-4">
            <p className="text-eyebrow">Navigate</p>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="link-underline text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className="text-eyebrow">Contact</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                >
                  {site.email}
                </a>
              </li>
              <li className="text-sm text-[var(--text-secondary)]">{site.location}</li>
              <li>
                <a
                  href={site.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                >
                  View Resume
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center gap-3 border-t border-[var(--divider)] pt-6 sm:flex-row sm:justify-between">
        <p className="text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} {site.name} · Built with Next.js
        </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 rounded-xl border border-[var(--border)] px-3.5 py-2 text-xs text-[var(--text-secondary)] transition hover:border-[var(--copper)] hover:text-[var(--copper)]"
            aria-label="Back to top"
          >
            <ArrowUp size={12} />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
