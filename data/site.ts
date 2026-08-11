import type { Project, Experience, SkillGroup } from '../types';

export const site = {
  name: 'Akash Mane',
  role: 'Full Stack Developer',
  tagline: 'Building scalable web products with React, Django & clean APIs.',
  intro:
    'I craft modern web experiences that balance performance, elegant UX, and reliable architecture — from pixel-perfect interfaces to robust backend systems.',
  summary:
    'Full-stack developer with hands-on experience building healthcare and HR platforms, REST APIs, and responsive web applications. I care about code quality, thoughtful design, and shipping products that work.',
  email: 'akashmane2000@gmail.com',
  location: 'Pune, India',
  github: 'https://github.com/akashmane2000-hub',
  linkedin: 'https://www.linkedin.com/in/akash-mane-1346b5392',
  resume: '/resume.pdf',
  available: true,
  availabilityNote: 'Open to new opportunities',

  stats: [
    { value: '1+', label: 'Year Experience' },
    { value: '4', label: 'Projects Completed' },
    { value: '5+', label: 'Core Technologies' },
    { value: '100%', label: 'Client Satisfaction' },
  ],

  skillGroups: [
    {
      category: 'Frontend',
      icon: '⬡',
      skills: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'HTML5', 'CSS3'],
    },
    {
      category: 'Backend',
      icon: '⬡',
      skills: ['Django', 'Python', 'Django REST Framework', 'REST APIs', 'Node.js', 'JWT Auth'],
    },
    {
      category: 'Database',
      icon: '⬡',
      skills: ['PostgreSQL', 'MySQL', 'SQLite', 'Database Design', 'Query Optimization'],
    },
    {
      category: 'Tools & Deployment',
      icon: '⬡',
      skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Linux', 'Vercel', 'Docker (basics)'],
    },
  ] satisfies SkillGroup[],

  projects: [
    {
      title: 'Hospital Management System',
      description:
        'Comprehensive full-stack healthcare platform handling patient registration, appointment scheduling, billing workflows, doctor management, and detailed analytics dashboards.',
      tags: ['Django', 'React', 'PostgreSQL', 'Python', 'REST API', 'TypeScript'],
      features: [
        'Patient registration & records',
        'Appointment booking system',
        'Billing & invoice management',
        'Doctor & staff management',
        'Analytics & reporting dashboard',
      ],
      featured: true,
      category: 'Full Stack',
      github: undefined,
      live: undefined,
    },
    {
      title: 'Human Resource Management System',
      description:
        'Enterprise-grade HR platform that streamlines the complete employee lifecycle — from onboarding to payroll processing, leave management, and performance reviews.',
      tags: ['Django', 'Python', 'MySQL', 'REST API', 'Django REST Framework'],
      features: [
        'Employee onboarding & management',
        'Attendance tracking',
        'Payroll processing',
        'Leave management system',
        'Performance tracking & appraisals',
      ],
      featured: false,
      category: 'Full Stack',
      github: undefined,
      live: undefined,
    },
    {
      title: 'Developer Portfolio',
      description:
        'Modern portfolio built with Next.js 15, TypeScript, and Framer Motion — featuring smooth animations, responsive layout, and an interactive orbital skill visualization.',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React 19'],
      features: [
        'Scroll-driven animations',
        'Interactive skill orbit display',
        'Responsive across all devices',
        'Theme-ready CSS variable system',
        'SEO-optimized metadata',
      ],
      featured: false,
      category: 'Frontend',
      github: 'https://github.com/akashmane2000-hub',
      live: undefined,
    },
  ] satisfies Project[],

  experience: [
    {
      role: 'WordPress Web Developer Intern',
      company: '',
      period: '2024 – 2025',
      type: 'work',
      summary:
        'Worked as a WordPress Web Developer Intern developing and maintaining websites, customizing existing websites, fixing bugs, improving performance, and delivering responsive web solutions.',
      highlights: [],
    },
    {
      role: 'Software Engineer (Full Stack Developer)',
      company: 'Sanpurnam Infotech Pvt. Ltd.',
      period: 'October 2025 – Present',
      type: 'work',
      summary:
        'Currently working as a Software Engineer (Full Stack Developer) at Sanpurnam Infotech Pvt. Ltd.',
      highlights: [],
    },
  ] satisfies Experience[],
};
