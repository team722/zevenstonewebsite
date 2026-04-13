import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { sanityClient } from '../lib/sanity';
import { CASE_STUDY_BY_SLUG_QUERY } from '../lib/queries';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorState } from '../components/ui/ErrorState';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/Button';
import { ArrowLeft, CheckCircle2, Layers, BarChart, Zap } from 'lucide-react';
import { urlFor } from '../lib/sanity';

export const CaseStudy: React.FC = () => {
   const { id } = useParams();

   const { data: study, isLoading, error } = useQuery({
      queryKey: ['caseStudy', id],
      queryFn: () => sanityClient.fetch(CASE_STUDY_BY_SLUG_QUERY, { slug: id }),
   });

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [id]);

   if (isLoading) return <LoadingSpinner />;
   if (error || !study) return <ErrorState />;

   return (
      <div className="pt-24 min-h-screen bg-white font-sans">
         <Helmet>
            <title>{study?.seo?.title || study?.seo?.metaTitle || `${study.headline} | Case Study`}</title>
            <meta name="description" content={study?.seo?.description || study?.seo?.metaDescription || study.challenge} />
            {(study?.seo?.metaImage || study?.seo?.ogImage || study?.imageUrl) && (
               <meta property="og:image" content={urlFor(study?.seo?.metaImage || study?.seo?.ogImage || study?.imageUrl).url()} />
            )}
         </Helmet>

         {/* Hero Header */}
         <div className="bg-zeven-surface pt-20 pb-32 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
               <Link to="/success-stories" className="inline-flex items-center text-zeven-gray hover:text-zeven-blue mb-8 transition-colors text-sm font-semibold">
                  <ArrowLeft size={16} className="mr-2" /> Back to Success Stories
               </Link>

               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-4xl"
               >
                  <div className="flex gap-3 mb-6 flex-wrap">
                     {study.tags?.map((tag: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-white border border-zeven-gray/20 rounded-full text-xs font-bold uppercase tracking-wider text-zeven-blue">
                           {tag}
                        </span>
                     ))}
                  </div>
                  <h1 className="text-4xl md:text-6xl font-extrabold text-zeven-dark mb-6 leading-tight">
                     {study.headline}
                  </h1>
                  <div className="flex items-center gap-4 text-zeven-gray text-lg">
                     <span className="font-bold text-zeven-dark">Client:</span> {study.client}
                  </div>
               </motion.div>
            </div>
            {/* Background Decor */}
            <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-zeven-blue/5 to-transparent pointer-events-none" />
         </div>

         {/* Main Image */}
         {study.imageUrl && (
            <div className="container mx-auto px-6 -mt-20 relative z-20">
               <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100"
               >
                  <img src={study.imageUrl} alt={study.client} className="w-full lg:h-[600px] object-cover" />
               </motion.div>
            </div>
         )}

         {/* Content Body */}
         <div className="container mx-auto px-6 py-24">
            <div className="grid lg:grid-cols-12 gap-12">

               {/* Sidebar / Stats */}
               <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
                  {study.keyResults && study.keyResults.length > 0 && (
                     <div className="bg-zeven-dark text-white p-8 rounded-[2rem] shadow-xl">
                        <h3 className="font-bold text-xl mb-6 flex items-center gap-2"><BarChart size={20} /> Key Results</h3>
                        <div className="space-y-6">
                           {study.keyResults.map((result: any, idx: number) => (
                              <div key={idx}>
                                 {idx > 0 && <div className="w-full h-px bg-white/10 mb-6" />}
                                 <div>
                                    <div className="text-4xl font-bold text-zeven-blue mb-1">{result.value}</div>
                                    <div className="text-sm opacity-80">{result.label}</div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {study.servicesProvided && study.servicesProvided.length > 0 && (
                     <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200">
                        <h3 className="font-bold text-zeven-dark mb-4">Services Provided</h3>
                        <ul className="space-y-3">
                           {study.servicesProvided.map((s: string, i: number) => (
                              <li key={i} className="flex items-center gap-3 text-zeven-gray text-sm">
                                 <CheckCircle2 size={16} className="text-zeven-blue" /> {s}
                              </li>
                           ))}
                        </ul>
                     </div>
                  )}
               </div>

               {/* Main Text */}
               <div className="lg:col-span-8 order-1 lg:order-2 space-y-12">
                  {study.challenge && (
                     <div>
                        <h2 className="text-3xl font-bold text-zeven-dark mb-6">The Challenge</h2>
                        <p className="text-lg text-zeven-gray leading-relaxed font-light whitespace-pre-wrap">
                           {study.challenge}
                        </p>
                     </div>
                  )}

                  {study.processImagesUrls && study.processImagesUrls.length > 0 && (
                     <div className={`grid ${study.processImagesUrls.length === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-6 my-12`}>
                        {study.processImagesUrls.map((imgUrl: string, idx: number) => (
                           <img key={idx} src={imgUrl} loading="lazy" className="rounded-3xl shadow-lg w-full h-full object-cover" alt="Process" />
                        ))}
                     </div>
                  )}

                  {study.solution && (
                     <div>
                        <h2 className="text-3xl font-bold text-zeven-dark mb-6">The Solution</h2>
                        <p className="text-lg text-zeven-gray leading-relaxed font-light mb-6 whitespace-pre-wrap">
                           {study.solution}
                        </p>
                        {study.solutionFeatures && study.solutionFeatures.length > 0 && (
                           <ul className="space-y-4">
                              {study.solutionFeatures.map((feature: any, idx: number) => (
                                 <li key={idx} className="flex items-start gap-4">
                                    <div className="p-2 bg-blue-50 text-zeven-blue rounded-lg"><Layers size={20} /></div>
                                    <div>
                                       <h4 className="font-bold text-zeven-dark">{feature.title}</h4>
                                       <p className="text-sm text-zeven-gray">{feature.description}</p>
                                    </div>
                                 </li>
                              ))}
                           </ul>
                        )}
                     </div>
                  )}

                  {study.impact && (
                     <div className="pt-12 border-t border-slate-100">
                        <h2 className="text-3xl font-bold text-zeven-dark mb-6">The Outcome</h2>
                        <p className="text-lg text-zeven-gray leading-relaxed font-light whitespace-pre-wrap">
                           {study.impact}
                        </p>
                     </div>
                  )}
               </div>
            </div>
         </div>

         {/* Bottom Nav */}
         <div className="bg-zeven-surface py-20 text-center relative z-10 bottom-nav-cta">
            <h3 className="text-2xl font-bold text-zeven-dark mb-8">Ready to be our next success story?</h3>
            <Link to="/contact">
               <Button size="lg" className="shadow-xl">Start Your Project</Button>
            </Link>
         </div>

      </div>
   );
};