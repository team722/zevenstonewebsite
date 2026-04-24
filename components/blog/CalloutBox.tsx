import React from 'react';
import { Lightbulb, Info, AlertTriangle, FileText } from 'lucide-react';

interface CalloutBoxProps {
  type: 'tip' | 'info' | 'warning' | 'note';
  title?: string;
  content: string;
}

export const CalloutBox: React.FC<CalloutBoxProps> = ({ type = 'tip', title, content }) => {
  const config = {
    tip: {
      icon: Lightbulb,
      bg: 'bg-[#F4F9FF]',
      iconBg: 'bg-blue-500',
      iconColor: 'text-white',
      titleColor: 'text-blue-700',
    },
    info: {
      icon: Info,
      bg: 'bg-slate-50',
      iconBg: 'bg-slate-500',
      iconColor: 'text-white',
      titleColor: 'text-slate-800',
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-orange-50',
      iconBg: 'bg-orange-500',
      iconColor: 'text-white',
      titleColor: 'text-orange-800',
    },
    note: {
      icon: FileText,
      bg: 'bg-purple-50',
      iconBg: 'bg-purple-500',
      iconColor: 'text-white',
      titleColor: 'text-purple-800',
    },
  };

  const { icon: Icon, bg, iconBg, iconColor, titleColor } = config[type] || config.tip;

  return (
    <div className={`my-12 p-6 md:p-8 rounded-3xl ${bg} flex flex-col sm:flex-row gap-6 items-start`}>
      <div className={`w-14 h-14 shrink-0 rounded-[14px] ${iconBg} ${iconColor} flex items-center justify-center shadow-sm`}>
        <Icon size={26} />
      </div>
      <div>
        {title && <h4 className={`text-xl font-bold mb-3 ${titleColor} tracking-tight`}>{title}</h4>}
        <p className="text-slate-600 m-0 leading-relaxed text-lg">{content}</p>
      </div>
    </div>
  );
};
