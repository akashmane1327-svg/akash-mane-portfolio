# Akash Mane — Portfolio v3 (Graphite + Copper)

A premium, cinematic developer portfolio built with **Next.js 16**, **TypeScript**, **Tailwind CSS**,
**Framer Motion**, and **GSAP**. This is a full visual rebuild of the previous version onto a single,
permanent design system: **Graphite + Copper**.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS custom properties |
| Animation | Framer Motion (scroll reveals, layout transitions) + GSAP / ScrollTrigger (text reveal, magnetic buttons, scroll-scrubbed timeline, custom cursor) |
| Icons | Lucide React |
| Fonts | Self-hosted via `@fontsource` — Space Grotesk (headings), Inter (body), JetBrains Mono (numbers/code) |

Fonts are self-hosted (no runtime call to Google's font CDN), so builds are reliable even offline or
behind a restrictive network.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

---

## The Design System

Every color in the project is a CSS variable defined once, in `app/globals.css`:

```css
--background:   #121212;   /* page background            */
--section-bg:   #181818;   /* alternating section tone   */
--card:         #1F1F1F;   /* card surface                */
--card-elevated:#252525;   /* hovered / elevated surface  */
--text-primary: #F2F2F2;
--text-secondary: #B8B8B8;
--copper:       #B46A3C;   /* the only accent color       */
--copper-hover: #C98252;
--border:       rgba(255,255,255,.08);
--divider:      rgba(255,255,255,.05);
--shadow:       rgba(0,0,0,.45);
--copper-glow:  rgba(180,106,60,.35);
```

This is intentionally the **only** theme — there is no theme switcher and no alternate palette.
If you want to adjust a shade (e.g. a slightly lighter copper), change it once here and it
propagates through every component, button, border, and glow in the site.

---

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css          ← Design tokens + base styles + button/card/form system
│   ├── layout.tsx           ← Root layout, fonts, metadata, loader/cursor mount
│   └── page.tsx             ← Page assembly + ambient background
├── components/
│   ├── Navbar.tsx           ← Floating glass nav, hide-on-scroll, copper active indicator
│   ├── Footer.tsx           ← Large branding, copper divider, animated links
│   ├── Button.tsx           ← PrimaryButton / PrimaryLink / OutlineButton / OutlineLink
│   ├── Magnetic.tsx         ← GSAP-powered magnetic hover wrapper
│   ├── TiltCard.tsx         ← 3D tilt + mouse-follow glow (used in Skills, About)
│   ├── TextReveal.tsx       ← GSAP word-stagger reveal (hero headline)
│   ├── AnimatedCounter.tsx  ← Count-up numbers (About stats, hero stats)
│   ├── CustomCursor.tsx     ← Copper ring cursor (desktop, fine-pointer only)
│   ├── Loader.tsx           ← Luxury loading screen (shown once per session)
│   ├── MotionReveal.tsx     ← Scroll-reveal animation wrapper
│   └── SectionHeading.tsx   ← Reusable eyebrow + title + description block
├── sections/
│   ├── HeroSection.tsx      ← Hero — GSAP text reveal, parallax, orbit visualization
│   ├── AboutSection.tsx     ← About — code panel, animated stats, tilt "what I do" cards
│   ├── SkillsSection.tsx    ← Skills — filterable, tilting category cards
│   ├── ProjectsSection.tsx  ← Projects — filter tabs, detail modal
│   ├── ExperienceSection.tsx← Timeline with a GSAP ScrollTrigger-scrubbed copper line
│   └── ContactSection.tsx   ← Floating-label form with copper focus states
├── data/
│   └── site.ts              ← ⭐ All your personal content here
├── hooks/
│   ├── useScrollProgress.ts
│   └── useActiveSection.ts
├── types/
│   └── index.ts
├── utils/
│   └── index.ts
├── public/
│   └── resume.pdf           ← Place your resume PDF here
├── .env.example
└── README.md
```

---

## Replacing Personal Information

All personal data lives in **`data/site.ts`**. Update `name`, `role`, `tagline`, `intro`, `summary`,
`email`, `location`, `github`, `linkedin`, `resume`, `available`, `availabilityNote`, and `stats`.

Also update the `<title>` / `metadata` block in `app/layout.tsx`.

---

## Adding / Editing Projects

In `data/site.ts`, find the `projects` array:

```ts
{
  title: 'My Project',
  description: 'Short description of what it does.',
  tags: ['React', 'TypeScript', 'Node.js'],
  features: ['Feature one', 'Feature two'],
  featured: true,
  category: 'Full Stack',
  github: 'https://github.com/akashmane2000-hub',
  live: 'https://your-app.com',
}
```

Each project card automatically gets one of three graphite+copper visual treatments
(`projectPalettes` in `ProjectsSection.tsx`), cycling by index — no per-project color config needed,
and no color outside the brand palette will ever appear.

---

## Adding / Editing Skills

In `data/site.ts`, find `skillGroups`:

```ts
{ category: 'Frontend', icon: '⬡', skills: ['React', 'TypeScript', 'Next.js'] }
```

Skill category cards use `TiltCard` for the 3D hover effect automatically — no extra setup needed.

---

## Adding / Editing Experience

In `data/site.ts`, find the `experience` array:

```ts
{
  role: 'Senior Developer',
  company: 'Company Name',
  period: '2022 — Present',
  type: 'work',          // 'work' | 'education'
  summary: 'What you did and achieved.',
  highlights: ['Key achievement one', 'Key achievement two'],
}
```

---

## How to Configure the Contact Section

The contact section now provides direct contact information and calls to action instead of a submission form.

If you want to add a contact form later, implement a secure API route or a third-party service with proper data handling.

---

## Notes on Scope

Two sections requested in the original brief — **Services** and **Testimonials** — were not added.
The source project has no real service packages or client quotes to draw from, and inventing
placeholder pricing or fabricated client testimonials would misrepresent you to visitors. Both
sections are easy to add once you have real copy: use `SkillsSection.tsx` (category cards)
or `ExperienceSection.tsx` (timeline) as structural references — they already use the full
design system (`TiltCard`, `.card`, `text-eyebrow`, `AnimatedCounter`, etc.), so a new section
matching the visual language is mostly a data + layout exercise.

---

## Deployment

**Vercel (recommended)**
```bash
npm install -g vercel
vercel
```

**Netlify**
```bash
npm run build
```

---

## What Changed in v3

- Full color system replaced: every blue / green / purple / pink / red / yellow / neon tone removed;
  everything now runs on **Graphite (#121212–#252525) + Copper (#B46A3C)** CSS variables only.
- Typography moved from a system-font stack to **Space Grotesk / Inter / JetBrains Mono**, self-hosted.
- Navbar rebuilt: floating glass panel on scroll, hide-on-scroll-down / reveal-on-scroll-up, copper
  active-section indicator.
- Hero rebuilt: GSAP word-by-word headline reveal, mouse parallax on the tech-stack panel, magnetic CTAs.
- New: custom copper-ring cursor, luxury loading screen, magnetic button system (glow + shimmer + ripple),
  3D tilt cards with mouse-follow glow (Skills, About), animated count-up numbers (About, Hero stats).
- Experience timeline: copper progress line now fills in sync with scroll via GSAP ScrollTrigger.
- Contact form: rebuilt with floating labels and copper focus/error states.
- Footer rebuilt: large editorial branding, copper divider, animated underline links.
- Custom scrollbar, film-grain texture, and soft vignette lighting added globally.
- Full keyboard navigation, focus states, and `prefers-reduced-motion` support retained and extended
  to the new cursor/parallax/GSAP effects.
