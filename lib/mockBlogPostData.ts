export const mockPost = {
  _id: 'mock-1',
  title: 'The Purpose of a Design System: Scaling with Consistency',
  category: 'Design & UX',
  categoryId: 'cat-1',
  publishedAt: new Date().toISOString(),
  readTime: 8,
  slug: 'test-design',
  excerpt: 'A comprehensive guide to understanding why design systems are crucial for scaling products, maintaining visual consistency, and improving team velocity.',
  imageUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1200&q=80',
  mainImage: {
    alt: 'Design system elements',
    caption: 'A collection of UI components and design tokens.'
  },
  showTableOfContents: true,
  author: {
    name: 'Sarah Drasner',
    role: 'Lead Designer',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    linkedIn: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    facebook: 'https://facebook.com'
  },
  ctaBanner: {
    heading: 'Ready to Transform Your Digital Presence?',
    description: 'Our team of experts can help you build a design system that scales.',
    buttonText: 'Get Started',
    buttonUrl: '/contact'
  },
  seo: {
    metaTitle: 'The Purpose of a Design System | Zevenstone',
    description: 'Learn why design systems are crucial for scaling products.'
  },
  body: [
    {
      _key: 'b1',
      _type: 'block',
      style: 'normal',
      children: [{ _key: 's1', _type: 'span', text: 'Design systems provide a convenient, centralized, and evolving map of a brand’s known product territories with directional pointers to help you navigate it. They are the single source of truth for your entire product organization.' }]
    },
    {
      _key: 'h2-1',
      _type: 'block',
      style: 'h2',
      children: [{ _key: 's2', _type: 'span', text: 'Core Components' }]
    },
    {
      _key: 'b2',
      _type: 'block',
      style: 'normal',
      children: [{ _key: 's3', _type: 'span', text: 'Before building a system, you must understand what makes up its foundation. A successful system includes not just UI components, but the tokens, guidelines, and processes that govern them.' }]
    },
    {
      _key: 'stats-1',
      _type: 'statsStrip',
      stats: [
        { value: '340%', label: 'Traffic Increase' },
        { value: '79%', label: 'Faster Delivery' },
        { value: '200%', label: 'ROI' }
      ]
    },
    {
      _key: 'h3-1',
      _type: 'block',
      style: 'h3',
      children: [{ _key: 's4', _type: 'span', text: 'Design Tokens' }]
    },
    {
      _key: 'callout-1',
      _type: 'calloutBox',
      type: 'tip',
      title: 'Pro Tip',
      content: 'Always define your design tokens in a platform-agnostic format like JSON so they can be consumed by iOS, Android, and Web applications equally.'
    },
    {
      _key: 'h2-2',
      _type: 'block',
      style: 'h2',
      children: [{ _key: 's5', _type: 'span', text: 'Implementation Process' }]
    },
    {
      _key: 'steps-1',
      _type: 'stepsBlock',
      heading: 'How to build it step by step',
      steps: [
        { title: 'Audit Existing Products', description: 'Take an inventory of all the components currently in use across your product suite.' },
        { title: 'Establish Foundation', description: 'Create colors, typography, spacing, and other baseline design tokens.' },
        { title: 'Build Components', description: 'Assemble tokens into reusable UI components like buttons, inputs, and cards.' }
      ]
    },
    {
      _key: 'quote-1',
      _type: 'pullQuote',
      quote: 'A design system isn’t a project. It’s a product serving products.',
      attribution: 'Nathan Curtis',
      role: 'Design System Consultant'
    },
    {
      _key: 'h2-3',
      _type: 'block',
      style: 'h2',
      children: [{ _key: 's6', _type: 'span', text: 'Evaluating the Investment' }]
    },
    {
      _key: 'proscons-1',
      _type: 'prosConsBlock',
      heading: 'Is a Design System right for you?',
      pros: [
        'Increases speed to market for new features',
        'Ensures visual consistency across platforms',
        'Reduces design and engineering debt over time',
        'Improves accessibility by baking it into the foundation'
      ],
      cons: [
        'Requires significant upfront time and resource investment',
        'Needs continuous maintenance, versioning, and governance',
        'Can feel restrictive to some designers if not implemented flexibly'
      ]
    }
  ]
};

export const mockPageData = {
  newsletterSection: {
    heading: 'Stay Ahead of the Curve',
    description: 'Get the latest insights on design systems and digital product development delivered straight to your inbox.',
    buttonText: 'Subscribe Now',
    placeholder: 'Enter your email address'
  }
};

export const mockRelatedPosts = [
  {
    _id: 'r1',
    title: 'How to Scale Your React Application',
    slug: 'scale-react',
    excerpt: 'Learn the architectural patterns that help large teams scale React applications without losing their minds.',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
    category: 'Engineering',
    publishedAt: new Date().toISOString()
  },
  {
    _id: 'r2',
    title: 'The Future of Headless CMS',
    slug: 'headless-cms-future',
    excerpt: 'Why traditional content management systems are dying and how headless CMS architectures are taking over.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    category: 'Architecture',
    publishedAt: new Date().toISOString()
  },
  {
    _id: 'r3',
    title: 'Mastering Framer Motion',
    slug: 'framer-motion-mastery',
    excerpt: 'Take your React animations to the next level with our comprehensive guide to Framer Motion.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    category: 'Design Engineering',
    publishedAt: new Date().toISOString()
  }
];
