'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, FileText, MessageSquare, ArrowUpRight } from 'lucide-react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useActiveSection } from '@/hooks/useActiveSection';
import { site } from '@/data/site';
import { Magnetic } from '@/components/Magnetic';

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

// ─── Premium "Let's Talk" Button ─────────────────────────────────────────────
function LetsTalkButton({ onClick }: { onClick: () => void }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const shouldReduce = useReducedMotion();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    btnRef.current.style.setProperty('--x', `${e.clientX - rect.left}px`);
    btnRef.current.style.setProperty('--y', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <Magnetic strength={0.3}>
      <motion.button
        ref={btnRef}
        type="button"
        onClick={onClick}
        onMouseMove={handleMouseMove}
        whileTap={shouldReduce ? {} : { scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="btn-primary group relative overflow-hidden !py-2 !px-4 text-[13px]"
        aria-label="Let's Talk — scroll to contact"
      >
        <span className="btn-glow" aria-hidden="true" />
        <span className="btn-slide" aria-hidden="true" />
        <span className="relative z-10 flex items-center gap-2">
          <MessageSquare
            size={13}
            className="transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110"
            aria-hidden="true"
          />
          <span>Let&apos;s Talk</span>
          <ArrowUpRight
            size={12}
            className="opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
            aria-hidden="true"
          />
        </span>
      </motion.button>
    </Magnetic>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastY = useRef(0);
  const progress = useScrollProgress();
  const active = useActiveSection(SECTION_IDS);
  const shouldReduce = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 24);

      // Hide on scroll down, reveal on scroll up — only once past the hero,
      // so the navbar never disappears while someone is still reading it.
      if (y > 160 && y > lastY.current + 4) {
        setNavHidden(true);
      } else if (y < lastY.current - 4 || y < 160) {
        setNavHidden(false);
      }
      lastY.current = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setOpen(false);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Perfect scroll with navbar offset compensation
  const scrollTo = useCallback(
    (id: string) => {
      setOpen(false);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        const header = headerRef.current;
        if (!el) return;
        const navHeight = header ? header.getBoundingClientRect().height : 76;
        const offset = 20; // breathing room below the floating nav
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight - offset;
        window.scrollTo({
          top: Math.max(0, top),
          behavior: shouldReduce ? 'instant' : 'smooth',
        });
      });
    },
    [shouldReduce]
  );

  return (
    <>
      <motion.header
        ref={headerRef}
        animate={{ y: navHidden && !open ? '-130%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.21, 0.45, 0.27, 0.9] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`mx-auto mt-0 flex max-w-7xl items-center justify-between px-4 py-3.5 transition-all duration-500 sm:px-5 md:px-8 ${
            scrolled
              ? 'md:mx-auto md:mt-3 md:max-w-6xl md:rounded-2xl md:border md:border-[var(--border)] card-glass md:px-6 md:py-3 md:shadow-[0_12px_40px_var(--shadow)]'
              : 'bg-transparent'
          } ${scrolled ? 'border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-xl md:border-b-0 md:bg-transparent' : ''}`}
        >
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo('home')}
            className="group flex items-center gap-2.5 focus-visible:outline-none"
            aria-label="Back to top"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] text-xs font-bold tracking-tight text-[var(--text-primary)] transition-all group-hover:border-[var(--copper)] group-hover:text-[var(--copper)]">
              AM
            </span>
            <span className="hidden font-heading text-sm font-semibold tracking-wide text-[var(--text-primary)] sm:block">
              {site.name}
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--copper)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--background)] ${
                  active === id
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {active === id && !shouldReduce && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-x-1.5 bottom-0.5 h-[2px] rounded-full bg-[var(--copper)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3.5 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:border-[var(--copper)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--copper)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--background)]"
              aria-label="View resume"
            >
              <FileText size={14} />
              Resume
            </a>
            <LetsTalkButton onClick={() => scrollTo('contact')} />
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] transition hover:border-[var(--copper)] hover:text-[var(--text-primary)] md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={18} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Scroll progress bar */}
        <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-[var(--border)] md:hidden">
          <div className="h-full bg-[var(--copper)] transition-none" style={{ width: `${progress}%` }} />
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[61px] z-40 border-b border-[var(--border)] bg-[var(--background)]/96 backdrop-blur-xl md:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-0.5 p-3" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ label, id }, i) => (
                <motion.button
                  key={id}
                  type="button"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.035 }}
                  onClick={() => scrollTo(id)}
                  className={`w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--copper)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--background)] ${
                    active === id
                      ? 'bg-[var(--card-elevated)] text-[var(--copper)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--card)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {label}
                </motion.button>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-[var(--border)] pt-2.5">
                <a
                  href={site.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition hover:border-[var(--copper)] hover:text-[var(--text-primary)]"
                  aria-label="View resume"
                >
                  <FileText size={14} />
                  Resume
                </a>
                <button type="button" onClick={() => scrollTo('contact')} className="btn-primary justify-center">
                  <span className="btn-glow" aria-hidden="true" />
                  <span className="btn-slide" aria-hidden="true" />
                  <span className="relative z-10">Let&apos;s Talk</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
