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

export interface NestedService {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  hero?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    actions?: { text: string; url: string; isPrimary?: boolean }[];
    trustChips?: string[];
    illustrationUrl?: string;
  };
  disciplines?: {
    _key: string;
    id: string;
    number: number;
    title: string;
    intro: string;
    deliverablesLabel?: string;
    deliverables?: string[];
    outcomePills?: string[];
    startLink?: { text: string; url: string };
    insideCard?: { title: string; subtitle: string; items: string[] };
    illustrationUrl?: string;
    caseStudy?: {
      tag: string;
      mainMetric: string;
      title: string;
      description: string;
      url: string;
      logoUrl?: string;
    };
  }[];
  statsBar?: { value: string; label: string }[];
  processSection?: {
    secLabel?: string;
    secTitle?: string;
    steps?: { title: string; description: string }[];
    rightCopy?: string[];
    timelineCard?: {
      title: string;
      items?: { phase: string; description: string }[];
    };
  };
  faqCta?: {
    imageUrl?: string;
    heading: string;
    description: string;
    button?: { text: string; url: string };
    trustNote?: string;
  };
  caseStudiesSection?: {
    secLabel?: string;
    secTitle?: string;
    secSub?: string;
    caseStudies?: {
      disciplineTag: string;
      logoUrl?: string;
      mainMetric: string;
      results?: { value: string; label: string }[];
      title: string;
      challenge: string;
      tacticalActions?: string[];
      quote?: string;
      url: string;
    }[];
  };
  faqs?: {
    title: string;
    subtitle?: string;
    list?: { question: string; answer: string }[];
  };
  finalCta?: {
    title: string;
    description: string;
    primaryButton?: { text: string; url: string };
    secondaryButton?: { text: string; url: string };
    trustNote?: string;
    badges?: string[];
  };
  seo?: any;
}