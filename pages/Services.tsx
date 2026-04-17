
import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { sanityClient } from '../lib/sanity';
import { SERVICES_QUERY, HOME_PAGE_QUERY, SERVICES_PAGE_QUERY } from '../lib/queries';
import { urlFor } from '../lib/sanity';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorState } from '../components/ui/ErrorState';
import { Helmet } from 'react-helmet-async';
import { Check, ArrowRight, Zap, Code, Database, Layout, Smartphone, Globe, LineChart, AlertTriangle, Brain, TrendingUp, Users, Star, ChevronRight, Layers } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

// Reusable ScrollReveal Component (Internal)
const ScrollReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// Helper for dynamic icons since Sanity doesn't store React components
const getServiceIcon = (title: string, index: number) => {
  const t = title.toLowerCase();
  if (t.includes('marketing') || t.includes('seo') || t.includes('sem')) return LineChart;
  if (t.includes('web')) return Globe;
  if (t.includes('app')) return Smartphone;
  if (t.includes('video')) return Layout;
  if (t.includes('ai') || t.includes('data')) return Database;

  const fallbacks = [Zap, Code, Globe, LineChart, Database, Smartphone];
  return fallbacks[index % fallbacks.length];
};

// Pillar icon helper
const getPillarIcon = (index: number) => {
  const icons = [Layers, Brain, TrendingUp];
  return icons[index % icons.length];
};

// Default data constants
const DEFAULT_POSITIONING_INTRO = {
  heading: 'Intelligent Growth Systems for Scalable Businesses',
  description: 'We build integrated growth systems that replace 4–6 fragmented agency vendors with one unified, strategy-led engine — powered by the right people and the right technology.\n\nZevenstone is not a traditional marketing agency. We design and deploy end-to-end growth systems that combine human expertise, creative excellence, and intelligent automation into a single, scalable framework — where AI enhances every layer of execution without replacing the thinking behind it.',
  positioningLine: 'Zevenstone is where human expertise, creative excellence, and intelligent technology converge to build scalable growth systems.',
};

const DEFAULT_PROBLEM = {
  heading: 'The Problem',
  items: [
    'Multiple vendors across SEO, ads, content, and CRM',
    'Disconnected systems and fragmented data',
    'Slow execution and inconsistent results',
    'Manual processes that don\'t scale',
  ],
  closingLine: 'This leads to inefficiency, higher costs, and missed growth opportunities.',
};

const DEFAULT_PILLARS = [
  {
    pillarNumber: 'Pillar 1 — Create',
    title: 'Brand, Design & Content at Scale',
    description: 'We produce high-impact creative assets built around performance, purpose, and conversion — where human creativity is amplified by intelligent content systems.',
    capabilities: ['Conversion-Led Experience Design (UI/UX)', 'Brand Identity & Visual Production', 'Motion & Video Content Systems', 'Social Media Content & Creative Production'],
  },
  {
    pillarNumber: 'Pillar 2 — Automate',
    title: 'Marketing Automation, CRM & Intelligent Workflows',
    description: 'We streamline manual effort and deploy smart, self-optimising systems — combining proven marketing operations with AI-assisted workflows that keep your business moving efficiently at every stage of the customer journey.',
    capabilities: ['Revenue Operations & CRM Architecture', 'Automated Lifecycle & Revenue Sequences', 'AI-Assisted Marketing Workflows', 'Lead Nurturing & Conversion Sequences'],
  },
  {
    pillarNumber: 'Pillar 3 — Grow',
    title: 'Demand Generation & Revenue Marketing',
    description: 'We build predictable, scalable pipelines through performance-driven acquisition systems — where data, strategy, and AI-powered insights work together to compound your growth over time.',
    capabilities: ['Organic Growth & AI-Enhanced SEO', 'Performance Media & Paid Acquisition (SEM / PPC)', 'Social Intelligence & Brand Amplification', 'Lead Generation Funnels'],
  },
];

const DEFAULT_AI_LAYER = {
  heading: 'Technology & AI Layer',
  items: [
    'AI-assisted campaign management and performance reporting',
    'Automated content workflows from brief to publishing',
    'CRM automation and intelligent lead scoring',
    'AI-enhanced technical SEO and content systems',
    'Data-driven optimisation across all channels',
  ],
  closingLine: 'Our people set the direction. Our systems accelerate the journey.',
};

const DEFAULT_HOW_IT_WORKS = {
  heading: 'How It Works',
  steps: [
    { stepLabel: 'Audit & Strategy', description: 'Identify gaps, opportunities, and growth levers' },
    { stepLabel: 'System Design', description: 'Build an integrated growth architecture tailored to your business' },
    { stepLabel: 'Implementation', description: 'Deploy marketing, automation, and content systems' },
    { stepLabel: 'Optimisation', description: 'Continuously refine performance using data, AI insights, and expert judgment' },
  ],
};

const DEFAULT_WHO_WE_WORK_WITH = {
  heading: 'Who We Work With',
  partnerTypes: [
    'Growth-stage businesses ready to scale',
    'Real estate & high-ticket sales companies',
    'Professional services firms',
    'E-commerce & digital-first brands',
  ],
  idealPartnerDescription: 'Our ideal partners are looking for scalable growth systems, long-term digital transformation, and measurable ROI — not just activity.',
};

const DEFAULT_RESULTS = {
  heading: 'Results You Can Expect',
  outcomes: [
    'Consolidated marketing and automation under one system',
    'Reduced dependency on multiple fragmented vendors',
    'Faster execution backed by data and intelligent workflows',
    'Improved lead quality and conversion rates',
    'A scalable, repeatable growth engine built for the long term',
  ],
};

const DEFAULT_PARTNERSHIP_MODELS = {
  heading: 'Partnership Models',
  subheading: 'We operate as a growth partner, not a vendor.',
  models: [
    { title: 'System Setup & Implementation', description: 'Build the foundation right' },
    { title: 'Monthly Growth & Optimisation Retainer', description: 'Ongoing partnership for continuous performance' },
    { title: 'Performance-Aligned Models', description: 'Shared investment in your growth' },
  ],
};

const DEFAULT_WHAT_SETS_US_APART = {
  heading: 'What Sets Us Apart',
  points: [
    'Integrated system approach versus isolated services',
    'Human expertise enhanced by AI — not replaced by it',
    'Specialists across every domain, not generalists stretched thin',
    'Business-aligned strategy that drives real, measurable outcomes',
  ],
  closingLine: 'We don\'t deliver services. We build intelligent systems that drive sustainable growth.',
};

const DEFAULT_ARCHITECTURE_TAGS = [
  'Organic Growth & AI-Enhanced SEO',
  'Performance Media & Paid Acquisition',
  'Social Intelligence & Brand Amplification',
  'Automated Lifecycle & Revenue Sequences',
  'Revenue Operations & CRM Architecture',
  'AI-Assisted Marketing Workflows',
  'Conversion-Led Experience Design',
  'Brand & Visual Production',
  'Motion & Video Content Systems',
  'Growth-Optimised Web Systems',
];

const DEFAULT_BOOK_CTA = {
  heading: 'Book a Strategy Call',
  description: 'If you\'re ready to move beyond fragmented execution and build a scalable, intelligent growth engine — let\'s talk. Schedule a strategy call with our team.',
  button: { text: 'Schedule a Strategy Call', url: '/contact' },
};

export const Services: React.FC = () => {

  const { data: services, isLoading: loadingServices, error: servicesError } = useQuery({
    queryKey: ['services'],
    queryFn: () => sanityClient.fetch(SERVICES_QUERY),
  });

  const { data: homePage, isLoading: loadingHome, error: homeError } = useQuery({
    queryKey: ['homePage'],
    queryFn: () => sanityClient.fetch(HOME_PAGE_QUERY),
  });

  const { data: servicesPageData } = useQuery({
    queryKey: ['servicesPage'],
    queryFn: () => sanityClient.fetch(SERVICES_PAGE_QUERY),
  });

  const isLoading = loadingServices || loadingHome;
  const error = servicesError || homeError;

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorState />;

  const processSteps = homePage?.processSteps || [];
  const moreServicesTags = homePage?.moreServicesTags || [];

  // New section data — CMS first, fallback to defaults
  const positioningIntro = servicesPageData?.positioningIntro || DEFAULT_POSITIONING_INTRO;
  const problemSection = servicesPageData?.problemSection || DEFAULT_PROBLEM;
  const pillars = servicesPageData?.pillars?.length ? servicesPageData.pillars : DEFAULT_PILLARS;
  const aiLayer = servicesPageData?.aiLayerSection || DEFAULT_AI_LAYER;
  const howItWorks = servicesPageData?.howItWorksSection || DEFAULT_HOW_IT_WORKS;
  const whoWeWorkWith = servicesPageData?.whoWeWorkWithSection || DEFAULT_WHO_WE_WORK_WITH;
  const results = servicesPageData?.resultsSection || DEFAULT_RESULTS;
  const partnershipModels = servicesPageData?.partnershipModelsSection || DEFAULT_PARTNERSHIP_MODELS;
  const whatSetsUsApart = servicesPageData?.whatSetsUsApartSection || DEFAULT_WHAT_SETS_US_APART;
  const architectureTags = servicesPageData?.serviceArchitectureTags?.length
    ? servicesPageData.serviceArchitectureTags
    : DEFAULT_ARCHITECTURE_TAGS;
  const bookCta = servicesPageData?.bookStrategyCallCta || DEFAULT_BOOK_CTA;

  return (
    <div className="pt-32 min-h-screen bg-white font-sans relative overflow-hidden selection:bg-zeven-blue selection:text-white">
      <Helmet>
        <title>{servicesPageData?.seo?.title || servicesPageData?.seo?.metaTitle || 'Our Services | Zevenstone – Digital Marketing & Web Solutions'}</title>
        <meta name="description" content={servicesPageData?.seo?.description || servicesPageData?.seo?.metaDescription || "Explore Zevenstone's full suite of services: SEO, Web Development, App Development, Social Media Marketing, Video Production & AI Solutions."} />
        {(servicesPageData?.seo?.metaImage || servicesPageData?.seo?.ogImage) && <meta property="og:image" content={urlFor(servicesPageData.seo.metaImage || servicesPageData.seo.ogImage).url()} />}
      </Helmet>

      {/* --- BACKGROUND ENGINE --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Grid Base */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Fluid Orbs */}
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-zeven-blue/20 rounded-full mix-blend-multiply blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -70, 0], y: [0, 100, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-zeven-light/20 rounded-full mix-blend-multiply blur-[90px]"
        />
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 50, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-1/3 w-[700px] h-[600px] bg-zeven-deep/10 rounded-full mix-blend-multiply blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* ─── EXISTING: HERO SECTION ────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto text-center mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span dangerouslySetInnerHTML={{ __html: servicesPageData?.hero?.label || "Our Capabilities" }} className="font-semibold text-zeven-blue tracking-[0.2em] uppercase text-xs md:text-sm bg-white/60 px-5 py-2.5 rounded-full border border-zeven-blue/20 inline-block backdrop-blur-md shadow-sm mb-6">

            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-extrabold text-5xl md:text-7xl mb-8 text-zeven-dark tracking-tight leading-[1.1]"
            dangerouslySetInnerHTML={{
              __html: servicesPageData?.hero?.heading || `Capabilities Built for <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-zeven-blue to-zeven-deep">Scale & Impact</span>` }}
          >
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-zeven-gray max-w-2xl mx-auto font-light leading-relaxed"
          >
            {servicesPageData?.hero?.description || `We blend creative storytelling with technical precision. From full-scale digital transformation to niche optimization, we provide the toolkit to grow.`}
          </motion.p>
        </div>

        {/* ─── NEW: POSITIONING INTRO ───────────────────────────────────────── */}
        <ScrollReveal>
          <div className="mb-24 md:mb-32 max-w-5xl mx-auto hidden">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-zeven-dark via-zeven-deep to-zeven-blue p-12 md:p-16 shadow-2xl">
              {/* Decorative grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-start">
                <div className="flex-1">
                  <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-zeven-blue/80 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/10">
                    Our Approach
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
                    {positioningIntro.heading}
                  </h2>
                </div>
                <div className="flex-1 space-y-5">
                  {positioningIntro.description.split('\n\n').map((para: string, i: number) => (
                    <p key={i} className="text-white/70 leading-relaxed text-base md:text-lg font-light">
                      {para}
                    </p>
                  ))}
                  {positioningIntro.positioningLine && (
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <p className="text-white/90 font-semibold text-sm italic leading-relaxed">
                        "{positioningIntro.positioningLine}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── NEW: THE PROBLEM ─────────────────────────────────────────────── */}
        <ScrollReveal>
          <div className="mb-24 md:mb-32 hidden">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left — heading */}
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-amber-600 bg-amber-50 border border-amber-200 px-4 py-2 rounded-full mb-6">
                  <AlertTriangle size={12} />
                  The Problem
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-zeven-dark leading-tight mb-4">
                  {problemSection.heading}
                </h2>
                <p className="text-zeven-gray font-light leading-relaxed">
                  Most businesses operate with fragmented systems that prevent real growth.
                </p>
              </div>
              {/* Right — pain points */}
              <div className="space-y-4">
                {(problemSection.items || []).map((item: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-amber-50/60 border border-amber-100 group hover:bg-amber-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertTriangle size={14} className="text-amber-600" />
                    </div>
                    <p className="text-zeven-dark font-medium leading-relaxed">{item}</p>
                  </motion.div>
                ))}
                {problemSection.closingLine && (
                  <p className="text-sm text-zeven-gray mt-4 pl-2 border-l-2 border-amber-300 font-medium italic">
                    {problemSection.closingLine}
                  </p>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── EXISTING: PROCESS STRIP ──────────────────────────────────────── */}
        {processSteps && processSteps.length > 0 && (
          <div className="mb-32">
            <ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 bg-white/40 backdrop-blur-xl border border-white/60 p-4 rounded-[2rem] shadow-sm">
                {processSteps.map((step: any, idx: number) => (
                  <div key={idx} className="relative group p-6 rounded-2xl bg-zeven-blue border border-white/10 shadow-lg hover:shadow-zeven-blue/40 hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="text-3xl md:text-4xl font-bold text-white/30 mb-4 group-hover:text-white/50 transition-colors">0{idx + 1}</div>
                      <h3 className="font-bold text-xl text-white mb-2">{step.title}</h3>
                      <p className="text-sm text-blue-50 leading-relaxed font-medium opacity-90">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        )}

        {/* ─── NEW: THREE PILLARS ───────────────────────────────────────────── */}
        <div className="mb-24 md:mb-32 hidden">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-zeven-blue bg-zeven-blue/8 px-4 py-2 rounded-full mb-4 border border-zeven-blue/20">
                Our Framework
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-zeven-dark">
                Three Pillars of Growth
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar: any, i: number) => {
              const PillarIcon = getPillarIcon(i);
              const gradients = [
                'from-blue-600 to-indigo-700',
                'from-violet-600 to-purple-700',
                'from-emerald-500 to-teal-600',
              ];
              const lightBgs = ['bg-blue-50', 'bg-violet-50', 'bg-emerald-50'];
              const lightBorders = ['border-blue-100', 'border-violet-100', 'border-emerald-100'];
              const lightTexts = ['text-blue-600', 'text-violet-600', 'text-emerald-600'];
              return (
                <ScrollReveal key={i} delay={i * 0.15}>
                  <div className="h-full flex flex-col rounded-[2rem] overflow-hidden border border-zeven-surface shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                    {/* Pillar Header */}
                    <div className={`bg-gradient-to-br ${gradients[i % gradients.length]} p-8 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:20px_20px]" />
                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                          <PillarIcon size={24} className="text-white" strokeWidth={1.5} />
                        </div>
                        <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{pillar.pillarNumber}</span>
                        <h3 className="text-white font-extrabold text-xl md:text-2xl mt-2 leading-tight">{pillar.title}</h3>
                      </div>
                    </div>
                    {/* Pillar Body */}
                    <div className="flex-1 bg-white p-8 flex flex-col">
                      <p className="text-zeven-gray leading-relaxed text-sm mb-8 font-light flex-grow">{pillar.description}</p>
                      <div className={`rounded-2xl p-6 ${lightBgs[i % lightBgs.length]} border ${lightBorders[i % lightBorders.length]}`}>
                        <h4 className={`text-xs font-bold uppercase tracking-widest ${lightTexts[i % lightTexts.length]} mb-4`}>Capabilities</h4>
                        <ul className="space-y-3">
                          {(pillar.capabilities || []).map((cap: string, ci: number) => (
                            <li key={ci} className="flex items-start gap-3 text-zeven-dark text-sm font-medium">
                              <ChevronRight size={14} className={`mt-0.5 flex-shrink-0 ${lightTexts[i % lightTexts.length]}`} />
                              {cap}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* ─── NEW: TECHNOLOGY & AI LAYER ───────────────────────────────────── */}
        <ScrollReveal>
          <div className="mb-24 md:mb-32 hidden">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-12 md:p-16">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
              <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-zeven-blue/20 rounded-full blur-3xl" />
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute top-8 right-8 w-24 h-24 border border-white/10 rounded-full"
              />

              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-zeven-blue/20 border border-zeven-blue/30 flex items-center justify-center mb-6">
                    <Brain size={28} className="text-zeven-blue" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-zeven-blue/80 mb-4 block">Intelligence Layer</span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                    {aiLayer.heading}
                  </h2>
                  {aiLayer.closingLine && (
                    <p className="mt-6 text-white/50 text-sm font-semibold italic border-l-2 border-zeven-blue/40 pl-4">
                      {aiLayer.closingLine}
                    </p>
                  )}
                </div>
                <div className="space-y-4">
                  {(aiLayer.items || []).map((item: string, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-zeven-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-zeven-blue/30 transition-colors">
                        <Zap size={14} className="text-zeven-blue" />
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed font-medium">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── EXISTING: SERVICES GRID ──────────────────────────────────────── */}
        {servicesPageData?.featuresHeading?.heading && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zeven-dark mb-4" dangerouslySetInnerHTML={{ __html: servicesPageData.featuresHeading.heading }}></h2>
            {servicesPageData?.featuresHeading?.description && (
              <p className="text-xl text-zeven-gray max-w-2xl mx-auto font-light">{servicesPageData.featuresHeading.description}</p>
            )}
          </div>
        )}
        {services && services.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {services.map((service: any, index: number) => {
              const ServiceIcon = getServiceIcon(service.title, index);
              return (
                <ScrollReveal key={service._id || index} delay={index * 0.1}>
                  <div className="h-full flex flex-col group relative p-8 md:p-10 rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,153,255,0.15)] hover:bg-white hover:border-zeven-blue/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden">

                    {/* Hover Gradient Blob */}
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-zeven-blue/5 rounded-full blur-3xl group-hover:bg-zeven-blue/10 transition-colors duration-500" />

                    {/* Icon */}
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-white/80 shadow-sm flex items-center justify-center text-zeven-blue mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 z-10">
                      <ServiceIcon size={32} strokeWidth={1.5} />
                    </div>

                    <div className="relative z-10 flex-grow">
                      <h3 className="font-bold text-2xl mb-4 text-zeven-dark group-hover:text-zeven-blue transition-colors">{service.title}</h3>
                      <p className="text-zeven-gray mb-8 leading-relaxed font-light">{service.description}</p>

                      {service.details && service.details.length > 0 && (
                        <div className="pt-6 border-t border-zeven-dark/5">
                          <h4 className="text-xs font-bold text-zeven-dark uppercase tracking-wider mb-4 opacity-70">Includes</h4>
                          <ul className="space-y-3">
                            {service.details.slice(0, 4).map((detail: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-3 text-zeven-gray text-sm font-medium">
                                <span className="mt-0.5 p-0.5 rounded-full bg-zeven-blue/10 text-zeven-blue flex-shrink-0">
                                  <Check size={10} strokeWidth={4} />
                                </span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 relative z-10">
                      <Link to="/contact" className="block">
                        <Button variant="ghost" className="w-full justify-between hover:bg-zeven-blue hover:text-white group/btn border border-zeven-surface hover:border-transparent rounded-xl">
                          <span>Start Project</span>
                          <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* ─── EXISTING: TECH STACK MARQUEE ─────────────────────────────────── */}
        {moreServicesTags && moreServicesTags.length > 0 && (
          <div className="mb-32 overflow-hidden">
            <div className="text-center mb-10">
              <h3 className="text-sm font-bold text-zeven-gray uppercase tracking-widest" dangerouslySetInnerHTML={{ __html: servicesPageData?.techStackHeading?.heading || `Powered by Modern Tech` }}></h3>
            </div>

            <div className="relative">
              {/* Fade Edges */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

              <div className="flex animate-marquee whitespace-nowrap gap-6 w-max opacity-60 hover:opacity-100 transition-opacity">
                {[...moreServicesTags, ...moreServicesTags].map((tag: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 px-6 py-3 rounded-full border border-zeven-gray/20 bg-white/50 backdrop-blur-sm">
                    <Code size={16} className="text-zeven-blue" />
                    <span className="font-semibold text-zeven-dark text-sm">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── NEW: HOW IT WORKS ────────────────────────────────────────────── */}
        <div className="mb-24 md:mb-32 hidden">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-zeven-blue bg-zeven-blue/8 px-4 py-2 rounded-full mb-4 border border-zeven-blue/20">
                The Process
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-zeven-dark">
                {howItWorks.heading}
              </h2>
            </div>
          </ScrollReveal>
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-zeven-blue/30 to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {(howItWorks.steps || []).map((step: any, i: number) => (
                <ScrollReveal key={i} delay={i * 0.15}>
                  <div className="relative text-center group">
                    <div className="w-24 h-24 mx-auto rounded-full bg-white border-2 border-zeven-blue/20 flex flex-col items-center justify-center mb-6 shadow-lg group-hover:border-zeven-blue group-hover:shadow-zeven-blue/20 transition-all duration-300 relative z-10">
                      <span className="text-2xl font-black text-zeven-blue/30 group-hover:text-zeven-blue transition-colors leading-none">0{i + 1}</span>
                    </div>
                    <h3 className="font-bold text-lg text-zeven-dark mb-3 group-hover:text-zeven-blue transition-colors">{step.stepLabel}</h3>
                    <p className="text-zeven-gray text-sm leading-relaxed font-light">{step.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* ─── NEW: WHO WE WORK WITH ────────────────────────────────────────── */}
        <ScrollReveal>
          <div className="mb-24 md:mb-32 hidden">
            <div className="grid lg:grid-cols-2 gap-12 items-start p-12 md:p-16 rounded-[2.5rem] bg-zeven-surface/30 border border-zeven-surface">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-zeven-blue bg-zeven-blue/8 border border-zeven-blue/20 px-4 py-2 rounded-full mb-6">
                  <Users size={12} />
                  Ideal Partners
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-zeven-dark leading-tight mb-6">
                  {whoWeWorkWith.heading}
                </h2>
                <p className="text-zeven-gray leading-relaxed font-light">{whoWeWorkWith.idealPartnerDescription}</p>
              </div>
              <div className="space-y-4">
                <p className="text-sm font-bold text-zeven-dark uppercase tracking-widest mb-6">We partner with:</p>
                {(whoWeWorkWith.partnerTypes || []).map((type: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-white/80 shadow-sm hover:shadow-md hover:border-zeven-blue/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-zeven-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-zeven-blue/20 transition-colors">
                      <Star size={16} className="text-zeven-blue" />
                    </div>
                    <span className="font-semibold text-zeven-dark">{type}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── NEW: RESULTS YOU CAN EXPECT ─────────────────────────────────── */}
        <div className="mb-24 md:mb-32 hidden">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-emerald-600 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full mb-4">
                Outcomes
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-zeven-dark">
                {results.heading}
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(results.outcomes || []).map((outcome: string, i: number) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex items-start gap-5 p-7 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:shadow-lg hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 group h-full">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors mt-0.5">
                    <Check size={18} className="text-emerald-600" strokeWidth={2.5} />
                  </div>
                  <p className="text-zeven-dark font-semibold leading-relaxed">{outcome}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ─── NEW: PARTNERSHIP MODELS ──────────────────────────────────────── */}
        <div className="mb-24 md:mb-32 hidden">
          <ScrollReveal>
            <div className="text-center mb-6">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-violet-600 bg-violet-50 border border-violet-200 px-4 py-2 rounded-full mb-4">
                How We Engage
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-zeven-dark mb-3">
                {partnershipModels.heading}
              </h2>
              {partnershipModels.subheading && (
                <p className="text-zeven-gray font-light text-lg">{partnershipModels.subheading}</p>
              )}
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {(partnershipModels.models || []).map((model: any, i: number) => {
              const badges = ['Foundation', 'Growth', 'Performance'];
              const gradients = ['from-violet-500 to-purple-600', 'from-blue-500 to-zeven-blue', 'from-emerald-500 to-teal-600'];
              return (
                <ScrollReveal key={i} delay={i * 0.15}>
                  <div className="relative h-full rounded-[2rem] overflow-hidden border border-zeven-surface shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group bg-white">
                    <div className={`h-2 bg-gradient-to-r ${gradients[i % gradients.length]}`} />
                    <div className="p-8">
                      <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5 bg-gradient-to-r ${gradients[i % gradients.length]} text-white`}>
                        {badges[i % badges.length]}
                      </span>
                      <h3 className="font-extrabold text-xl text-zeven-dark mb-4 leading-tight group-hover:text-zeven-blue transition-colors">
                        {model.title}
                      </h3>
                      <p className="text-zeven-gray text-sm leading-relaxed font-light">{model.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* ─── NEW: WHAT SETS US APART ──────────────────────────────────────── */}
        <ScrollReveal>
          <div className="mb-24 md:mb-32 hidden">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-zeven-blue bg-zeven-blue/8 border border-zeven-blue/20 px-4 py-2 rounded-full mb-6">
                  Our Edge
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-zeven-dark leading-tight mb-6">
                  {whatSetsUsApart.heading}
                </h2>
                {whatSetsUsApart.closingLine && (
                  <p className="text-zeven-gray font-semibold leading-relaxed italic border-l-4 border-zeven-blue pl-5">
                    {whatSetsUsApart.closingLine}
                  </p>
                )}
              </div>
              <div className="space-y-5">
                {(whatSetsUsApart.points || []).map((point: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="flex items-start gap-5 p-6 rounded-2xl bg-white border border-zeven-surface shadow-sm hover:shadow-md hover:border-zeven-blue/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zeven-blue to-zeven-deep flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <Check size={16} className="text-white" strokeWidth={3} />
                    </div>
                    <p className="text-zeven-dark font-semibold leading-relaxed">{point}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── NEW: SERVICE ARCHITECTURE MARQUEE ───────────────────────────── */}
        {architectureTags && architectureTags.length > 0 && (
          <div className="mb-24 md:mb-32 overflow-hidden hidden">
            <div className="text-center mb-10">
              <h3 className="text-sm font-bold text-zeven-gray uppercase tracking-widest">Service Architecture</h3>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
              <div className="flex animate-marquee whitespace-nowrap gap-4 w-max">
                {[...architectureTags, ...architectureTags].map((tag: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-6 py-3 rounded-full border border-zeven-blue/20 bg-zeven-blue/5 hover:bg-zeven-blue/10 transition-colors cursor-default"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-zeven-blue flex-shrink-0" />
                    <span className="font-semibold text-zeven-dark text-sm whitespace-nowrap">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── NEW: BOOK A STRATEGY CALL CTA ───────────────────────────────── */}
        <ScrollReveal>
          <div className="hidden mb-20 rounded-[3rem] p-12 md:p-20 relative overflow-hidden isolate text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-zeven-dark to-slate-900" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zeven-blue/20 rounded-full blur-3xl"
            />
            <div className="relative z-10">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-zeven-blue bg-zeven-blue/20 border border-zeven-blue/30 px-4 py-2 rounded-full mb-8">
                Ready to Scale?
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                {bookCta.heading}
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed text-lg font-light">
                {bookCta.description}
              </p>
              <Link to={bookCta?.button?.url || '/contact'}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 bg-zeven-blue hover:bg-zeven-deep text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl shadow-zeven-blue/40 transition-colors"
                >
                  {bookCta?.button?.text || 'Schedule a Strategy Call'}
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── EXISTING: BOTTOM CTA ─────────────────────────────────────────── */}
        <ScrollReveal>
          <div className="mb-20 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden isolate shadow-2xl">
            {/* CTA Background */}
            <div className="absolute inset-0 bg-zeven-blue"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-zeven-deep to-zeven-blue opacity-90"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

            {/* Animated Decor */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/2 -right-1/2 w-full h-full border-[100px] border-white/5 rounded-full blur-sm"
            />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-6xl font-extrabold mb-6 text-white tracking-tight leading-tight" dangerouslySetInnerHTML={{ __html: servicesPageData?.notSureWhereToStartCta?.heading || `Not sure where to start?` }}>
              </h2>
              <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-light">
                {servicesPageData?.notSureWhereToStartCta?.description || `We understand that no two businesses are alike. Let's schedule a discovery call to tailor a strategy that fits your unique needs.`}
              </p>
              <Link to={servicesPageData?.notSureWhereToStartCta?.button?.url || "/contact"}>
                <Button size="lg" className="bg-white text-white hover:bg-blue-50 border-none shadow-xl shadow-zeven-dark/10 text-lg px-12 py-5 h-auto rounded-full font-bold">
                  {servicesPageData?.notSureWhereToStartCta?.button?.text || `Book a Free Strategy Call`}
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
