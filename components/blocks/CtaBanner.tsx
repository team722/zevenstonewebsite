import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

export const CtaBanner = ({ headline, buttonLabel, buttonUrl, backgroundColor }: any) => {
  const bg = backgroundColor || '#0A2540'; // Default to zeven-dark

  return (
    <section className="py-24 text-center text-white" style={{ backgroundColor: bg }}>
      <div className="container mx-auto px-6">
         <h2 className="text-4xl md:text-5xl font-bold max-w-3xl mx-auto mb-10 leading-tight">{headline}</h2>
         {buttonLabel && (
            <Link to={buttonUrl || '/contact'}>
               <Button size="lg" className="bg-white text-zeven-dark hover:bg-gray-100 rounded-full px-10 border-none shadow-xl">
                 {buttonLabel} <ArrowRight size={18} className="ml-2" />
               </Button>
            </Link>
         )}
      </div>
    </section>
  );
};
