import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { sanityClient, urlFor } from '../lib/sanity';
import { LANDING_PAGE_QUERY } from '../lib/queries';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Helmet } from 'react-helmet-async';

import { HeroSection } from '../components/blocks/HeroSection';
import { FeaturesGrid } from '../components/blocks/FeaturesGrid';
import { TestimonialsSection } from '../components/blocks/TestimonialsSection';
import { CtaBanner } from '../components/blocks/CtaBanner';
import { StatsSection } from '../components/blocks/StatsSection';

const BLOCK_MAP: Record<string, React.FC<any>> = {
  hero: HeroSection,
  servicesFeatures: FeaturesGrid,
  testimonialsSection: TestimonialsSection,
  ctaBanner: CtaBanner,
  statsSection: StatsSection,
};

export const LandingPage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: page, isLoading, error } = useQuery({
    queryKey: ['landingPage', slug],
    queryFn: async () => {
      const result = await sanityClient.fetch(LANDING_PAGE_QUERY, { slug });
      if (!result) throw new Error('Not found');
      return result;
    },
    retry: false
  });

  if (isLoading) return <LoadingSpinner />;

  if (error || !page) {
    return (
      <div className="pt-32 pb-20 text-center container mx-auto">
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-500 mb-8">The landing page you're looking for doesn't exist.</p>
        <button className="bg-zeven-blue text-white px-6 py-3 rounded-full hover:bg-zeven-deep transition-colors" onClick={() => navigate('/')}>
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>{page.seo?.metaTitle || page.title} | Zevenstone</title>
        <meta name="description" content={page.seo?.description || page.seo?.metaDescription || `Zevenstone - ${page.title}`} />
        {(page.seo?.metaImage || page.seo?.ogImage) && <meta property="og:image" content={urlFor(page.seo.metaImage || page.seo.ogImage).url()} />}
      </Helmet>

      {page.pageBlocks?.map((block: any, i: number) => {
        const BlockComponent = BLOCK_MAP[block._type];
        return BlockComponent ? <BlockComponent key={i} {...block} /> : null;
      })}
    </div>
  );
};
