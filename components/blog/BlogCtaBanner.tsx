import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface BlogCtaBannerProps {
  heading: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export const BlogCtaBanner: React.FC<BlogCtaBannerProps> = ({ heading, description, buttonText, buttonUrl }) => {
  const isAbsoluteUrl =
    buttonUrl?.startsWith('http') ||
    buttonUrl?.startsWith('/') ||
    buttonUrl?.startsWith('#') ||
    buttonUrl?.startsWith('mailto:') ||
    buttonUrl?.startsWith('tel:');
  const formattedUrl = buttonUrl ? (isAbsoluteUrl ? buttonUrl : `/${buttonUrl}`) : '/contact';

  return (
    <div className="not-prose my-12 md:my-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-zeven-blue rounded-2xl px-6 py-10 text-center text-white shadow-md sm:px-8 md:px-12 md:py-11 relative overflow-hidden"
      >
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-[26px] font-extrabold mb-3 leading-tight">
            {heading}
          </h2>
          {description && (
            <p className="text-white/90 text-[15px] md:text-base mb-7 leading-relaxed max-w-xl mx-auto">
              {description}
            </p>
          )}
          <Link 
            to={formattedUrl}
            className="inline-flex min-h-14 w-full items-center justify-center bg-white text-zeven-blue font-bold px-6 py-3 rounded-xl hover:bg-slate-50 transition-colors shadow-sm sm:w-auto sm:min-w-[252px]"
          >
            {buttonText || 'Learn More'}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
