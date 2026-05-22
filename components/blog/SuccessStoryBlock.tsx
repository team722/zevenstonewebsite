import React from 'react';

interface SuccessStoryBlockProps {
  metric: string;
  description: string;
}

export const SuccessStoryBlock: React.FC<SuccessStoryBlockProps> = ({ metric, description }) => {
  return (
    <div className="my-8 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-[#05C168] px-6 py-4 flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-white"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h3 className="text-white font-semibold text-lg m-0">Success Story</h3>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
        {/* Icon Box */}
        <div className="flex-shrink-0 w-16 h-16 bg-[#F0FDF4] rounded-2xl flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 text-[#05C168]"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>

        {/* Text */}
        <div>
          <div className="text-4xl font-extrabold text-[#05C168] mb-2">{metric}</div>
          <p className="text-slate-600 text-lg leading-relaxed m-0">{description}</p>
        </div>
      </div>
    </div>
  );
};
