import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { sanityClient } from '../lib/sanity';
import { CASE_STUDY_BY_SLUG_QUERY, CASE_STUDIES_QUERY } from '../lib/queries';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorState } from '../components/ui/ErrorState';
import { Helmet } from 'react-helmet-async';
import { ContactForm } from '../components/ContactForm';
import {
   ArrowLeft,
   CheckCircle,
   TrendingUp,
   Users,
   Target,
   Zap,
   ArrowRight,
   AlertCircle,
   Lightbulb,
   BarChart3,
   Rocket,
   Shield,
   Clock,
   Award,
   Calendar,
   Percent,
   DollarSign
} from 'lucide-react';
const CaseStudyContactForm = () => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      company: '',
      goals: '',
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      // Simulate API call for now to preserve the design request.
      setTimeout(() => {
         setSubmitStatus('success');
         setIsSubmitting(false);
      }, 1500);
   };

   if (submitStatus === 'success') {
      return (
         <div className="text-center py-10">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
               <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-gray-600">We'll be in touch shortly.</p>
         </div>
      );
   }

   return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
         <h3 className="text-[26px] md:text-[32px] font-extrabold text-[#111827] mb-6 text-center leading-tight">
            Schedule Your Free Consultation
         </h3>
         
         <input 
            type="text" 
            placeholder="Your Name" 
            required
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 md:px-6 md:py-4 bg-white border border-gray-200 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm md:text-base font-medium shadow-sm" 
         />
         
         <input 
            type="email" 
            placeholder="Email Address" 
            required
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 md:px-6 md:py-4 bg-white border border-gray-200 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm md:text-base font-medium shadow-sm" 
         />
         
         <input 
            type="text" 
            placeholder="Company Name" 
            value={formData.company}
            onChange={e => setFormData({...formData, company: e.target.value})}
            className="w-full px-4 py-3 md:px-6 md:py-4 bg-white border border-gray-200 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm md:text-base font-medium shadow-sm" 
         />
         
         <textarea 
            placeholder="Tell us about your goals..." 
            required
            value={formData.goals}
            onChange={e => setFormData({...formData, goals: e.target.value})}
            className="w-full px-4 py-3 md:px-6 md:py-4 bg-white border border-gray-200 rounded-[28px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm md:text-base font-medium min-h-[140px] resize-none shadow-sm" 
         />
         
         <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#111827] hover:bg-black text-white font-bold text-base md:text-lg py-3 md:py-4 rounded-full shadow-lg transition-all mt-4"
         >
            {isSubmitting ? 'Sending...' : 'Get My Free Strategy Session'}
         </button>

         <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mt-6">
            <div className="flex items-center gap-1.5">
               <CheckCircle className="w-5 h-5 text-[#10b981]" />
               <span className="text-sm font-medium text-gray-500">Free consultation</span>
            </div>
            <div className="flex items-center gap-1.5">
               <Shield className="w-5 h-5 text-[#10b981]" />
               <span className="text-sm font-medium text-gray-500">No commitment</span>
            </div>
            <div className="flex items-center gap-1.5">
               <Clock className="w-5 h-5 text-[#3b82f6]" />
               <span className="text-sm font-medium text-gray-500">30 minutes</span>
            </div>
         </div>
      </form>
   );
};

export const CaseStudy: React.FC = () => {
   const { id } = useParams();
   const navigate = useNavigate();

   const [activeTab, setActiveTab] = useState<'challenge' | 'solution' | 'results'>('challenge');
   const [showStickyCTA, setShowStickyCTA] = useState(false);

   const { data: study, isLoading, error } = useQuery({
      queryKey: ['caseStudy', id],
      queryFn: () => sanityClient.fetch(CASE_STUDY_BY_SLUG_QUERY, { slug: id }),
   });

   const { data: allStudies } = useQuery({
      queryKey: ['caseStudies'],
      queryFn: () => sanityClient.fetch(CASE_STUDIES_QUERY),
   });

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [id]);

   useEffect(() => {
      const handleScroll = () => {
         setShowStickyCTA(window.scrollY > 600);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   if (isLoading) return <LoadingSpinner />;
   if (error || !study) return <ErrorState />;

   const scrollToContactCTA = () => {
      const element = document.getElementById('contact-cta');
      element?.scrollIntoView({ behavior: 'smooth' });
   };

   // Safe variables with fallbacks
   const tags = study.tags || [];
   const services = study.services || [];
   const metrics = study.results?.metrics || [];
   const additionalImpact = study.results?.additionalImpact || [];
   const painPoints = study.challenge?.painPoints || [];
   const strategies = study.solution?.strategies || [];
   const processTimeline = study.processTimeline || [];


   return (
      <div className="min-h-screen bg-white font-sans">
         <Helmet>
            <title>{study?.seo?.title || study?.seo?.metaTitle || `${study.title || study.client} | Case Study`}</title>
            <meta name="description" content={study?.seo?.description || study?.seo?.metaDescription || study.subtitle || study.challenge?.overview} />
         </Helmet>

         {/* Sticky CTA Bar - Appears on scroll */}
         <div className={`fixed bottom-0 left-0 right-0 z-40 transform transition-transform duration-300 ${showStickyCTA ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="backdrop-blur-xl bg-white/95 border-t border-gray-200 shadow-2xl">
               <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
                  <div className="flex items-center justify-center sm:justify-between">
                     <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-3">
                        
                           {metrics.length > 0 && (
                              <div className="w-14 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                 {metrics[0].value.substring(0, 4)}
                              </div>
                           )}
                           <div>
                              <div className="text-sm font-bold text-gray-900">Ready for similar results?</div>
                              <div className="text-xs text-gray-600">{study.stickyCtaSubtitle || `Join ${study.client} and 500+ successful brands`}</div>
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <button
                           onClick={scrollToContactCTA}
                           className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2.5 md:px-8 md:py-3 rounded-full font-bold text-xs md:text-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                        >
                           {study.stickyCtaButtonText || 'Start Your Success Story'}
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
         <section className="relative pt-24 pb-20 px-6 bg-[#f8fafc] overflow-hidden">
            {/* Background gradient blurs - matching brand style */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] md:w-[947px] md:h-[947px] bg-blue-500/5 rounded-full blur-[60px] opacity-28 -translate-y-20 translate-x-20" />
            <div className="absolute top-[354px] left-10 w-[300px] h-[300px] md:w-[546px] md:h-[546px] bg-blue-400/5 rounded-full blur-[45px]" />

            <div className="max-w-7xl mx-auto relative z-10 pt-8 sm:pt-16">
               <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                     {/* Back Link */}
                     <Link to="/success-stories" className="hidden text-gray-500 hover:text-blue-500 mb-6 transition-colors text-sm font-semibold">
                        <ArrowLeft size={16} className="mr-2" /> Back to Success Stories
                     </Link>

                     {/* Badge - brand style */}
                     <div className="inline-block backdrop-blur-md bg-white/60 border border-blue-500/20 rounded-full px-4 py-1.5 md:px-5 md:py-2 mb-6">
                        <p className="text-xs font-semibold text-blue-500 tracking-[2px] uppercase">
                           {study.client} {study.industry ? `• ${study.industry}` : ''}
                        </p>
                     </div>

                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
                        {study.headline || study.title}
                     </h1>

                     <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                        {study.subtitle}
                     </p>

                     {/* Quick stats */}
                     <div className="hidden grid grid-cols-2 gap-4 mb-8">
                        {metrics.length > 0 && (
                           <div className="backdrop-blur-xl bg-white/80 border border-white/60 rounded-[24px] shadow-lg p-6">
                              <div className="text-3xl md:text-4xl font-extrabold text-blue-500 mb-1">
                                 {metrics[0].value}
                              </div>
                              <div className="text-sm text-gray-600 font-medium">
                                 {metrics[0].label}
                              </div>
                           </div>
                        )}
                        {study.timeline && (
                           <div className="backdrop-blur-xl bg-white/80 border border-white/60 rounded-[24px] shadow-lg p-6">
                              <div className="text-3xl md:text-4xl font-extrabold text-blue-500 mb-1">
                                 {study.timeline}
                              </div>
                              <div className="text-sm text-gray-600 font-medium">Timeline</div>
                           </div>
                        )}
                     </div>

                     {/* Primary CTA */}
                     <div className="flex flex-col sm:flex-row gap-4">
                        <button
                           onClick={scrollToContactCTA}
                           className="bg-gray-900 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base shadow-2xl hover:bg-gray-800 hover:scale-105 transition-all flex items-center justify-center gap-2"
                        >
                           {study.heroCtaPrimary || 'Get Similar Results'}
                           <ArrowRight className="w-5 h-5" />
                        </button>
                        <Link
                           to="/success-stories"
                           className="border-2 border-gray-300 text-gray-700 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base hover:bg-gray-50 transition-all text-center"
                        >
                           {study.heroCtaSecondary || 'View More Stories'}
                        </Link>
                     </div>

                     {/* Trust indicators */}
                     <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-600">
                        {study.trustIndicators?.length > 0 ? (
                           study.trustIndicators.map((indicator: string, idx: number) => {
                              const icons = [CheckCircle, Shield, Rocket];
                              const Icon = icons[idx % icons.length];
                              const colors = ['text-green-500', 'text-green-500', 'text-blue-500'];
                              const colorClass = colors[idx % colors.length];
                              return (
                                 <div key={idx} className="flex items-center gap-2">
                                    <Icon className={`w-5 h-5 ${colorClass}`} />
                                    <span className="font-medium">{indicator}</span>
                                 </div>
                              );
                           })
                        ) : (
                           <>
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
                           </>
                        )}
                     </div>
                  </div>

                  <div className="relative">
                     {study.imageUrl && (
                        <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white/50 bg-slate-100">
                           <img src={study.imageUrl} alt={study.client} className="w-full h-auto object-cover max-h-[500px]" />
                        </div>
                     )}
                     {/* Floating badge */}
                     {study.timeline && (
                        <div className="hidden absolute -bottom-6 -right-6 backdrop-blur-xl bg-white/90 border border-white/60 rounded-[24px] shadow-2xl px-6 py-4">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                                 <Award className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                 <div className="text-lg font-extrabold text-gray-900">Success Story</div>
                                 <div className="text-xs text-gray-600 font-medium">{study.timeline} transformation</div>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </section>

         {/* Key Metrics - Brand-aligned cards */}
         {metrics.length > 0 && (
            <section className="hidden bg-white py-16 px-6">
               <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-12">
                     <div className="inline-block backdrop-blur-md bg-blue-500/10 border border-blue-500/20 rounded-full px-5 py-2.5 shadow-sm mb-4">
                        <p className="text-xs font-semibold text-blue-600 tracking-[2px] uppercase">
                           Key Results
                        </p>
                     </div>
                     <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        The Numbers That Matter
                     </h2>
                     {study.timeline && (
                        <p className="text-lg text-gray-600">
                           Measurable impact delivered in {study.timeline}
                        </p>
                     )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                     {metrics.map((metric: any, idx: number) => {
                        const colors = [
                           'from-blue-500 to-blue-600',
                           'from-purple-500 to-purple-600',
                           'from-green-500 to-green-600',
                           'from-orange-500 to-orange-600'
                        ];

                        return (
                           <div key={idx} className="backdrop-blur-xl bg-white/80 border border-white/60 rounded-[32px] shadow-lg p-6 md:p-8 text-center hover:shadow-2xl hover:scale-105 transition-all group">
                              <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${colors[idx % colors.length]} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                 <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />
                              </div>
                              <div className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2">
                                 {metric.value}
                              </div>
                              <div className="text-xs md:text-sm text-gray-600 font-medium">{metric.label}</div>
                           </div>
                        );
                     })}
                  </div>
               </div>
            </section>
         )}

             {/* Services - Brand-aligned */}
         {services.length > 0 && (
            <section className="bg-[#f8fafc] py-12 px-6 border-y border-gray-100">
               <div className="max-w-7xl mx-auto">
                  <div className="text-center">
                     <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Services Delivered</div>
                     <div className="flex flex-wrap items-center gap-3 justify-center">
                        {services.map((service: string, idx: number) => (
                           <span key={idx} className="backdrop-blur-md bg-white/80 text-gray-900 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold border border-gray-200 shadow-md hover:shadow-lg hover:scale-105 transition-all">
                              {service}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>
            </section>
         )}

         {/* Impact Highlights */}
         {metrics.length > 0 && (
            <section className="py-16 px-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
               <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                     backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                     backgroundSize: '40px 40px'
                  }} />
               </div>

               <div className="max-w-7xl mx-auto relative z-10">
                  <div className="text-center mb-12">
                     <h3 className="text-2xl md:text-3xl font-bold mb-2">Impact at a Glance</h3>
                     <p className="text-xs md:text-sm text-gray-400">The numbers that matter</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                     {metrics.map((metric: any, idx: number) => {
                        const icons = [TrendingUp, DollarSign, Percent, Users];
                        const Icon = icons[idx % icons.length];
                        const colors = ['from-blue-500 to-blue-600', 'from-purple-500 to-purple-600', 'from-green-500 to-green-600', 'from-orange-500 to-orange-600'];

                        return (
                           <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group">
                              <div className={`w-12 h-12 bg-gradient-to-br ${colors[idx % colors.length]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                                 <Icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                 {metric.value}
                              </div>
                              <div className="text-xs md:text-sm text-gray-400 font-medium">{metric.label}</div>
                           </div>
                        );
                     })}
                  </div>
               </div>
            </section>
         )}

         {/* Before/After Comparison */}
         {study.beforeAfter && study.beforeAfter.before && study.beforeAfter.after && (
            <section className="py-20 px-6 bg-white">
               <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16">
                     <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        <BarChart3 className="w-4 h-4" />
                        The Transformation
                     </div>
                     <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Before vs After
                     </h2>
                     {study.timeline && (
                        <p className="text-lg text-gray-600">
                           See the measurable impact we delivered in just {study.timeline}
                        </p>
                     )}
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                     {/* Before */}
                     <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 md:p-10 border border-red-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/5 rounded-full blur-3xl" />

                        <div className="flex items-center gap-3 mb-8 relative z-10">
                           <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                              <AlertCircle className="w-6 h-6 text-white" />
                           </div>
                           <h3 className="text-xl md:text-2xl font-bold text-gray-900">Before</h3>
                        </div>

                        <div className="space-y-4 relative z-10">
                           {study.beforeAfter.before.map((item: any, idx: number) => (
                              <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-red-100">
                                 <div className="flex items-center justify-between gap-4">
                                    <span className="text-xs md:text-sm font-semibold text-gray-700">{item.metric}</span>
                                    <span className="text-xl md:text-2xl font-extrabold text-red-600 shrink-0">{item.value}</span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* After */}
                     <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-10 border border-green-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/5 rounded-full blur-3xl" />

                        <div className="flex items-center gap-3 mb-8 relative z-10">
                           <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                              <TrendingUp className="w-6 h-6 text-white" />
                           </div>
                           <h3 className="text-xl md:text-2xl font-bold text-gray-900">After</h3>
                           {study.timeline && (
                              <div className="ml-auto bg-green-600 text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                 {study.timeline}
                              </div>
                           )}
                        </div>

                        <div className="space-y-4 relative z-10">
                           {study.beforeAfter.after.map((item: any, idx: number) => (
                              <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-green-200 relative overflow-hidden group">
                                 <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                 <div className="flex items-center justify-between gap-4 relative z-10">
                                    <span className="text-xs md:text-sm font-semibold text-gray-700">{item.metric}</span>
                                    <div className="flex items-center gap-2 md:gap-3 shrink-0">
                                       <span className="text-xl md:text-2xl font-extrabold text-green-600">{item.value}</span>
                                       <TrendingUp className="w-5 h-5 text-green-600" />
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Improvement indicators */}
                  {study.timeline && (
                     <div className="mt-12 text-center">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl shadow-xl">
                           <Award className="w-6 h-6" />
                           <span className="font-bold text-base md:text-lg">Measurable Results in {study.timeline}</span>
                        </div>
                     </div>
                  )}
               </div>
            </section>
         )}

         {/* Overview */}
         {study.results?.overview && (
            <section className="pt-12 pb-0 px-6 bg-gray-50 border-t border-gray-100">
               <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                     The Story Behind the Numbers
                  </h2>
                  <p className="text-base md:text-xl text-gray-600 leading-relaxed">
                     {study.results.overview}
                  </p>
               </div>
            </section>
         )}

         {/* Tabs / Case Details */}
         <section className="py-16 px-6 bg-gray-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" aria-hidden="true" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" aria-hidden="true" />

            <div className="max-w-7xl mx-auto relative z-10">
               {/* Tab Navigation */}
               <div className="flex justify-center mb-12 px-4 w-full">
                  <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100 w-full sm:w-auto">
                     <div className="flex flex-row overflow-x-auto justify-start sm:justify-center snap-x gap-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <button
                           onClick={() => setActiveTab('challenge')}
                           className={`px-4 py-3 md:px-8 md:py-4 cursor-pointer rounded-xl font-semibold transition-all flex items-center justify-center whitespace-nowrap shrink-0 snap-start gap-2 text-sm md:text-base ${activeTab === 'challenge'
                              ? 'bg-red-50 text-red-600 shadow-sm'
                              : 'text-gray-600 hover:text-gray-900'
                              }`}
                        >
                           <AlertCircle className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                           The Challenge
                        </button>
                        <button
                           onClick={() => setActiveTab('solution')}
                           className={`px-4 py-3 md:px-8 md:py-4 cursor-pointer rounded-xl font-semibold transition-all flex items-center justify-center whitespace-nowrap shrink-0 snap-start gap-2 text-sm md:text-base ${activeTab === 'solution'
                              ? 'bg-blue-50 text-blue-600 shadow-sm'
                              : 'text-gray-600 hover:text-gray-900'
                              }`}
                        >
                           <Lightbulb className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                           Our Solution
                        </button>
                        <button
                           onClick={() => setActiveTab('results')}
                           className={`px-4 py-3 md:px-8 md:py-4 cursor-pointer rounded-xl font-semibold transition-all flex items-center justify-center whitespace-nowrap shrink-0 snap-start gap-2 text-sm md:text-base ${activeTab === 'results'
                              ? 'bg-green-50 text-green-600 shadow-sm'
                              : 'text-gray-600 hover:text-gray-900'
                              }`}
                        >
                           <TrendingUp className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                           The Results
                        </button>
                     </div>
                  </div>
               </div>

               {/* Tab Content */}
               <div className="min-h-[400px]">
                  {activeTab === 'challenge' && study.challenge && (
                     <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col items-center text-center gap-6 mb-12 max-w-4xl mx-auto">
                           <div className="flex items-center gap-4">
                              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl shrink-0 shadow-xl">
                                 <AlertCircle className="w-10 h-10 text-white" aria-hidden="true" />
                              </div>
                              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">The Challenge</h3>
                           </div>
                           <p className="text-base md:text-lg text-gray-600 leading-relaxed">{study.challenge.overview}</p>
                        </div>

                        {/* Pain points with icons and numbers */}
                        {painPoints.length > 0 && (
                           <div className="grid md:grid-cols-2 gap-6">
                              {painPoints.map((point: string, idx: number) => {
                                 const icons = [AlertCircle, Clock, Target, Shield];
                                 const Icon = icons[idx % icons.length];

                                 return (
                                    <div key={idx} className="bg-white border-l-4 border-red-500 p-6 rounded-r-2xl shadow-md hover:shadow-xl transition-shadow relative overflow-hidden group">
                                       {/* Number badge */}
                                       <div className="absolute top-4 right-4 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                                          <span className="text-red-600 font-bold text-base md:text-lg">{idx + 1}</span>
                                       </div>

                                       {/* Icon */}
                                       <div className="flex items-start gap-4 mb-3">
                                          <div className="bg-red-100 p-3 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                                             <Icon className="w-5 h-5 md:w-6 md:h-6 text-red-600" aria-hidden="true" />
                                          </div>
                                       </div>

                                       <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium pr-12">{point}</p>

                                       {/* Decorative corner element */}
                                       <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-red-50 to-transparent rounded-tl-full" aria-hidden="true" />
                                    </div>
                                 );
                              })}
                           </div>
                        )}
                     </div>
                  )}

                  {activeTab === 'solution' && study.solution && (
                     <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col items-center text-center gap-6 mb-12 max-w-4xl mx-auto">
                           <div className="flex items-center gap-4">
                              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl shrink-0 shadow-xl">
                                 <Lightbulb className="w-10 h-10 text-white" aria-hidden="true" />
                              </div>
                              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Our Approach</h3>
                           </div>
                           <p className="text-base md:text-lg text-gray-600 leading-relaxed">{study.solution.overview}</p>
                        </div>

                        {/* Strategies with icons and visual enhancements */}
                        {strategies.length > 0 && (
                           <div className="grid md:grid-cols-2 gap-8">
                              {strategies.map((strategy: any, idx: number) => {
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
                                    <div key={idx} className={`bg-white rounded-2xl p-6 md:p-8 shadow-xl border-2 ${color.border} hover:shadow-2xl transition-all relative overflow-hidden group`}>
                                       {/* Background pattern */}
                                       <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50/50 to-transparent rounded-bl-full" aria-hidden="true" />

                                       {/* Step indicator */}
                                       <div className="flex items-center gap-4 mb-6">
                                          <div className={`bg-gradient-to-br ${color.gradient} w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                             <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" aria-hidden="true" />
                                          </div>
                                          <div className={`${color.bg} px-4 py-2 rounded-full`}>
                                             <span className={`${color.text} font-bold text-xs md:text-sm`}>STEP {idx + 1}</span>
                                          </div>
                                       </div>

                                       <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{strategy.title}</h4>
                                       <p className="text-sm md:text-base text-gray-600 leading-relaxed relative z-10">{strategy.description}</p>

                                       {/* Decorative element */}
                                       <div className={`absolute bottom-0 left-0 h-1 w-full ${color.bg} group-hover:h-2 transition-all`} aria-hidden="true" />
                                    </div>
                                 );
                              })}
                           </div>
                        )}
                     </div>
                  )}

                  {activeTab === 'results' && study.results && (
                     <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col items-center text-center gap-6 mb-12 max-w-4xl mx-auto">
                           <div className="flex items-center gap-4">
                              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-6 0 rounded-3xl shrink-0 shadow-xl">
                                 <TrendingUp className="w-10 h-10 text-white" aria-hidden="true" />
                              </div>
                              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Business Impact</h3>
                           </div>
                           <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                              Measurable results that transformed their business
                           </p>
                        </div>

                        {/* Results with enhanced visuals */}
                        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-6 md:p-10 shadow-xl border-2 border-green-100 relative overflow-hidden">
                           {/* Background pattern */}
                           <div className="absolute inset-0 opacity-5" aria-hidden="true">
                              <div className="absolute inset-0" style={{
                                 backgroundImage: 'radial-gradient(circle, #10b981 2px, transparent 2px)',
                                 backgroundSize: '40px 40px'
                              }} />
                           </div>

                           <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shrink-0">
                                 <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
                              </div>
                              Business Impact Highlights
                           </h4>

                           {additionalImpact.length > 0 && (
                              <div className="grid md:grid-cols-2 gap-6 relative z-10">
                                 {additionalImpact.map((impact: string, idx: number) => (
                                    <div key={idx} className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow group">
                                       <div className="bg-gradient-to-br from-green-500 to-green-600 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md">
                                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
                                       </div>
                                       <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium pt-1">{impact}</p>
                                    </div>
                                 ))}
                              </div>
                           )}

                           {/* Success badge */}
                           <div className="mt-8 flex justify-center">
                              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-full shadow-lg">
                                 <TrendingUp className="w-5 h-5" aria-hidden="true" />
                                 <span className="font-bold text-sm">Success Story</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </section>

         {/* Process Timeline */}
         {processTimeline.length > 0 && (
            <section className="py-20 px-6 bg-white border-t border-gray-100">
               <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16">
                     <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        <Clock className="w-4 h-4" />
                        Our Process
                     </div>
                     <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        How We Made It Happen
                     </h2>
                     {study.timeline && (
                        <p className="text-lg text-gray-600">
                           A transparent look at our {study.timeline} journey together
                        </p>
                     )}
                  </div>

                  <div className="relative">
                     {/* Timeline connector line */}
                     <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-green-200 hidden lg:block" />

                     <div className="space-y-12">
                        {processTimeline.map((phase: any, idx: number) => {
                           const colors = [
                              { bg: 'from-blue-500 to-blue-600', border: 'border-blue-200', icon: 'bg-blue-100 text-blue-600' },
                              { bg: 'from-purple-500 to-purple-600', border: 'border-purple-200', icon: 'bg-purple-100 text-purple-600' },
                              { bg: 'from-indigo-500 to-indigo-600', border: 'border-indigo-200', icon: 'bg-indigo-100 text-indigo-600' },
                              { bg: 'from-green-500 to-green-600', border: 'border-green-200', icon: 'bg-green-100 text-green-600' }
                           ];
                           const color = colors[idx % colors.length];
                           const deliverables = phase.deliverables || [];

                           return (
                              <div key={idx} className="relative lg:pl-24">
                                 {/* Timeline dot */}
                                 <div className={`absolute left-0 top-8 w-16 h-16 bg-gradient-to-br ${color.bg} rounded-2xl shadow-xl hidden lg:flex items-center justify-center text-white font-bold text-xl`}>
                                    {idx + 1}
                                 </div>

                                 <div className={`bg-white rounded-3xl p-5 md:p-8 lg:p-10 shadow-xl border-2 ${color.border} hover:shadow-2xl transition-all relative overflow-hidden group`}>
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
                                                <h3 className="text-xl md:text-2xl font-bold text-gray-900">{phase.phase}</h3>
                                             </div>
                                          </div>
                                          {phase.duration && (
                                             <div className={`inline-flex items-center gap-2 ${color.icon} px-4 py-2 rounded-full font-bold text-xs md:text-sm self-start md:self-auto`}>
                                                <Calendar className="w-4 h-4" />
                                                {phase.duration}
                                             </div>
                                          )}
                                       </div>

                                       {/* Description */}
                                       <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                                          {phase.description}
                                       </p>

                                       {/* Deliverables */}
                                       {deliverables.length > 0 && (
                                          <div>
                                             <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                                                Key Deliverables
                                             </h4>
                                             <div className="grid md:grid-cols-2 gap-3">
                                                {deliverables.map((deliverable: string, dIdx: number) => (
                                                   <div key={dIdx} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                                                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                                      <span className="text-xs md:text-sm font-medium text-gray-700">{deliverable}</span>
                                                   </div>
                                                ))}
                                             </div>
                                          </div>
                                       )}
                                    </div>

                                    {/* Progress indicator */}
                                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-100 overflow-hidden">
                                       <div
                                          className={`h-full bg-gradient-to-r ${color.bg} transition-all duration-1000 group-hover:w-full`}
                                          style={{ width: `${((idx + 1) / processTimeline.length) * 100}%` }}
                                       />
                                    </div>
                                 </div>
                              </div>
                           );
                        })}
                     </div>

                     {/* Timeline summary */}
                     <div className="mt-16 text-center">
                        <div className="xl:w-[700px] xl:justify-around inline-flex flex-wrap md:flex-nowrap items-center justify-center gap-4 md:gap-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl px-4 py-4 sm:px-6 md:px-10 md:py-6 border border-blue-100 shadow-lg">
                           <div className="text-center">
                              <div className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-1">{study.timeline}</div>
                              <div className="text-xs md:text-sm text-gray-600 font-semibold">Total Duration</div>
                           </div>
                           <div className="hidden md:block w-px h-12 bg-gray-300" />
                           <div className="text-center">
                              <div className="text-3xl md:text-4xl font-extrabold text-purple-600 mb-1">{processTimeline.length}</div>
                              <div className="text-xs md:text-sm text-gray-600 font-semibold">Phases</div>
                           </div>
                           <div className="hidden md:block w-px h-12 bg-gray-300" />
                           <div className="text-center">
                              <div className="text-3xl md:text-4xl font-extrabold text-green-600 mb-1">
                                 {processTimeline.reduce((acc: number, p: any) => acc + (p.deliverables?.length || 0), 0)}
                              </div>
                              <div className="text-xs md:text-sm text-gray-600 font-semibold">Deliverables</div>
                           </div>
                        </div>
                     </div>

                  </div>
               </div>
            </section>
         )}

         {/* Mid-journey CTA - Strategic placement */}
         <section className="py-20 px-6 bg-white">
            <div className="max-w-5xl mx-auto">
               <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-[32px] md:rounded-[40px] p-6 md:p-12 lg:p-16 text-center shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 opacity-90" />
                  <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

                  <div className="relative z-10">
                     <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-5 py-2.5 rounded-full mb-6 text-xs md:text-sm font-bold text-white uppercase tracking-wider">
                        <Rocket className="w-4 h-4" />
                        {study.midCta?.tagline || 'Ready to Transform Your Business?'}
                     </div>

                     <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                        {study.midCta?.heading || 'Your Success Story Starts Here'}
                     </h3>

                     <p className="text-base md:text-lg text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                        {study.midCta?.description || `Join ${study.client} and 500+ brands achieving breakthrough results with data-driven strategies.`}
                     </p>

                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                           onClick={scrollToContactCTA}
                           className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-base shadow-2xl hover:bg-blue-50 hover:scale-105 transition-all"
                        >
                           {study.midCta?.buttonText || 'Get Your Free Strategy Session'}
                        </button>
                        <Link
                           to="/success-stories"
                           className="border-2 border-white/40 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white/10 backdrop-blur-sm transition-all text-center"
                        >
                           View More Case Studies
                        </Link>
                     </div>

                     {/* Trust indicators */}
                     <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-xs md:text-sm text-white/90">
                        {study.midCta?.trustBadges?.length > 0 ? (
                           study.midCta.trustBadges.map((badge: string, idx: number) => {
                              const icons = [CheckCircle, Shield, Target];
                              const Icon = icons[idx % icons.length];
                              return (
                                 <div key={idx} className="flex items-center gap-2">
                                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                                    <span className="font-medium">{badge}</span>
                                 </div>
                              );
                           })
                        ) : (
                           <>
                              <div className="flex items-center gap-2">
                                 <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                                 <span className="font-medium">Free 30-min consultation</span>
                              </div>
                              <div className="flex items-center gap-2">
                                 <Shield className="w-4 h-4 md:w-5 md:h-5" />
                                 <span className="font-medium">No commitment required</span>
                              </div>
                              <div className="flex items-center gap-2">
                                 <Target className="w-4 h-4 md:w-5 md:h-5" />
                                 <span className="font-medium">Custom growth roadmap</span>
                              </div>
                           </>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Testimonial - Brand-aligned */}
         {study.testimonial && study.testimonial.quote && (
            <section className="py-20 px-6 bg-[#f8fafc]">
               <div className="max-w-5xl mx-auto">
                  <div className="backdrop-blur-xl bg-white/90 border border-white/60 rounded-[32px] md:rounded-[40px] shadow-2xl p-6 md:p-12 lg:p-16">
                     <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-1 mb-6">
                           {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                 <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                           ))}
                        </div>
                     </div>

                     <blockquote className="text-base md:text-xl lg:text-2xl font-medium leading-relaxed mb-10 text-center text-gray-900 italic">
                        "{study.testimonial.quote}"
                     </blockquote>

                     <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                        {study.testimonial.avatarUrl && (
                           <img
                              src={study.testimonial.avatarUrl}
                              alt={study.testimonial.author}
                              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-xl object-cover"
                           />
                        )}
                        <div className="text-center sm:text-left">
                           <div className="text-lg md:text-xl font-bold text-gray-900 mb-1">{study.testimonial.author}</div>
                           <div className="text-sm md:text-base text-gray-600 font-medium">{study.testimonial.role}</div>
                           <div className="text-xs md:text-sm text-blue-600 font-semibold mt-1">{study.client}</div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         )}

         {/* More Stories - Brand-aligned */}
         {allStudies && allStudies.filter((s: any) => s.slug !== id && s._id !== id).length > 0 && (
            <section className="py-20 px-6 bg-white border-t border-gray-100">
               <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16">
                     <div className="inline-block backdrop-blur-md bg-blue-500/10 border border-blue-500/20 rounded-full px-5 py-2.5 shadow-sm mb-6">
                        <p className="text-xs font-semibold text-blue-600 tracking-[2px] uppercase">
                           More Success Stories
                        </p>
                     </div>
                     <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Explore Other Transformations
                     </h2>
                     <p className="text-base md:text-lg text-gray-600">
                        See how we've helped brands across industries achieve breakthrough results
                     </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                     {allStudies
                        .filter((s: any) => s.slug !== id && s._id !== id)
                        .slice(0, 2)
                        .map((relatedStory: any) => (
                           <div
                              key={relatedStory._id}
                              className="backdrop-blur-xl bg-white/80 border border-white/60 rounded-[40px] overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer group flex flex-col h-full"
                              onClick={() => {
                                 navigate(`/case-study/${relatedStory.slug || relatedStory._id}`);
                                 window.scrollTo(0, 0);
                              }}
                           >
                              <div className="relative h-56 md:h-64 lg:h-80 overflow-hidden shrink-0">
                                 {relatedStory.imageUrl && (
                                    <img
                                       src={relatedStory.imageUrl}
                                       alt={relatedStory.client}
                                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                 )}
                                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />

                                 {/* Badge */}
                                 {relatedStory.industry && (
                                    <div className="absolute top-6 left-6">
                                       <div className="backdrop-blur-md bg-white/25 border border-white/30 px-4 py-1.5 rounded-full">
                                          <span className="text-white text-[10px] font-bold uppercase tracking-wider">
                                             {relatedStory.industry || "Industry"}
                                          </span>
                                       </div>
                                    </div>
                                 )}

                                 <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-xl md:text-2xl font-extrabold text-white leading-tight mb-2">
                                       {relatedStory.title || relatedStory.headline}
                                    </h3>
                                    <p className="text-blue-200 font-medium text-xs md:text-sm">
                                       {relatedStory.client}
                                    </p>
                                 </div>
                              </div>

                              <div className="p-5 md:p-8 flex flex-col justify-between flex-grow">
                                 <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 line-clamp-2">
                                    {relatedStory.subtitle || "Complete brand transformation that connected with Gen Z and doubled market share"}
                                 </p>

                                 <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                                   
                                    {relatedStory && (
                                       <div>
                                          <div className="text-2xl md:text-3xl font-extrabold text-blue-500 mb-1">
                                             {relatedStory.results?.metrics?.value || "200%" }
                                          </div>
                                          <div className="text-xs text-gray-500 font-semibold">
                                             {relatedStory.results?.metrics?.label || "Increase in brand engagement"}
                                          </div>
                                       </div>
                                    )}
                                    <div className="bg-gray-900 text-white px-5 py-2.5 rounded-full font-bold text-xs md:text-sm inline-flex items-center gap-2 group-hover:gap-4 transition-all shadow-lg">
                                       Read Story
                                       <ArrowRight className="w-4 h-4" />
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))}
                  </div>

                  <div className="text-center">
                     <Link
                        to="/success-stories"
                        className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-base shadow-2xl hover:bg-gray-800 hover:scale-105 transition-all inline-flex items-center gap-3"
                     >
                        View All Success Stories
                        <ArrowRight className="w-5 h-5" />
                     </Link>
                  </div>
               </div>
            </section>
         )}

         {/* Final CTA - Brand-aligned with contact form */}
         <section id="contact-cta" className="py-20 px-6 bg-white border-t border-gray-100">
            <div className="max-w-6xl mx-auto">
               <div className="text-center mb-16">
                  <div className="inline-block backdrop-blur-md bg-blue-500/10 border border-blue-500/20 rounded-full px-5 py-2.5 shadow-sm mb-6">
                     <p className="text-xs font-semibold text-blue-600 tracking-[2px] uppercase">
                        {study.finalCta?.tagline || "Let's Build Your Success Story"}
                     </p>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                     {study.finalCta?.heading || 'Ready to Achieve Similar Results?'}
                  </h2>

                  <p className="text-base md:text-lg text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
                     {study.finalCta?.description || `Join ${study.client} and 500+ successful brands. Get a free strategy session and custom growth roadmap.`}
                  </p>
               </div>

               <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Left: Value Props */}
                  <div className="space-y-6">
                     <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
                        {study.finalCta?.valuePropsHeading || "What You'll Get:"}
                     </h3>

                     {(study.finalCta?.valueProps?.length > 0 ? study.finalCta.valueProps : [
                        {
                           title: 'Custom Growth Strategy',
                           description: 'Tailored roadmap based on your goals, industry, and target audience'
                        },
                        {
                           title: 'Competitive Analysis',
                           description: 'Deep dive into your market position and untapped opportunities'
                        },
                        {
                           title: 'Quick Wins Identified',
                           description: 'Immediate actions you can take to start seeing results'
                        },
                        {
                           title: 'Expert Team Access',
                           description: metrics.length > 0
                              ? `Direct line to strategists who delivered ${metrics[0].value} growth`
                              : 'Direct line to strategists who delivered proven growth'
                        }
                     ]).map((item: any, idx: number) => {
                        const icons = [Target, BarChart3, Rocket, Users];
                        const Icon = icons[idx % icons.length];
                        return (
                        <div key={idx} className="flex items-start gap-4 backdrop-blur-xl bg-white/80 border border-white/60 rounded-[24px] shadow-lg p-5 hover:shadow-xl transition-all">
                           <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
                              <Icon className="w-5 h-5 md:w-6 md:h-6" />
                           </div>
                           <div>
                              <div className="font-bold text-gray-900 text-base md:text-lg mb-1">{item.title}</div>
                              <div className="text-gray-600 text-xs md:text-sm">{item.description}</div>
                           </div>
                        </div>
                     )})}

                     {/* Social proof */}
                     <div className="backdrop-blur-md bg-green-50/80 border border-green-200 rounded-[24px] p-6 mt-8">
                        <div className="flex items-center gap-3 mb-3">
                           <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                 <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                 </svg>
                              ))}
                           </div>
                        </div>
                        <p className="text-xs md:text-sm text-gray-700">
                           {study.finalCta?.socialProofText || (
                              <>
                                 <span className="font-bold">500+ businesses</span> trust us with their growth.
                              </>
                           )}{' '}
                           Average rating: <span className="font-bold">{study.finalCta?.socialProofRating || "4.9/5"}</span>
                        </p>
                     </div>
                  </div>

                  {/* Right: CTA Form */}
                  <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-2xl p-6 md:p-10 border border-gray-100">
                     <CaseStudyContactForm />
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
};