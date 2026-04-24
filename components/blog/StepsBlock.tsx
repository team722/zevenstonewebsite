import React from 'react';

interface Step {
  title: string;
  description: string;
  iconUrl?: string;
}

interface StepsBlockProps {
  heading?: string;
  steps: Step[];
}

export const StepsBlock: React.FC<StepsBlockProps> = ({ heading, steps }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="my-12">
      {heading && <h3 className="text-2xl font-bold text-zeven-dark mb-8">{heading}</h3>}
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-100 flex flex-col md:flex-row gap-6 relative overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-zeven-blue scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
            
            <div className="flex items-start gap-6">
              {step.iconUrl ? (
                <div className="w-16 h-16 shrink-0 rounded-xl bg-slate-50 flex items-center justify-center p-3">
                  <img src={step.iconUrl} alt={step.title} className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="w-16 h-16 shrink-0 rounded-xl bg-blue-50 text-zeven-blue flex items-center justify-center text-2xl font-black">
                  {index + 1}
                </div>
              )}
              
              <div>
                <h4 className="text-xl font-bold text-zeven-dark mb-3 flex items-center gap-3">
                  {!step.iconUrl && <span className="text-slate-400 text-sm font-black">STEP {index + 1}</span>}
                  {step.title}
                </h4>
                <p className="text-zeven-gray leading-relaxed m-0">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
