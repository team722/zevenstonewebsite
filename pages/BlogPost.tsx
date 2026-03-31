import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PortableText } from '@portabletext/react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { sanityClient, urlFor } from '../lib/sanity';
import { BLOG_POST_BY_SLUG_QUERY } from '../lib/queries';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorState } from '../components/ui/ErrorState';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => sanityClient.fetch(BLOG_POST_BY_SLUG_QUERY, { slug }),
    enabled: !!slug,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error || !post) return <ErrorState />;

  // Portable Text Custom Components
  const portableTextComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <img
            alt={value.alt || 'Blog image'}
            loading="lazy"
            src={urlFor(value).url()}
            className="w-full rounded-2xl my-8 object-cover shadow-lg"
          />
        );
      },
      code: ({ value }: any) => (
        <pre className="bg-slate-900 text-slate-50 p-6 rounded-xl overflow-x-auto my-6 text-sm">
          <code>{value.code}</code>
        </pre>
      )
    },
    block: {
      h1: ({ children }: any) => <h1 className="text-4xl md:text-5xl font-bold mt-12 mb-6 text-zeven-dark">{children}</h1>,
      h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-10 mb-4 text-zeven-dark">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-8 mb-4 text-zeven-dark">{children}</h3>,
      normal: ({ children }: any) => <p className="text-lg text-zeven-gray leading-relaxed mb-6">{children}</p>,
      blockquote: ({ children }: any) => <blockquote className="border-l-4 border-zeven-blue pl-6 py-2 my-8 italic text-xl text-zeven-dark bg-slate-50 rounded-r-xl">{children}</blockquote>,
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc pl-6 space-y-2 mb-6 text-lg text-zeven-gray">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal pl-6 space-y-2 mb-6 text-lg text-zeven-gray">{children}</ol>,
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-bold text-zeven-dark">{children}</strong>,
      link: ({ children, value }: any) => (
        <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-zeven-blue hover:underline font-medium">
          {children}
        </a>
      ),
    },
  };

  const publishDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="pt-24 min-h-screen bg-white font-sans">
      <Helmet>
        <title>{post.seo?.metaTitle || `${post.title} | Zevenstone Blog`}</title>
        <meta name="description" content={post.seo?.description || post.seo?.metaDescription || post.excerpt} />
        {post.seo?.ogImage ? (
          <meta property="og:image" content={urlFor(post.seo.ogImage).url()} />
        ) : (
           <meta property="og:image" content={post.imageUrl} />
        )}
      </Helmet>
      
      {/* Hero Section */}
      <div className="bg-zeven-surface pt-16 pb-32 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <Link to="/blog" className="inline-flex items-center text-zeven-gray hover:text-zeven-blue mb-10 transition-colors text-sm font-semibold group">
             <div className="bg-white p-2 rounded-full mr-3 shadow-sm group-hover:scale-110 transition-transform">
               <ArrowLeft size={16} className="text-zeven-dark" />
             </div> 
             Back to Blog
          </Link>
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="max-w-4xl mx-auto text-center"
          >
             <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-slate-200 text-zeven-blue text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                {post.category}
             </div>
             
             <h1 className="text-4xl md:text-6xl font-extrabold text-zeven-dark mb-8 leading-tight tracking-tight">
                {post.title}
             </h1>
             
             <div className="flex flex-wrap items-center justify-center gap-6 text-slate-500 font-medium text-sm">
                {post.author && (
                   <div className="flex items-center gap-3">
                     {post.author.photoUrl ? (
                         <img src={post.author.photoUrl} alt={post.author.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                     ) : (
                         <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center border-2 border-white shadow-sm">
                             <User size={18} className="text-slate-400" />
                         </div>
                     )}
                     <div className="text-left">
                        <div className="text-zeven-dark font-bold">{post.author.name}</div>
                        <div className="text-xs">{post.author.role}</div>
                     </div>
                   </div>
                )}
                
                <div className="w-px h-8 bg-slate-200 hidden md:block" />
                
                <div className="flex items-center gap-2">
                   <Calendar size={18} className="text-zeven-blue"/>
                   {publishDate}
                </div>
             </div>
          </motion.div>
        </div>
      </div>

      {/* Main Image */}
      {post.imageUrl && (
        <div className="container mx-auto px-6 -mt-24 relative z-20 max-w-5xl">
           <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-video"
           >
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
           </motion.div>
        </div>
      )}

      {/* Article Content */}
      <div className="container mx-auto px-6 py-20 max-w-3xl">
         <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="prose prose-lg max-w-none"
         >
            {post.body ? (
              <PortableText value={post.body} components={portableTextComponents} />
            ) : (
              <p className="text-lg text-zeven-gray leading-relaxed mb-6">{post.excerpt}</p>
            )}
         </motion.div>
         
         <div className="mt-20 pt-10 border-t border-slate-200">
             <div className="bg-slate-50 rounded-3xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center gap-8 shadow-sm">
                 <div className="flex-1">
                     <h3 className="text-2xl font-bold text-zeven-dark mb-3">Enjoyed this article?</h3>
                     <p className="text-zeven-gray mb-6">Stay updated with our latest insights on web development, design, and marketing.</p>
                     <div className="flex flex-col sm:flex-row gap-3">
                        <input type="email" placeholder="Your email address" className="flex-1 px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-zeven-blue focus:ring-1 focus:ring-zeven-blue transition-shadow" />
                        <button className="px-6 py-3 bg-zeven-blue text-white font-bold rounded-xl hover:bg-zeven-deep transition-colors shadow-lg hover:shadow-zeven-blue/30 whitespace-nowrap">Subscribe</button>
                     </div>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};
