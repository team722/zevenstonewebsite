
import React from 'react';
import { motion } from 'framer-motion';
import { EXTENDED_SERVICES, PROCESS_STEPS, MORE_SERVICES_TAGS } from '../constants';
import { Check, ArrowRight, Zap, Code, Database, Layout, Smartphone, Globe, LineChart } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

// Reusable ScrollReveal Component (Internal)
const ScrollReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export const Services: React.FC = () => {
  return (
    <div className="pt-32 min-h-screen bg-white font-sans relative overflow-hidden selection:bg-zeven-blue selection:text-white">
      
      {/* --- BACKGROUND ENGINE --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
         {/* Grid Base */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         
         {/* Fluid Orbs */}
         <motion.div 
            animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-zeven-blue/20 rounded-full mix-blend-multiply blur-[100px]"
         />
         <motion.div 
            animate={{ x: [0, -70, 0], y: [0, 100, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-zeven-light/20 rounded-full mix-blend-multiply blur-[90px]"
         />
         <motion.div 
            animate={{ x: [0, 50, 0], y: [0, 50, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 left-1/3 w-[700px] h-[600px] bg-zeven-deep/10 rounded-full mix-blend-multiply blur-[120px]"
         />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <div className="max-w-4xl mx-auto text-center mb-24 md:mb-32">
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
          >
             <span className="font-semibold text-zeven-blue tracking-[0.2em] uppercase text-xs md:text-sm bg-white/60 px-5 py-2.5 rounded-full border border-zeven-blue/20 inline-block backdrop-blur-md shadow-sm mb-6">
                Our Capabilities
             </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-extrabold text-5xl md:text-7xl mb-8 text-zeven-dark tracking-tight leading-[1.1]"
          >
            Capabilities Built for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zeven-blue to-zeven-deep">Scale & Impact</span>
          </motion.h1>
          
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="text-xl text-zeven-gray max-w-2xl mx-auto font-light leading-relaxed"
          >
            We blend creative storytelling with technical precision. From full-scale digital transformation to niche optimization, we provide the toolkit to grow.
          </motion.p>
        </div>

        {/* --- PROCESS STRIP (New) --- */}
        <div className="mb-32">
           <ScrollReveal>
             <div className="grid md:grid-cols-4 gap-4 bg-white/40 backdrop-blur-xl border border-white/60 p-4 rounded-[2rem] shadow-sm">
                {PROCESS_STEPS.map((step, idx) => (
                   <div key={idx} className="relative group p-6 rounded-2xl bg-zeven-blue border border-white/10 shadow-lg hover:shadow-zeven-blue/40 hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative z-10">
                        <div className="text-4xl font-bold text-white/30 mb-4 group-hover:text-white/50 transition-colors">0{idx + 1}</div>
                        <h3 className="font-bold text-xl text-white mb-2">{step.title}</h3>
                        <p className="text-sm text-blue-50 leading-relaxed font-medium opacity-90">{step.description}</p>
                      </div>
                   </div>
                ))}
             </div>
           </ScrollReveal>
        </div>

        {/* --- SERVICES GRID --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {EXTENDED_SERVICES.map((service, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="h-full flex flex-col group relative p-8 md:p-10 rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,153,255,0.15)] hover:bg-white hover:border-zeven-blue/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                
                {/* Hover Gradient Blob */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-zeven-blue/5 rounded-full blur-3xl group-hover:bg-zeven-blue/10 transition-colors duration-500" />

                {/* Icon */}
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-white/80 shadow-sm flex items-center justify-center text-zeven-blue mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 z-10">
                  {service.icon ? <service.icon size={32} strokeWidth={1.5} /> : <Zap size={32} />}
                </div>

                <div className="relative z-10 flex-grow">
                   <h3 className="font-bold text-2xl mb-4 text-zeven-dark group-hover:text-zeven-blue transition-colors">{service.title}</h3>
                   <p className="text-zeven-gray mb-8 leading-relaxed font-light">{service.description}</p>
                   
                   <div className="pt-6 border-t border-zeven-dark/5">
                     <h4 className="text-xs font-bold text-zeven-dark uppercase tracking-wider mb-4 opacity-70">Includes</h4>
                     <ul className="space-y-3">
                       {service.details?.slice(0, 4).map((detail, idx) => (
                         <li key={idx} className="flex items-start gap-3 text-zeven-gray text-sm font-medium">
                           <span className="mt-0.5 p-0.5 rounded-full bg-zeven-blue/10 text-zeven-blue flex-shrink-0">
                             <Check size={10} strokeWidth={4} />
                           </span>
                           {detail}
                         </li>
                       ))}
                     </ul>
                   </div>
                </div>

                <div className="mt-8 relative z-10">
                   <Link to="/contact" className="block">
                      <Button variant="ghost" className="w-full justify-between hover:bg-zeven-blue hover:text-white group/btn border border-zeven-surface hover:border-transparent rounded-xl">
                         <span>Start Project</span>
                         <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                   </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* --- TECH STACK MARQUEE --- */}
        <div className="mb-32 overflow-hidden">
           <div className="text-center mb-10">
              <h3 className="text-sm font-bold text-zeven-gray uppercase tracking-widest">Powered by Modern Tech</h3>
           </div>
           
           <div className="relative">
              {/* Fade Edges */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"/>
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"/>

              <div className="flex animate-marquee whitespace-nowrap gap-6 w-max opacity-60 hover:opacity-100 transition-opacity">
                 {[...MORE_SERVICES_TAGS, ...MORE_SERVICES_TAGS].map((tag, i) => (
                    <div key={i} className="flex items-center gap-2 px-6 py-3 rounded-full border border-zeven-gray/20 bg-white/50 backdrop-blur-sm">
                       <Code size={16} className="text-zeven-blue"/>
                       <span className="font-semibold text-zeven-dark text-sm">{tag}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* --- BOTTOM CTA --- */}
        <ScrollReveal>
          <div className="mb-20 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden isolate shadow-2xl">
            {/* CTA Background */}
            <div className="absolute inset-0 bg-zeven-blue"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-zeven-deep to-zeven-blue opacity-90"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            {/* Animated Decor */}
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
               className="absolute -top-1/2 -right-1/2 w-full h-full border-[100px] border-white/5 rounded-full blur-sm"
            />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight leading-tight">
                Not sure where to start?
              </h2>
              <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-light">
                We understand that no two businesses are alike. Let's schedule a discovery call to tailor a strategy that fits your unique needs.
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-white text-zeven-blue hover:bg-blue-50 border-none shadow-xl shadow-zeven-dark/10 text-lg px-12 py-5 h-auto rounded-full font-bold">
                   Book a Free Strategy Call
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
