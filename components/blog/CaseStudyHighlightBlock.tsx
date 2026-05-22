import React from 'react';
import { urlFor } from '../../lib/sanity';

interface CaseStudyHighlightBlockProps {
  title: string;
  image?: any;
  strategyText?: string;
  metricValue?: string;
  metricLabel?: string;
}

export const CaseStudyHighlightBlock: React.FC<CaseStudyHighlightBlockProps> = ({
  title,
  image,
  strategyText,
  metricValue,
  metricLabel,
}) => {
  return (
    <div className="my-10 bg-[#F8FAFC] rounded-[24px] border border-slate-100 shadow-sm flex flex-col md:flex-row overflow-hidden">
      {/* Left side: Image */}
      {image && (
        <div className="w-full md:w-[45%] h-64 md:h-auto shrink-0 relative bg-purple-100">
          <img
            src={urlFor(image).url()}
            alt={title || "Case Study Highlight"}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}

      {/* Right side: Content */}
      <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 m-0">{title}</h3>

        <div className="space-y-6">
          {/* Strategy Item */}
          {strategyText && (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-white"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <p className="text-slate-600 text-lg m-0">{strategyText}</p>
            </div>
          )}

          {/* Metric Item */}
          {(metricValue || metricLabel) && (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#A855F7] flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-white"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
              <div className="text-lg m-0 flex items-baseline flex-wrap gap-2">
                {metricValue && (
                  <span className="text-3xl font-bold text-[#A855F7] leading-none">{metricValue}</span>
                )}
                {metricLabel && (
                  <span className="text-slate-600">{metricLabel}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
