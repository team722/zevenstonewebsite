
import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { sanityClient } from '../lib/sanity';
import { TEAM_MEMBERS_QUERY, HOME_PAGE_QUERY, SITE_SETTINGS_QUERY } from '../lib/queries';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorState } from '../components/ui/ErrorState';
import { Card } from '../components/ui/Card';
import { Target, Lightbulb, Users, Heart, Rocket, Shield } from 'lucide-react';

// Fallback icons for Core Values (Sanity doesn't store React components)
const VALUE_ICONS = [Users, Rocket, Shield, Lightbulb, Heart, Target];

export const About: React.FC = () => {
  const { data: teamMembers, isLoading: loadingTeam, error: teamError } = useQuery({
    queryKey: ['teamMembers'],
    queryFn: () => sanityClient.fetch(TEAM_MEMBERS_QUERY),
  });

  const { data: homePage, isLoading: loadingHome, error: homeError } = useQuery({
    queryKey: ['homePage'],
    queryFn: () => sanityClient.fetch(HOME_PAGE_QUERY),
  });

  const { data: siteSettings, isLoading: loadingSettings, error: settingsError } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => sanityClient.fetch(SITE_SETTINGS_QUERY),
  });

  const isLoading = loadingTeam || loadingHome || loadingSettings;
  const error = teamError || homeError || settingsError;

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorState />;

  const processSteps = homePage?.processSteps || [];
  const coreValues = siteSettings?.coreValues || [];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 font-sans relative overflow-hidden">
      
      {/* --- BACKGROUND ENGINE --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <motion.div 
            animate={{ x: [0, 50, 0], y: [0, 50, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 w-[800px] h-[800px] bg-zeven-blue/5 rounded-full mix-blend-multiply blur-[120px]"
         />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
             <div className="inline-block px-4 py-1.5 rounded-full bg-zeven-blue/10 text-zeven-blue text-xs font-bold uppercase tracking-widest mb-6">
               Who We Are
             </div>
            <h1 className="font-extrabold text-5xl md:text-7xl mb-8 text-zeven-dark tracking-tight leading-[1.1]">
              The Team Behind <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zeven-blue to-zeven-deep">The Transformation</span>
            </h1>
            <p className="text-xl text-zeven-gray leading-relaxed mb-8 font-light max-w-lg">
              We're not another agency ticking boxes. We're a creative-tech powerhouse driven by strategy, inspired by innovation, and grounded in results.
            </p>
          </motion.div>
          <motion.div
             initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
             animate={{ opacity: 1, scale: 1, rotate: 0 }}
             transition={{ duration: 0.8 }}
             className="relative"
          >
             {/* Image Grid with Glass effect */}
             <div className="relative z-10 p-4 bg-white/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/50 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" className="rounded-3xl shadow-md w-full h-64 object-cover" alt="Team working" />
                  <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop" className="rounded-3xl shadow-md w-full h-64 object-cover mt-8" alt="Meeting" />
                </div>
             </div>
             {/* Decor blobs */}
             <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-zeven-blue/20 to-transparent rounded-full blur-3xl opacity-50" />
          </motion.div>
        </div>

        {/* Mission / Vision Glass Panel */}
        <motion.div 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[3rem] p-10 md:p-20 mb-32"
        >
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="w-14 h-14 bg-zeven-blue rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-zeven-blue/20">
                <Lightbulb size={28} />
              </div>
              <h2 className="font-bold text-3xl mb-4 text-zeven-dark">Our Vision</h2>
              <p className="text-zeven-gray text-lg leading-relaxed font-light">
                To redefine digital excellence with a human-first approach — where technology, creativity, and empathy work hand in hand to create meaningful brand experiences.
              </p>
            </div>
            <div>
               <div className="w-14 h-14 bg-zeven-dark rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg">
                <Target size={28} />
              </div>
              <h2 className="font-bold text-3xl mb-4 text-zeven-dark">Our Mission</h2>
              <p className="text-zeven-gray text-lg leading-relaxed font-light">
                To deliver meaningful results through smart, scalable solutions — tailored to each client's stage of growth, industry, and ambition.
              </p>
            </div>
          </div>
        </motion.div>

        {/* How We Work — from Sanity homePage.processSteps */}
        {processSteps.length > 0 && (
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="font-bold text-4xl md:text-5xl mb-6 text-zeven-dark">How We Work</h2>
              <p className="text-zeven-gray text-xl font-light">A proven framework for digital success.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step: any, i: number) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative group h-full"
                >
                 <div className="h-full p-8 bg-white/70 backdrop-blur-lg rounded-[2rem] border border-white/60 hover:border-zeven-blue/30 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-zeven-surface text-zeven-blue flex items-center justify-center mb-6 font-bold text-xl group-hover:bg-zeven-blue group-hover:text-white transition-colors">
                      {i + 1}
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-zeven-dark">{step.title}</h3>
                    <p className="text-zeven-gray text-sm leading-relaxed">{step.description}</p>
                 </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Values Grid — from Sanity siteSettings.coreValues */}
        {coreValues.length > 0 && (
          <div className="mb-32">
            <h2 className="font-bold text-4xl md:text-5xl mb-16 text-center text-zeven-dark">Core Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {coreValues.map((val: any, i: number) => {
                const IconComponent = VALUE_ICONS[i % VALUE_ICONS.length];
                return (
                  <motion.div 
                    key={val._key || i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="p-8 rounded-[2rem] bg-white border border-zeven-surface hover:border-zeven-blue/30 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-zeven-blue/5 text-zeven-blue group-hover:bg-zeven-blue group-hover:text-white transition-colors">
                        <IconComponent size={24}/>
                      </div>
                      <h3 className="font-bold text-lg text-zeven-dark">{val.title}</h3>
                    </div>
                    <p className="text-zeven-gray text-sm leading-relaxed">{val.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Team Section — from Sanity teamMembers */}
        {teamMembers && teamMembers.length > 0 && (
          <div className="text-center pb-20">
            <h2 className="font-bold text-4xl md:text-5xl mb-6 text-zeven-dark">Meet the Minds</h2>
            <p className="text-zeven-gray text-xl max-w-2xl mx-auto mb-16 font-light">
              Our team is a fusion of strategists, designers, technologists, marketers, and storytellers.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {teamMembers.map((member: any, i: number) => (
                    <motion.div 
                      key={member._id || i} 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group"
                    >
                        <div className="aspect-[3/4] rounded-[2rem] overflow-hidden relative mb-6 shadow-md border-4 border-white">
                            <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0" />
                            <div className="absolute inset-0 bg-gradient-to-t from-zeven-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Hover Socials or Info could go here */}
                        </div>
                        <h3 className="font-bold text-xl text-zeven-dark">{member.name}</h3>
                        <p className="text-sm text-zeven-blue font-semibold uppercase tracking-wider">{member.role}</p>
                    </motion.div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};