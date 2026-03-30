import React from 'react';
import { urlFor } from '../../lib/sanity';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroSection = ({ headline, subheadline, ctaLabel, ctaUrl, backgroundImage }: any) => {
  const bgImg = backgroundImage ? urlFor(backgroundImage).url() : '';

  return (
    <section className="relative min-h-[85vh] flex items-center pt-24 pb-24 overflow-hidden bg-zeven-dark">
      {bgImg && (
         <div className="absolute inset-0">
             <img src={bgImg} alt="Hero Background" className="w-full h-full object-cover opacity-30" />
             <div className="absolute inset-0 bg-gradient-to-t from-zeven-dark via-zeven-dark/80 to-transparent" />
         </div>
      )}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h1 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight max-w-5xl mx-auto"
        >
          {headline}
        </motion.h1>
        {subheadline && (
           <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto whitespace-pre-wrap"
           >
             {subheadline}
           </motion.p>
        )}
        {ctaLabel && (
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
           >
             <Link to={ctaUrl || '/contact'}>
               <Button size="lg" className="rounded-full px-10 shadow-lg shadow-zeven-blue/40 text-lg group">
                 {ctaLabel} <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
               </Button>
             </Link>
           </motion.div>
        )}
      </div>
    </section>
  );
};
