import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://zevenstone.com'; // Replace with your production domain

export const CanonicalTag: React.FC = () => {
  const location = useLocation();
  
  // Clean path (remove trailing slash except for root)
  const cleanPath = location.pathname === '/' ? '' : location.pathname.replace(/\/$/, '');
  const canonicalUrl = `${SITE_URL}${cleanPath}`;

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={canonicalUrl} />
    </Helmet>
  );
};