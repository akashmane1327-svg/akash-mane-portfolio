export interface Project {
  title: string;
  description: string;
  tags: string[];
  features: string[];
  featured?: boolean;
  github?: string;
  live?: string;
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'Web App';
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights?: string[];
  type: 'work' | 'education';
}

export interface Skill {
  name: string;
  level: 'Advanced' | 'Intermediate' | 'Learning';
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}
