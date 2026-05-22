import React from 'react';

interface IconCard {
  title: string;
  description: string;
  iconStyle: 'blue' | 'purple' | 'green' | 'orange' | 'red';
  iconType: 'video' | 'mic' | 'lightbulb' | 'code' | 'chart' | 'check';
}

interface IconCardsBlockProps {
  heading?: string;
  cards: IconCard[];
}

const getIconStyle = (style: IconCard['iconStyle']) => {
  switch (style) {
    case 'blue': return 'bg-[#1D64FF] text-white'; // Figma blue
    case 'purple': return 'bg-[#A33DFA] text-white'; // Figma purple
    case 'green': return 'bg-[#00C14D] text-white'; // Figma green
    case 'orange': return 'bg-[#F97316] text-white';
    case 'red': return 'bg-[#EF4444] text-white';
    default: return 'bg-[#1D64FF] text-white';
  }
};

const renderIconSvg = (type: IconCard['iconType']) => {
  switch (type) {
    case 'video':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <polygon points="23 7 16 12 23 17 23 7"></polygon>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
        </svg>
      );
    case 'mic':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="22"></line>
          <line x1="8" y1="22" x2="16" y2="22"></line>
        </svg>
      );
    case 'lightbulb':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M9 18h6"></path>
          <path d="M10 22h4"></path>
          <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
          <line x1="12" y1="2" x2="12" y2="4"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          <line x1="2" y1="12" x2="4" y2="12"></line>
          <line x1="20" y1="12" x2="22" y2="12"></line>
        </svg>
      );
    case 'code':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      );
    case 'chart':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <line x1="12" y1="20" x2="12" y2="10"></line>
          <line x1="18" y1="20" x2="18" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="16"></line>
        </svg>
      );
    case 'check':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      );
    default:
      return null;
  }
};

export const IconCardsBlock: React.FC<IconCardsBlockProps> = ({ heading, cards }) => {
  if (!cards || cards.length === 0) return null;

  return (
    <div className="my-12 bg-slate-50 rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-100">
      {heading && (
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-10 m-0">
          {heading}
        </h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-2xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-50 flex flex-col h-full">
            <div className={`w-14 h-14 rounded-[14px] flex items-center justify-center mb-6 shrink-0 ${getIconStyle(card.iconStyle)}`}>
              {renderIconSvg(card.iconType)}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 m-0">{card.title}</h3>
            <p className="text-slate-500 text-[16px] leading-relaxed m-0 flex-grow">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
