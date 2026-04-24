import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ProsConsBlockProps {
  heading?: string;
  pros?: string[];
  cons?: string[];
}

export const ProsConsBlock: React.FC<ProsConsBlockProps> = ({ heading, pros = [], cons = [] }) => {
  if (pros.length === 0 && cons.length === 0) return null;

  return (
    <div className="my-16">
      {heading && <h3 className="text-[32px] font-extrabold text-zeven-dark mb-8 tracking-tight">{heading}</h3>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pros.length > 0 && (
          <div className="rounded-[24px] border border-emerald-100 shadow-sm overflow-hidden bg-white">
            <div className="bg-emerald-500 px-6 py-4 flex items-center gap-3">
              <CheckCircle2 size={24} className="text-white" />
              <h4 className="text-xl font-bold text-white m-0">Advantages</h4>
            </div>
            <div className="p-6 md:p-8 space-y-4">
              {pros.map((pro, index) => (
                <div key={index} className="flex gap-4 p-5 rounded-2xl bg-[#F0FDF4] border border-emerald-100 shadow-sm">
                  <div className="flex flex-col">
                     <span className="text-emerald-800 font-semibold text-lg leading-relaxed">{pro}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {cons.length > 0 && (
          <div className="rounded-[24px] border border-rose-100 shadow-sm overflow-hidden bg-white">
            <div className="bg-rose-500 px-6 py-4 flex items-center gap-3">
              <XCircle size={24} className="text-white" />
              <h4 className="text-xl font-bold text-white m-0">Disadvantages</h4>
            </div>
            <div className="p-6 md:p-8 space-y-4">
              {cons.map((con, index) => (
                <div key={index} className="flex gap-4 p-5 rounded-2xl bg-[#FFF1F2] border border-rose-100 shadow-sm">
                  <div className="flex flex-col">
                     <span className="text-rose-800 font-semibold text-lg leading-relaxed">{con}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
