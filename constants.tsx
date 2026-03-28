
import {
  Target, Palette, Cpu, Search, Layers, Globe, Zap, Megaphone,
  BarChart, Rocket, Lightbulb, TrendingUp, Send, Check
} from 'lucide-react';
import { Service, ValueProp, CaseStudy, Testimonial } from './types';

export const LOGO_URL = "https://zevenstone.com/wp-content/uploads/2023/10/Zevenstone-Logo-1.png";

export const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Stories', path: '/success-stories' },
  { label: 'Blog', path: '/blog' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const PARTNERS_LOGOS = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/2560px-Tata_Consultancy_Services_Logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/2560px-Sony_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png"
];

export const CORE_VALUES: ValueProp[] = [
  {
    title: "Strategy",
    description: "Every project begins with a clear, data-driven plan. We analyze your business goals, market position, and customer behavior to build a roadmap that aligns outcomes with purpose.",
    icon: Target
  },
  {
    title: "Creativity",
    description: "Our creatives don’t just design—they craft experiences. From visual branding to campaign storytelling, we make sure your business stands out with a compelling identity that resonates.",
    icon: Palette
  },
  {
    title: "Technology",
    description: "From custom web builds to automation, we use modern tools and platforms to streamline performance, amplify reach, and make your marketing smarter.",
    icon: Cpu
  }
];

export const SERVICES_LIST: (Service & { image: string })[] = [
  {
    title: "Digital Marketing",
    description: "We offer comprehensive digital marketing solutions tailored to your business needs.",
    icon: Megaphone,
    details: ["Content Marketing & Brand Storytelling", "Social Media Management & Engagement", "Email Marketing & Automation", "Performance Marketing (PPC)", "SEO & Growth Strategy"],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop"
  },
  {
    title: "Web / Apps",
    description: "Custom digital products built for scale, speed, and user experience.",
    icon: Globe,
    details: ["Custom UI/UX Design", "Full Stack Development", "E-commerce Solutions", "Mobile App Development", "Progressive Web Apps"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop"
  },
  {
    title: "Video Production",
    description: "Visual storytelling that captures attention and converts viewers.",
    icon: Zap,
    details: ["Brand Films", "Product Explainers", "Social Media Shorts", "Motion Graphics", "3D Animation"],
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2670&auto=format&fit=crop"
  },
  {
    title: "AI Solutions",
    description: "Leveraging artificial intelligence to automate and optimize.",
    icon: Cpu,
    details: ["Chatbot Development", "AI-Generated Content", "Predictive Analytics", "Process Automation", "Custom AI Models"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
  }
];

export const MORE_SERVICES_TAGS = [
  "Content Marketing", "Email Marketing", "Lead Generation Services", "YouTube Channel Management",
  "Influencer Marketing", "Conversion Rate Optimization", "Chatbot Development",
  "Analytics and Reporting", "Website Maintenance", "Branding and Creative",
  "Graphics Design", "Video Marketing", "App Store Optimization", "Cloud Infrastructure", "Cybersecurity", "Blockchain Dev"
];

export const STATS_DATA = [
  { value: "500+", label: "Projects Delivered", desc: "Successfully launched across 15+ industries globally." },
  { value: "98%", label: "Client Retention", desc: "We build long-term partnerships, not just vendors." },
  { value: "10M+", label: "Leads Generated", desc: "Driving tangible business growth through data." },
  { value: "50+", label: "Global Awards", desc: "Recognized for excellence in design and strategy." }
];

export const WHY_US_DATA = [
  {
    title: "Transparent Process",
    desc: "We've helped brands hit milestones like 7.4 million YouTube views in just 28 days — we don't just promise growth, we deliver it with full visibility.",
    icon: Search
  },
  {
    title: "All-in-One Powerhouse",
    desc: "From strategy to execution, we handle everything under one roof. No fragmentation, just cohesive growth.",
    icon: Layers
  },
  {
    title: "SAAS & Start-Up Specialists",
    desc: "We understand the unique challenges of scaling products. Our frameworks are built for rapid iteration and growth.",
    icon: Rocket
  },
  {
    title: "Creative Meets Strategy",
    desc: "We don't just make things look good; we make them perform. Every pixel serves a business purpose.",
    icon: Lightbulb
  }
];

export const EXTENDED_SERVICES: Service[] = [
  ...SERVICES_LIST,
  {
    title: "Search Engine Marketing (SEM)",
    description: "Get instant traffic and measurable results with performance-driven SEM campaigns.",
    icon: BarChart,
    details: ["Google Ads", "Retargeting", "Budget Optimization", "A/B Testing"]
  },
  {
    title: "Lead Generation",
    description: "Full-funnel lead generation systems that consistently feed your pipeline.",
    icon: TrendingUp,
    details: ["Inbound Strategies", "Cold Outreach", "LinkedIn Automation", "Lead Scoring"]
  }
];

export const PORTFOLIO_CATEGORIES = ["All", "Digital Marketing", "Web / Apps", "Video Production", "AI"];

export const PORTFOLIO_SHOWCASE = [
  {
    id: 1,
    client: "FinTech Global",
    headline: "Scaling User Acquisition by 300%",
    category: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    tags: ["Growth", "PPC"]
  },
  {
    id: 2,
    client: "EcoStream",
    headline: "Rebranding a Sustainable Future",
    category: "Web / Apps",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop",
    tags: ["Identity", "UI/UX"]
  },
  {
    id: 3,
    client: "Nexus AI",
    headline: "Next-Gen SaaS Platform",
    category: "AI",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop",
    tags: ["React", "Node.js"]
  },
  {
    id: 4,
    client: "Urban Loft",
    headline: "Luxury Real Estate Presence",
    category: "Video Production",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    tags: ["Web", "SEO"]
  },
  {
    id: 5,
    client: "Vital Health",
    headline: "Telemedicine App Interface",
    category: "Web / Apps",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
    tags: ["App", "UX"]
  },
  {
    id: 6,
    client: "Lumina",
    headline: "Modern E-commerce Exp.",
    category: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    tags: ["Shopify", "Design"]
  },
  {
    id: 7,
    client: "Velocity",
    headline: "Automotive Future",
    category: "Web / Apps",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2890&auto=format&fit=crop",
    tags: ["3D", "Performance"]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    client: "FinTech Global",
    headline: "Scaling User Acquisition by 300%",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    challenge: "Stagnant user growth despite high ad spend and solid product offering.",
    solution: "Implemented a full-funnel strategy with automated nurturing and precision targeting.",
    impact: "300% increase in qualified signups within 6 months.",
    tags: ["Growth", "Automation", "PPC"]
  },
  {
    client: "EcoStream",
    headline: "Rebranding a Sustainable Future",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop",
    challenge: "Outdated visual identity failing to connect with Gen Z audience.",
    solution: "Complete visual overhaul, modern UI/UX web design, and motion-rich storytelling.",
    impact: "200% increase in brand engagement and social shares.",
    tags: ["Branding", "UI/UX", "Web Dev"]
  }
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future of AI in Marketing: Beyond the Hype",
    category: "Strategy",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
    excerpt: "Artificial Intelligence isn't just a buzzword—it's reshaping how brands connect. Here's how to leverage it responsibly and effectively."
  },
  {
    id: 2,
    title: "Why Your Brand Needs a Design System",
    category: "Design",
    date: "March 10, 2024",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2564&auto=format&fit=crop",
    excerpt: "Consistency is currency. Learn how a robust design system can save time, reduce tech debt, and amplify your brand identity."
  },
  {
    id: 3,
    title: "Scaling SaaS: Lessons from 0 to 1M Users",
    category: "Growth",
    date: "February 28, 2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    excerpt: "Growth isn't linear. We break down the key pivot points and strategies that helped our clients break through the glass ceiling."
  },
  {
    id: 4,
    title: "The Psychology of Conversion Rate Optimization",
    category: "Marketing",
    date: "February 15, 2024",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop",
    excerpt: "Understanding user behavior is the key to unlocking growth. Dive into the psychological triggers that drive decision-making."
  }
];

export const TESTIMONIALS: (Testimonial & { id: number })[] = [
  {
    id: 0,
    quote: "We've assisted brands in achieving remarkable milestones, such as 7.4 million YouTube views in just 28 days. We don't just make promises about growth; we make it happen.",
    author: "Meet Sarah Johnson",
    role: "Project Manager",
    company: "Innovate Solutions",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 1,
    quote: "The strategic depth Zevenstone brought to our launch was unparalleled. They identified market gaps we hadn't even considered and capitalized on them immediately.",
    author: "Michael Ross",
    role: "Founder",
    company: "Apex Solutions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    quote: "Their team seamlessly blends into ours. It doesn't feel like an agency relationship; it feels like a partnership driven by a unified vision for success.",
    author: "Elena Rodriguez",
    role: "Product Lead",
    company: "Nebula Systems",
    image: "https://images.unsplash.com/photo-1573496359-136d475583dc?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    quote: "From the initial discovery call to the final launch, the process was transparent, efficient, and incredibly creative. The results speak for themselves.",
    author: "David Chen",
    role: "Director",
    company: "Urban Tech",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop"
  }
];

export const FOUNDER_MESSAGE = {
  title: "Building Digital Legacies",
  content: "We are for your growth. Lorem ipsum dolor sit amet, consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.",
  author: "James Zeven",
  role: "Founder & CEO",
  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop"
};

export const FAQS = [
  {
    question: "What services does Zevenstone offer?",
    answer: "We offer comprehensive digital marketing solutions tailored to your business needs, including SEO, Web Development, Branding, AI Solutions, and Performance Marketing."
  },
  {
    question: "How can Zevenstone help my SAAS business grow?",
    answer: "We specialize in SAAS growth through targeted funnels, user acquisition strategies, and retention optimization. Our data-driven approach ensures scalable growth."
  },
  {
    question: "Do you offer video editing and YouTube channel management?",
    answer: "Yes, our Video Production team handles everything from script to screen, including YouTube channel management, SEO for video, and short-form content creation."
  },
  {
    question: "Is Zevenstone based in Chennai or Tirunelveli?",
    answer: "We are a digital-first agency with a global presence. Our team works distributedly to serve clients worldwide, ensuring 24/7 support and delivery."
  },
  {
    question: "How long does it take to see results from SEO or paid campaigns?",
    answer: "Paid campaigns show results almost immediately, while SEO is a long-term strategy typically showing significant growth within 3-6 months."
  },
  {
    question: "Can I hire Zevenstone for a one-time project?",
    answer: "Absolutely. Whether you need a website overhaul, a specific campaign, or a brand refresh, we engage in both project-based and retainer-based partnerships."
  },
  {
    question: "How do I get started with Zevenstone?",
    answer: "Simply click the 'Let's Talk' button, fill out the form, and our strategy team will schedule a discovery call to understand your needs."
  }
];

export const PROCESS_STEPS = [
  {
    title: "Discover",
    description: "We dive deep into your business, market, and customer landscape.",
    icon: Search
  },
  {
    title: "Strategize",
    description: "We create a roadmap powered by insights, goals, and opportunities.",
    icon: Target
  },
  {
    title: "Design & Build",
    description: "From branding to full-stack development, we create solutions that speak and perform.",
    icon: Palette
  },
  {
    title: "Launch & Scale",
    description: "With optimization, automation, and campaigns that convert, we don’t just launch — we accelerate.",
    icon: Rocket
  }
];

export const TEAM_MEMBERS = [
  {
    name: "Alex Morgan",
    role: "Strategy Director",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Elena Cruz",
    role: "Creative Lead",
    image: "https://images.unsplash.com/photo-1573496359-136d475583dc?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "David Park",
    role: "Tech Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Sarah Li",
    role: "Growth Marketer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop"
  }
];
