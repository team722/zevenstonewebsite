import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface BlogCtaBannerProps {
  heading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
}

export const BlogCtaBanner: React.FC<BlogCtaBannerProps> = ({ heading, description, buttonText, buttonUrl }) => {
  // Ensure the URL starts with a slash if it's an internal link
  const formattedUrl = buttonUrl.startsWith('http') ? buttonUrl : (buttonUrl.startsWith('/') ? buttonUrl : `/${buttonUrl}`);

  return (
    <div className="my-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#0D6EFD] rounded-[24px] p-10 md:p-14 text-center text-white shadow-md relative overflow-hidden"
      >
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-[40px] font-extrabold mb-5 tracking-tight leading-tight">
            {heading}
          </h2>
          <p className="text-blue-100 text-lg md:text-xl mb-10 leading-relaxed max-w-xl mx-auto">
            {description}
          </p>
          <Link 
            to={formattedUrl}
            className="inline-flex items-center justify-center bg-white text-blue-600 font-bold px-10 py-4 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
          >
            {buttonText}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
