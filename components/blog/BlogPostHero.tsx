import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Share2, Link as LinkIcon, User, ArrowLeft, Check } from 'lucide-react';

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

  const [isCopied, setIsCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');


  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setCanNativeShare(!!navigator.share && isMobile);
    }
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const openShareWindow = (url: string) => {
    console.log('Opening share window for URL:', url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    console.log(navigator.share)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: currentUrl
        });
      } catch (err) {
        console.error('Error sharing natively:', err);
      }
    }
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
            <p className="text-xl md:text-[22px] text-slate-600 leading-relaxed mb-10">
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

              <div className="flex items-center gap-3 text-slate-400 relative">
                <span className="text-sm font-bold tracking-wide mr-2 uppercase">Share</span>
                
                {canNativeShare ? (
                  <button onClick={handleNativeShare} className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:text-slate-700 transition-colors">
                    <Share2 size={16} />
                  </button>
                ) : (
                  <>
                    <button onClick={() => openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`)} className="w-9 h-9 cursor-pointer rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors">
                      <Facebook size={16} />
                    </button>
                    <button onClick={() => openShareWindow(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`)} className="w-9 h-9 cursor-pointer rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 hover:text-black hover:border-slate-300 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                      </svg>
                    </button>
                    <button onClick={() => openShareWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`)} className="w-9 h-9 cursor-pointer rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors">
                      <Linkedin size={16} />
                    </button>
                    <button onClick={() => openShareWindow(`https://wa.me/?text=${encodeURIComponent(title)}%20${encodeURIComponent(currentUrl)}`)} className="w-9 h-9 cursor-pointer rounded-full border border-slate-200 flex items-center justify-center hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                      </svg>
                    </button>
                  </>
                )}

                <div className="relative">
                  <button onClick={handleCopyLink} className="w-9 h-9 cursor-pointer rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:text-slate-700 transition-colors">
                    {isCopied ? <Check size={16} className="text-green-500" /> : <LinkIcon size={16} />}
                  </button>
                  {isCopied && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded shadow-lg whitespace-nowrap">
                      Link copied!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
