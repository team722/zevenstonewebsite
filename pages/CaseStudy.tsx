import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { CASE_STUDIES } from '../constants';
import { Button } from '../components/ui/Button';
import { ArrowLeft, CheckCircle2, Layers, BarChart, Zap } from 'lucide-react';

export const CaseStudy: React.FC = () => {
  const { id } = useParams();
  const study = CASE_STUDIES[Number(id)] || CASE_STUDIES[0]; // Fallback to first if not found

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="pt-24 min-h-screen bg-white font-sans">
      
      {/* Hero Header */}
      <div className="bg-zeven-surface pt-20 pb-32 relative overflow-hidden">
         <div className="container mx-auto px-6 relative z-10">
            <Link to="/success-stories" className="inline-flex items-center text-zeven-gray hover:text-zeven-blue mb-8 transition-colors text-sm font-semibold">
               <ArrowLeft size={16} className="mr-2" /> Back to Success Stories
            </Link>
            
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="max-w-4xl"
            >
               <div className="flex gap-3 mb-6">
                  {study.tags.map((tag, i) => (
                     <span key={i} className="px-3 py-1 bg-white border border-zeven-gray/20 rounded-full text-xs font-bold uppercase tracking-wider text-zeven-blue">
                        {tag}
                     </span>
                  ))}
               </div>
               <h1 className="text-4xl md:text-6xl font-extrabold text-zeven-dark mb-6 leading-tight">
                  {study.headline}
               </h1>
               <div className="flex items-center gap-4 text-zeven-gray text-lg">
                  <span className="font-bold text-zeven-dark">Client:</span> {study.client}
               </div>
            </motion.div>
         </div>
         {/* Background Decor */}
         <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-zeven-blue/5 to-transparent pointer-events-none" />
      </div>

      {/* Main Image */}
      <div className="container mx-auto px-6 -mt-20 relative z-20">
         <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white"
         >
            <img src={study.image} alt={study.client} className="w-full h-[500px] object-cover" />
         </motion.div>
      </div>

      {/* Content Body */}
      <div className="container mx-auto px-6 py-24">
         <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Sidebar / Stats */}
            <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
               <div className="bg-zeven-dark text-white p-8 rounded-[2rem] shadow-xl">
                  <h3 className="font-bold text-xl mb-6 flex items-center gap-2"><BarChart size={20}/> Key Results</h3>
                  <div className="space-y-6">
                     <div>
                        <div className="text-4xl font-bold text-zeven-blue mb-1">300%</div>
                        <div className="text-sm opacity-80">Increase in Signups</div>
                     </div>
                     <div className="w-full h-px bg-white/10" />
                     <div>
                        <div className="text-4xl font-bold text-zeven-blue mb-1">6 Mo</div>
                        <div className="text-sm opacity-80">Time to ROI</div>
                     </div>
                     <div className="w-full h-px bg-white/10" />
                     <div>
                        <div className="text-4xl font-bold text-zeven-blue mb-1">1.2M</div>
                        <div className="text-sm opacity-80">Impressions Generated</div>
                     </div>
                  </div>
               </div>
               
               <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200">
                  <h3 className="font-bold text-zeven-dark mb-4">Services Provided</h3>
                  <ul className="space-y-3">
                     {["Strategy", "UX Design", "Development", "Growth Marketing"].map((s, i) => (
                        <li key={i} className="flex items-center gap-3 text-zeven-gray text-sm">
                           <CheckCircle2 size={16} className="text-zeven-blue" /> {s}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Main Text */}
            <div className="lg:col-span-8 order-1 lg:order-2 space-y-12">
               <div>
                  <h2 className="text-3xl font-bold text-zeven-dark mb-6">The Challenge</h2>
                  <p className="text-lg text-zeven-gray leading-relaxed font-light">
                     {study.challenge} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
               </div>
               
               <div className="grid md:grid-cols-2 gap-6 my-12">
                  <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop" className="rounded-3xl shadow-lg" alt="Process" />
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" className="rounded-3xl shadow-lg" alt="Team" />
               </div>

               <div>
                  <h2 className="text-3xl font-bold text-zeven-dark mb-6">The Solution</h2>
                  <p className="text-lg text-zeven-gray leading-relaxed font-light mb-6">
                     {study.solution} Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <ul className="space-y-4">
                     <li className="flex items-start gap-4">
                        <div className="p-2 bg-blue-50 text-zeven-blue rounded-lg"><Layers size={20}/></div>
                        <div>
                           <h4 className="font-bold text-zeven-dark">Full-Funnel Architecture</h4>
                           <p className="text-sm text-zeven-gray">We rebuilt the customer journey from the ground up.</p>
                        </div>
                     </li>
                     <li className="flex items-start gap-4">
                        <div className="p-2 bg-blue-50 text-zeven-blue rounded-lg"><Zap size={20}/></div>
                        <div>
                           <h4 className="font-bold text-zeven-dark">Automated Nurturing</h4>
                           <p className="text-sm text-zeven-gray">Implemented HubSpot workflows to engage leads 24/7.</p>
                        </div>
                     </li>
                  </ul>
               </div>
               
               <div className="pt-12 border-t border-slate-100">
                  <h2 className="text-3xl font-bold text-zeven-dark mb-6">The Outcome</h2>
                  <p className="text-lg text-zeven-gray leading-relaxed font-light">
                     {study.impact} The results exceeded expectations and set a new benchmark for the client's industry performance.
                  </p>
               </div>
            </div>
         </div>
      </div>
      
      {/* Bottom Nav */}
      <div className="bg-zeven-surface py-20 text-center">
         <h3 className="text-2xl font-bold text-zeven-dark mb-8">Ready to be our next success story?</h3>
         <Link to="/contact">
            <Button size="lg" className="shadow-xl">Start Your Project</Button>
         </Link>
      </div>

    </div>
  );
};