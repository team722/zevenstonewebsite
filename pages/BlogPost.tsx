import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PortableText } from '@portabletext/react';
import { Helmet } from 'react-helmet-async';
import { sanityClient, urlFor } from '../lib/sanity';
import { BLOG_POST_BY_SLUG_QUERY, BLOG_PAGE_QUERY, RELATED_POSTS_QUERY } from '../lib/queries';
import { mockPost, mockPageData, mockRelatedPosts } from '../lib/mockBlogPostData';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorState } from '../components/ui/ErrorState';

import { BlogPostHero } from '../components/blog/BlogPostHero';
import { StatsStrip } from '../components/blog/StatsStrip';
import { CalloutBox } from '../components/blog/CalloutBox';
import { StepsBlock } from '../components/blog/StepsBlock';
import { PullQuote } from '../components/blog/PullQuote';
import { ProsConsBlock } from '../components/blog/ProsConsBlock';
import { BlogCtaBanner } from '../components/blog/BlogCtaBanner';
import { RelatedPosts } from '../components/blog/RelatedPosts';
import { NewsletterBar } from '../components/blog/NewsletterBar';
import { TableOfContents } from '../components/blog/TableOfContents';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const isTest = slug === 'test-design';

  const { data: sanityPost, isLoading, error } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => sanityClient.fetch(BLOG_POST_BY_SLUG_QUERY, { slug }),
    enabled: !!slug && !isTest,
  });

  const { data: sanityPageData } = useQuery({
    queryKey: ['blogPageDefaults'],
    queryFn: () => sanityClient.fetch(BLOG_PAGE_QUERY),
    enabled: !isTest,
  });

  const post = isTest ? mockPost : sanityPost;
  const pageData = isTest ? mockPageData : sanityPageData;

  const categoryId = post?.categoryId;
  const currentId = post?._id;

  const { data: sanityRelatedPosts } = useQuery({
    queryKey: ['relatedPosts', categoryId, currentId],
    queryFn: () => sanityClient.fetch(RELATED_POSTS_QUERY, { categoryId, currentId }),
    enabled: !!categoryId && !!currentId && !isTest,
  });

  const relatedPosts = isTest ? mockRelatedPosts : sanityRelatedPosts;

  const headings = useMemo(() => {
    if (!post?.body) return [];
    const extractedHeadings: { id: string; text: string; level: string }[] = [];
    post.body.forEach((block: any) => {
      if (block._type === 'block' && (block.style === 'h2' || block.style === 'h3')) {
        const text = block.children?.map((child: any) => child.text).join('') || '';
        if (!block._key) block._key = Math.random().toString(36).substring(2, 9);
        extractedHeadings.push({ id: block._key, text, level: block.style });
      }
    });
    return extractedHeadings;
  }, [post?.body]);

  if (!isTest && isLoading) return <LoadingSpinner />;
  if (!isTest && (error || !post)) return <ErrorState />;

  // Custom Portable Text Renderers
  const portableTextComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.url && !value?.asset?._ref) return null;
        const imageUrl = value.url || urlFor(value).url();
        return (
          <figure className="my-8">
            <img
              alt={value.alt || 'Blog image'}
              loading="lazy"
              src={imageUrl}
              className="w-full rounded-2xl object-cover shadow-lg"
            />
            {value.caption && (
              <figcaption className="text-center text-sm text-slate-500 mt-3">{value.caption}</figcaption>
            )}
          </figure>
        );
      },
      code: ({ value }: any) => (
        <pre className="bg-slate-900 text-slate-50 p-6 rounded-xl overflow-x-auto my-6 text-sm">
          <code>{value.code}</code>
        </pre>
      ),
      calloutBox: ({ value }: any) => <CalloutBox type={value.type} title={value.title} content={value.content} />,
      stepsBlock: ({ value }: any) => <StepsBlock heading={value.heading} steps={value.steps} />,
      statsStrip: ({ value }: any) => <StatsStrip stats={value.stats} />,
      pullQuote: ({ value }: any) => <PullQuote quote={value.quote} attribution={value.attribution} role={value.role} />,
      prosConsBlock: ({ value }: any) => <ProsConsBlock heading={value.heading} pros={value.pros} cons={value.cons} />
    },
    block: {
      h2: ({ children, value }: any) => <h2 id={value._key} className="text-3xl font-bold mt-12 mb-6 text-zeven-dark scroll-mt-32">{children}</h2>,
      h3: ({ children, value }: any) => <h3 id={value._key} className="text-2xl font-bold mt-10 mb-4 text-zeven-dark scroll-mt-32">{children}</h3>,
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
        <a href={value.href} target={value.blank === false ? '_self' : '_blank'} rel="noopener noreferrer" className="text-zeven-blue hover:underline font-medium">
          {children}
        </a>
      ),
    },
  };

  // Determine CTA Banner data
  const ctaData = (post.ctaBanner && post.ctaBanner.heading)
    ? post.ctaBanner
    : pageData?.defaultCtaBanner;

  return (
    <div className="bg-white font-sans overflow-hidden">
      <Helmet>
        <title>{post.seo?.metaTitle || `${post.title} | Zevenstone Blog`}</title>
        <meta name="description" content={post.seo?.description || post.seo?.metaDescription || post.excerpt} />
        {post.seo?.ogImage ? (
          <meta property="og:image" content={urlFor(post.seo.ogImage).url()} />
        ) : (
          <meta property="og:image" content={post.imageUrl} />
        )}
      </Helmet>

      <BlogPostHero
        title={post.title}
        category={post.category}
        publishedAt={post.publishedAt}
        readTime={post.readTime}
        subtitle={post.excerpt}
        author={post.author}
      />

      {post.imageUrl && (
        <div className="container mx-auto px-6 mb-16 relative z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-[24px] overflow-hidden bg-slate-100 aspect-video md:aspect-[21/9]"
          >
            <img src={post.imageUrl} alt={post.mainImage?.alt || post.title} className="w-full h-full object-cover" />
          </motion.div>
          {post.mainImage?.caption && (
            <p className="text-center text-sm text-slate-500 mt-4">{post.mainImage.caption}</p>
          )}
        </div>
      )}

      <div className="container mx-auto px-6 py-8 md:py-16 max-w-4xl relative">
        {/* Floating Social Sidebar */}
        <div className="hidden  flex-col gap-3 absolute -left-12 xl:-left-24 top-0 bg-white shadow-sm border border-slate-100 p-2 rounded-full z-10 sticky-top" style={{ position: 'sticky', top: '100px' }}>
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-400 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a>
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-700 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
        </div>

        {/* Main Article Body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full min-w-0"
        >
          {post.showTableOfContents !== false && headings.length > 0 && (
            <div className="mb-12">
              <TableOfContents headings={headings} />
            </div>
          )}

          <div className="prose prose-lg md:prose-xl max-w-none prose-img:rounded-2xl prose-a:text-zeven-blue prose-headings:text-zeven-dark prose-p:text-slate-600">
            {post.body ? (
              <PortableText value={post.body} components={portableTextComponents} />
            ) : (
              <p className="text-xl text-slate-600 leading-relaxed mb-6">{post.excerpt}</p>
            )}
          </div>

          {/* Post CTA Banner */}
          {ctaData && ctaData.heading && (
            <BlogCtaBanner
              heading={ctaData.heading}
              description={ctaData.description}
              buttonText={ctaData.buttonText || 'Learn More'}
              buttonUrl={ctaData.buttonUrl || '/contact'}
            />
          )}
        </motion.div>
      </div>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <div className="bg-slate-50 py-16 border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <RelatedPosts posts={relatedPosts} />
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      {pageData?.newsletterSection && (
        <NewsletterBar
          heading={pageData.newsletterSection.heading}
          description={pageData.newsletterSection.description}
          buttonText={pageData.newsletterSection.buttonText || 'Subscribe'}
          placeholder={pageData.newsletterSection.placeholder || 'Enter your email'}
        />
      )}
    </div>
  );
};
