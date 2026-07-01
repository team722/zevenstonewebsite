import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export const NotFound: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mobileMetricCardClass = 'scale-[0.72] sm:scale-100 origin-center';
  const mobilePillClass = 'scale-[0.78] sm:scale-100 origin-center';
  const mobileWideElementClass = 'scale-[0.58] sm:scale-100 origin-center';

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {//
      // Calculate mouse position relative to the center of the screen
      // Normalized between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Helper to calculate parallax transform
  const getParallaxStyle = (depth: number, baseRotate: string = '0deg') => ({
    transform: `translate(${mousePosition.x * depth}px, ${mousePosition.y * depth}px) rotate(${baseRotate})`,
    transition: 'transform 0.1s ease-out',
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center relative overflow-hidden font-sans pt-28 sm:pt-24 pb-16 sm:pb-12 px-4">
      <Helmet>
        <title>404: Page Not Found — Zevenstone</title>
        <meta name="description" content="This page doesn't exist. Let's get you back to the working parts." />
      </Helmet>

      {/* --- Parallax Background Elements --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        
        {/* Top Left Area */}
        <div className="absolute top-[7%] -left-7 sm:top-[15%] sm:left-[5%]" style={getParallaxStyle(-30, '-12deg')}>
          <div className={`${mobileMetricCardClass} bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col items-center justify-center opacity-55 sm:opacity-80 backdrop-blur-sm`}>
            <span className="text-[#2563EB] font-black text-2xl">+218%</span>
            <span className="text-[10px] text-gray-400 font-medium leading-tight text-center">organic traffic<br/>growth</span>
          </div>
        </div>

        <div className="absolute top-[20%] left-[2%] sm:top-[28%] sm:left-[8%] md:left-[15%]" style={getParallaxStyle(-15, '8deg')}>
          <div className={`${mobilePillClass} bg-blue-50 text-blue-500 font-bold text-[10px] px-3 py-1.5 rounded-full opacity-50 sm:opacity-70`}>
            Technical SEO
          </div>
        </div>

        <div className="absolute top-[34%] -left-8 sm:top-[36%] sm:left-[4%] md:left-[12%]" style={getParallaxStyle(-20, '-4deg')}>
          <div className={`${mobilePillClass} bg-green-50 text-green-600 font-bold text-[10px] px-3 py-1.5 rounded-full opacity-45 sm:opacity-70`}>
            Core Web Vitals
          </div>
        </div>

        {/* Top Right Area */}
        <div className="absolute top-[8%] -right-8 sm:top-[12%] sm:right-[5%] md:right-[15%]" style={getParallaxStyle(40, '15deg')}>
          <div className={`${mobileMetricCardClass} bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col items-center justify-center opacity-55 sm:opacity-80 backdrop-blur-sm`}>
            <span className="text-green-500 font-black text-2xl">6 mo</span>
            <span className="text-[10px] text-gray-400 font-medium leading-tight text-center">avg. to page one</span>
          </div>
        </div>

        <div className="absolute top-[21%] -right-1 sm:top-[20%] sm:right-[10%] md:right-[22%]" style={getParallaxStyle(25, '20deg')}>
          <div className={`${mobilePillClass} bg-[#78A3FF] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-lg opacity-55 sm:opacity-80`}>
            Start Project &rarr;
          </div>
        </div>

        <div className="absolute top-[33%] -right-6 sm:top-[28%] sm:right-[6%] md:right-[12%]" style={getParallaxStyle(30, '-10deg')}>
          <div className={`${mobilePillClass} bg-purple-50 text-purple-500 font-bold text-[10px] px-3 py-1.5 rounded-full opacity-45 sm:opacity-70`}>
            Link Building
          </div>
        </div>

        {/* Mid Right Area */}
        <div className="absolute top-[46%] -right-24 sm:top-[45%] sm:right-[2%] md:right-[8%]" style={getParallaxStyle(15, '-20deg')}>
          <div className={`${mobileWideElementClass} bg-white rounded-full shadow-sm border border-gray-100 px-4 py-2 flex items-center opacity-40 sm:opacity-70 w-48`}>
            <span className="text-gray-300 text-[10px] font-medium w-full">info@zevenstone.com</span>
            <div className="w-1 h-3 bg-blue-500 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Bottom Left Area */}
        <div className="absolute bottom-[28%] -left-28 sm:bottom-[30%] sm:left-[2%] md:left-[8%]" style={getParallaxStyle(-25, '-10deg')}>
          <div className={`${mobileWideElementClass} bg-white rounded-full shadow-sm border border-gray-100 p-2 flex items-center gap-2 opacity-35 sm:opacity-60`}>
            <div className="flex items-center gap-1 text-[8px] font-bold text-gray-400 px-2"><span className="text-blue-500 bg-blue-50 w-4 h-4 rounded-full flex items-center justify-center">1</span> Technical SEO</div>
            <div className="flex items-center gap-1 text-[8px] font-bold text-gray-400 px-2"><span className="text-blue-500 bg-blue-50 w-4 h-4 rounded-full flex items-center justify-center">2</span> On-Page</div>
            <div className="flex items-center gap-1 text-[8px] font-bold text-blue-500 px-2 border-b-2 border-blue-500 pb-1"><span className="text-white bg-blue-500 w-4 h-4 rounded-full flex items-center justify-center">3</span> Local SEO</div>
            <div className="flex items-center gap-1 text-[8px] font-bold text-gray-400 px-2"><span className="text-blue-500 bg-blue-50 w-4 h-4 rounded-full flex items-center justify-center">4</span> Link Building</div>
          </div>
        </div>

        <div className="absolute bottom-[8%] -left-5 sm:bottom-[10%] sm:left-[5%] md:left-[10%]" style={getParallaxStyle(-40, '12deg')}>
          <div className={`${mobileMetricCardClass} bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col items-center justify-center opacity-50 sm:opacity-80 backdrop-blur-sm`}>
            <span className="text-purple-500 font-black text-2xl">40+</span>
            <span className="text-[10px] text-gray-400 font-medium leading-tight text-center">clients ranking</span>
          </div>
        </div>

        <div className="absolute bottom-[15%] left-[24%] sm:bottom-[15%] sm:left-[25%] md:left-[22%]" style={getParallaxStyle(-15, '18deg')}>
          <div className={`${mobilePillClass} bg-blue-50 text-blue-500 font-bold text-[10px] px-3 py-1.5 rounded-full opacity-45 sm:opacity-70`}>
            Mobile SEO
          </div>
        </div>

        {/* Bottom Right Area */}
        <div className="absolute bottom-[23%] -right-8 sm:bottom-[25%] sm:right-[5%] md:right-[15%]" style={getParallaxStyle(35, '25deg')}>
          <div className={`${mobilePillClass} bg-white rounded-full shadow-sm border border-gray-100 px-5 py-2.5 flex items-center gap-2 opacity-45 sm:opacity-80`}>
            <span className="text-gray-500 text-xs font-bold">Read Full Story</span>
            <span className="text-gray-400 text-[10px]">&rarr;</span>
          </div>
        </div>

        <div className="absolute bottom-[34%] right-[4%] sm:bottom-[35%] sm:right-[12%] md:right-[25%]" style={getParallaxStyle(20, '15deg')}>
          <div className={`${mobilePillClass} bg-teal-50 text-teal-600 font-bold text-[10px] px-3 py-1.5 rounded-full opacity-45 sm:opacity-70`}>
            Analytics
          </div>
        </div>

        <div className="absolute bottom-[7%] -right-32 sm:bottom-[12%] sm:right-[2%] md:right-[8%]" style={getParallaxStyle(45, '-15deg')}>
          <div className={`${mobileWideElementClass} bg-white rounded-full shadow-sm border border-gray-100 p-2 flex items-center gap-2 opacity-30 sm:opacity-50 w-64`}>
            <div className="w-8 h-2 bg-gray-100 rounded-full"></div>
            <div className="w-12 h-2 bg-gray-100 rounded-full"></div>
            <div className="w-10 h-2 bg-gray-100 rounded-full"></div>
            <div className="flex-1"></div>
            <div className="w-16 h-4 bg-gray-100 rounded-full"></div>
          </div>
        </div>

        {/* Top Center-ish */}
        <div className="absolute top-[13%] left-[35%] sm:top-[15%] sm:left-[30%] md:left-[25%]" style={getParallaxStyle(-10, '25deg')}>
          <div className={`${mobilePillClass} bg-green-50 text-green-500 font-bold text-[10px] px-3 py-1.5 rounded-full opacity-45 sm:opacity-70`}>
            Schema Markup
          </div>
        </div>

      </div>

      {/* --- Main 404 Content --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto"
      >
        {/* Large 404 Text */}
        <h1 className="text-[8.5rem] sm:text-[12rem] md:text-[16rem] font-black text-[#2563EB] leading-none tracking-tighter select-none">
          404
        </h1>
        
        {/* Decorative broken line */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-8 sm:mb-10 opacity-40">
          <div className="h-[2px] w-6 sm:w-8 bg-blue-500"></div>
          <div className="h-[2px] w-3 sm:w-4 bg-blue-500 transform -rotate-12 translate-y-1"></div>
          <div className="h-[2px] w-5 sm:w-6 bg-blue-500 transform rotate-12 -translate-y-1"></div>
          <div className="h-[2px] w-9 sm:w-12 bg-blue-500"></div>
          <div className="h-[2px] w-2 bg-blue-500 transform rotate-45 translate-y-1"></div>
          <div className="h-[2px] w-6 sm:w-8 bg-blue-500"></div>
          <div className="h-[2px] w-10 sm:w-16 bg-gray-200"></div>
        </div>

        {/* Tagline */}
        <div className="bg-blue-50 text-blue-500 text-[10px] font-bold tracking-widest px-4 py-1.5 rounded-full flex items-center gap-2 mb-6 uppercase">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
          Something broke here
        </div>

        {/* Heading & Paragraph */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          This page doesn't exist.
        </h2>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-sm sm:max-w-md mx-auto mb-10">
          Looks like this block fell off the grid. Everything else is intact — let's get you back to the working parts.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link to="/" className="bg-[#2563EB] text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 w-full sm:w-auto">
            &lt; Back to Homepage
          </Link>
          <Link to="/contact" className="bg-white text-gray-700 border-2 border-gray-100 px-8 py-3 rounded-full font-bold text-sm hover:border-gray-200 hover:text-gray-900 transition-colors w-full sm:w-auto">
            Contact Us
          </Link>
          <Link to="/services" className="bg-white text-gray-700 border-2 border-gray-100 px-8 py-3 rounded-full font-bold text-sm hover:border-gray-200 hover:text-gray-900 transition-colors w-full sm:w-auto">
            SEO Services
          </Link>
        </div>

        {/* Jump Links */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-xs">
          <span className="text-gray-400 font-medium">Or jump to:</span>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/success-stories" className="text-gray-500 hover:text-blue-500 font-medium underline underline-offset-4 decoration-gray-200 hover:decoration-blue-500 transition-colors">Stories</Link>
            <Link to="/blog" className="text-gray-500 hover:text-blue-500 font-medium underline underline-offset-4 decoration-gray-200 hover:decoration-blue-500 transition-colors">Blog</Link>
            <Link to="/services" className="text-gray-500 hover:text-blue-500 font-medium underline underline-offset-4 decoration-gray-200 hover:decoration-blue-500 transition-colors">Digital Marketing</Link>
            <Link to="/services" className="text-gray-500 hover:text-blue-500 font-medium underline underline-offset-4 decoration-gray-200 hover:decoration-blue-500 transition-colors">Video Production</Link>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
