import React from 'react';
import { motion } from 'framer-motion';

export const StatsSection = ({ stats }: any) => {
  if (!stats?.length) return null;

  return (
    <section className="py-16 bg-white border-y border-zeven-surface/50">
       <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             {stats.map((s: any, i: number) => (
                <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="text-center"
                >
                   <h3 className="text-5xl font-extrabold text-zeven-blue mb-2">{s.value}</h3>
                   <p className="text-zeven-gray font-bold uppercase tracking-wider text-sm">{s.label}</p>
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
};
