import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import reviewIcon from '../public/assets/review.png';
import researchIcon from '../public/assets/research.png';
import messageIcon from '../public/assets/message.png';
import talkIcon from '../public/assets/talk.png';
import styles from './ServiceSeo.module.css';

export const ThankYou: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const caseStudies = [
    {
      disciplineTag: "Technical SEO",
      mainMetric: "Page 1",
      results: [
        { value: "Page 1", label: "for 14 target keywords" },
        { value: "6 mo", label: "to first page rankings" },
        { value: "+218%", label: "organic traffic growth" }
      ],
      title: "From Invisible to Page One — Professional Services Firm",
      challenge: "Managing a few projects is straightforward. Managing 40+ at the same time is where things break.",
      tacticalActions: ["Technical Audit", "Crawl Fix", "Schema Markup", "Core Web Vitals", "Redirect Architecture"],
      quote: "They found problems our developer didn't know existed.",
      url: "case-studies"
    },
    {
      disciplineTag: "Technical SEO",
      mainMetric: "#1",
      results: [
        { value: "Page 1", label: "for 14 target keywords" },
        { value: "6 mo", label: "to first page rankings" },
        { value: "+218%", label: "organic traffic growth" }
      ],
      title: "From Invisible to Page One — Professional Services Firm",
      challenge: "Managing a few projects is straightforward. Managing 40+ at the same time is where things break.",
      tacticalActions: ["Technical Audit", "Crawl Fix", "Schema Markup", "Core Web Vitals", "Redirect Architecture"],
      quote: "They found problems our developer didn't know existed.",
      url: "case-studies"
    },
    {
      disciplineTag: "Technical SEO",
      mainMetric: "Top 3",
      results: [
        { value: "Page 1", label: "for 14 target keywords" },
        { value: "6 mo", label: "to first page rankings" },
        { value: "+218%", label: "organic traffic growth" }
      ],
      title: "From Invisible to Page One — Professional Services Firm",
      challenge: "Managing a few projects is straightforward. Managing 40+ at the same time is where things break.",
      tacticalActions: ["Technical Audit", "Crawl Fix", "Schema Markup", "Core Web Vitals", "Redirect Architecture"],
      quote: "They found problems our developer didn't know existed.",
      url: "case-studies"
    },
    {
      disciplineTag: "Technical SEO",
      mainMetric: "189%",
      results: [
        { value: "Page 1", label: "for 14 target keywords" },
        { value: "6 mo", label: "to first page rankings" },
        { value: "+218%", label: "organic traffic growth" }
      ],
      title: "From Invisible to Page One — Professional Services Firm",
      challenge: "Managing a few projects is straightforward. Managing 40+ at the same time is where things break.",
      tacticalActions: ["Technical Audit", "Crawl Fix", "Schema Markup", "Core Web Vitals", "Redirect Architecture"],
      quote: "They found problems our developer didn't know existed.",
      url: "case-studies"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Helmet>
        <title>Thank You | Your Website Audit Request Has Been Received</title>
        <meta name="description" content="Thank you for requesting your free website audit. Our team will review your website and contact you with the next steps shortly."
  />
      </Helmet>

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-br from-[#1E50FF] to-[#00C2FF] text-white">
        {/* Concentric Circles Background (Simulated) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[800px] h-[800px] rounded-full border-[1px] border-white/30"></div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[1200px] h-[1200px] rounded-full border-[1px] border-white/20"></div>
          <div className="absolute top-1/2 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full border-[1px] border-white/30"></div>
          <div className="absolute top-1/2 right-0 -translate-y-1/4 translate-x-1/4 w-[1000px] h-[1000px] rounded-full border-[1px] border-white/20"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            {/* Checkmark Circle */}
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            {/* Pill */}
            <div className="inline-flex items-center gap-2 bg-white/10 px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-sm border border-white/20">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              MESSAGE RECEIVED
            </div>

            {/* Main Typography */}
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight">
              Got It. We're On Your Request.<br />
            </h1>
            <p className="text-lg md:text-xl text-blue-50 font-medium mb-12 max-w-2xl mx-auto opacity-90">
             Your details have been logged. Expect a response within 1 business day, usually sooner.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate(-1)} 
                className="w-full sm:w-auto bg-white text-blue-600 px-8 py-3.5 rounded-full font-bold text-sm hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                Return to Previous Page
              </button>
              <Link 
                to="/" 
                className="w-full sm:w-auto bg-transparent border-2 border-white/40 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-white/10 transition-all flex items-center justify-center"
              >
                Go to Homepage
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. What to Expect Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4">WHAT HAPPENS NEXT</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight">
             Here's How We Get You There
            </h3>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative mb-16">
              {/* Vertical Line */}
              <div className="absolute left-[39px] sm:left-[47px] top-[24px] bottom-[70px] w-[2px] bg-blue-100"></div>

              <div className="space-y-8 relative">
              {/* Step 1 */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-start gap-6 sm:gap-10">
                <div className="relative z-10 bg-blue-500 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30 border-4 border-white">
                  <img src={reviewIcon} alt="Review" className="" />
                </div>
                <div className="flex-1 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm pt-7">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                    <h4 className="text-xl sm:text-2xl font-extrabold text-gray-900">Your Request Lands on the Right Desk</h4>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full whitespace-nowrap">Within the hour</span>
                  </div>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  A specialist in what you've asked about picks this up and confirms exactly what you need.               
                  </p>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex items-start gap-6 sm:gap-10">
                <div className="relative z-10 bg-blue-500 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30 border-4 border-white">
                  <img src={researchIcon} alt="Research" className="" />
                </div>
                <div className="flex-1 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm pt-7">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                    <h4 className="text-xl sm:text-2xl font-extrabold text-gray-900">We Do Our Research </h4>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full whitespace-nowrap">Same day</span>
                  </div>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                    A look at your business, your goals, and what you're working with, so we're not starting from zero.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex items-start gap-6 sm:gap-10">
                <div className="relative z-10 bg-blue-500 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30 border-4 border-white">
                  <img src={messageIcon} alt="Message" className="" />
                </div>
                <div className="flex-1 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm pt-7">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                    <h4 className="text-xl sm:text-2xl font-extrabold text-gray-900">A Few Early Observations </h4>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full whitespace-nowrap">Within 1 business day</span>
                  </div>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                    Not a template. A specific plan based on your goals, your site, and your current search position — with realistic next steps.
                  </p>
                </div>
              </motion.div>
               {/* Step 4 */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex items-start gap-6 sm:gap-10">
                <div className="relative z-10 bg-blue-500 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30 border-4 border-white">
                  <img src={messageIcon} alt="Message" className="" />
                </div>
                <div className="flex-1 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm pt-7">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                    <h4 className="text-xl sm:text-2xl font-extrabold text-gray-900">A Conversation, Not a Pitch</h4>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full whitespace-nowrap">Scheduled with you</span>
                  </div>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                    We ask about your goals, your pain points, and the context only you have.
                  </p>
                </div>
              </motion.div>
               {/* Step 5 */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex items-start gap-6 sm:gap-10">
                <div className="relative z-10 bg-blue-500 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30 border-4 border-white">
                  <img src={messageIcon} alt="Message" className="" />
                </div>
                <div className="flex-1 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm pt-7">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                    <h4 className="text-xl sm:text-2xl font-extrabold text-gray-900">A Plan Built Around What You Told Us</h4>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full whitespace-nowrap">After the call</span>
                  </div>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                    Tailored to what you actually need, based on the call.
                  </p>
                </div>
              </motion.div>
                 {/* Step 6 */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex items-start gap-6 sm:gap-10">
                <div className="relative z-10 bg-blue-500 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30 border-4 border-white">
                  <img src={messageIcon} alt="Message" className="" />
                </div>
                <div className="flex-1 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm pt-7">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                    <h4 className="text-xl sm:text-2xl font-extrabold text-gray-900">Everything Gets Locked In</h4>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full whitespace-nowrap">On approval</span>
                  </div>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                   Once you're happy with the plan, we formalise it in a Statement of Work. 
                  </p>
                </div>
              </motion.div>
               {/* Step 7 */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex items-start gap-6 sm:gap-10">
                <div className="relative z-10 bg-blue-500 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30 border-4 border-white">
                  <img src={messageIcon} alt="Message" className="" />
                </div>
                <div className="flex-1 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm pt-7">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                    <h4 className="text-xl sm:text-2xl font-extrabold text-gray-900">The Work Begins</h4>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full whitespace-nowrap">Project kickoff</span>
                  </div>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                    KPIs agreed, the plan finalised, and the project starts.
                  </p>
                </div>
              </motion.div>
              </div>
            </div>

            {/* Talk Now CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="bg-[#2B60E6] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl shadow-blue-900/10">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-inner">
                <img src={talkIcon} alt="Talk" className="" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-white text-xl font-bold mb-1">Prefer to Talk Now?</h4>
                <p className="text-blue-100 text-sm">Book a free 30-minute call — we'll come prepared so every minute is useful.</p>
              </div>
              <div className="shrink-0">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#2B60E6] px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-md">
                  Book a Call <span>&rarr;</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Case Studies Section */}
      <section className="py-24 bg-[#FAFAFA] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-16">
            <h2 className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4">WHILE YOU WAIT</h2>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h3 className="text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight max-w-2xl">
                See What We've Built <br className="hidden md:block" />for Clients Like You.
              </h3>
              <p className="text-gray-500 max-w-sm text-sm sm:text-base leading-relaxed">
                Four disciplines. Four different challenges. One consistent outcome — measurable growth tied to organic search.
              </p>
            </div>
          </div>

          <div className={`${styles['cs-rich-grid']} mb-16 ${styles.seoPageWrapper}`}>
            {caseStudies.map((cs, idx) => {
              const colorClasses = [styles.tech, styles.tech, styles.local, styles.content];
              const colorClass = colorClasses[idx % colorClasses.length];
              const MotionLink = motion(Link);
              
              return (
                <MotionLink
                  key={idx}
                  to='/success-stories'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className={`${styles['cs-rich-card']} ${colorClass}`}
                  aria-label="Read case study"
                >
                  <div className={styles['cs-header']}>
                    <div className={styles['cs-header-top']}>
                      <span className={`${styles['cs-tag-pill']} ${colorClass}`}>{cs.disciplineTag}</span>
                    </div>
                    <div className={styles['cs-header-main']}>
                      <div className={styles['cs-client']}>
                        {/* Simulated Helium SEO Logo */}
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded flex items-center justify-center transform rotate-12 ${colorClass === styles.local ? 'bg-green-500' : colorClass === styles.content ? 'bg-purple-600' : 'bg-blue-500'}`}>
                            <span className="text-white font-extrabold -rotate-12 text-lg">H</span>
                          </div>
                          <span className="font-extrabold text-xl text-gray-900 tracking-tight">Helium <span className="font-medium text-gray-500">SEO™</span></span>
                        </div>
                      </div>
                      <div className={`${styles['cs-main-metric']} ${colorClass}`}>
                        {cs.mainMetric}
                      </div>
                    </div>
                  </div>

                  <div className={styles['cs-rich-results']} role="list" aria-label="Results">
                    {cs.results?.map((res, ri) => (
                      <div key={ri} className={styles['cs-rich-result']} role="listitem">
                        <div className={`${styles['cs-rich-result-val']} ${colorClass}`}>{res.value}</div>
                        <div className={styles['cs-rich-result-lbl']}>{res.label}</div>
                      </div>
                    ))}
                  </div>

                  <h3 className={styles['cs-rich-title']}>{cs.title}</h3>

                  <div className={styles['cs-rich-challenge']}>
                    <div className={styles['cs-rich-challenge-lbl']}>The Challenge</div>
                    <p>{cs.challenge}</p>
                  </div>

                  <div className={styles['cs-work-tags-wrap']}>
                    <div className={styles['cs-work-tags-lbl']}>Tactical Actions Deployed:</div>
                    <div className={styles['cs-work-tags']} role="list" aria-label="Work done on this project">
                      {cs.tacticalActions?.slice(0, 5).map((act, ai) => (
                        <span key={ai} className={`${styles['cs-work-tag']} ${colorClass}`} role="listitem">{act}</span>
                      ))}
                      {cs.tacticalActions?.length > 5 && (
                        <span className={`${styles['cs-work-tag']} ${styles['plus-badge']} ${colorClass}`} role="listitem">+{cs.tacticalActions.length - 5}</span>
                      )}
                    </div>
                  </div>

                  <div className={styles['cs-rich-cta']}>
                    <p className={styles['cs-rich-quote']}>"{cs.quote}"</p>
                    <span className={`${styles['cs-rich-link']} ${colorClass}`}>                
                        Read Full Story 
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </div>
                </MotionLink>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-200 pt-8 mt-16">
            <p className="text-gray-500 font-medium">Curious how we'd approach your specific challenge?</p>
            <div className="flex items-center gap-4">
              <Link to="/success-stories" className="px-6 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-bold text-sm hover:border-gray-300 transition-colors">
                All Case Studies &rarr;
              </Link>
              <Link to="/contact" className="px-6 py-3 rounded-full bg-[#1E50FF] text-white font-bold text-sm hover:bg-blue-700 transition-colors">
                Start a Project &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
