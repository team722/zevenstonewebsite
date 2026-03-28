import React from 'react';
import { motion } from 'framer-motion';
import { CASE_STUDIES } from '../constants';
import { Button } from '../components/ui/Button';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

export const Portfolio: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 font-sans relative overflow-hidden">
      
      {/* --- BACKGROUND ENGINE --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <motion.div 
            animate={{ x: [0, -50, 0], y: [0, 100, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-zeven-deep/5 rounded-full mix-blend-multiply blur-[100px]"
         />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-block px-4 py-1.5 rounded-full bg-zeven-blue/10 text-zeven-blue text-xs font-bold uppercase tracking-widest mb-6"
          >
            Selected Works
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-extrabold text-5xl md:text-7xl mb-8 text-zeven-dark tracking-tight"
          >
            Results That <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zeven-blue to-zeven-deep">Speak For Themselves</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-xl text-zeven-gray max-w-2xl mx-auto font-light"
          >
            Real challenges. Tailored solutions. Measurable impact.
          </motion.p>
        </div>

        <div className="space-y-32">
          {CASE_STUDIES.map((study, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative group perspective-1000">
                <div className="absolute inset-0 bg-zeven-blue/20 blur-[80px] rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 border-4 border-white/50">
                  <img src={study.image} alt={study.headline} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  
                  {/* Overlay on Image */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                     <div className="text-white font-bold text-lg flex items-center gap-2">
                        <TrendingUp size={20} className="text-zeven-blue" />
                        {study.impact}
                     </div>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 relative">
                <div className="p-8 md:p-12 bg-white/60 backdrop-blur-xl border border-white/60 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <div>
                    <h3 className="text-xs font-bold tracking-[0.2em] text-zeven-blue uppercase mb-4">{study.client}</h3>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-zeven-dark leading-tight mb-6">{study.headline}</h2>
                  </div>

                  <div className="flex gap-2 flex-wrap mb-8">
                    {study.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-zeven-dark bg-white border border-zeven-gray/20 px-3 py-1.5 rounded-full shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-6 mb-8">
                      <div>
                          <h4 className="font-bold text-zeven-dark mb-2 text-sm uppercase opacity-70">The Challenge</h4>
                          <p className="text-zeven-gray leading-relaxed font-light">{study.challenge}</p>
                      </div>
                       <div>
                          <h4 className="font-bold text-zeven-dark mb-2 text-sm uppercase opacity-70">The Solution</h4>
                          <p className="text-zeven-gray leading-relaxed font-light">{study.solution}</p>
                      </div>
                  </div>

                  <div>
                      <Button className="rounded-full shadow-lg shadow-zeven-blue/20" icon={<ArrowUpRight size={18}/>}>View Case Study</Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};