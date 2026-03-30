
import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { sanityClient } from '../lib/sanity';
import { PORTFOLIO_PROJECTS_QUERY, PORTFOLIO_CATEGORIES_QUERY } from '../lib/queries';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorState } from '../components/ui/ErrorState';
import { Button } from '../components/ui/Button';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: projects, isLoading: loadingProjects, error: errorProjects } = useQuery({
    queryKey: ['portfolioProjects'],
    queryFn: () => sanityClient.fetch(PORTFOLIO_PROJECTS_QUERY),
  });

  const { data: categoriesData, isLoading: loadingCategories, error: errorCategories } = useQuery({
    queryKey: ['portfolioCategories'],
    queryFn: () => sanityClient.fetch(PORTFOLIO_CATEGORIES_QUERY),
  });

  const isLoading = loadingProjects || loadingCategories;
  const error = errorProjects || errorCategories;

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorState />;

  // Prepare categories list (always starting with "All")
  const categories = ["All", ...(categoriesData?.map((c: any) => c.label) || [])];

  // Filter projects based on selected category
  const filteredPortfolio = activeCategory === "All" 
    ? projects || []
    : (projects || []).filter((item: any) => item.category === activeCategory);

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
        
        {/* Header */}
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

        {/* Filter Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3 mb-16 overflow-x-auto pb-4 no-scrollbar justify-center no-scrollbar-hide"
        >
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat 
                  ? 'bg-zeven-dark text-white shadow-lg scale-105' 
                  : 'bg-white border border-zeven-surface text-zeven-gray hover:border-zeven-blue/50 hover:text-zeven-blue shadow-sm'
                }`}
              >
                  {cat}
              </button>
            ))}
        </motion.div>

        {/* Dynamic Bento Style Grid for Portfolio */}
        <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px] lg:auto-rows-[350px] mb-32"
        >
            <LayoutGroup>
              <AnimatePresence mode="popLayout">
                {filteredPortfolio.map((item: any, idx: number) => {
                  // Beautiful Bento Styling rules
                  let spanClass = "md:col-span-1 md:row-span-1";
                  
                  if (activeCategory === "All") {
                    if (idx % 7 === 0) spanClass = "md:col-span-2 md:row-span-2";
                    else if (idx % 7 === 3) spanClass = "md:col-span-2 md:row-span-1";
                    else if (idx % 7 === 6) spanClass = "md:col-span-2 md:row-span-1";
                  } else {
                     // When filtered, default to 2-span if taking up full width of nice rows
                     if (idx % 3 === 0) spanClass = "md:col-span-2 md:row-span-1";
                     else spanClass = "md:col-span-2 md:row-span-1";
                  }

                  return (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      key={item._id || idx} 
                      className={`group relative rounded-[2rem] overflow-hidden bg-white cursor-pointer shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-white/60 ${spanClass}`}
                    >
                        <img src={item.imageUrl} alt={item.client} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zeven-dark/95 via-zeven-dark/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                        
                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                              <div className="flex justify-between items-end gap-4">
                                <div>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                      <div className="text-white font-bold text-xs uppercase tracking-wider bg-zeven-blue/80 backdrop-blur-md px-3 py-1 rounded-full inline-block">
                                        {item.category}
                                      </div>
                                      {item.tags?.slice(0, 2).map((tag: string) => (
                                        <div key={tag} className="text-white/80 font-bold text-[10px] uppercase tracking-wider bg-white/10 backdrop-blur-md px-2 py-1 rounded-full inline-block border border-white/20">
                                          {tag}
                                        </div>
                                      ))}
                                    </div>
                                    <h3 className="text-white font-bold text-3xl md:text-4xl mb-2 leading-tight">{item.client}</h3>
                                    <p className="text-white/80 text-sm md:text-base line-clamp-2 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">{item.headline}</p>
                                </div>
                                <div className="bg-white text-zeven-dark w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 flex-shrink-0 shadow-lg">
                                    <ExternalLink size={20} />
                                </div>
                              </div>
                          </div>
                        </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </LayoutGroup>
        </motion.div>

        {/* Call to action */}
        <div className="text-center bg-white/60 backdrop-blur-xl border border-white/60 rounded-[3rem] p-12 md:p-20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-20 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-zeven-dark mb-6 tracking-tight">Like What You See?</h2>
          <p className="text-zeven-gray text-lg mb-10 font-light max-w-xl mx-auto">These are just a few examples of how we've helped ambitious brands transform their digital presence and achieve record-breaking results.</p>
          <Link to="/contact">
             <Button className="rounded-full shadow-lg shadow-zeven-blue/20 bg-zeven-blue text-white hover:bg-zeven-deep text-lg px-10 py-6 h-auto">
               Let's Discuss Your Project <ArrowRight size={20} className="ml-2" />
             </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};