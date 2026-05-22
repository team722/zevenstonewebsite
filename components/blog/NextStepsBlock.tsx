import React from 'react';
import { Link } from 'react-router-dom';

interface NextStepsBlockProps {
  title: string;
  steps: string[];
  buttonText?: string;
  buttonUrl?: string;
}

export const NextStepsBlock: React.FC<NextStepsBlockProps> = ({
  title,
  steps,
  buttonText,
  buttonUrl,
}) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="my-12 bg-[#FFF9EE] rounded-[24px] border border-[#FDE68A] p-8 md:p-10 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-[#F97316] rounded-xl flex items-center justify-center shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7 text-white"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            <path d="M9 14l2 2 4-4" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 m-0">{title || 'Your Next Steps'}</h3>
      </div>

      {/* Steps List */}
      <div className="space-y-5 mb-10">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="w-7 h-7 mt-0.5 rounded-full bg-[#F97316] flex items-center justify-center shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-white"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-slate-700 text-lg m-0 leading-relaxed">{step}</p>
          </div>
        ))}
      </div>

      {/* Button Section */}
      {(buttonText || buttonUrl) && (
        <>
          <hr className="border-t border-[#FDE68A] mb-8" />
          <Link
            to={`/${buttonUrl}`}
            className="block w-full text-center bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-lg py-4 px-6 rounded-xl transition-colors duration-200"
          >
            {buttonText || 'Get Started'}
          </Link>
        </>
      )}
    </div>
  );
};
