import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import reviewIcon from '../public/assets/review.png';
import researchIcon from '../public/assets/research.png';
import messageIcon from '../public/assets/message.png';
import talkIcon from '../public/assets/talk.png';

export const ThankYou: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const caseStudies = [
    { metric: 'Page 1', colorClass: 'text-blue-500', badgeClass: 'bg-blue-50 text-blue-500 border-blue-100', metricColor: 'text-blue-500' },
    { metric: '#1', colorClass: 'text-blue-500', badgeClass: 'bg-blue-50 text-blue-500 border-blue-100', metricColor: 'text-blue-500' },
    { metric: 'Top 3', colorClass: 'text-green-500', badgeClass: 'bg-blue-50 text-blue-500 border-blue-100', metricColor: 'text-green-500' },
    { metric: '189%', colorClass: 'text-purple-600', badgeClass: 'bg-blue-50 text-blue-500 border-blue-100', metricColor: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Helmet>
        <title>Thank You | Zevenstone</title>
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
              Thank You — <br />We'll Be in Touch.
            </h1>
            <p className="text-lg md:text-xl text-blue-50 font-medium mb-12 max-w-2xl mx-auto opacity-90">
              Your brief has landed with our team. Expect a reply within 1<br className="hidden sm:block" /> business day — usually sooner.
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
              Here's Exactly What to Expect
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
                    <h4 className="text-xl sm:text-2xl font-extrabold text-gray-900">We Review Your Brief</h4>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full whitespace-nowrap">Within the hour</span>
                  </div>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                    Our team reads every submission personally — no auto-responders, no AI summaries. We understand your goals before we reply.
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
                    <h4 className="text-xl sm:text-2xl font-extrabold text-gray-900">We Research Your Site</h4>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full whitespace-nowrap">Same day</span>
                  </div>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                    We run a quick diagnostic across technical health, content gaps, and authority signals before we get on a call — so every minute is useful.
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
                    <h4 className="text-xl sm:text-2xl font-extrabold text-gray-900">You Get a Tailored Response</h4>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full whitespace-nowrap">Within 1 business day</span>
                  </div>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                    Not a template. A specific plan based on your goals, your site, and your current search position — with realistic next steps.
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
                <p className="text-blue-100 text-sm">Book a free 30-minute strategy call — we'll audit your site live before the call so every minute counts.</p>
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
            <h2 className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4">DO YOU WANT TO KNOW MORE?</h2>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h3 className="text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight max-w-2xl">
                See What We've Built <br className="hidden md:block" />for Clients Like You.
              </h3>
              <p className="text-gray-500 max-w-sm text-sm sm:text-base leading-relaxed">
                Four disciplines. Four different challenges. One consistent outcome — measurable growth tied to organic search.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {caseStudies.map((cs, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
                {/* Header Row */}
                <div className="flex justify-between items-start mb-8">
                  <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-3 py-1.5 rounded-full w-fit uppercase tracking-wider">Technical SEO</span>
                    {/* Simulated Helium SEO Logo */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center transform rotate-12">
                        <span className="text-white font-extrabold -rotate-12 text-lg">H</span>
                      </div>
                      <span className="font-extrabold text-xl text-gray-900 tracking-tight">Helium <span className="font-medium text-gray-500">SEO™</span></span>
                    </div>
                  </div>
                  <div className={`text-4xl sm:text-5xl font-black ${cs.metricColor} tracking-tighter`}>
                    {cs.metric}
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  <div className="bg-gray-50 rounded-2xl p-4 text-center">
                    <div className={`text-xl font-black mb-1 ${cs.metricColor}`}>Page 1</div>
                    <div className="text-[10px] text-gray-500 font-medium leading-tight">for 14 target<br/>keywords</div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 text-center">
                    <div className={`text-xl font-black mb-1 ${cs.metricColor}`}>6 mo</div>
                    <div className="text-[10px] text-gray-500 font-medium leading-tight">to first page<br/>rankings</div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 text-center">
                    <div className={`text-xl font-black mb-1 ${cs.metricColor}`}>+218%</div>
                    <div className="text-[10px] text-gray-500 font-medium leading-tight">organic traffic<br/>growth</div>
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-xl font-bold text-gray-900 mb-6 leading-snug">
                  From Invisible to Page One — Professional Services Firm
                </h4>

                {/* Challenge */}
                <div className="mb-6 bg-gray-50/50 rounded-2xl p-6">
                  <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">THE CHALLENGE</h5>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    Managing a few projects is straightforward. Managing 40+ at the same time is where things break.
                  </p>
                </div>

                {/* Tactical Actions */}
                <div className="mb-8 flex-1">
                  <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">TACTICAL ACTIONS DEPLOYED:</h5>
                  <div className="flex flex-wrap gap-2">
                    {['Technical Audit', 'Crawl Fix', 'Schema Markup', 'Core Web Vitals', 'Redirect Architecture'].map((tag, i) => (
                      <span key={i} className="text-[10px] font-bold text-blue-500 border border-blue-200 bg-white px-2.5 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                    <span className="text-[10px] font-bold text-white bg-blue-500 px-2.5 py-1 rounded-md">+1</span>
                  </div>
                </div>

                {/* Footer Quote & Link */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-6 border-t border-gray-100">
                  <p className="text-xs text-gray-400 italic max-w-[200px] leading-relaxed">
                    "They found problems our developer didn't know existed."
                  </p>
                  <Link to="/" className="text-sm font-bold text-blue-500 hover:text-blue-700 flex items-center gap-1 transition-colors whitespace-nowrap">
                    Read Full Story <span>&rarr;</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-200 pt-8 mt-16">
            <p className="text-gray-500 font-medium">Curious how we'd approach your specific challenge?</p>
            <div className="flex items-center gap-4">
              <Link to="/case-studies" className="px-6 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-bold text-sm hover:border-gray-300 transition-colors">
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
