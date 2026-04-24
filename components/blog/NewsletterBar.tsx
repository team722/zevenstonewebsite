import React from 'react';

interface NewsletterBarProps {
  heading: string;
  description: string;
  buttonText: string;
  placeholder: string;
}

export const NewsletterBar: React.FC<NewsletterBarProps> = ({ heading, description, buttonText, placeholder }) => {
  return (
    <div className="container mx-auto px-6 py-10 mb-20 max-w-5xl">
      <div className="bg-[#0D6EFD] rounded-[24px] p-10 md:p-14 text-center shadow-lg relative overflow-hidden text-white">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-[40px] font-extrabold mb-4 tracking-tight">{heading}</h2>
          <p className="text-blue-100 text-lg mb-10">{description}</p>
          
          <form className="flex flex-col sm:flex-row gap-0 max-w-xl mx-auto bg-white p-1.5 rounded-[16px] shadow-sm" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder={placeholder} 
              className="flex-1 px-5 py-4 rounded-[12px] focus:outline-none text-slate-800 placeholder-slate-400 bg-transparent"
              required
            />
            <button 
              type="submit"
              className="px-8 py-3 bg-slate-900 text-white font-bold rounded-[12px] hover:bg-black transition-colors whitespace-nowrap"
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
