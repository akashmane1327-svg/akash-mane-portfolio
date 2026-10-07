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
    { value: '5+', label: 'Projects Completed' },
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
      title: 'Wheels Auctions',
      description:
        'Full-stack vehicle auction management platform featuring comprehensive vehicle listings, vendor and auction management, real-time bidding workflows, and master-data administration.',
      tags: ['React.js', 'Django', 'Django REST Framework', 'MySQL', 'JWT Auth', 'REST API'],
      features: [
        'Vehicle, vendor, auction & bidding management',
        'Secure JWT-based authentication & authorization',
        'RESTful APIs integrated with responsive React UI',
        'MySQL database schema design & optimized CRUD operations',
        'Master-data management and production deployment',
      ],
      featured: true,
      category: 'Full Stack',
      github: undefined, // Private Git repository
      live: 'https://wheelsauctions.yourhrms.in/',
    },
    {
      title: 'Ghar Story',
      description:
        'Responsive real estate platform featuring property listings, dynamic search & filtering, favorites, client stories, and interactive WhatsApp/call contact integrations.',
      tags: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Vercel', 'Git'],
      features: [
        'Property listings with search & dynamic filtering',
        'Favorites collection & client story testimonials',
        'Reusable React UI components with responsive layout',
        'Interactive WhatsApp and direct phone contact features',
        'Production deployment on Vercel with custom domain',
      ],
      featured: true,
      category: 'Frontend',
      github: undefined,
      live: 'https://www.ghar-story.com/',
    },
    {
      title: 'Hospital Management System',
      description:
        'Comprehensive full-stack healthcare platform (HMS) implementing the complete IPD patient lifecycle from admission to discharge, with ward/bed allocation and real-time tracking.',
      tags: ['Django REST Framework', 'React.js', 'MySQL', 'Python', 'REST API'],
      features: [
        'Complete IPD patient lifecycle management',
        'Floor, ward, room & bed management modules',
        'Real-time bed availability & admission workflows',
        'Doctor & staff role-based dashboards',
        'Automated hospital workflows & billing',
      ],
      featured: true,
      category: 'Full Stack',
      github: undefined,
      live: 'http://hims.yourhrms.in/',
    },
    {
      title: 'Human Resource Management System',
      description:
        'Enterprise-grade HRMS platform handling recruitment, onboarding, asset tracking, expense management, exit workflows, and multi-level hierarchy approvals.',
      tags: ['Django REST Framework', 'React.js', 'MySQL', 'Python', 'REST API'],
      features: [
        'Recruitment & employee onboarding pipelines',
        'Multi-level approval workflows & hierarchy',
        'Asset management & expense tracking',
        'Exit management & clearance processing',
        'Automated email notifications & reporting dashboards',
      ],
      featured: false,
      category: 'Full Stack',
      github: undefined,
      live: 'https://yourhrms.com/',
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
      live: 'https://akash-mane-portfolio.vercel.app/',
    },
  ] satisfies Project[],

  experience: [
    {
      role: 'Web Developer Intern',
      company: '',
      period: '2024 – 2025',
      type: 'work',
      summary:
        'Worked as a Web Developer Intern developing and maintaining websites, customizing existing websites, fixing bugs, improving performance, and delivering responsive web solutions.',
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
