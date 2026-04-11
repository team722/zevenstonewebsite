
import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { sanityClient } from '../lib/sanity';
import { BLOG_POSTS_QUERY, BLOG_PAGE_QUERY } from '../lib/queries';
import { urlFor } from '../lib/sanity';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorState } from '../components/ui/ErrorState';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight, Calendar, User } from 'lucide-react';

export const Blog: React.FC = () => {
   const { data: posts, isLoading, error } = useQuery({
      queryKey: ['blogPosts'],
      queryFn: () => sanityClient.fetch(BLOG_POSTS_QUERY),
   });

   const { data: blogPageData } = useQuery({
      queryKey: ['blogPage'],
      queryFn: () => sanityClient.fetch(BLOG_PAGE_QUERY),
   });

   if (isLoading) return <LoadingSpinner />;
   if (error) return <ErrorState />;

   const featuredPost = posts?.[0];
   const otherPosts = posts?.slice(1) || [];

   if (!featuredPost) return null;

   return (
      <div className="pt-32 pb-20 min-h-screen bg-slate-50 font-sans relative overflow-hidden">
         <Helmet>
            <title>{blogPageData?.seo?.title || blogPageData?.seo?.metaTitle || 'Blog | Zevenstone – Digital Marketing Insights & Tips'}</title>
            <meta name="description" content={blogPageData?.seo?.description || blogPageData?.seo?.metaDescription || "Stay ahead with Zevenstone's blog. Expert articles on SEO, web design, digital marketing strategies, and industry trends."} />
            {(blogPageData?.seo?.metaImage || blogPageData?.seo?.ogImage) && <meta property="og:image" content={urlFor(blogPageData.seo.metaImage || blogPageData.seo.ogImage).url()} />}
         </Helmet>

         {/* Background */}
         <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         </div>

         <div className="container mx-auto px-6 relative z-10">

            {/* Header */}
            <div className="max-w-3xl mb-20">
               <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-zeven-blue/10 text-zeven-blue text-xs font-bold uppercase tracking-widest mb-6"
               >
                  Insights & Ideas
               </motion.div>
               <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-extrabold text-5xl md:text-7xl text-zeven-dark tracking-tight mb-6"
                  dangerouslySetInnerHTML={{ __html: blogPageData?.hero?.heading || `Thinking <span class="text-transparent bg-clip-text bg-gradient-to-r from-zeven-blue to-zeven-deep">Out Loud</span>` }}
               >
               </motion.h1>
               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-zeven-gray font-light"
               >
                  {blogPageData?.hero?.description || `Strategies, trends, and technical deep-dives from the team at Zevenstone.`}
               </motion.p>
            </div>

            {/* Featured Post */}
            <motion.div
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="group relative rounded-[3rem] overflow-hidden shadow-2xl mb-24 min-h-[500px] flex items-end"
            >
               <img src={featuredPost.imageUrl} alt={featuredPost.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-zeven-dark via-zeven-dark/50 to-transparent opacity-90" />

               <div className="relative z-10 p-10 md:p-16 max-w-4xl">
                  <div className="flex items-center gap-4 text-white/80 mb-4 text-sm font-medium">
                     <span className="bg-zeven-blue px-3 py-1 rounded-full text-white text-xs font-bold uppercase">{featuredPost.category}</span>
                     <span className="flex items-center gap-2"><Calendar size={14} /> {new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-blue-100 transition-colors">{featuredPost.title}</h2>
                  <p className="text-lg text-gray-200 mb-8 max-w-2xl line-clamp-2">{featuredPost.excerpt}</p>
                  <Link to={`/blog/${featuredPost.slug}`}>
                     <Button className="rounded-full bg-white text-zeven-dark hover:bg-zeven-blue hover:text-white border-none">Read Article</Button>
                  </Link>
               </div>
            </motion.div>

            {/* Grid Posts */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
               {otherPosts.map((post, idx) => (
                  <motion.div
                     key={idx}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.1 }}
                     className="group flex flex-col h-full"
                  >
                     <div className="rounded-[2rem] overflow-hidden mb-6 aspect-[4/3] relative shadow-lg">
                        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-zeven-dark uppercase tracking-wide">
                           {post.category}
                        </div>
                     </div>
                     <div className="flex items-center gap-4 text-sm text-zeven-gray mb-3">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(post.publishedAt).toLocaleDateString()}</span>
                     </div>
                     <h3 className="text-2xl font-bold text-zeven-dark mb-3 group-hover:text-zeven-blue transition-colors leading-tight">
                        {post.title}
                     </h3>
                     <p className="text-zeven-gray leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                     </p>
                     <div className="mt-auto">
                        <Link to={`/blog/${post.slug}`} className="text-zeven-blue font-bold text-sm uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                           Read More <ArrowRight size={16} />
                        </Link>
                     </div>
                  </motion.div>
               ))}
            </div>

            {/* Newsletter */}
            <div className="bg-zeven-blue rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
               <div className="relative z-10 max-w-2xl mx-auto">
                  <h2 className="text-3xl font-bold mb-4">{blogPageData?.stayAheadCta?.heading || "Stay ahead of the curve"}</h2>
                  <p className="text-blue-100 mb-8">{blogPageData?.stayAheadCta?.description || "Get the latest insights on strategy, design, and technology delivered to your inbox."}</p>
                  <div className="flex flex-col md:flex-row gap-4">
                     <input type="email" placeholder="Enter your email" className="flex-grow px-6 py-4 rounded-xl text-zeven-dark focus:outline-none focus:ring-2 focus:ring-white" />
                     <button className="px-8 py-4 bg-zeven-dark rounded-xl font-bold hover:bg-white hover:text-zeven-dark transition-colors shadow-xl">{blogPageData?.stayAheadCta?.button?.text || "Subscribe"}</button>
                  </div>
               </div>
               {/* Texture */}
               <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
            </div>

         </div>
      </div>
   );
};
