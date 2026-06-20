import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SeoScripts } from './components/SeoScripts';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { Home } from './pages/Home';
import { About } from './pages/About';

import { Services } from './pages/Services';
import { SingleService } from './pages/SingleService';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';
import { SuccessStories } from './pages/SuccessStories';
import { CaseStudy } from './pages/CaseStudy';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { LandingPage as LandingPageOriginal } from './pages/LandingPage';
// New Modular Landing Page Components
import ZstoneLandingPageV1 from './modules/landing-pages/zstone-v1/components/LandingPage';
import ZstoneLandingPageV2 from './modules/landing-pages/zstone-v1/components/Website-LandingPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/Privacy';
import  NestedServicePage  from './pages/NestedServicePage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // 1 minutes cache before refetching
      retry: 2,
    },
  },
});

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isLandingPage = location.pathname.startsWith('/landing-page') || location.pathname.startsWith('/v1');
  const isWebsiteLandingPage = location.pathname.startsWith('/website-care-growth');

  return (
    <div className="min-h-screen bg-zeven-bg text-zeven-dark selection:bg-zeven-blue selection:text-white font-sans antialiased">
      <SeoScripts />
      {!isLandingPage && !isWebsiteLandingPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<SingleService />} />
          <Route path="/services/:category/:slug" element={<NestedServicePage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/case-study/:id" element={<CaseStudy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPage />} />

          {/* New Modular Landing Page Routes (Phase 2) */}
          <Route path="/strategic-partnerships/agency-growth-partner" element={<ZstoneLandingPageV1 />} />
           <Route path="/managed-solutions/grow-your-business-online" element={<ZstoneLandingPageV2 />} />
          {/* <Route path="/landing-page/services" element={<ZstoneServicesPageV1 />} />
          <Route path="/landing-page/video-production" element={<ZstoneVideoProductionV1 />} />
          <Route path="/landing-page/stories" element={<ZstoneStoriesPageV1 />} />
          <Route path="/landing-page/story/:id" element={<ZstoneStoryDetailV1 />} />
          <Route path="/landing-page/blog" element={<ZstoneBlogHubV1 />} />
          <Route path="/landing-page/blog/:id" element={<ZstoneBlogPostV1 />} /> */}
        </Routes>
      </main>
      {!isLandingPage && !isWebsiteLandingPage && <Footer />}
      <ScrollToTopButton />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
