import React from 'react';
import { motion } from 'framer-motion';
import { User, Linkedin } from 'lucide-react';

interface AuthorCardProps {
  author: {
    name: string;
    role?: string;
    photoUrl?: string;
    linkedIn?: string;
  };
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  if (!author) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="max-w-xl mx-auto -mt-16 mb-16 relative z-20"
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 flex items-center justify-between gap-6 border border-slate-100">
        <div className="flex items-center gap-5">
          {author.photoUrl ? (
             <img src={author.photoUrl} alt={author.name} className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shadow-md" />
          ) : (
             <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-100 flex items-center justify-center shadow-md">
                 <User size={32} className="text-slate-400" />
             </div>
          )}
          <div>
            <div className="text-lg md:text-xl font-bold text-zeven-dark">{author.name}</div>
            {author.role && <div className="text-sm md:text-base text-zeven-blue font-medium">{author.role}</div>}
          </div>
        </div>
        
        {author.linkedIn && (
          <a 
            href={author.linkedIn} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-xl transition-colors font-medium text-sm"
          >
            <Linkedin size={18} />
            <span className="hidden md:inline">Follow</span>
          </a>
        )}
      </div>
    </motion.div>
  );
};
