import React from 'react';

interface Stat {
  value: string;
  label: string;
}

interface StatsStripProps {
  stats: Stat[];
}

export const StatsStrip: React.FC<StatsStripProps> = ({ stats }) => {
  if (!stats || stats.length === 0) return null;

  const colorConfig = [
    { border: 'border-blue-200', bg: 'bg-[#F4F9FF]', text: 'text-blue-500', label: 'text-slate-500' },
    { border: 'border-purple-200', bg: 'bg-[#F9F5FF]', text: 'text-purple-600', label: 'text-slate-500' },
    { border: 'border-pink-200', bg: 'bg-[#FDF2F8]', text: 'text-pink-500', label: 'text-slate-500' },
  ];

  return (
    <div className="my-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const style = colorConfig[index % colorConfig.length];
          return (
            <div key={index} className={`rounded-[24px] border-2 ${style.border} ${style.bg} p-8 text-center flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow`}>
              <div className={`text-5xl lg:text-[56px] font-extrabold mb-3 tracking-tight ${style.text}`}>
                {stat.value}
              </div>
              <div className={`font-bold uppercase tracking-widest text-xs ${style.label}`}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
