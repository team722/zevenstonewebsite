import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

interface CountdownBannerProps {
  headline?: string;
  highlightText?: string;
  subtitle?: string;
  endDate?: string;
  buttonText?: string;
  position?: 'top' | 'inline';
}

export function CountdownBanner({
  headline = "Limited White-Label Slots Available — ",
  highlightText = "First 50 Agencies Only",
  subtitle = "Zevenstone invisible delivery engine for scaling regional partners.",
  endDate,
  buttonText = "Apply Now",
  position = "inline"
}: CountdownBannerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Isolate header and body push-down logic for top banner
  useEffect(() => {
    if (position !== 'top') return;

    const updateLayout = () => {
      const header = document.querySelector('header');
      if (bannerRef.current) {
        const height = bannerRef.current.offsetHeight;
        if (header) {
          header.style.top = `${height}px`;
        }
        document.body.style.paddingTop = `${height}px`;
      }
    };
    
    updateLayout();
    window.addEventListener('resize', updateLayout);
    
    const observer = new MutationObserver(updateLayout);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', updateLayout);
      observer.disconnect();
      const header = document.querySelector('header');
      if (header) {
        header.style.top = '0px';
      }
      document.body.style.paddingTop = '0px';
    };
  }, [position]);

  useEffect(() => {
    if (!endDate) return;
    
    const targetDate = new Date(endDate).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const padZero = (num: number) => num.toString().padStart(2, '0');

  const scrollToCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById('form-cta-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // We removed the auto-hide on expiry so you can see it renders even if the date is in the past.
  const containerClasses = position === 'top' 
    ? "fixed top-0 left-0 right-0 z-[60] bg-[#111827] border-b border-blue-900/50 py-3 sm:py-5 px-4 sm:px-6 flex items-center min-h-[80px] w-full"
    : "bg-[#111827] border-b border-blue-900/50 py-3 sm:py-8 px-4 sm:px-6 relative overflow-hidden flex items-center min-h-[80px]";

  return (
    <div ref={position === 'top' ? bannerRef : null} className={containerClasses}>
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
        
        {/* Left Side: Text Content */}
        <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-auto">
          {/* Pulsating Dot */}
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)] shrink-0 mt-1 self-start sm:self-center" />
          
          <div className="flex flex-col">
            <h3 className="text-white font-bold text-sm sm:text-lg leading-tight flex flex-wrap gap-1">
              {headline} <span className="text-blue-400">— {highlightText}</span>
            </h3>
            {subtitle && (
              <p className="text-gray-400 mt-2 text-xs sm:text-base mt-0.5 font-medium hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Timer and CTA */}
        <div className="flex items-center gap-3 sm:gap-6 w-full lg:w-auto justify-between lg:justify-end">
          
          <div className="flex items-center flex-col items-start gap-2 sm:gap-3">
            <span className="text-gray-400 text-xs sm:text-lg font-medium hidden md:block whitespace-nowrap">
              Applications close in
            </span>
            
            {/* Time Blocks */}
            <div className="flex items-center gap-1 sm:gap-2 text-white font-bold text-2xl">
              <TimeBlock value={padZero(timeLeft.days)} label="d" />
              <span className="text-2xl text-gray-600 font-normal">:</span>
              <TimeBlock value={padZero(timeLeft.hours)} label="h" />
              <span className="text-2xl text-gray-600 font-normal">:</span>
              <TimeBlock value={padZero(timeLeft.minutes)} label="m" />
              <span className="text-2xl text-gray-600 font-normal">:</span>
              <TimeBlock value={padZero(timeLeft.seconds)} label="s" />
            </div>
          </div>

          {/* CTA Button */}
          <button 
            onClick={scrollToCTA}
            className="flex items-center underline cursor-pointer gap-1.5 text-white text-xs sm:text-lg font-bold hover:text-blue-400 transition-colors shrink-0 group"
          >
            {buttonText} 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

        </div>
      </div>
    </div>
  );
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-0.5 bg-[#1e293b] border border-blue-500/20 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded sm:rounded-md shadow-[0_0_10px_rgba(59,130,246,0.1)]">
      <span className="text-sm sm:text-2xl tracking-widest">{value}</span>
      <span className="text-[12px] sm:text-base text-blue-400 font-medium">{label}</span>
    </div>
  );
}
