import React from 'react';

interface PullQuoteProps {
  quote: string;
  attribution?: string;
  role?: string;
}

export const PullQuote: React.FC<PullQuoteProps> = ({ quote, attribution, role }) => {
  return (
    <figure className="my-12 border-l-4 border-blue-500 pl-6 md:pl-8 py-2">
      <blockquote className="text-xl md:text-[24px] text-slate-700 font-medium italic leading-relaxed mb-6 m-0">
        "{quote}"
      </blockquote>
      {(attribution || role) && (
        <figcaption className="flex items-center gap-3">
          <div className="w-8 h-[2px] bg-blue-300 rounded-full"></div>
          <div className="flex flex-wrap items-center gap-2">
            {attribution && <span className="font-bold text-base text-slate-800">{attribution}</span>}
            {attribution && role && <span className="text-slate-300">•</span>}
            {role && <span className="text-slate-500 font-medium">{role}</span>}
          </div>
        </figcaption>
      )}
    </figure>
  );
};
