import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, ShareIcon, Link as LinkIcon, User, ArrowLeft } from 'lucide-react';

interface BlogPostHeroProps {
  title: string;
  category: string;
  publishedAt: string;
  readTime?: number;
  subtitle?: string;
  author?: {
    name: string;
    role?: string;
    photoUrl?: string;
    linkedIn?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

export const BlogPostHero: React.FC<BlogPostHeroProps> = ({ title, category, publishedAt, readTime, subtitle, author }) => {
  const publishDate = new Date(publishedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // You could add a toast notification here
  };

  return (
    <div className="bg-white pt-32 pb-8 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl text-left">
        <Link to="/blog" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-10 transition-colors text-sm font-bold group uppercase tracking-widest">
          <div className="bg-slate-50 border border-slate-100 p-2 rounded-full mr-3 shadow-sm group-hover:scale-110 group-hover:bg-blue-50 transition-all">
            <ArrowLeft size={16} className="text-slate-600 group-hover:text-blue-600" />
          </div>
          Back to All Articles
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="px-4 py-1.5 rounded-full bg-blue-50 text-zeven-blue text-xs font-bold uppercase tracking-widest">
              {category}
            </div>
            {readTime && (
              <div className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-2"></span>
                {readTime} MIN READ
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-zeven-dark mb-6 leading-[1.1] tracking-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-xl md:text-[22px] text-slate-600 leading-relaxed mb-10 max-w-3xl">
              {subtitle}
            </p>
          )}

          {author && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-100 pt-8 mt-4">
              <div className="flex items-center gap-4 mb-6 sm:mb-0">
                {author.photoUrl ? (
                  <img src={author.photoUrl} alt={author.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                    <User size={20} className="text-slate-400" />
                  </div>
                )}
                <div>
                  <div className="font-bold text-zeven-dark text-base">{author.name}</div>
                  <div className="text-sm text-slate-500 font-medium">
                    {author.role ? `${author.role} • ` : 'Author • '}
                    {publishDate}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <span className="text-sm font-bold tracking-wide mr-2 uppercase">Share</span>
                {author.facebook && (
                  <a href={author.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors">
                    <Facebook size={16} />
                  </a>
                )}
                {author.twitter && (
                  <a href={author.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-50 hover:text-blue-400 hover:border-blue-200 transition-colors">
                    <Twitter size={16} />
                  </a>
                )}
                {author.linkedIn && (
                  <a href={author.linkedIn} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors">
                    <Linkedin size={16} />
                  </a>
                )}
                {author.instagram && (
                  <a href={author.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200 transition-colors">
                    <Instagram size={16} />
                  </a>
                )}
                <button onClick={handleCopyLink} className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:text-slate-700 transition-colors">

                  <svg style={{ filter: "brightness(1.5)" }} width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27 18.6667C28.3807 18.6667 29.5 17.5474 29.5 16.1667C29.5 14.786 28.3807 13.6667 27 13.6667C25.6193 13.6667 24.5 14.786 24.5 16.1667C24.5 17.5474 25.6193 18.6667 27 18.6667Z" stroke="#4A5565" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M17 24.5C18.3807 24.5 19.5 23.3807 19.5 22C19.5 20.6193 18.3807 19.5 17 19.5C15.6193 19.5 14.5 20.6193 14.5 22C14.5 23.3807 15.6193 24.5 17 24.5Z" stroke="#4A5565" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M27 30.3333C28.3807 30.3333 29.5 29.214 29.5 27.8333C29.5 26.4526 28.3807 25.3333 27 25.3333C25.6193 25.3333 24.5 26.4526 24.5 27.8333C24.5 29.214 25.6193 30.3333 27 30.3333Z" stroke="#4A5565" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M19.1582 23.2584L24.8499 26.575" stroke="#4A5565" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M24.8415 17.425L19.1582 20.7417" stroke="#4A5565" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
