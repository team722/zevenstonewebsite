import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
}

export interface Service {
  title: string;
  description: string;
  icon?: LucideIcon;
  details?: string[];
}

export interface CaseStudy {
  client: string;
  headline: string;
  image: string;
  challenge: string;
  solution: string;
  impact: string;
  tags: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
}

export interface ValueProp {
  title: string;
  description: string;
  icon: LucideIcon;
}