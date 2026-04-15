
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { sanityClient } from '../lib/sanity';
import { TEAM_MEMBERS_QUERY, HOME_PAGE_QUERY, SITE_SETTINGS_QUERY, TESTIMONIALS_QUERY, ABOUT_PAGE_QUERY, FOUNDERS_BIO_QUERY } from '../lib/queries';
import { urlFor } from '../lib/sanity';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorState } from '../components/ui/ErrorState';
import { Helmet } from 'react-helmet-async';
import { Card } from '../components/ui/Card';
import { Target, Lightbulb, Users, Heart, Rocket, Shield, Quote, ChevronLeft, ChevronRight, CheckCircle2, Award } from 'lucide-react';

// Fallback icons for Core Values (Sanity doesn't store React components)
const VALUE_ICONS = [Users, Rocket, Shield, Lightbulb, Heart, Target];

export const About: React.FC = () => {
  const { data: teamMembers, isLoading: loadingTeam, error: teamError } = useQuery({
    queryKey: ['teamMembers'],
    queryFn: () => sanityClient.fetch(TEAM_MEMBERS_QUERY),
  });

  console.log(teamMembers, "teamMembers")

  const { data: homePage, isLoading: loadingHome, error: homeError } = useQuery({
    queryKey: ['homePage'],
    queryFn: () => sanityClient.fetch(HOME_PAGE_QUERY),
  });

  const { data: siteSettings, isLoading: loadingSettings, error: settingsError } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => sanityClient.fetch(SITE_SETTINGS_QUERY),
  });

  const { data: testimonials, isLoading: loadingTestimonials, error: testimonialsError } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => sanityClient.fetch(TESTIMONIALS_QUERY),
  });

  const { data: aboutPageData } = useQuery({
    queryKey: ['aboutPage'],
    queryFn: () => sanityClient.fetch(ABOUT_PAGE_QUERY),
  });

  const { data: foundersBioData } = useQuery({
    queryKey: ['foundersBio'],
    queryFn: () => sanityClient.fetch(FOUNDERS_BIO_QUERY),
  });

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeFounderId, setActiveFounderId] = useState<string | null>(null);

  const isLoading = loadingTeam || loadingHome || loadingSettings || loadingTestimonials;
  const error = teamError || homeError || settingsError || testimonialsError;

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorState />;

  const processSteps = homePage?.processSteps || [];
  const coreValues = siteSettings?.coreValues || [];
  const hasTestimonials = testimonials && testimonials.length > 0;

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 font-sans relative overflow-hidden">
      <Helmet>
        <title>{aboutPageData?.seo?.title || aboutPageData?.seo?.metaTitle || 'About Us | Zevenstone – Who We Are & What We Stand For'}</title>
        <meta name="description" content={aboutPageData?.seo?.description || aboutPageData?.seo?.metaDescription || 'Meet the Zevenstone team. We are a results-driven digital agency building brands, websites, and legacies that outlast trends.'} />
        {(aboutPageData?.seo?.metaImage || aboutPageData?.seo?.ogImage) && <meta property="og:image" content={urlFor(aboutPageData.seo.metaImage || aboutPageData.seo.ogImage).url()} />}
      </Helmet>

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
            <div dangerouslySetInnerHTML={{ __html: aboutPageData?.hero?.label || 'Who We Are' }} className="inline-block px-4 py-1.5 rounded-full bg-zeven-blue/10 text-zeven-blue text-xs font-bold uppercase tracking-widest mb-6">

            </div>
            <h1 className="font-extrabold text-[36px] sm:text-4xl md:text-7xl mb-8 text-zeven-dark tracking-tight leading-[1.1]" dangerouslySetInnerHTML={{ __html: aboutPageData?.hero?.heading || `The Team Behind <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-zeven-blue to-zeven-deep">The Transformation</span>` }}>
            </h1>
            <p className="text-xl text-zeven-gray leading-relaxed mb-8 font-light max-w-lg">
              {aboutPageData?.hero?.description || "We're not another agency ticking boxes. We're a creative-tech powerhouse driven by strategy, inspired by innovation, and grounded in results."}
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
                <img src={aboutPageData?.heroImagesUrl?.[0] || aboutPageData?.hero?.backgroundImageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"} className="rounded-3xl shadow-md w-full h-64 object-cover" alt="Team working" />
                <img src={aboutPageData?.heroImagesUrl?.[1] || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop"} className="rounded-3xl shadow-md w-full h-64 object-cover mt-8" alt="Meeting" />
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
              <h2 className="font-bold text-3xl mb-4 text-zeven-dark">{aboutPageData?.visionSection?.heading || "Our Vision"}</h2>
              <p className="text-zeven-gray text-lg leading-relaxed font-light">
                {aboutPageData?.visionSection?.description || "To redefine digital excellence with a human-first approach — where technology, creativity, and empathy work hand in hand to create meaningful brand experiences."}
              </p>
            </div>
            <div>
              <div className="w-14 h-14 bg-zeven-dark rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg">
                <Target size={28} />
              </div>
              <h2 className="font-bold text-3xl mb-4 text-zeven-dark">{aboutPageData?.missionSection?.heading || "Our Mission"}</h2>
              <p className="text-zeven-gray text-lg leading-relaxed font-light">
                {aboutPageData?.missionSection?.description || "To deliver meaningful results through smart, scalable solutions — tailored to each client's stage of growth, industry, and ambition."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* How We Work — from Sanity homePage.processSteps */}
        {processSteps.length > 0 && (
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="font-bold text-4xl md:text-5xl mb-6 text-zeven-dark">{aboutPageData?.howWeWorkHeading?.heading || "How We Work"}</h2>
              <p className="text-zeven-gray text-xl font-light">{aboutPageData?.howWeWorkHeading?.description || "A proven framework for digital success."}</p>
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
            <h2 className="font-bold text-4xl md:text-5xl mb-16 text-center text-zeven-dark">
              {aboutPageData?.coreValuesHeading?.heading || "Core Values"}
            </h2>
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
                        <IconComponent size={24} />
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

        {/* --- FOUNDERS BIO SECTION --- */}
        {foundersBioData && foundersBioData.length > 0 && (() => {
          const founders: any[] = foundersBioData;
          const activeId = activeFounderId || founders[0]?._id;
          const activeFounder = founders.find((f: any) => f._id === activeId) || founders[0];
          const inactiveFounders = founders.filter((f: any) => f._id !== activeId);

          return (
            <div className="mb-32">
              {/* Section Heading */}
              <div className="mb-12">
                <h2 className="font-bold text-4xl md:text-5xl mb-3 text-zeven-dark">
                  {aboutPageData?.foundersBioHeading?.heading
                    ? <span dangerouslySetInnerHTML={{ __html: aboutPageData.foundersBioHeading.heading }} />
                    : <><span>Founders </span><span className="text-zeven-blue">Bio</span></>
                  }
                </h2>
                <p className="text-zeven-gray text-base font-light max-w-2xl">
                  {aboutPageData?.foundersBioHeading?.description || 'We offer comprehensive digital marketing solutions tailored to your business needs.'}
                </p>
              </div>

              <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">

                {/* LEFT: Active Card + Inactive Thumbnails */}
                <div className="w-full lg:col-span-4 flex flex-col gap-5">

                  {/* Active (Large) Founder Card */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFounder._id + '-card'}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.35 }}
                      className="rounded-3xl overflow-hidden border-2 border-zeven-blue/30 shadow-xl bg-white"
                    >
                      <div className="relative">
                        <img
                          src={activeFounder.photoUrl}
                          alt={activeFounder.name}
                          className="w-full lg:h-[400px]  object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-xl text-zeven-dark">{activeFounder.name}</h3>
                        <p className="text-zeven-gray text-sm">{activeFounder.role}</p>
                        {activeFounder.tagline && (
                          <div className="flex items-center gap-1.5 mt-2">
                            <Heart size={13} className="text-zeven-blue" />
                            <span className="text-zeven-blue text-xs font-semibold">{activeFounder.tagline}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Inactive Thumbnail Cards — horizontal scroll on mobile, grid on lg */}
                  {inactiveFounders.length > 0 && (
                    <div className="flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-2 no-scrollbar">
                      {inactiveFounders.map((f: any) => (
                        <motion.button
                          key={f._id}
                          onClick={() => setActiveFounderId(f._id)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="rounded-2xl overflow-hidden border-2 border-transparent hover:border-zeven-blue/40 bg-white shadow-md transition-all text-left flex-shrink-0 w-40 sm:w-48 lg:w-full"
                        >
                          <img
                            src={f.photoUrl}
                            alt={f.name}
                            className="w-full h-28 sm:h-32 object-cover object-top grayscale hover:grayscale-0 transition-all duration-300"
                          />
                          <div className="p-3">
                            <p className="font-bold text-sm text-zeven-dark truncate">{f.name}</p>
                            <p className="text-xs text-zeven-gray truncate">{f.role}</p>
                            {f.tagline && (
                              <div className="flex items-center gap-1 mt-1">
                                <Heart size={10} className="text-zeven-blue flex-shrink-0" />
                                <span className="text-zeven-blue text-[10px] font-semibold truncate">{f.tagline}</span>
                              </div>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>

                {/* RIGHT: Animated Bio Detail Pane */}
                <div className="w-full lg:col-span-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFounder._id + '-bio'}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col gap-5"
                    >
                      {/* Quote Card */}
                      {activeFounder.quoteText && (
                        <div
                          className="relative rounded-3xl p-8 overflow-hidden"
                          style={{ background: 'linear-gradient(135deg, #2563eb 0%, #16a34a 100%)' }}
                        >
                          <span
                            className="absolute top-2 right-6 text-white/15 font-serif select-none pointer-events-none"
                            style={{ fontSize: '9rem', lineHeight: 1 }}
                          >❝</span>
                          <p className="text-white text-xl md:text-2xl font-semibold italic leading-relaxed relative z-10">
                            "{activeFounder.quoteText}"
                          </p>
                          <p className="text-white/70 text-sm mt-4 relative z-10">— {activeFounder.name}</p>
                        </div>
                      )}

                      {/* The Story */}
                      {activeFounder.theStory && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-zeven-surface">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-zeven-blue flex items-center justify-center flex-shrink-0">
                              <Heart size={16} className="text-white" />
                            </div>
                            <h4 className="font-bold text-lg text-zeven-dark">The Story</h4>
                          </div>
                          <p className="text-zeven-gray text-sm leading-relaxed">{activeFounder.theStory}</p>
                        </div>
                      )}

                      {/* The Journey */}
                      {activeFounder.theJourney && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-zeven-blue border border-zeven-surface">
                          <h4 className="font-bold text-lg text-zeven-dark mb-3">The Journey</h4>
                          <p className="text-zeven-gray text-sm leading-relaxed">{activeFounder.theJourney}</p>
                        </div>
                      )}

                      {/* The Vision */}
                      {activeFounder.theVision && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-zeven-blue border border-zeven-surface">
                          <h4 className="font-bold text-lg text-zeven-dark mb-3">The Vision</h4>
                          <p className="text-zeven-gray text-sm leading-relaxed">{activeFounder.theVision}</p>
                        </div>
                      )}

                      {/* Notable Achievements */}
                      {activeFounder.notableAchievements && activeFounder.notableAchievements.length > 0 && (
                        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                          <div className="flex items-center gap-3 mb-4">
                            <Award size={20} className="text-zeven-blue flex-shrink-0" />
                            <h4 className="font-bold text-lg text-zeven-dark">Notable Achievements</h4>
                          </div>
                          <ul className="space-y-2.5">
                            {activeFounder.notableAchievements.map((item: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-3">
                                <CheckCircle2 size={16} className="text-zeven-blue mt-0.5 flex-shrink-0" />
                                <span className="text-zeven-blue text-sm font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Beyond Work */}
                      {activeFounder.beyondWork && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-zeven-blue border border-zeven-surface">
                          <h4 className="font-bold text-lg text-zeven-dark mb-3">Beyond Work</h4>
                          <p className="text-zeven-gray text-sm leading-relaxed">{activeFounder.beyondWork}</p>
                        </div>
                      )}

                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>
            </div>
          );
        })()}

        {/* Team Section — from Sanity teamMembers */}
        {teamMembers && teamMembers.length > 0 && (
          <div className="text-center pb-20">
            <h2 className="font-bold text-4xl md:text-5xl mb-6 text-zeven-dark">{aboutPageData?.teamHeading?.heading || "Meet the Minds"}</h2>
            <p className="text-zeven-gray text-xl max-w-2xl mx-auto mb-16 font-light">
              {aboutPageData?.teamHeading?.description || "Our team is a fusion of strategists, designers, technologists, marketers, and storytellers."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member: any, i: number) => (
                <motion.div
                  key={member._id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  {/* Card Image with Slide-Up Bio */}
                  <div className="aspect-[3/4] rounded-[2rem] overflow-hidden relative mb-4 shadow-md border-4 border-white">
                    {/* Image — slides up on hover */}
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-6 filter grayscale group-hover:grayscale-0"
                    />

                    {/* Persistent dark gradient at the bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zeven-dark/90 via-zeven-dark/20 to-transparent" />

                    {/* Bio Panel — slides up from bottom on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                        <p className="text-white text-xs leading-relaxed  text-left">
                          {member.bio || 'A dedicated and passionate team member committed to delivering excellence.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-zeven-dark">{member.name}</h3>
                  <p className="text-sm text-zeven-blue font-semibold uppercase tracking-wider">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* --- TESTIMONIALS (Interactive) --- */}
        {!hasTestimonials && (
          <section className="py-24 bg-gradient-to-b from-white/0 to-zeven-surface/30 rounded-[3rem] -mx-6 px-6 relative mt-16">
            <div className="container mx-auto px-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="flex justify-center items-end mb-16 text-center">
                  <div>
                    <h2 className="text-4xl font-bold text-zeven-dark" dangerouslySetInnerHTML={{ __html: aboutPageData?.testimonialsHeading?.heading || `What Our <span class="text-zeven-blue">Clients Say</span>` }}></h2>
                    <p className="text-sm text-zeven-gray mt-2">{aboutPageData?.testimonialsHeading?.description || "Real feedback from real partners."}</p>
                  </div>
                </div>
              </motion.div>

              <div className="bg-white rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl border border-zeven-surface max-w-5xl mx-auto">
                <div className="grid md:grid-cols-12 gap-12 items-center relative z-10">
                  {/* Image */}
                  <div className="md:col-span-5 lg:col-span-4">
                    <AnimatePresence mode='wait'>
                      <motion.div
                        key={currentTestimonial}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.4 }}
                        className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500 bg-gray-100"
                      >
                        {testimonials[currentTestimonial].photoUrl ? (
                          <img src={testimonials[currentTestimonial].photoUrl} alt="Client" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                            <Users size={64} className="mb-4 opacity-50" />
                            <p className="font-medium">No Image</p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Text */}
                  <div className="md:col-span-7 lg:col-span-8">
                    <Quote size={48} className="text-zeven-blue/20 mb-6" />
                    <AnimatePresence mode='wait'>
                      <motion.div
                        key={currentTestimonial}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <p className="text-2xl md:text-3xl font-medium text-zeven-dark leading-relaxed mb-8">"{testimonials[currentTestimonial].quote}"</p>
                        <h4 className="text-zeven-blue font-bold text-2xl mb-1">{testimonials[currentTestimonial].author}</h4>
                        <p className="text-zeven-gray font-medium">{testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}</p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Thumbnails Control */}
                    <div className="flex flex-wrap items-center gap-4 mt-12 pt-12 border-t border-zeven-gray/10">
                      <button onClick={() => setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)} className="p-3 rounded-full border border-zeven-blue/20 hover:bg-zeven-blue hover:text-white text-zeven-blue transition-colors">
                        <ChevronLeft size={20} />
                      </button>
                      <div className="flex gap-3">
                        {testimonials.map((t: any, idx: number) => (
                          <button key={idx} onClick={() => setCurrentTestimonial(idx)} className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all bg-gray-100 flex items-center justify-center ${currentTestimonial === idx ? 'border-zeven-blue scale-110 ring-4 ring-zeven-blue/10' : 'border-transparent opacity-60 hover:opacity-100 grayscale hover:grayscale-0'}`}>
                            {t.photoUrl ? (
                              <img src={t.photoUrl} alt="thumb" className="w-full h-full object-cover" />
                            ) : (
                              <Users size={20} className="text-gray-400" />
                            )}
                          </button>
                        ))}
                      </div>
                      <button onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length)} className="p-3 rounded-full border border-zeven-blue/20 hover:bg-zeven-blue hover:text-white text-zeven-blue transition-colors">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Decor */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-zeven-blue/5 to-transparent rounded-full blur-3xl pointer-events-none" />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};