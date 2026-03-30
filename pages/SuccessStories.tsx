
import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { sanityClient } from '../lib/sanity';
import { CASE_STUDIES_QUERY, TESTIMONIALS_QUERY, SUCCESS_STORIES_PAGE_SEO_QUERY } from '../lib/queries';
import { urlFor } from '../lib/sanity';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorState } from '../components/ui/ErrorState';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/ui/Button';
import { ArrowRight, Quote, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SuccessStories: React.FC = () => {
  const { data: caseStudies, isLoading: loadingCases, error: errorCases } = useQuery({
    queryKey: ['caseStudies'],
    queryFn: () => sanityClient.fetch(CASE_STUDIES_QUERY),
  });

  const { data: testimonials, isLoading: loadingTestimonials, error: errorTestimonials } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => sanityClient.fetch(TESTIMONIALS_QUERY),
  });

  const { data: successStoriesPageSeo } = useQuery({
    queryKey: ['successStoriesPageSeo'],
    queryFn: () => sanityClient.fetch(SUCCESS_STORIES_PAGE_SEO_QUERY),
  });

  const isLoading = loadingCases || loadingTestimonials;
  const error = errorCases || errorTestimonials;

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorState />;

  const stories = caseStudies || [];
  const clientLove = (testimonials || []).slice(0, 3);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 font-sans relative overflow-hidden">
      <Helmet>
        <title>{successStoriesPageSeo?.seo?.metaTitle || 'Success Stories | Zevenstone – Real Results, Real Clients'}</title>
        <meta name="description" content={successStoriesPageSeo?.seo?.metaDescription || 'Discover how Zevenstone helped businesses grow with measurable results. Read our client case studies and testimonials.'} />
        {successStoriesPageSeo?.seo?.ogImage && <meta property="og:image" content={urlFor(successStoriesPageSeo.seo.ogImage).url()} />}
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
            Success Stories
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-extrabold text-5xl md:text-7xl mb-8 text-zeven-dark tracking-tight"
          >
            Growth That Is <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zeven-blue to-zeven-deep">Measurable</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-xl text-zeven-gray max-w-2xl mx-auto font-light"
          >
            Explore how we've helped ambitious brands transform their digital presence and achieve record-breaking results.
          </motion.p>
        </div>

        {/* Featured Stories (Sanity Case Studies) */}
        {stories.length > 0 && (
          <div className="grid gap-12 mb-32">
            {stories.map((study: any, idx: number) => (
              <motion.div 
                 key={study._id || idx}
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6 }}
                 className="bg-white rounded-[2.5rem] border border-zeven-surface shadow-xl overflow-hidden grid lg:grid-cols-2 group hover:shadow-2xl transition-all"
              >
                 <div className="relative h-[300px] lg:h-auto overflow-hidden">
                    <img src={study.imageUrl} alt={study.headline} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-zeven-blue/10 group-hover:bg-transparent transition-colors duration-500" />
                 </div>
                 <div className="p-10 lg:p-16 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-6">
                       <span className="w-8 h-px bg-zeven-blue" />
                       <span className="text-zeven-blue font-bold uppercase tracking-wider text-sm">{study.client}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-zeven-dark mb-6 leading-tight">{study.headline}</h2>
                    <div className="grid grid-cols-2 gap-8 mb-8">
                       <div>
                          <h4 className="text-xs font-bold text-zeven-gray uppercase mb-2">Challenge</h4>
                          <p className="text-sm text-zeven-dark leading-relaxed">{study.challenge}</p>
                       </div>
                       <div>
                          <h4 className="text-xs font-bold text-zeven-gray uppercase mb-2">Impact</h4>
                          <p className="text-sm font-bold text-zeven-blue flex items-center gap-1">
                             <TrendingUp size={14} /> {study.impact}
                          </p>
                       </div>
                    </div>
                    {/* Assuming dynamic routing for case studies */}
                    <Link to={`/case-study/${study._id || idx}`}>
                      <Button variant="outline" className="rounded-full w-fit group-hover:bg-zeven-blue group-hover:text-white group-hover:border-transparent">
                         Read Full Story <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </Link>
                 </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Client Love (Testimonials restricted to top 3) */}
        {clientLove.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-zeven-dark mb-12 text-center">Words from our Partners</h2>
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
                     <p className="text-zeven-gray mb-6 leading-relaxed">"{test.quote}"</p>
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
              <h2 className="text-3xl font-bold text-white mb-6">Ready to write your success story?</h2>
              <Link to="/contact">
                 <Button className="bg-white text-zeven-dark hover:bg-zeven-blue hover:text-white border-none shadow-xl">Start Your Project</Button>
              </Link>
           </div>
           {/* Decor */}
           <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

      </div>
    </div>
  );
};
