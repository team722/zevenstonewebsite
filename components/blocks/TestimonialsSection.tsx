import React from 'react';
import { urlFor } from '../../lib/sanity';
import { Quote } from 'lucide-react';

export const TestimonialsSection = ({ sectionTitle, testimonials }: any) => {
  if (!testimonials?.length) return null;
  
  return (
    <section className="py-24 bg-zeven-surface/50">
      <div className="container mx-auto px-6">
        {sectionTitle && (
            <div className="text-center mb-16">
               <h2 className="text-4xl font-bold text-zeven-dark">{sectionTitle}</h2>
            </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {testimonials.map((t: any, i: number) => {
             const img = t.photo ? urlFor(t.photo).width(200).height(200).url() : '';
             return (
               <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-zeven-surface relative hover:shadow-lg transition-shadow">
                  <Quote size={40} className="text-zeven-blue/10 absolute top-6 right-6" />
                  <p className="text-zeven-gray italic mb-6 relative z-10 text-lg leading-relaxed">"{t.quote}"</p>
                  <div className="flex items-center gap-4">
                     {img ? (
                        <img src={img} alt={t.author} className="w-14 h-14 rounded-full object-cover" />
                     ) : (
                        <div className="w-14 h-14 rounded-full bg-zeven-surface flex items-center justify-center font-bold text-zeven-gray">{t.author?.charAt(0)}</div>
                     )}
                     <div>
                        <h4 className="font-bold text-zeven-dark">{t.author}</h4>
                        <p className="text-sm text-zeven-blue">{t.role}, {t.company}</p>
                     </div>
                  </div>
               </div>
             )
           })}
        </div>
      </div>
    </section>
  );
};
