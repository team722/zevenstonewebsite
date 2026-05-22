import React from 'react';
import { ArrowRight, User } from 'lucide-react';

interface AuthorBioBlockProps {
  author: {
    name: string;
    role?: string;
    bio?: string;
    photoUrl?: string;
    linkedIn?: string;
  };
  customLinkText?: string;
  customLinkUrl?: string;
}

export const AuthorBioBlock: React.FC<AuthorBioBlockProps> = ({ author, customLinkText, customLinkUrl }) => {
  if (!author) return null;

  const linkText = customLinkText || `More from ${author.name.split(' ')[0]}`;
  const linkUrl = customLinkUrl || author.linkedIn || '#';

  return (
    <div className="bg-[#F4F8FC] rounded-2xl p-6 md:p-8 my-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8 border border-slate-100/50">
      <div className="shrink-0">
        {author.photoUrl ? (
          <img 
            src={author.photoUrl} 
            alt={author.name} 
            className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow-sm"
          />
        ) : (
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-slate-200 flex items-center justify-center border-4 border-white shadow-sm">
            <User size={40} className="text-slate-400" />
          </div>
        )}
      </div>
      <div className="flex-grow">
        <div className="text-xl mb-3">
          <span className="font-bold text-slate-800">{author.name}</span>
          {author.role && (
            <span className="text-slate-500 font-medium"> &bull; {author.role}</span>
          )}
        </div>
        
        {author.bio && (
          <p className="text-slate-600 leading-relaxed text-[17px] m-0 mb-4">
            {author.bio}
          </p>
        )}
        
        {(customLinkUrl || author.linkedIn) && (
          <a 
            href={linkUrl}
            target={linkUrl.startsWith('#') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#0A84FF] font-semibold hover:text-blue-700 transition-colors"
          >
            {linkText} <ArrowRight size={18} />
          </a>
        )}
      </div>
    </div>
  );
};
