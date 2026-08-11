'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin } from 'lucide-react';
import { MotionReveal } from '@/components/MotionReveal';
import { SectionHeading } from '@/components/SectionHeading';
import { PrimaryLink } from '@/components/Button';
import { site } from '@/data/site';
import { downloadResume } from '@/utils/resume';

export function ContactSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="contact" className="section">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <MotionReveal>
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something meaningful"
            description="I am currently open to Full Stack Developer opportunities, freelance projects, internships, and collaborations. Feel free to contact me through email or LinkedIn."
          />
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <div className="mx-auto mt-8 w-full max-w-[980px]">
            <div className="card overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[rgba(22,22,22,0.8)] shadow-[0_30px_100px_rgba(0,0,0,0.18)] backdrop-blur-xl p-6 sm:p-8">
              <div className="space-y-8 text-[var(--text-secondary)]">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                    Contact
                  </p>
                  <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                    Let's build something meaningful
                  </h2>
                  <p className="text-sm leading-7 text-[var(--text-secondary)]">
                    I am currently open to Full Stack Developer opportunities, freelance projects, internships, and collaborations. Feel free to contact me through email or LinkedIn.
                  </p>
                </div>

                <div className="space-y-5 rounded-[1.75rem] border border-[var(--border)] bg-[rgba(18,18,18,0.72)] p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--background)] text-[var(--copper)]">📧</span>
                        Email
                      </p>
                      <p className="text-sm font-medium text-[var(--text-primary)] break-all">akashmane2000@gmail.com</p>
                    </div>

                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--background)] text-[var(--copper)]">📍</span>
                        Location
                      </p>
                      <p className="text-sm font-medium text-[var(--text-primary)]">Pune, India</p>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-[var(--copper)]/20 bg-[var(--copper)]/5 p-5">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full bg-[var(--copper)]"
                        style={{ boxShadow: '0 0 8px var(--copper-glow)' }}
                        aria-hidden="true"
                      />
                      <p className="text-sm font-medium text-[var(--copper-hover)]">Available for work</p>
                    </div>
                    <div className="mt-4 grid gap-2 text-sm text-[var(--text-secondary)] sm:grid-cols-2">
                      <p>• Full-time opportunities</p>
                      <p>• Freelance Projects</p>
                      <p>• Internships</p>
                      <p>• Collaborations</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">Find Me On</p>
                    <div className="flex flex-wrap items-center gap-3">
                      {[
                        { href: site.github, Icon: Github, label: 'GitHub' },
                        { href: site.linkedin, Icon: Linkedin, label: 'LinkedIn' },
                        { href: 'mailto:akashmane2000@gmail.com', Icon: Mail, label: 'Email' },
                      ].map(({ href, Icon, label }) => (
                        <motion.a
                          key={label}
                          whileHover={shouldReduce ? {} : { y: -2 }}
                          href={href}
                          target={href.startsWith('mailto') ? undefined : '_blank'}
                          rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                          aria-label={label}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)] transition hover:border-[var(--copper)] hover:text-[var(--copper)]"
                        >
                          <Icon size={16} />
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
                    <PrimaryLink
                      href="mailto:akashmane2000@gmail.com"
                      className="w-full sm:w-auto"
                    >
                      Email Me
                    </PrimaryLink>
                    <button
                      type="button"
                      onClick={downloadResume}
                      className="btn-outline w-full sm:w-auto"
                      aria-label="Download resume"
                    >
                      Download Resume
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
