import { ArrowLeft, CheckCircle, TrendingUp, Users, Target, Zap, ArrowRight, AlertCircle, Lightbulb, BarChart3, Rocket, Shield, Clock, Award, Calendar, Percent, DollarSign, Eye, MousePointer, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import imgLinkLogo from "figma:asset/d6b4068dc3d123a48d4bf530d049c00f8c2a3178.png";
import imgContainer from "figma:asset/72dc829870ddb6968026ae2e76fa4ae41738fe2d.png";
import imgContainer1 from "figma:asset/10949d8d330a33dc0a24da6484c3842029dd4786.png";
import imgMichaelRoss from "figma:asset/73fec9f879c0cd011ededfc2913259ece20d285c.png";

interface StoryData {
  id: string;
  client: string;
  industry: string;
  title: string;
  subtitle: string;
  heroImage: string;
  challenge: {
    overview: string;
    painPoints: string[];
  };
  solution: {
    overview: string;
    strategies: Array<{
      title: string;
      description: string;
    }>;
  };
  results: {
    overview: string;
    metrics: Array<{
      value: string;
      label: string;
    }>;
    additionalImpact: string[];
  };
  testimonial: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
  timeline: string;
  services: string[];
  beforeAfter?: {
    before: Array<{ metric: string; value: string }>;
    after: Array<{ metric: string; value: string }>;
  };
  processTimeline?: Array<{
    phase: string;
    duration: string;
    description: string;
    deliverables: string[];
  }>;
}

const storiesData: { [key: string]: StoryData } = {
  'fintech-global': {
    id: 'fintech-global',
    client: 'FinTech Global',
    industry: 'Financial Technology',
    title: 'Scaling User Acquisition by 300%',
    subtitle: 'How data-driven growth strategies transformed a stagnant fintech startup into a market leader',
    heroImage: imgContainer,
    challenge: {
      overview: "FinTech Global came to us with a critical problem: despite having a solid product and significant ad spend, user growth had plateaued. Their cost per acquisition was increasing while conversion rates declined, threatening the company's runway and investor confidence.",
      painPoints: [
        'Stagnant user growth despite 6-figure monthly ad spend',
        'Rising customer acquisition costs (CAC increased 45% YoY)',
        'Poor conversion rates across all marketing channels',
        'Lack of clear attribution and analytics infrastructure',
        'Inconsistent messaging across different touchpoints',
        'High bounce rates on landing pages (78% average)'
      ]
    },
    solution: {
      overview: "We implemented a comprehensive growth strategy combining conversion rate optimization, performance marketing, and data infrastructure improvements.",
      strategies: [
        {
          title: 'Conversion Funnel Redesign',
          description: 'Rebuilt the entire user journey from awareness to activation, removing friction points and implementing psychological triggers at key decision moments.'
        },
        {
          title: 'Advanced Analytics Implementation',
          description: 'Deployed comprehensive tracking infrastructure using Segment, Mixpanel, and custom attribution modeling to understand true ROI by channel and campaign.'
        },
        {
          title: 'Performance Marketing Optimization',
          description: 'Restructured ad accounts, implemented granular audience segmentation, and developed creative testing frameworks that reduced CAC by 62%.'
        },
        {
          title: 'Activation & Retention System',
          description: 'Created personalized onboarding flows and email nurture sequences that increased trial-to-paid conversion by 180%.'
        }
      ]
    },
    results: {
      overview: "Within 6 months, FinTech Global achieved breakthrough growth that exceeded all projections. The company moved from struggling to scale to becoming a category leader.",
      metrics: [
        { value: '300%', label: 'Increase in qualified signups' },
        { value: '62%', label: 'Reduction in CAC' },
        { value: '180%', label: 'Trial-to-paid conversion lift' },
        { value: '$2.4M', label: 'Additional ARR in 6 months' }
      ],
      additionalImpact: [
        'Secured $18M Series B funding (3x higher valuation than projected)',
        'Reduced payback period from 18 months to 7 months',
        'Increased customer lifetime value (LTV) by 156%',
        'Improved Net Promoter Score (NPS) from 32 to 67',
        'Expanded to 3 new markets ahead of schedule'
      ]
    },
    testimonial: {
      quote: "The strategic depth Zevenstone brought to our launch was unparalleled. They identified market gaps we hadn't even considered and capitalized on them immediately.",
      author: 'Michael Ross',
      role: 'CEO, FinTech Global',
      avatar: imgMichaelRoss
    },
    timeline: '6 months',
    services: ['Growth Strategy', 'Performance Marketing', 'CRO', 'Analytics Infrastructure', 'Email Marketing'],
    beforeAfter: {
      before: [
        { metric: 'Monthly Signups', value: '850' },
        { metric: 'CAC', value: '$187' },
        { metric: 'Conversion Rate', value: '1.2%' },
        { metric: 'Churn Rate', value: '8.5%' }
      ],
      after: [
        { metric: 'Monthly Signups', value: '3,400' },
        { metric: 'CAC', value: '$71' },
        { metric: 'Conversion Rate', value: '3.4%' },
        { metric: 'Churn Rate', value: '3.2%' }
      ]
    },
    processTimeline: [
      {
        phase: 'Discovery & Audit',
        duration: 'Week 1-2',
        description: 'Comprehensive analysis of existing funnel, data infrastructure, and competitive landscape',
        deliverables: ['Analytics audit report', 'Competitor analysis', 'User research insights', 'Opportunity map']
      },
      {
        phase: 'Strategy & Planning',
        duration: 'Week 3-4',
        description: 'Development of growth roadmap, testing framework, and tracking implementation',
        deliverables: ['Growth strategy document', 'Testing roadmap', 'Analytics setup', 'Creative brief']
      },
      {
        phase: 'Implementation',
        duration: 'Month 2-3',
        description: 'Launch of optimized campaigns, new funnels, and iterative testing cycles',
        deliverables: ['Campaign launches', 'Funnel redesigns', 'A/B test results', 'Weekly reports']
      },
      {
        phase: 'Scale & Optimize',
        duration: 'Month 4-6',
        description: 'Scaling winning campaigns, expanding channels, and refining attribution models',
        deliverables: ['Channel expansion', 'Budget scaling', 'Automation setup', 'Final results report']
      }
    ]
  },
  'ecostream': {
    id: 'ecostream',
    client: 'EcoStream',
    industry: 'Sustainable Technology',
    title: 'Rebranding a Sustainable Future',
    subtitle: 'Complete brand transformation that connected with Gen Z and doubled market share',
    heroImage: imgContainer1,
    challenge: {
      overview: "EcoStream's outdated visual identity and messaging were failing to resonate with their target Gen Z audience. Despite having superior sustainable products, they were losing market share to competitors.",
      painPoints: [
        'Outdated brand identity that looked corporate and uninspiring',
        'Failing to connect emotionally with Gen Z sustainability values',
        'Low social media engagement (0.8% average)',
        'Declining market share despite product superiority',
        'Weak brand recall and consideration metrics',
        'Inconsistent brand experience across digital touchpoints'
      ]
    },
    solution: {
      overview: "We executed a complete brand transformation—from visual identity to messaging framework—built around authentic sustainability values and Gen Z cultural insights.",
      strategies: [
        {
          title: 'Brand Strategy & Positioning',
          description: 'Developed a new brand platform centered on radical transparency and climate action, positioning EcoStream as the activist brand for conscious consumers.'
        },
        {
          title: 'Visual Identity System',
          description: 'Created a bold, modern design system featuring vibrant eco-inspired colors, dynamic typography, and an illustrative approach that stands out in the category.'
        },
        {
          title: 'Content & Social Strategy',
          description: 'Built an authentic content engine focused on education, impact stories, and community building—shifting from product-first to values-first communication.'
        },
        {
          title: 'Digital Experience Redesign',
          description: 'Rebuilt website and e-commerce experience with focus on storytelling, impact tracking, and frictionless shopping for mobile-first Gen Z users.'
        }
      ]
    },
    results: {
      overview: "The rebrand transformed EcoStream from a forgettable sustainability brand into a cultural movement. Social engagement skyrocketed, market share doubled, and the brand became a category leader among Gen Z consumers.",
      metrics: [
        { value: '200%', label: 'Increase in brand engagement' },
        { value: '425%', label: 'Growth in social following' },
        { value: '156%', label: 'Increase in online sales' },
        { value: '2.1M', label: 'Earned media impressions' }
      ],
      additionalImpact: [
        'Featured in major publications (Forbes, Fast Company, Vogue)',
        'Won "Brand of the Year" at Sustainable Business Awards',
        'Increased brand recall from 12% to 68% in target demographic',
        'User-generated content increased by 340%',
        'Successfully launched 3 new product lines with 2x higher adoption'
      ]
    },
    testimonial: {
      quote: "Zevenstone didn't just give us a new logo—they gave us a movement. The rebrand completely transformed how our audience perceives us and how we show up in the world.",
      author: 'Sarah Chen',
      role: 'Chief Brand Officer, EcoStream',
      avatar: imgMichaelRoss
    },
    timeline: '4 months',
    services: ['Brand Strategy', 'Visual Identity', 'Content Strategy', 'Web Design', 'Social Media Marketing'],
    beforeAfter: {
      before: [
        { metric: 'Social Engagement', value: '0.8%' },
        { metric: 'Brand Recall', value: '12%' },
        { metric: 'Monthly Revenue', value: '$145K' },
        { metric: 'Instagram Followers', value: '8.2K' }
      ],
      after: [
        { metric: 'Social Engagement', value: '4.2%' },
        { metric: 'Brand Recall', value: '68%' },
        { metric: 'Monthly Revenue', value: '$371K' },
        { metric: 'Instagram Followers', value: '43K' }
      ]
    },
    processTimeline: [
      {
        phase: 'Brand Discovery',
        duration: 'Week 1-2',
        description: 'Deep dive into brand values, target audience research, and competitive positioning',
        deliverables: ['Brand workshop', 'Audience personas', 'Positioning statement', 'Mood boards']
      },
      {
        phase: 'Design Development',
        duration: 'Week 3-6',
        description: 'Creating new visual identity system including logo, colors, typography, and brand elements',
        deliverables: ['Logo concepts', 'Design system', 'Brand guidelines', 'Asset library']
      },
      {
        phase: 'Content & Digital',
        duration: 'Week 7-12',
        description: 'Website redesign, content strategy, and social media launch plan',
        deliverables: ['Website redesign', 'Content calendar', 'Social templates', 'Launch campaign']
      },
      {
        phase: 'Launch & Amplify',
        duration: 'Week 13-16',
        description: 'Brand rollout across all touchpoints and amplification through influencer partnerships',
        deliverables: ['Launch event', 'PR campaign', 'Influencer partnerships', 'Performance tracking']
      }
    ]
  }
};

interface StoryDetailPageProps {
  storyId: string;
}

export default function StoryDetailPage({ storyId }: StoryDetailPageProps) {
  const [activeTab, setActiveTab] = useState<'challenge' | 'solution' | 'results'>('challenge');
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const story = storiesData[storyId];

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Story not found</h1>
          <a href="#/stories" className="text-blue-500 hover:underline">← Back to Stories</a>
        </div>
      </div>
    );
  }

  const handleBackToStories = () => {
    window.location.hash = '/stories';
  };

  const scrollToContactCTA = () => {
    const element = document.getElementById('contact-cta');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Show sticky CTA after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-['Poppins',sans-serif]">
      {/* Navigation - Brand-aligned floating style */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4">
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-full shadow-lg px-6 py-4">
          <div className="flex items-center justify-between">
            <img src={imgLinkLogo} alt="Zevenstone" className="h-8" />
            <div className="flex items-center gap-6">
              <button
                onClick={handleBackToStories}
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                All Stories
              </button>
              <button
                onClick={scrollToContactCTA}
                className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover:bg-gray-800 transition-all flex items-center gap-2"
              >
                Get Similar Results
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sticky CTA Bar - Appears on scroll */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 transform transition-transform duration-300 ${showStickyCTA ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="backdrop-blur-xl bg-white/95 border-t border-gray-200 shadow-2xl">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {story.results.metrics[0].value.substring(0, 3)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Ready for similar results?</div>
                    <div className="text-xs text-gray-600">Join {story.client} and 500+ successful brands</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={scrollToContactCTA}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Start Your Success Story
                </button>
                <button
                  onClick={() => setShowStickyCTA(false)}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Brand-aligned with gradient blur backgrounds */}
      <section className="relative pt-32 pb-20 px-6 bg-[#f8fafc] overflow-hidden">
        {/* Background gradient blurs - matching brand style */}
        <div className="absolute top-0 right-0 w-[947px] h-[947px] bg-blue-500/5 rounded-full blur-[60px] opacity-28 -translate-y-20 translate-x-20" />
        <div className="absolute top-[354px] left-10 w-[546px] h-[546px] bg-blue-400/5 rounded-full blur-[45px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge - brand style */}
              <div className="inline-block backdrop-blur-md bg-white/60 border border-blue-500/20 rounded-full px-5 py-2.5 shadow-sm mb-6">
                <p className="text-sm font-semibold text-blue-500 tracking-[2px] uppercase">
                  {story.client} • {story.industry}
                </p>
              </div>

              <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
                {story.title}
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {story.subtitle}
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="backdrop-blur-xl bg-white/80 border border-white/60 rounded-[24px] shadow-lg p-6">
                  <div className="text-4xl font-extrabold text-blue-500 mb-1">
                    {story.results.metrics[0].value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {story.results.metrics[0].label}
                  </div>
                </div>
                <div className="backdrop-blur-xl bg-white/80 border border-white/60 rounded-[24px] shadow-lg p-6">
                  <div className="text-4xl font-extrabold text-blue-500 mb-1">
                    {story.timeline}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Timeline</div>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToContactCTA}
                  className="bg-gray-900 text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:bg-gray-800 hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  Get Similar Results
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={handleBackToStories}
                  className="border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all"
                >
                  View More Stories
                </button>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Free consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="font-medium">No obligation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Same-day response</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white/50">
                <img src={story.heroImage} alt={story.client} className="w-full h-auto" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 backdrop-blur-xl bg-white/90 border border-white/60 rounded-[24px] shadow-2xl px-8 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-gray-900">Success Story</div>
                    <div className="text-sm text-gray-600 font-medium">{story.timeline} transformation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics - Brand-aligned cards */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block backdrop-blur-md bg-blue-500/10 border border-blue-500/20 rounded-full px-5 py-2.5 shadow-sm mb-4">
              <p className="text-sm font-semibold text-blue-600 tracking-[2px] uppercase">
                Key Results
              </p>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              The Numbers That Matter
            </h2>
            <p className="text-xl text-gray-600">
              Measurable impact delivered in {story.timeline}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {story.results.metrics.map((metric, idx) => {
              const colors = [
                'from-blue-500 to-blue-600',
                'from-purple-500 to-purple-600',
                'from-green-500 to-green-600',
                'from-orange-500 to-orange-600'
              ];

              return (
                <div key={idx} className="backdrop-blur-xl bg-white/80 border border-white/60 rounded-[32px] shadow-lg p-8 text-center hover:shadow-2xl hover:scale-105 transition-all group">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${colors[idx % colors.length]} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <div className="text-5xl font-extrabold text-gray-900 mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{metric.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Highlights */}
      <section className="py-16 px-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-2">Impact at a Glance</h3>
            <p className="text-gray-400">The numbers that matter</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {story.results.metrics.map((metric, idx) => {
              const icons = [TrendingUp, DollarSign, Percent, Users];
              const Icon = icons[idx % icons.length];
              const colors = ['from-blue-500 to-blue-600', 'from-purple-500 to-purple-600', 'from-green-500 to-green-600', 'from-orange-500 to-orange-600'];

              return (
                <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group">
                  <div className={`w-12 h-12 bg-gradient-to-br ${colors[idx % colors.length]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">{metric.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services - Brand-aligned */}
      <section className="bg-[#f8fafc] py-12 px-6 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Services Delivered</div>
            <div className="flex flex-wrap items-center gap-3 justify-center">
              {story.services.map((service, idx) => (
                <span key={idx} className="backdrop-blur-md bg-white/80 text-gray-900 px-6 py-3 rounded-full text-sm font-bold border border-gray-200 shadow-md hover:shadow-lg hover:scale-105 transition-all">
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Comparison */}
      {story.beforeAfter && (
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                <BarChart3 className="w-4 h-4" />
                The Transformation
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2c2e33] mb-4">
                Before vs After
              </h2>
              <p className="text-xl text-gray-600">
                See the measurable impact we delivered in just {story.timeline}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Before */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-10 border-2 border-red-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/5 rounded-full blur-3xl" />

                <div className="flex items-center gap-3 mb-8 relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <AlertCircle className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Before</h3>
                </div>

                <div className="space-y-4 relative z-10">
                  {story.beforeAfter.before.map((item, idx) => (
                    <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-red-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">{item.metric}</span>
                        <span className="text-2xl font-extrabold text-red-600">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* After */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 border-2 border-green-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/5 rounded-full blur-3xl" />

                <div className="flex items-center gap-3 mb-8 relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">After</h3>
                  <div className="ml-auto bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold">
                    {story.timeline}
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  {story.beforeAfter.after.map((item, idx) => (
                    <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-green-200 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center justify-between relative z-10">
                        <span className="text-sm font-semibold text-gray-700">{item.metric}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-extrabold text-green-600">{item.value}</span>
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Improvement indicators */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl shadow-xl">
                <Award className="w-6 h-6" />
                <span className="font-bold text-lg">Measurable Results in {story.timeline}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Overview */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#2c2e33] mb-6">
            The Story Behind the Numbers
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {story.results.overview}
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 px-6 bg-gray-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" aria-hidden="true" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
              <button
                onClick={() => setActiveTab('challenge')}
                className={`px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'challenge'
                    ? 'bg-red-50 text-red-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <AlertCircle className="w-5 h-5" aria-hidden="true" />
                The Challenge
              </button>
              <button
                onClick={() => setActiveTab('solution')}
                className={`px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'solution'
                    ? 'bg-blue-50 text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Lightbulb className="w-5 h-5" aria-hidden="true" />
                Our Solution
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'results'
                    ? 'bg-green-50 text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <TrendingUp className="w-5 h-5" aria-hidden="true" />
                The Results
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'challenge' && (
              <div className="max-w-6xl mx-auto">
                {/* Header with icon */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl mb-6 shadow-xl">
                    <AlertCircle className="w-10 h-10 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#2c2e33] mb-4">The Challenge</h3>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">{story.challenge.overview}</p>
                </div>

                {/* Pain points with icons and numbers */}
                <div className="grid md:grid-cols-2 gap-6">
                  {story.challenge.painPoints.map((point, idx) => {
                    const icons = [AlertCircle, Clock, Target, Shield];
                    const Icon = icons[idx % icons.length];

                    return (
                      <div key={idx} className="bg-white border-l-4 border-red-500 p-6 rounded-r-2xl shadow-md hover:shadow-xl transition-shadow relative overflow-hidden group">
                        {/* Number badge */}
                        <div className="absolute top-4 right-4 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                          <span className="text-red-600 font-bold text-lg">{idx + 1}</span>
                        </div>

                        {/* Icon */}
                        <div className="flex items-start gap-4 mb-3">
                          <div className="bg-red-100 p-3 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                            <Icon className="w-6 h-6 text-red-600" aria-hidden="true" />
                          </div>
                        </div>

                        <p className="text-gray-700 leading-relaxed font-medium pr-12">{point}</p>

                        {/* Decorative corner element */}
                        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-red-50 to-transparent rounded-tl-full" aria-hidden="true" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'solution' && (
              <div className="max-w-6xl mx-auto">
                {/* Header with icon */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl mb-6 shadow-xl">
                    <Lightbulb className="w-10 h-10 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#2c2e33] mb-4">Our Approach</h3>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">{story.solution.overview}</p>
                </div>

                {/* Strategies with icons and visual enhancements */}
                <div className="grid md:grid-cols-2 gap-8">
                  {story.solution.strategies.map((strategy, idx) => {
                    const icons = [Rocket, Target, BarChart3, Zap];
                    const Icon = icons[idx % icons.length];
                    const colors = [
                      { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', gradient: 'from-blue-500 to-blue-600' },
                      { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', gradient: 'from-purple-500 to-purple-600' },
                      { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', gradient: 'from-indigo-500 to-indigo-600' },
                      { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200', gradient: 'from-cyan-500 to-cyan-600' }
                    ];
                    const color = colors[idx % colors.length];

                    return (
                      <div key={idx} className={`bg-white rounded-2xl p-8 shadow-xl border-2 ${color.border} hover:shadow-2xl transition-all relative overflow-hidden group`}>
                        {/* Background pattern */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50/50 to-transparent rounded-bl-full" aria-hidden="true" />

                        {/* Step indicator */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`bg-gradient-to-br ${color.gradient} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                            <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                          </div>
                          <div className={`${color.bg} px-4 py-2 rounded-full`}>
                            <span className={`${color.text} font-bold text-sm`}>STEP {idx + 1}</span>
                          </div>
                        </div>

                        <h4 className="text-xl font-bold text-[#2c2e33] mb-3">{strategy.title}</h4>
                        <p className="text-gray-600 leading-relaxed relative z-10">{strategy.description}</p>

                        {/* Decorative element */}
                        <div className={`absolute bottom-0 left-0 h-1 w-full ${color.bg} group-hover:h-2 transition-all`} aria-hidden="true" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'results' && (
              <div className="max-w-6xl mx-auto">
                {/* Header with icon */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl mb-6 shadow-xl">
                    <TrendingUp className="w-10 h-10 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#2c2e33] mb-4">Business Impact</h3>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                    Measurable results that transformed their business
                  </p>
                </div>

                {/* Results with enhanced visuals */}
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-10 shadow-xl border-2 border-green-100 relative overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5" aria-hidden="true">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle, #10b981 2px, transparent 2px)',
                      backgroundSize: '40px 40px'
                    }} />
                  </div>

                  <h4 className="text-2xl font-bold text-[#2c2e33] mb-8 flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    Business Impact Highlights
                  </h4>

                  <div className="grid md:grid-cols-2 gap-6 relative z-10">
                    {story.results.additionalImpact.map((impact, idx) => (
                      <div key={idx} className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow group">
                        <div className="bg-gradient-to-br from-green-500 to-green-600 w-10 h-10 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md">
                          <CheckCircle className="w-6 h-6 text-white" aria-hidden="true" />
                        </div>
                        <p className="text-gray-700 leading-relaxed font-medium pt-1">{impact}</p>
                      </div>
                    ))}
                  </div>

                  {/* Success badge */}
                  <div className="mt-8 flex justify-center">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-full shadow-lg">
                      <TrendingUp className="w-5 h-5" aria-hidden="true" />
                      <span className="font-bold">Success Story</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      {story.processTimeline && (
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                <Clock className="w-4 h-4" />
                Our Process
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2c2e33] mb-4">
                How We Made It Happen
              </h2>
              <p className="text-xl text-gray-600">
                A transparent look at our {story.timeline} journey together
              </p>
            </div>

            <div className="relative">
              {/* Timeline connector line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-green-200 hidden lg:block" />

              <div className="space-y-12">
                {story.processTimeline.map((phase, idx) => {
                  const colors = [
                    { bg: 'from-blue-500 to-blue-600', border: 'border-blue-200', icon: 'bg-blue-100 text-blue-600' },
                    { bg: 'from-purple-500 to-purple-600', border: 'border-purple-200', icon: 'bg-purple-100 text-purple-600' },
                    { bg: 'from-indigo-500 to-indigo-600', border: 'border-indigo-200', icon: 'bg-indigo-100 text-indigo-600' },
                    { bg: 'from-green-500 to-green-600', border: 'border-green-200', icon: 'bg-green-100 text-green-600' }
                  ];
                  const color = colors[idx % colors.length];

                  return (
                    <div key={idx} className="relative lg:pl-24">
                      {/* Timeline dot */}
                      <div className={`absolute left-0 top-8 w-16 h-16 bg-gradient-to-br ${color.bg} rounded-2xl shadow-xl hidden lg:flex items-center justify-center text-white font-bold text-xl`}>
                        {idx + 1}
                      </div>

                      <div className={`bg-white rounded-3xl p-8 md:p-10 shadow-xl border-2 ${color.border} hover:shadow-2xl transition-all relative overflow-hidden group`}>
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50/50 to-transparent rounded-bl-full" />

                        <div className="relative z-10">
                          {/* Header */}
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className={`lg:hidden inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br ${color.bg} rounded-xl text-white font-bold text-sm`}>
                                  {idx + 1}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{phase.phase}</h3>
                              </div>
                            </div>
                            <div className={`inline-flex items-center gap-2 ${color.icon} px-5 py-2 rounded-full font-bold text-sm`}>
                              <Calendar className="w-4 h-4" />
                              {phase.duration}
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            {phase.description}
                          </p>

                          {/* Deliverables */}
                          <div>
                            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                              Key Deliverables
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              {phase.deliverables.map((deliverable, dIdx) => (
                                <div key={dIdx} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                  <span className="text-sm font-medium text-gray-700">{deliverable}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Progress indicator */}
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-100 overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${color.bg} transition-all duration-1000 group-hover:w-full`}
                            style={{ width: `${((idx + 1) / story.processTimeline.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timeline summary */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl px-10 py-6 border border-blue-100 shadow-lg">
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-blue-600 mb-1">{story.timeline}</div>
                  <div className="text-sm text-gray-600 font-semibold">Total Duration</div>
                </div>
                <div className="w-px h-12 bg-gray-300" />
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-purple-600 mb-1">{story.processTimeline.length}</div>
                  <div className="text-sm text-gray-600 font-semibold">Phases</div>
                </div>
                <div className="w-px h-12 bg-gray-300" />
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-green-600 mb-1">{story.processTimeline.reduce((acc, p) => acc + p.deliverables.length, 0)}</div>
                  <div className="text-sm text-gray-600 font-semibold">Deliverables</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mid-journey CTA - Strategic placement */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-[40px] p-12 md:p-16 text-center shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 opacity-90" />
            <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-full mb-6 text-sm font-bold text-white">
                <Rocket className="w-4 h-4" />
                Ready to Transform Your Business?
              </div>

              <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                Your Success Story Starts Here
              </h3>

              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join {story.client} and 500+ brands achieving breakthrough results with data-driven strategies.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={scrollToContactCTA}
                  className="bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:bg-blue-50 hover:scale-105 transition-all"
                >
                  Get Your Free Strategy Session
                </button>
                <button
                  onClick={handleBackToStories}
                  className="border-2 border-white/40 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 backdrop-blur-sm transition-all"
                >
                  View More Case Studies
                </button>
              </div>

              {/* Trust indicators */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-white/90">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Free 30-min consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">No commitment required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  <span className="font-medium">Custom growth roadmap</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial - Brand-aligned */}
      <section className="py-20 px-6 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto">
          <div className="backdrop-blur-xl bg-white/90 border border-white/60 rounded-[40px] shadow-2xl p-12 md:p-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-8 h-8 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>

            <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-10 text-center text-gray-900">
              "{story.testimonial.quote}"
            </blockquote>

            <div className="flex items-center justify-center gap-6">
              <img
                src={story.testimonial.avatar}
                alt={story.testimonial.author}
                className="w-20 h-20 rounded-full border-4 border-white shadow-xl object-cover"
              />
              <div className="text-left">
                <div className="text-xl font-bold text-gray-900 mb-1">{story.testimonial.author}</div>
                <div className="text-gray-600 font-medium">{story.testimonial.role}</div>
                <div className="text-sm text-blue-600 font-semibold mt-1">{story.client}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Stories - Brand-aligned */}
      <section className="py-20 px-6 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block backdrop-blur-md bg-blue-500/10 border border-blue-500/20 rounded-full px-5 py-2.5 shadow-sm mb-6">
              <p className="text-sm font-semibold text-blue-600 tracking-[2px] uppercase">
                More Success Stories
              </p>
            </div>
            <h2 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Explore Other Transformations
            </h2>
            <p className="text-xl text-gray-600">
              See how we've helped brands across industries achieve breakthrough results
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {Object.values(storiesData)
              .filter(s => s.id !== storyId)
              .map((relatedStory) => (
                <div
                  key={relatedStory.id}
                  className="backdrop-blur-xl bg-white/80 border border-white/60 rounded-[40px] overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer group"
                  onClick={() => {
                    window.location.hash = `/story/${relatedStory.id}`;
                    window.scrollTo(0, 0);
                  }}
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={relatedStory.heroImage}
                      alt={relatedStory.client}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-6 left-6">
                      <div className="backdrop-blur-md bg-white/20 border border-white/40 px-4 py-2 rounded-full">
                        <span className="text-white text-xs font-bold uppercase tracking-wider">
                          {relatedStory.industry}
                        </span>
                      </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl font-extrabold text-white leading-tight mb-2">
                        {relatedStory.title}
                      </h3>
                      <p className="text-blue-200 font-medium text-sm">
                        {relatedStory.client}
                      </p>
                    </div>
                  </div>

                  <div className="p-8">
                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-2">
                      {relatedStory.subtitle}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <div>
                        <div className="text-4xl font-extrabold text-blue-500 mb-1">
                          {relatedStory.results.metrics[0].value}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          {relatedStory.results.metrics[0].label}
                        </div>
                      </div>
                      <div className="bg-gray-900 text-white px-6 py-3 rounded-full font-bold text-sm inline-flex items-center gap-2 group-hover:gap-4 transition-all shadow-lg">
                        Read Story
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="text-center">
            <button
              onClick={handleBackToStories}
              className="bg-gray-900 text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:bg-gray-800 hover:scale-105 transition-all inline-flex items-center gap-3"
            >
              View All Success Stories
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA - Brand-aligned with contact form */}
      <section id="contact-cta" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block backdrop-blur-md bg-blue-500/10 border border-blue-500/20 rounded-full px-5 py-2.5 shadow-sm mb-6">
              <p className="text-sm font-semibold text-blue-600 tracking-[2px] uppercase">
                Let's Build Your Success Story
              </p>
            </div>

            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Ready to Achieve Similar Results?
            </h2>

            <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
              Join {story.client} and 500+ successful brands. Get a free strategy session and custom growth roadmap.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Value Props */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                What You'll Get:
              </h3>

              {[
                {
                  icon: <Target className="w-6 h-6" />,
                  title: 'Custom Growth Strategy',
                  description: 'Tailored roadmap based on your goals, industry, and target audience'
                },
                {
                  icon: <BarChart3 className="w-6 h-6" />,
                  title: 'Competitive Analysis',
                  description: 'Deep dive into your market position and untapped opportunities'
                },
                {
                  icon: <Rocket className="w-6 h-6" />,
                  title: 'Quick Wins Identified',
                  description: 'Immediate actions you can take to start seeing results'
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: 'Expert Team Access',
                  description: 'Direct line to strategists who delivered {story.results.metrics[0].value} growth'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 backdrop-blur-xl bg-white/80 border border-white/60 rounded-[24px] shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg mb-1">{item.title}</div>
                    <div className="text-gray-600 text-sm">{item.description}</div>
                  </div>
                </div>
              ))}

              {/* Social proof */}
              <div className="backdrop-blur-md bg-green-50/80 border border-green-200 rounded-[24px] p-6 mt-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex -space-x-2">
                    {[imgMichaelRoss, imgMichaelRoss, imgMichaelRoss].map((img, i) => (
                      <img key={i} src={img} alt="Client" className="w-10 h-10 rounded-full border-2 border-white" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">500+ businesses</span> trust us with their growth. Average rating: <span className="font-bold">4.9/5</span>
                </p>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="backdrop-blur-xl bg-white/90 border border-white/60 rounded-[40px] shadow-2xl p-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Schedule Your Free Consultation
              </h3>

              <div className="space-y-4 mb-8">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-900 font-medium"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-900 font-medium"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-900 font-medium"
                />
                <textarea
                  placeholder="Tell us about your goals..."
                  rows={4}
                  className="w-full px-6 py-4 rounded-[24px] border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-900 font-medium resize-none"
                />
              </div>

              <button className="w-full bg-gray-900 text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:bg-gray-800 hover:scale-105 transition-all mb-6">
                Get My Free Strategy Session
              </button>

              <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free consultation</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>No commitment</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>30 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Brand-aligned */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <img src={imgLinkLogo} alt="Zevenstone" className="h-8 mb-4 brightness-0 invert" />
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Strategic digital solutions built to drive measurable growth.
              </p>
              {/* Social proof badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-bold text-gray-300">500+ Success Stories</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#/" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#/services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#/stories" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#/blog" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Video Production</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Digital Marketing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Brand Strategy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="mailto:hello@zevenstone.com" className="hover:text-white transition-colors">hello@zevenstone.com</a></li>
                <li><a href="tel:+15551234567" className="hover:text-white transition-colors">+1 (555) 123-4567</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
              <p>© 2026 Zevenstone LLC. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#/terms" className="hover:text-white transition-colors">Terms & Conditions</a>
                <a href="#/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
