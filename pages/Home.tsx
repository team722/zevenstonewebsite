
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowRight, ChevronRight, ChevronLeft, Zap, Cpu, Palette, Target, Plus, Minus, Send, Star, Quote, CheckCircle2, TrendingUp, Mail, Phone, MapPin, Layers, ExternalLink, Search, Rocket, Lightbulb } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { sanityClient, urlFor } from '../lib/sanity';
import { HOME_PAGE_QUERY, SERVICES_QUERY, TESTIMONIALS_QUERY, FAQS_QUERY, SITE_SETTINGS_QUERY, PORTFOLIO_PROJECTS_QUERY, PORTFOLIO_CATEGORIES_QUERY, CASE_STUDIES_QUERY } from '../lib/queries';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorState } from '../components/ui/ErrorState';
import { Code, Database, Layout, Smartphone, Globe, LineChart } from 'lucide-react';
import { Helmet } from 'react-helmet-async';


const getWhyUsIcon = (index: number) => {
   const icons = [Search, Layers, Rocket, Lightbulb];
   return icons[index % icons.length];
};

interface ScrollRevealProps {
   children: React.ReactNode;
   delay?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, delay = 0 }) => (
   <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
   >
      {children}
   </motion.div>
);

export const Home: React.FC = () => {
   const { data: homePage, isLoading: loadingHome, error: errorHome } = useQuery({ queryKey: ['homePage'], queryFn: () => sanityClient.fetch(HOME_PAGE_QUERY) });
   const { data: servicesData, isLoading: loadingServices, error: errorServices } = useQuery({ queryKey: ['services'], queryFn: () => sanityClient.fetch(SERVICES_QUERY) });
   const { data: testimonialsData, isLoading: loadingTestimonials, error: errorTestimonials } = useQuery({ queryKey: ['testimonials'], queryFn: () => sanityClient.fetch(TESTIMONIALS_QUERY) });
   const { data: faqsData, isLoading: loadingFaqs, error: errorFaqs } = useQuery({ queryKey: ['faqs'], queryFn: () => sanityClient.fetch(FAQS_QUERY) });
   const { data: siteSettings, isLoading: loadingSettings, error: errorSettings } = useQuery({ queryKey: ['siteSettings'], queryFn: () => sanityClient.fetch(SITE_SETTINGS_QUERY) });
   const { data: portfolioProjects, isLoading: loadingProjects, error: errorProjects } = useQuery({ queryKey: ['portfolioProjects'], queryFn: () => sanityClient.fetch(PORTFOLIO_PROJECTS_QUERY) });
   const { data: categoriesData, isLoading: loadingCategories, error: errorCategories } = useQuery({ queryKey: ['portfolioCategories'], queryFn: () => sanityClient.fetch(PORTFOLIO_CATEGORIES_QUERY) });
   const { data: caseStudiesData, isLoading: loadingCase, error: errorCase } = useQuery({ queryKey: ['caseStudies'], queryFn: () => sanityClient.fetch(CASE_STUDIES_QUERY) });

   const { scrollY } = useScroll();
   const heroY = useTransform(scrollY, [0, 500], [0, 150]);
   const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

   const isLoading = loadingHome || loadingServices || loadingTestimonials || loadingFaqs || loadingSettings || loadingProjects || loadingCategories || loadingCase;
   const error = errorHome || errorServices || errorTestimonials || errorFaqs || errorSettings || errorProjects || errorCategories || errorCase;

   const [activeCategory, setActiveCategory] = useState("All");
   const [openFaq, setOpenFaq] = useState<number | null>(null);
   const [currentTestimonial, setCurrentTestimonial] = useState(0);
   const [activeServiceTab, setActiveServiceTab] = useState(0);
   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

   useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
         setMousePos({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
   }, []);

   if (isLoading) return <LoadingSpinner />;
   if (error) return <ErrorState />;

   // 1. SERVICES
   const SERVICES_LIST = (servicesData || []).map((s: any, i: number) => ({
      title: s.title,
      description: s.description,
      details: s.details,
      image: s.imageUrl,
   }));


   // 2. PARTNERS
   const PARTNERS_LOGOS = (siteSettings?.partnerLogos || []).map((p: any) => p.logoUrl);

   // 3. PORTFOLIO
   const PORTFOLIO_CATEGORIES = ["All", ...(categoriesData?.map((c: any) => c.label) || [])];
   const PORTFOLIO_SHOWCASE = (portfolioProjects || []).map((p: any) => ({
      id: p._id,
      client: p.client,
      headline: p.headline,
      category: p.category,
      tags: p.tags,
      image: p.imageUrl
   }));

   // 4. FOUNDERS
   const FOUNDER_MESSAGES = homePage?.founderMessages || [];



   // 5. TESTIMONIALS & FAQS
   const TESTIMONIALS = (testimonialsData || []).map((t: any) => ({
      quote: t.quote,
      author: t.author,
      company: t.company,
      role: t.role,
      image: t.photoUrl
   }));
   const FAQS = faqsData || [];

   // 6. HOME STATS & WHY US
   const STATS_DATA = homePage?.stats || [];
   const WHY_US_DATA = (homePage?.whyUsItems || []).map((w: any, i: number) => ({
      title: w.title,
      desc: w.description || w.desc,
      icon: getWhyUsIcon(i)
   }));

   const MORE_SERVICES_TAGS = homePage?.moreServicesTags || [];
   const CASE_STUDIES = (caseStudiesData || []).map((c: any) => ({
      client: c.client,
      headline: c.headline,
      challenge: c.challenge,
      solution: c.solution,
      impact: c.impact,
      tags: c.tags,
      image: c.imageUrl
   }));

   const filteredPortfolio = activeCategory === "All"
      ? PORTFOLIO_SHOWCASE
      : PORTFOLIO_SHOWCASE.filter((item: any) => item.category === activeCategory);

   const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? null : index);

   // Split tags for marquee
   const midPoint = Math.max(1, Math.ceil((MORE_SERVICES_TAGS?.length || 0) / 2));
   const tagsRow1 = MORE_SERVICES_TAGS?.slice(0, midPoint) || [];
   const tagsRow2 = MORE_SERVICES_TAGS?.slice(midPoint) || [];

   return (
      <div className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden">
         <Helmet>
            <title>{homePage?.seo?.title || homePage?.seo?.metaTitle || 'Zevenstone – Digital Marketing Agency | Web Design & SEO'}</title>
            <meta name="description" content={homePage?.seo?.description || homePage?.seo?.metaDescription || 'Zevenstone is a full-service digital marketing agency specialising in SEO, web development, social media, and AI-powered growth strategies.'} />
            {(homePage?.seo?.metaImage || homePage?.seo?.ogImage) && <meta property="og:image" content={urlFor(homePage.seo.metaImage || homePage.seo.ogImage).url()} />}
         </Helmet>

         {/* --- HERO SECTION --- */}
         <section className="relative min-h-[105vh] flex items-center pt-32 pb-[420px] sm:pb-[350px] lg:pb-80 overflow-hidden bg-white">

            {/* -- DYNAMIC BACKGROUND ENGINE -- */}

            {/* 1. Subtle Grid Pattern Base */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            {/* 2. Fluid Gradient Orbs (Replaces Particles) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
               {/* Orb 1: Primary Blue (Top Left) */}
               <motion.div
                  animate={{
                     x: [0, 100, 0],
                     y: [0, -50, 0],
                     scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-zeven-blue/20 rounded-full mix-blend-multiply blur-[100px]"
               />

               {/* Orb 2: Light Blue (Top Right) */}
               <motion.div
                  animate={{
                     x: [0, -70, 0],
                     y: [0, 100, 0],
                     scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute top-0 right-0 w-[500px] h-[500px] bg-zeven-light/20 rounded-full mix-blend-multiply blur-[90px]"
               />

               {/* Orb 3: Deep Blue (Center/Bottom) */}
               <motion.div
                  animate={{
                     x: [0, 50, 0],
                     y: [0, 50, 0],
                     opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-0 left-1/3 w-[700px] h-[600px] bg-zeven-deep/10 rounded-full mix-blend-multiply blur-[120px]"
               />
            </div>

            {/* 3. Interactive Mouse Spotlight */}
            <div
               className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
               style={{
                  background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 153, 255, 0.15), transparent 80%)`
               }}
            />

            {/* -- END BACKGROUND -- */}

            <div className="container mx-auto px-6 relative z-10">
               <div className="grid lg:grid-cols-2 gap-16 items-center">

                  {/* Text Content */}
                  <motion.div
                     style={{ y: heroY, opacity: heroOpacity }}
                     className="max-w-3xl"
                  >
                     <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                     >
                        <span dangerouslySetInnerHTML={{ __html: homePage?.hero?.label || `Creative Minds. Strategic Execution. Measurable Growth.` }} className="font-semibold text-zeven-blue tracking-[0.2em] uppercase text-xs md:text-sm bg-white/60 px-5 py-2.5 rounded-full border border-zeven-blue/20 inline-block backdrop-blur-md shadow-sm">

                        </span>
                     </motion.div>

                     <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="font-extrabold text-5xl md:text-7xl leading-[1.1] text-zeven-dark mb-8 tracking-tight"
                        dangerouslySetInnerHTML={{ __html: homePage?.hero?.heading || `Solutions <span class="text-transparent bg-clip-text bg-gradient-to-r from-zeven-gray to-zeven-dark font-semibold">That Scale</span><br /><span class="bg-clip-text text-transparent bg-gradient-to-r from-zeven-blue to-zeven-deep drop-shadow-sm">With Your Growth</span>` }}
                     >
                     </motion.h1>

                     <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl text-zeven-gray/90 mb-10 max-w-lg leading-relaxed font-light"
                     >
                        {homePage?.hero?.description || `Whether you're launching a bold idea or optimizing an existing business, Zevenstone delivers strategy, creativity, and execution built for every stage.`}
                     </motion.p>

                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-5"
                     >
                        <Link to={homePage?.hero?.ctaButton?.url || "/contact"}>
                           <div className="relative group inline-block">
                              {/* Pulse Effect */}
                              <div className="absolute -inset-1 bg-zeven-blue rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500 animate-pulse"></div>
                              <Button size="lg" className="relative rounded-full px-10 shadow-xl shadow-zeven-blue/30 border border-white/10 text-lg group-hover:scale-105 transition-transform duration-300">
                                 {homePage?.hero?.ctaButton?.text || "Discover More"} <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
                              </Button>
                           </div>
                        </Link>
                        <Link to={homePage?.hero?.secondaryCtaButton?.url || "/contact"}>
                           <Button variant="outline" size="lg" className="rounded-full px-8 border-zeven-dark/10 text-zeven-dark hover:border-zeven-blue hover:text-zeven-blue bg-white/80 backdrop-blur-sm text-lg shadow-sm hover:shadow-md transition-all">
                              {homePage?.hero?.secondaryCtaButton?.text || "Book Consultation"}
                           </Button>
                        </Link>
                     </motion.div>
                  </motion.div>

                  {/* Hero Visual - 3D Perspective */}
                  <motion.div
                     initial={{ opacity: 0, scale: 0.8, x: 50 }}
                     animate={{ opacity: 1, scale: 1, x: 0 }}
                     transition={{ duration: 1, type: "spring", delay: 0.2 }}
                     className="hidden lg:block relative z-20 perspective-1000"
                  >
                     <motion.div
                        animate={{ rotateY: [-2, 2, -2], rotateX: [1, -1, 1] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative transform-style-3d"
                     >
                        <div className="absolute inset-0 bg-gradient-to-tr from-zeven-blue via-purple-500 to-transparent rounded-full blur-[120px] opacity-20" />

                        {/* Main Visual */}
                        <img
                           src={homePage?.hero?.backgroundImageUrl || "https://cdni.iconscout.com/illustration/premium/thumb/web-development-2974925-2477356.png"}
                           alt="Digital Growth"
                           className="w-full drop-shadow-2xl relative z-10 hover:scale-105 transition-transform duration-700"
                        />

                        {/* Floating Analytics Card */}
                        <motion.div
                           animate={{ y: [0, -15, 0] }}
                           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                           className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/60 z-30 max-w-[180px]"
                        >
                           <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 shadow-sm"><TrendingUp size={20} /></div>
                              <div>
                                 <div className="font-bold text-zeven-dark text-sm">Revenue</div>
                                 <div className="font-bold text-xs text-green-500">+145%</div>
                              </div>
                           </div>
                           <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 w-[75%]" />
                           </div>
                        </motion.div>

                        {/* Floating Users Card */}
                        <motion.div
                           animate={{ y: [0, 20, 0] }}
                           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                           className="absolute bottom-12 -left-12 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/60 z-30 flex items-center gap-4"
                        >
                           <div className="flex -space-x-3">
                              {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-white shadow-sm" />)}
                           </div>
                           <div>
                              <div className="text-lg font-bold text-zeven-dark">12k+</div>
                              <div className="text-xs text-zeven-gray font-medium uppercase tracking-wide">Active Users</div>
                           </div>
                        </motion.div>
                     </motion.div>
                  </motion.div>
               </div>
            </div>

            {/* STATS STRIP OVERLAP - NEW GRADIENT STYLE */}
            <div className="absolute bottom-0 lg:bottom-12 left-0 right-0 z-30 px-6 pointer-events-none">
               <div className="container mx-auto pointer-events-auto">
                  <motion.div
                     initial={{ y: 50, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.8, duration: 0.8 }}
                     className="grid grid-cols-2 lg:grid-cols-4 bg-gradient-to-r from-zeven-blue to-zeven-deep rounded-3xl shadow-2xl shadow-zeven-blue/20 overflow-hidden border border-white/10 backdrop-blur-sm"
                  >
                     {STATS_DATA.map((stat, i) => (
                        <div key={i} className={`p-4 md:p-8 relative group overflow-hidden ${i !== STATS_DATA.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-white/10' : ''}`}>
                           <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                           <div className="relative z-10">
                              <div className="flex items-end gap-2 mb-2">
                                 <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white">{stat.value}</h3>
                              </div>
                              <div className="text-xs md:text-sm font-bold text-white/90 uppercase tracking-wider mb-2">{stat.label}</div>
                              <p className="text-[10px] md:text-xs text-blue-100 font-medium leading-relaxed opacity-80 hidden sm:block">{stat.desc}</p>
                           </div>
                        </div>
                     ))}
                  </motion.div>
               </div>
            </div>
         </section>

         {/* --- SERVICES INTERACTIVE --- */}
         <section className="pt-20 pb-20 bg-white relative">
            <div className="container mx-auto px-6">
               <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                  <ScrollReveal>
                     <h2 className="text-3xl md:text-5xl font-bold text-zeven-dark mb-4" dangerouslySetInnerHTML={{ __html: homePage?.servicesHeading?.heading || `Our <span class="text-zeven-blue">Services</span>` }}></h2>
                     <p className="text-zeven-gray max-w-xl text-base md:text-lg">{homePage?.servicesHeading?.description || `We offer comprehensive digital marketing solutions tailored to your business needs.`}</p>
                  </ScrollReveal>
                  <Link to="/contact" className="hidden md:block">
                     <Button variant="outline" className="rounded-full">Let's Talk Growth !</Button>
                  </Link>
               </div>

               <div className="grid lg:grid-cols-12 gap-12 mb-20">
                  {/* Top: Segmented Tabs */}
                  <div className="lg:col-span-12">
                     <div className="flex flex-wrap gap-2 p-1.5 bg-zeven-surface rounded-2xl md:rounded-full w-full md:w-fit overflow-hidden">
                        {SERVICES_LIST.map((service, idx) => (
                           <button
                              key={idx}
                              onClick={() => setActiveServiceTab(idx)}
                              className={`relative px-6 py-3 rounded-xl md:rounded-full text-sm font-semibold transition-colors z-10 ${activeServiceTab === idx ? 'text-zeven-blue' : 'text-zeven-gray hover:text-zeven-dark'
                                 }`}
                           >
                              {activeServiceTab === idx && (
                                 <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white shadow-sm rounded-xl md:rounded-full -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                 />
                              )}
                              {service.title}
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* Content Area */}
                  <div className="lg:col-span-12">
                     <AnimatePresence mode='wait'>
                        <motion.div
                           key={activeServiceTab}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -20 }}
                           transition={{ duration: 0.4 }}
                           className="bg-gradient-to-br from-slate-50 to-white rounded-[2.5rem] p-8 md:p-12 border border-zeven-surface shadow-xl grid md:grid-cols-2 gap-12 items-center relative overflow-hidden min-h-[500px]"
                        >
                           {/* Background blob */}
                           <div className="absolute top-0 right-0 w-96 h-96 bg-zeven-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                           {/* Visual (Real Image) */}
                           <div className="relative z-10 order-2 md:order-1 h-full min-h-[300px] md:min-h-[450px]">
                              <motion.div
                                 className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative"
                                 initial={{ scale: 0.9, opacity: 0, rotate: 2 }}
                                 animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                 transition={{ delay: 0.1, duration: 0.5 }}
                              >
                                 <img
                                    src={SERVICES_LIST[activeServiceTab].image}
                                    alt={SERVICES_LIST[activeServiceTab].title}
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-zeven-dark/60 via-transparent to-transparent opacity-60" />
                                 <div className="absolute bottom-6 left-6 text-white z-20">
                                    <p className="text-xs font-bold uppercase tracking-wider mb-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full inline-block">Real Impact</p>
                                    <h4 className="text-xl font-bold">{SERVICES_LIST[activeServiceTab].title}</h4>
                                 </div>
                              </motion.div>
                           </div>

                           {/* List Details */}
                           <div className="space-y-6 relative z-10 order-1 md:order-2">
                              <div>
                                 <h3 className="font-bold text-2xl md:text-4xl text-zeven-dark mb-4">{SERVICES_LIST[activeServiceTab].title}</h3>
                                 <p className="text-zeven-gray text-base md:text-lg leading-relaxed">{SERVICES_LIST[activeServiceTab].description}</p>
                              </div>

                              <div className="grid gap-3">
                                 {SERVICES_LIST[activeServiceTab].details?.map((detail, idx) => (
                                    <motion.div
                                       key={idx}
                                       initial={{ opacity: 0, x: 20 }}
                                       animate={{ opacity: 1, x: 0 }}
                                       transition={{ delay: idx * 0.1 }}
                                       className="group p-4 rounded-xl bg-white border border-zeven-surface hover:border-zeven-blue/30 hover:shadow-lg transition-all cursor-default flex items-center justify-between"
                                    >
                                       <span className="text-md font-medium text-zeven-dark group-hover:text-zeven-blue transition-colors">{detail}</span>
                                       <div className="w-6 h-6 rounded-full bg-zeven-surface flex items-center justify-center text-zeven-gray group-hover:bg-zeven-blue group-hover:text-white transition-all">
                                          <ArrowRight size={14} />
                                       </div>
                                    </motion.div>
                                 ))}
                              </div>

                              <div className="pt-4">
                                 <Link to="/services">
                                    <Button variant="primary" className="rounded-full shadow-lg shadow-zeven-blue/20">Learn more</Button>
                                 </Link>
                              </div>
                           </div>
                        </motion.div>
                     </AnimatePresence>
                  </div>
               </div>

               {/* More Services Marquee */}
               <ScrollReveal>
                  <div className="mb-10 overflow-hidden relative">
                     <h3 className="text-xl font-bold text-zeven-gray mb-10 text-center uppercase tracking-widest text-sm">More Capabilities</h3>

                     {/* Fade Edges */}
                     <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
                     <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

                     {/* Row 1: Left */}
                     <div className="flex animate-marquee whitespace-nowrap gap-4 mb-4 hover:pause-animation w-max">
                        {[...tagsRow1, ...tagsRow1, ...tagsRow1, ...tagsRow1].map((tag, i) => (
                           <div
                              key={`r1-${i}`}
                              className="px-6 py-3 rounded-full border border-zeven-surface text-zeven-gray text-sm font-medium bg-white shadow-sm hover:border-zeven-blue hover:text-zeven-blue transition-colors"
                           >
                              {tag}
                           </div>
                        ))}
                     </div>

                     {/* Row 2: Right */}
                     <div className="flex animate-marquee-reverse whitespace-nowrap gap-4 hover:pause-animation w-max">
                        {[...tagsRow2, ...tagsRow2, ...tagsRow2, ...tagsRow2].map((tag, i) => (
                           <div
                              key={`r2-${i}`}
                              className="px-6 py-3 rounded-full border border-zeven-surface text-zeven-gray text-sm font-medium bg-white shadow-sm hover:border-zeven-blue hover:text-zeven-blue transition-colors"
                           >
                              {tag}
                           </div>
                        ))}
                     </div>
                  </div>
               </ScrollReveal>
            </div>
         </section>

         {/* --- WHY CHOOSE US --- */}
         <section className="py-20 bg-zeven-surface/30">
            <div className="container mx-auto px-6">
               <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                  <ScrollReveal>
                     <h2 className="text-3xl md:text-4xl font-bold text-zeven-dark mb-2" dangerouslySetInnerHTML={{ __html: homePage?.whyChooseUsHeading?.heading || `Why <span class="text-zeven-blue">Choose Us ?</span>` }}></h2>
                     <p className="text-zeven-gray">{homePage?.whyChooseUsHeading?.description || `Proven results driven by data and creativity.`}</p>
                  </ScrollReveal>
                  <Link to="/contact">
                     <Button variant="outline" className="rounded-full hidden md:flex">Let's Talk Growth !</Button>
                  </Link>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {WHY_US_DATA.map((item, idx) => (
                     <ScrollReveal key={idx} delay={idx * 0.1}>
                        <Card className="bg-white border-transparent text-center hover:border-zeven-blue/20 transition-all group px-6 py-12 h-full shadow-lg hover:shadow-2xl hover:-translate-y-2">
                           <div className="w-20 h-20 mx-auto bg-zeven-surface rounded-2xl rotate-3 flex items-center justify-center text-zeven-blue mb-8 group-hover:rotate-0 group-hover:bg-zeven-blue group-hover:text-white transition-all duration-300 shadow-inner">
                              <item.icon size={32} />
                           </div>
                           <h3 className="font-bold text-base md:text-lg text-zeven-dark mb-4">{item.title}</h3>
                           <p className="text-sm text-zeven-gray leading-relaxed">{item.desc}</p>
                        </Card>
                     </ScrollReveal>
                  ))}
               </div>
            </div>
         </section>

         {/* --- PARTNERS --- */}
         <section className="py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-6 mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
               <h2 className="text-2xl font-bold text-zeven-dark" dangerouslySetInnerHTML={{ __html: homePage?.partnersHeading?.heading || `Trusted by <span class="text-zeven-blue">Innovative Brands</span>` }}></h2>
               <div className="h-px bg-zeven-surface flex-grow mx-8 hidden md:block"></div>
            </div>
            <div className="relative w-full overflow-hidden">
               {/* Marquee with Logos */}
               <div className="flex animate-marquee whitespace-nowrap gap-20 items-center hover:pause-animation w-max">
                  {[...PARTNERS_LOGOS, ...PARTNERS_LOGOS, ...PARTNERS_LOGOS].map((logo, i) => (
                     <div key={i} className="opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                        <img src={logo} alt="Partner Logo" loading="lazy" className="h-10 w-auto md:h-12 object-contain" />
                     </div>
                  ))}
               </div>
               {/* Fade Edges */}
               <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
               <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>
         </section>

         {/* --- VISION BANNER --- */}
         <section className="py-32 bg-zeven-blue text-white text-center relative overflow-hidden">
            {/* Abstract Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-zeven-deep to-zeven-light opacity-90" />
            <div
               className="absolute top-0 left-0 w-full h-full opacity-20 bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-[20s]"
               style={{ backgroundImage: `url('${homePage?.visionSection?.imageUrl || 'https://www.transparenttextures.com/patterns/cubes.png'}')` }}
            ></div>
            <motion.div
               animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
               transition={{ duration: 20, repeat: Infinity }}
               className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-white/20 to-transparent rounded-full blur-3xl"
            />

            <div className="container mx-auto px-6 relative z-10">
               <ScrollReveal>
                  <h2 className="text-3xl md:text-6xl font-bold mb-8 tracking-tight" dangerouslySetInnerHTML={{ __html: homePage?.visionSection?.heading || `Your Vision, Amplified by <br /> Strategy, Story & Screens.` }}></h2>
                  <p className="text-blue-100 max-w-3xl mx-auto mb-12 text-lg md:text-xl font-light">{homePage?.visionSection?.description || `We help brands and businesses to create their digital presence and connect with their audiences through creative and innovative solutions.`}</p>
                  <Link to={homePage?.visionSection?.button?.url || homePage?.visionSection?.ctaButton?.url || "/contact"}>
                     <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-zeven-blue px-10 py-4 rounded-full font-bold shadow-2xl hover:shadow-white/20 transition-all text-lg"
                     >
                        {homePage?.visionSection?.button?.text || homePage?.visionSection?.ctaButton?.text || "Let's Talk Growth !"}
                     </motion.button>
                  </Link>
               </ScrollReveal>
            </div>
         </section>

         {/* --- PORTFOLIO (BENTO GRID) --- */}
         <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
               <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                  <ScrollReveal>
                     <h2 className="text-3xl md:text-4xl font-bold text-zeven-dark" dangerouslySetInnerHTML={{ __html: homePage?.portfolioHeading?.heading || `Our <span class="text-zeven-blue">Portfolio</span>` }}></h2>
                     <p className="text-sm text-zeven-gray mt-2">{homePage?.portfolioHeading?.description || `Measurable impact across industries.`}</p>
                  </ScrollReveal>
                  <Link to="/portfolio">
                     <Button variant="outline" className="rounded-full hidden md:flex">View All Work</Button>
                  </Link>
               </div>

               {/* Filter Pills */}
               <ScrollReveal delay={0.1}>
                  <div className="flex gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
                     {PORTFOLIO_CATEGORIES.map(cat => (
                        <button
                           key={cat}
                           onClick={() => setActiveCategory(cat)}
                           className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${activeCategory === cat
                              ? 'bg-zeven-dark text-white shadow-lg scale-105'
                              : 'bg-zeven-surface text-zeven-gray hover:bg-zeven-gray/10'
                              }`}
                        >
                           {cat}
                        </button>
                     ))}
                  </div>
               </ScrollReveal>

               {/* Bento Grid */}
               <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px]"
               >
                  <LayoutGroup>
                     <AnimatePresence mode="popLayout">
                        {filteredPortfolio.slice(0, 7).map((item, idx) => {
                           // BENTO GRID LOGIC (Perfect 4x3 Grid for 7 Items)
                           let spanClass = "md:col-span-1 md:row-span-1";

                           if (activeCategory === "All") {
                              if (idx === 0) spanClass = "md:col-span-2 md:row-span-2";
                              else if (idx === 3) spanClass = "md:col-span-2 md:row-span-1";
                              else if (idx === 6) spanClass = "md:col-span-2 md:row-span-1";
                           }

                           return (
                              <motion.div
                                 layout
                                 initial={{ opacity: 0, scale: 0.9 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 exit={{ opacity: 0, scale: 0.9 }}
                                 transition={{ duration: 0.3 }}
                                 key={item.id}
                                 className={`group relative rounded-[2rem] overflow-hidden bg-zeven-surface cursor-pointer shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ${spanClass}`}
                              >
                                 <img src={item.image} alt={item.client} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                                 {/* Gradient Overlay */}
                                 <div className="absolute inset-0 bg-gradient-to-t from-zeven-dark/90 via-zeven-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                 {/* Content */}
                                 <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                       <div className="flex justify-between items-end">
                                          <div>
                                             <div className="text-zeven-blue font-bold text-xs uppercase tracking-wider mb-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full inline-block">{item.category}</div>
                                             <h3 className="text-white font-bold text-2xl md:text-3xl mb-2 leading-tight">{item.client}</h3>
                                             <p className="text-white/80 text-sm md:text-base line-clamp-2 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">{item.headline}</p>
                                          </div>
                                          <div className="bg-white text-zeven-dark w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                                             <ExternalLink size={18} />
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </motion.div>
                           );
                        })}
                     </AnimatePresence>
                  </LayoutGroup>
               </motion.div>
            </div>
         </section>

         {/* --- TESTIMONIALS (Interactive) --- */}
         <section className="py-24 bg-gradient-to-b from-white to-zeven-surface/30">
            <div className="container mx-auto px-6">
               <ScrollReveal>
                  <div className="flex justify-between items-end mb-16">
                     <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-zeven-dark" dangerouslySetInnerHTML={{ __html: homePage?.testimonialsHeading?.heading || `What Our <span class="text-zeven-blue">Clients Say</span>` }}></h2>
                        <p className="text-sm text-zeven-gray mt-2">{homePage?.testimonialsHeading?.description || `Real feedback from real partners.`}</p>
                     </div>
                  </div>
               </ScrollReveal>

               <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-5 sm:p-8 md:p-16 relative overflow-hidden shadow-2xl border border-zeven-surface">
                  <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-center relative z-10">
                     {/* Image */}
                     <div className="md:col-span-5 lg:col-span-4">
                        <AnimatePresence mode='wait'>
                           <motion.div
                              key={currentTestimonial}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              transition={{ duration: 0.4 }}
                              className="aspect-square sm:aspect-[4/3] md:aspect-[4/5] max-w-[200px] sm:max-w-[260px] md:max-w-none mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500"
                           >
                              <img src={TESTIMONIALS[currentTestimonial].image} alt="Client" className="w-full h-full object-cover" />
                           </motion.div>
                        </AnimatePresence>
                     </div>

                     {/* Text */}
                     <div className="md:col-span-7 lg:col-span-8">
                        <Quote size={32} className="text-zeven-blue/20 mb-4 md:mb-6 md:w-12 md:h-12" />
                        <AnimatePresence mode='wait'>
                           <motion.div
                              key={currentTestimonial}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                           >
                              <p className="text-lg sm:text-xl md:text-3xl font-medium text-zeven-dark leading-relaxed mb-6 md:mb-8">"{TESTIMONIALS[currentTestimonial].quote}"</p>
                              <h4 className="text-zeven-blue font-bold text-xl md:text-2xl mb-1">{TESTIMONIALS[currentTestimonial].author}</h4>
                              <p className="text-zeven-gray font-medium text-sm md:text-base">{TESTIMONIALS[currentTestimonial].role}, {TESTIMONIALS[currentTestimonial].company}</p>
                           </motion.div>
                        </AnimatePresence>

                        {/* Thumbnails Control */}
                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 md:mt-12 pt-6 sm:pt-8 md:pt-12 border-t border-zeven-gray/10">
                           <button onClick={() => setCurrentTestimonial(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="p-2 md:p-3 rounded-full border border-zeven-blue/20 hover:bg-zeven-blue hover:text-white text-zeven-blue transition-colors flex-shrink-0">
                              <ChevronLeft size={18} className="md:w-5 md:h-5" />
                           </button>
                           <div className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar">
                              {TESTIMONIALS.map((t, idx) => (
                                 <button key={idx} onClick={() => setCurrentTestimonial(idx)} className={`w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full overflow-hidden border-2 transition-all flex-shrink-0 ${currentTestimonial === idx ? 'border-zeven-blue scale-110 ring-2 md:ring-4 ring-zeven-blue/10' : 'border-transparent opacity-60 hover:opacity-100 grayscale hover:grayscale-0'}`}>
                                    <img src={t.image} alt="thumb" className="w-full h-full object-cover" />
                                 </button>
                              ))}
                           </div>
                           <button onClick={() => setCurrentTestimonial(prev => (prev + 1) % TESTIMONIALS.length)} className="p-2 md:p-3 rounded-full border border-zeven-blue/20 hover:bg-zeven-blue hover:text-white text-zeven-blue transition-colors flex-shrink-0">
                              <ChevronRight size={18} className="md:w-5 md:h-5" />
                           </button>
                        </div>
                     </div>
                  </div>

                  {/* Decor */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-zeven-blue/5 to-transparent rounded-full blur-3xl pointer-events-none" />
               </div>
            </div>
         </section>

         {/* --- FOUNDER MESSAGES --- */}
         <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
               <div className="text-center mb-16">
                  <ScrollReveal>
                     <h2 className="text-3xl md:text-4xl font-bold text-zeven-dark mb-4">Leadership <span className="text-zeven-blue">Messages</span></h2>
                  </ScrollReveal>
               </div>

               <div className="space-y-24">
                  {FOUNDER_MESSAGES.map((msg: any, index: number) => {
                     const isEven = index % 2 === 0;
                     return (
                        <div key={index} className="grid md:grid-cols-2 gap-16 items-center">
                           <div className={isEven ? '' : 'md:order-last'}>
                              <ScrollReveal>
                                 <div className="relative group">
                                    <img src={msg.photoUrl} alt={msg.author} loading="lazy" className="w-full max-w-md h-[400px] md:h-[500px] object-cover object-top mx-auto relative z-10 drop-shadow-2xl rounded-2xl transition-all duration-700" />
                                    <div className="absolute inset-0 bg-zeven-blue/10 rounded-full transform scale-90 translate-y-10 -z-0 blur-xl" />
                                 </div>
                              </ScrollReveal>
                           </div>
                           <div className={isEven ? '' : 'md:order-first'}>
                              <ScrollReveal delay={0.2}>
                                 <div>
                                    {msg.title && <h3 className="text-2xl font-bold text-zeven-blue mb-6">{msg.title}</h3>}
                                    <p className="text-zeven-gray leading-relaxed mb-8 text-base md:text-lg font-light whitespace-pre-wrap">
                                       {msg.content}
                                    </p>
                                    <div className="text-5xl font-signature text-zeven-blue opacity-80 rotate-[-2deg]">
                                       {msg.author}
                                    </div>
                                    {msg.role && <div className="text-sm font-bold text-zeven-gray mt-2 uppercase tracking-wider">{msg.role}</div>}
                                 </div>
                              </ScrollReveal>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </section>

         {/* --- CONTACT SPLIT --- */}
         <section className="py-24 bg-white" id="contact">
            <div className="container mx-auto px-6">
               <ScrollReveal>
                  <div className="bg-zeven-blue rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[600px]">
                     {/* Left Blue Panel */}
                     <div className="lg:w-2/5 p-12 lg:p-16 text-white flex flex-col justify-between relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                        <div className="absolute inset-0 bg-gradient-to-b from-zeven-blue to-zeven-deep opacity-90" />

                        <div className="relative z-10">
                           <h2 className="text-3xl md:text-4xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: homePage?.contactFormSection?.heading || `Let's Connect` }}></h2>
                           <p className="text-blue-100 mb-12 text-base md:text-lg">{homePage?.contactFormSection?.description || `Ready to transform your digital presence? We're here to help you scale.`}</p>

                           <div className="space-y-10">
                              <div className="group">
                                 <div className="flex items-center gap-4 font-bold text-xl mb-1 group-hover:translate-x-2 transition-transform"><Mail size={24} /> Email Us</div>
                                 <p className="text-blue-100/80 ml-10">{siteSettings?.contactEmail || 'hello@zevenstone.com'}</p>
                              </div>
                              <div className="group">
                                 <div className="flex items-center gap-4 font-bold text-xl mb-1 group-hover:translate-x-2 transition-transform"><Phone size={24} /> Call Us</div>
                                 <p className="text-blue-100/80 ml-10">{siteSettings?.phoneNumber || '+1 (555) 123-4567'}</p>
                              </div>
                              <div className="group">
                                 <div className="flex items-center gap-4 font-bold text-xl mb-1 group-hover:translate-x-2 transition-transform"><MapPin size={24} /> Visit Us</div>
                                 <p className="text-blue-100/80 ml-10 whitespace-pre-wrap">{siteSettings?.address || '123 Creative Street\\nNew Delhi, India'}</p>
                              </div>
                           </div>
                        </div>

                        {/* Circles Decor */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                     </div>

                     {/* Right White Form */}
                     <div className="lg:w-3/5 bg-white p-12 lg:p-16 flex flex-col justify-center">
                        <form className="space-y-8">
                           <div className="grid md:grid-cols-2 gap-8">
                              <div className="space-y-2 group">
                                 <label className="text-zeven-blue font-bold text-sm uppercase tracking-wider group-focus-within:text-zeven-deep">Full Name</label>
                                 <input type="text" placeholder="John Doe" className="w-full p-4 bg-zeven-surface/30 rounded-xl border border-zeven-surface focus:border-zeven-blue focus:bg-white focus:outline-none transition-all focus:shadow-lg" />
                              </div>
                              <div className="space-y-2 group">
                                 <label className="text-zeven-blue font-bold text-sm uppercase tracking-wider group-focus-within:text-zeven-deep">Email Address</label>
                                 <input type="email" placeholder="john@company.com" className="w-full p-4 bg-zeven-surface/30 rounded-xl border border-zeven-surface focus:border-zeven-blue focus:bg-white focus:outline-none transition-all focus:shadow-lg" />
                              </div>
                           </div>

                           <div className="space-y-2 group">
                              <label className="text-zeven-blue font-bold text-sm uppercase tracking-wider group-focus-within:text-zeven-deep">Your Message</label>
                              <textarea rows={4} placeholder="Tell us about your project..." className="w-full p-4 bg-zeven-surface/30 rounded-xl border border-zeven-surface focus:border-zeven-blue focus:bg-white focus:outline-none transition-all focus:shadow-lg resize-none"></textarea>
                           </div>

                           <Button className="w-full rounded-xl py-4 bg-zeven-blue hover:bg-zeven-deep shadow-lg hover:shadow-zeven-blue/40 text-lg">Send Message <Send size={20} /></Button>
                        </form>
                     </div>
                  </div>
               </ScrollReveal>
            </div>
         </section>

         {/* --- FAQ --- */}
         <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
               <ScrollReveal>
                  <div className="text-center mb-12">
                     <h2 className="font-bold text-3xl md:text-4xl text-zeven-dark mb-4" dangerouslySetInnerHTML={{ __html: homePage?.faqHeading?.heading || `Frequently Asked <span class="text-zeven-blue">Questions</span>` }}></h2>
                     <p className="text-zeven-gray">{homePage?.faqHeading?.description || `Everything you need to know about working with us.`}</p>
                  </div>
               </ScrollReveal>
               <div className="space-y-4">
                  {FAQS.map((faq, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === index ? 'bg-zeven-surface shadow-md' : 'bg-white border border-zeven-surface'}`}
                     >
                        <button
                           onClick={() => toggleFaq(index)}
                           className="w-full flex items-center justify-between p-6 text-left"
                        >
                           <span className={`font-bold text-lg transition-colors ${openFaq === index ? 'text-zeven-blue' : 'text-zeven-dark'}`}>{faq.question}</span>
                           <span className={`p-2 rounded-full transition-transform duration-300 ${openFaq === index ? 'rotate-180 bg-zeven-blue text-white' : 'bg-zeven-surface text-zeven-dark'}`}>
                              <ChevronRight size={20} />
                           </span>
                        </button>
                        <AnimatePresence>
                           {openFaq === index && (
                              <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 className="overflow-hidden"
                              >
                                 <div className="p-6 pt-0 text-zeven-gray leading-relaxed pl-6 border-t border-zeven-gray/5 mt-2">
                                    {faq.answer}
                                 </div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

      </div>
   );
};
