
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { sanityClient } from '../lib/sanity';
import { CASE_STUDIES_QUERY, TESTIMONIALS_QUERY, SUCCESS_STORIES_PAGE_QUERY } from '../lib/queries';
import { urlFor } from '../lib/sanity';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorState } from '../components/ui/ErrorState';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/Button';
import { ArrowRight, Quote, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SuccessStories: React.FC = () => {
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 4;
   const { data: caseStudies, isLoading: loadingCases, error: errorCases } = useQuery({
      queryKey: ['caseStudies'],
      queryFn: () => sanityClient.fetch(CASE_STUDIES_QUERY),
   });

   const { data: testimonials, isLoading: loadingTestimonials, error: errorTestimonials } = useQuery({
      queryKey: ['testimonials'],
      queryFn: () => sanityClient.fetch(TESTIMONIALS_QUERY),
   });

   const { data: successStoriesPageData } = useQuery({
      queryKey: ['successStoriesPage'],
      queryFn: () => sanityClient.fetch(SUCCESS_STORIES_PAGE_QUERY),
   });

   const isLoading = loadingCases || loadingTestimonials;
   const error = errorCases || errorTestimonials;

   if (isLoading) return <LoadingSpinner />;
   if (error) return <ErrorState />;

   const stories = caseStudies || [];
   const clientLove = (testimonials || []).slice(0, 3);

   const totalPages = Math.ceil(stories.length / itemsPerPage);
   const currentStories = stories.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
   );

   const renderPagination = () => {
      if (totalPages <= 1) return null;
      
      const getPageNumbers = () => {
         if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
         }
         if (currentPage <= 3) {
            return [1, 2, 3, '...', totalPages];
         }
         if (currentPage >= totalPages - 2) {
            return [1, '...', totalPages - 2, totalPages - 1, totalPages];
         }
         return [1, '...', currentPage, '...', totalPages];
      };

      return (
         <div className="flex items-center justify-end gap-2 mt-12">
            <button
               onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
               disabled={currentPage === 1}
               className="w-10 h-10 flex items-center justify-center rounded border border-gray-200 bg-[#d1d5db] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors"
            >
               <ChevronLeft size={18} />
            </button>
            
            {getPageNumbers().map((pageNum, idx) => (
               pageNum === '...' ? (
                  <span key={`ellipsis-${idx}`} className="w-10 h-10 flex items-center justify-center text-gray-400 font-bold border border-gray-200 rounded bg-white">
                     ...
                  </span>
               ) : (
                  <button
                     key={`page-${pageNum}`}
                     onClick={() => setCurrentPage(pageNum as number)}
                     className={`w-10 h-10 flex items-center justify-center rounded text-sm font-bold border transition-colors ${
                        currentPage === pageNum
                           ? 'border-[#0ea5e9] text-[#0ea5e9] bg-white'
                           : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50'
                     }`}
                  >
                     {pageNum}
                  </button>
               )
            ))}
            
            <button
               onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
               disabled={currentPage === totalPages}
               className="w-10 h-10 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
               <ChevronRight size={18} />
            </button>
         </div>
      );
   };

   return (
      <div className="pt-32 pb-20 min-h-screen bg-slate-50 font-sans relative overflow-hidden">
         <Helmet>
            <title>{successStoriesPageData?.seo?.title || successStoriesPageData?.seo?.metaTitle || 'Success Stories | Zevenstone – Real Results, Real Clients'}</title>
            <meta name="description" content={successStoriesPageData?.seo?.description || successStoriesPageData?.seo?.metaDescription || 'Discover how Zevenstone helped businesses grow with measurable results. Read our client case studies and testimonials.'} />
            {(successStoriesPageData?.seo?.metaImage || successStoriesPageData?.seo?.ogImage) && <meta property="og:image" content={urlFor(successStoriesPageData.seo.metaImage || successStoriesPageData.seo.ogImage).url()} />}
         </Helmet>

         {/* Background */}
         <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <motion.div
               animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
               transition={{ duration: 15, repeat: Infinity }}
               className="absolute top-0 right-0 w-[800px] h-[800px] bg-zeven-blue/5 rounded-full blur-[120px]"
            />
         </div>

         <div className="container mx-auto px-6 relative z-10">

            {/* Header */}
            <div className="text-center mb-24">
               <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-zeven-blue/10 text-zeven-blue text-xs font-bold uppercase tracking-widest mb-6"
               >
                  {successStoriesPageData?.hero?.label || 'Success Stories'}
               </motion.div>
               <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-extrabold text-5xl md:text-7xl mb-8 text-zeven-dark tracking-tight"
                  dangerouslySetInnerHTML={{
                     __html: successStoriesPageData?.hero?.heading || `Growth That Is <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-zeven-blue to-zeven-deep">Measurable</span>` }}
               >
               </motion.h1>
               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-zeven-gray max-w-2xl mx-auto font-light"
               >
                  {successStoriesPageData?.hero?.description || `Explore how we've helped ambitious brands transform their digital presence and achieve record-breaking results.`}
               </motion.p>
            </div>
               
            {/* Featured Stories (Sanity Case Studies) */}
            {stories.length > 0 && (
               <div className="mb-32">
                  <div className="grid md:grid-cols-2 gap-8">
                     {currentStories.map((study: any, idx: number) => {
                     return (
                     <motion.div
                        key={study._id || idx}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-2xl transition-all p-8 flex flex-col h-full"
                     >
                        {/* Top Row: Category and Pill */}
                        <div className="flex justify-between items-start mb-6">
                           <span className="text-zeven-case-study-industry-blue font-bold uppercase tracking-widest text-xs">
                              {study.industry || study.client}
                           </span>
                           <span className="bg-[#EEF2FF]/10 text-zeven-case-study-light border border-zeven-case-study-light rounded-full px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
                              {study.tags?.[0] || 'Technical SEO'}
                           </span>
                        </div>

                        {/* Logo Row */}
                        <div className="flex justify-between items-center mb-8 h-10">
                           {study.logoUrl ? (
                              <img src={study.logoUrl} width={150} alt={study.client} className="h-full object-contain max-w-[150px]" />
                           ) : (
                              <h3 className="text-xl font-bold text-gray-800">{study.client}</h3>
                           )}
                           <div className="text-[#0ea5e9] font-black text-2xl tracking-tighter flex items-center">
                              <span className="text-zeven-case-study">{study.results?.metrics[3]?.value}</span>
                           </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-3 gap-3 mb-8">
                           {(study.results?.metrics || []).slice(0, 3).map((metric: any, i: number) => (
                              <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-xl p-3 flex flex-col items-center justify-center text-center">
                                 <div className="text-xl md:text-2xl font-black text-zeven-case-study-light mb-1">{metric.value}</div>
                                 <div className="text-[9px] text-gray-500 font-medium uppercase leading-tight">{metric.label}</div>
                              </div>
                           ))}
                        </div>

                        {/* Headline */}
                        <h2 className="text-2xl font-extrabold text-gray-900 mb-6 leading-snug">
                           {study.headline || study.title}
                        </h2>

                        {/* Challenge Box */}
                        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                           <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">THE CHALLENGE</h4>
                           <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                              {study.challenge?.overview || study.subtitle}
                           </p>
                        </div>

                        {/* Services Delivered */}
                        <div className="mb-8 flex-grow">
                           <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Services Delivered</div>
                           <div className="flex flex-wrap items-center gap-3">
                              {(study.services || []).map((service: string, i: number) => (
                                 <span key={i} className="backdrop-blur-md  text-zeven-tactical-blue border border-zeven-tactical-blue px-5 py-2.5 rounded-sm text-xs font-normal shadow-md hover:shadow-lg hover:scale-105 transition-all">
                                    {service}
                                 </span>
                              ))}
                           </div>
                        </div>
                             {console.log(study, 'study')}
                        {/* Footer (Quote & Link) */}
                        <div className="border-t border-gray-100 pt-6 flex justify-between items-center mt-auto gap-4">
                           <p className="text-xs text-gray-400 italic line-clamp-2 max-w-[65%]">
                             {study.testimonial?.quote || "They found problems our developer didn't know existed."}
                           </p>
                           <Link to={`/case-study/${study.slug || study._id || idx}`} className="text-[#0ea5e9] font-bold text-sm flex items-center gap-1 hover:text-blue-700 transition-colors whitespace-nowrap">
                              Read Full Story <ArrowRight size={16} />
                           </Link>
                        </div>
                     </motion.div>
                     )})}
                  </div>
                  {renderPagination()}
               </div>
            )}

            {/* Client Love (Testimonials restricted to top 3) */}
            {clientLove.length > 0 && (
               <div className="mb-20">
                  <h2 className="text-3xl font-bold text-zeven-dark mb-4 text-center">{successStoriesPageData?.storiesHeading?.heading || "Words from our Partners"}</h2>
                  {successStoriesPageData?.storiesHeading?.description && (
                     <p className="text-zeven-gray text-center max-w-2xl mx-auto mb-12">{successStoriesPageData.storiesHeading.description}</p>
                  )}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {clientLove.map((test: any, i: number) => (
                        <motion.div
                           key={test._id || i}
                           initial={{ opacity: 0, scale: 0.95 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           viewport={{ once: true }}
                           className="bg-white/80 backdrop-blur p-8 rounded-[2rem] border border-white shadow-lg"
                        >
                           <Quote className="text-zeven-blue/30 mb-6" size={32} />
                           <p className="text-zeven-gray mb-6 leading-relaxed">"{test.content}"</p>
                           <div className="flex items-center gap-4">
                              <img src={test.photoUrl} alt={test.author} className="w-12 h-12 rounded-full object-cover" />
                              <div>
                                 <h4 className="font-bold text-zeven-dark text-sm">{test.author}</h4>
                                 <p className="text-xs text-zeven-blue">{test.company}</p>
                              </div>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            )}

            {/* CTA */}
            <div className="bg-zeven-dark rounded-[3rem] p-12 text-center relative overflow-hidden">
               <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-white mb-6" dangerouslySetInnerHTML={{ __html: successStoriesPageData?.readyToWriteCta?.heading || "Ready to write your success story?" }} />
                  {successStoriesPageData?.readyToWriteCta?.description && (
                     <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">{successStoriesPageData.readyToWriteCta.description}</p>
                  )}
                  <Link to={successStoriesPageData?.readyToWriteCta?.button?.link || "/contact"}>
                     <Button className="bg-white text-zeven-dark hover:bg-zeven-blue hover:text-white border-none shadow-xl">
                        {successStoriesPageData?.readyToWriteCta?.button?.text || "Start Your Project"}
                     </Button>
                  </Link>
               </div>
               {/* Decor */}
               <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            </div>

         </div>
      </div>
   );
};
