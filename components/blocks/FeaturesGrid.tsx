import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const FeaturesGrid = ({ sectionTitle, items }: any) => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {sectionTitle && (
            <div className="text-center mb-16">
               <h2 className="text-4xl font-bold text-zeven-dark">{sectionTitle}</h2>
               <div className="w-20 h-1 bg-zeven-blue mx-auto mt-6 rounded-full" />
            </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {items?.map((item: any, i: number) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="p-8 rounded-3xl bg-zeven-surface hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all group border border-transparent hover:border-zeven-surface"
             >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-zeven-blue mb-6 group-hover:bg-zeven-blue group-hover:text-white transition-colors">
                   <CheckCircle2 />
                </div>
                <h3 className="text-xl font-bold text-zeven-dark mb-4">{item.title}</h3>
                <p className="text-zeven-gray">{item.description}</p>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};
