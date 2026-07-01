import { ArrowRight, CheckCircle, TrendingUp, Zap, Users, Target, Clock, Shield, Award, Star, DollarSign, BarChart3, Rocket, X, Download, Mail, Building2, User, Calendar } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import imgLinkLogo from "figma:asset/landingpageLogo.png";
import imgWhiteLogo from "figma:asset/Logo-White.webp";
import { sanityClient } from '../../../../lib/sanity';
import { HOME_PAGE_QUERY } from '../../../../lib/queries';


export default function LandingPage() {
  const { data: homePage } = useQuery({ queryKey: ['homePage'], queryFn: () => sanityClient.fetch(HOME_PAGE_QUERY) });
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [showFloatingForm, setShowFloatingForm] = useState(false);
  const [showLeadMagnet, setShowLeadMagnet] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [leadMagnetSubmitted, setLeadMagnetSubmitted] = useState(false);
  const emptyForm = { title: '', firstName: '', lastName: '', email: '', phone: '', agencyName: '', challenge: '' };

  // Separate state for each form — no cross-contamination
  const [ctaFormData, setCtaFormData] = useState({ ...emptyForm });
  const [floatingFormData, setFloatingFormData] = useState({ ...emptyForm });
  const [leadMagnetFormData, setLeadMagnetFormData] = useState({ ...emptyForm });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
      // Show floating form after 50% scroll
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setShowFloatingForm(scrollPercent > 25 && !formSubmitted);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [formSubmitted]);

  const scrollToCTA = () => {
    const section = document.getElementById('form-cta-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [submittingForm, setSubmittingForm] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<Record<string, 'idle' | 'success' | 'error'>>({});

  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideoPlay = (e: React.MouseEvent) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      if (isVideoHovered && rect.height - clickY < 60) {
        return;
      }
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent, formType: string = 'Strategy Call', sourceData?: typeof emptyForm) => {
    e.preventDefault();
    setSubmittingForm(formType);
    setFormStatus(prev => ({ ...prev, [formType]: 'idle' }));

    const submissionData = {
      ...(sourceData || ctaFormData),
      formType,
      submittedAt: new Date().toISOString(),
    };

    try {
      const API_URL = import.meta.env.VITE_CONTACT_API_URL || 'https://zevenstone-contact-api.zevenstone7.workers.dev';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        navigate('/solutions/thank-you');
      } else {
        setFormStatus(prev => ({ ...prev, [formType]: 'error' }));
      }
    } catch (err) {
      console.error('Submission error:', err);
      setFormStatus(prev => ({ ...prev, [formType]: 'error' }));
    } finally {
      setSubmittingForm(null);
    }
  };

  const handleLeadMagnetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingForm('Case Study');
    setFormStatus(prev => ({ ...prev, ['Case Study']: 'idle' }));

    const submissionData = {
      ...leadMagnetFormData,
      formType: 'Case Study',
      submittedAt: new Date().toISOString(),
    };

    try {
      const API_URL = import.meta.env.VITE_CONTACT_API_URL || 'https://zevenstone-contact-api.zevenstone7.workers.dev';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        navigate('/solutions/thank-you');
      } else {
        setFormStatus(prev => ({ ...prev, ['Case Study']: 'error' }));
      }
    } catch (err) {
      console.error('Lead Magnet error:', err);
      setFormStatus(prev => ({ ...prev, ['Case Study']: 'error' }));
    } finally {
      setSubmittingForm(null);
    }
  };

  const makeChangeHandler = (setter: React.Dispatch<React.SetStateAction<typeof emptyForm>>, data: typeof emptyForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setter({ ...data, [e.target.name]: e.target.value });

  const handleCtaChange = makeChangeHandler(setCtaFormData, ctaFormData);
  const handleFloatingChange = makeChangeHandler(setFloatingFormData, floatingFormData);
  const handleLeadMagnetChange = makeChangeHandler(setLeadMagnetFormData, leadMagnetFormData);

  return (
    <div className="min-h-screen bg-white font-['Poppins',sans-serif]">
      <Helmet>
        <title>Agency Delivery Partner for Marketing Agencies | Zevenstone</title>
        <meta name="description" content="Scale your agency without increasing overhead. White-label digital marketing, automation, creative, and technology delivery under your brand. Trusted by growing agencies across USA." />
      </Helmet>

      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-md' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <img src={imgLinkLogo} alt="Zevenstone" className="h-6 sm:h-8" />
            <button
              onClick={scrollToCTA}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <a href="#form-cta-section">Book Free Call</a>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-12 sm:pb-20 lg:pb-32 px-4 sm:px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-purple-500/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#2c2e33] mb-4 sm:mb-6 leading-[1.1] tracking-tight">
              Your Agency Deserves a Delivery Partner That{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Actually Delivers
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-10 leading-relaxed px-2">
              Zevenstone is the white-label growth system behind America's fastest-scaling agencies —
              powering digital marketing, automation, and creative production{' '}
              <span className="font-bold text-[#2c2e33]">under your brand, invisibly.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 px-4">
              <button
                onClick={scrollToCTA}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                <a href="#form-cta-section">Book Your Strategy Call</a>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <a
                href="#how-it-works"
                className="border-2 border-gray-300 text-gray-700 px-6 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-50 transition-all inline-flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                See How It Works
              </a>
            </div>

            {/* Trust Line */}
            <p className="text-sm text-gray-500 italic">
              No commitment. No pitch. Just a real conversation about your agency's growth.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-[#2c2e33] text-white py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-400 mb-1">1M+</div>
              <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">Monthly Revenue Per Partner</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-400 mb-1">1,000+</div>
              <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">Projects Delivered</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-400 mb-1">98.9%</div>
              <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">Client Satisfaction</div>
            </div>
            <div className="sm:hidden lg:block">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-400 mb-1">$50M+</div>
              <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">Client Revenue Generated</div>
            </div>
            <div className="sm:hidden lg:block">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-400 mb-1">25+</div>
              <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">Agency Endorsements</div>
            </div>
            {/* Hidden items on mobile sm grid to keep 3 columns balanced */}
            <div className="hidden sm:block lg:hidden">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-400 mb-1">$100M+</div>
              <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">Revenue Generated</div>
            </div>
            <div className="hidden sm:block lg:hidden">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-400 mb-1">100+</div>
              <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">Endorsements</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- VIDEO SECTION --- */}
      {homePage?.showcaseVideoUrl && (
        <section className="py-12 sm:py-16 md:py-24 lg:py-0 lg:pt-32 lg:pb-24 bg-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

          <div className="container max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            <div
              className="mx-auto rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative aspect-video bg-black/50 group cursor-pointer border border-gray-200/20"
              onClick={toggleVideoPlay}
              onMouseEnter={() => setIsVideoHovered(true)}
              onMouseLeave={() => setIsVideoHovered(false)}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted
                autoPlay
                loop
                playsInline
                controls={isVideoHovered}
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              >
                <source src={homePage.showcaseVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Custom Play Button Overlay */}
              <div className={`hidden absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500 bg-black/20 group-hover:bg-black/40 ${isVideoPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                <div className="w-16 h-16 md:w-24 md:h-24 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.15)] transform group-hover:scale-110 transition-transform duration-500">
                  {isVideoPlaying ? (
                    <div className="flex gap-2">
                      <div className="w-1.5 md:w-2 h-6 md:h-8 bg-[#2c2e33] rounded-full"></div>
                      <div className="w-1.5 md:w-2 h-6 md:h-8 bg-[#2c2e33] rounded-full"></div>
                    </div>
                  ) : (
                    <svg className="w-8 h-8 md:w-12 md:h-12 text-[#2c2e33] ml-1 md:ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Problem Section */}
      <section className="py-12 sm:py-20 lg:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-block bg-red-100 text-red-600 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
              The Problem
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2c2e33] mb-4 sm:mb-6">
              Is Your Agency Leaving Revenue on the Table?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              You have the clients. You have the relationships. But somewhere between the brief and the delivery — things break down.
            </p>
          </div>

          {/* Pain Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12">
            {[
              "You're turning away clients because your team is at capacity",
              "You're juggling multiple subcontractors with inconsistent quality",
              "You're losing time managing delivery instead of growing your agency",
              "You're missing revenue because you can't offer every service your clients need",
              "You're paying full-time salaries for skills you only need part of the time"
            ].map((point, idx) => (
              <div
                key={idx}
                className="bg-red-50 border-l-4 border-red-500 p-4 sm:p-6 rounded-r-2xl hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-red-500 text-white rounded-full p-1.5 sm:p-2 shrink-0 mt-0.5">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed font-medium">{point}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Urgency Message */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center shadow-lg">
            <p className="text-lg sm:text-xl md:text-2xl font-bold leading-relaxed">
              Every month this continues is revenue your agency will never get back.
            </p>
          </div>

          {/* Lead Magnet CTA */}
          <div className="mt-10 sm:mt-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-white text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-all duration-700" />
            <Download className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 sm:mb-6" />
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Download: The Growth System Case Study</h3>
            <p className="text-base sm:text-lg text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              One partner. Every scope. See exactly how we built the brand, systems, and infrastructure that took one business from early-stage to fully scalable.
            </p>
            <button
              onClick={() => setShowLeadMagnet(true)}
              className="bg-white text-blue-600 px-6 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg shadow-xl hover:scale-105 transition-all inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Get Free Case Study
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-12 sm:py-20 lg:py-32 px-4 sm:px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
              The Solution
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2c2e33] mb-4 sm:mb-6">
              One System. Every Scope. Zero Overhead.
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Zevenstone operates as your invisible delivery engine — handling everything your clients need,{' '}
              <span className="font-bold text-[#2c2e33]">under your brand</span>, at the quality and consistency your reputation demands.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-12">
            {/* Digital Marketing */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#2c2e33] mb-4">Digital Marketing</h3>
              <ul className="space-y-2.5 text-sm sm:text-base text-gray-600 flex-grow">
                {[
                  "Search Engine Optimisation",
                  "Paid Search · Google Ads",
                  "Social Media Advertising",
                  "Lead Generation",
                  "CRO Audit"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Marketing Automation */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-200">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#2c2e33] mb-4">Marketing Automation</h3>
              <ul className="space-y-2.5 text-sm sm:text-base text-gray-600 flex-grow">
                {[
                  "CRM Setup and Management",
                  "Lead Management System",
                  "Sales Pipeline Management",
                  "Email and Lifecycle Sequences",
                  "AI Solutions"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-purple-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Creative Production */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col sm:col-span-2 lg:col-span-1">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#2c2e33] mb-4">Creative Services</h3>
              <ul className="space-y-2.5 text-sm sm:text-base text-gray-600 flex-grow">
                {[
                  "Brand Strategy",
                  "Graphic Design · Motion Graphics",
                  "Video Editing",
                  "UI/UX Design",
                  "Web & Digital Experience"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Tech Solutions */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col sm:col-span-2 lg:col-span-1">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#2c2e33] mb-4">Tech Solutions</h3>
              <ul className="space-y-2.5 text-sm sm:text-base text-gray-600 flex-grow">
                {[
                  "Custom Web Development",
                  "E-Commerce Solutions",
                  "Web App Development",
                  "Customer Journey Design",
                  "App Development"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Key Message */}
          <div className="text-center px-4 bg-[#2c2e33] text-white py-12 rounded-md">
            <p className="text-lg sm:text-2xl font-bold text-white leading-relaxed">
              One partner. Every scope. Delivered under your brand.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block bg-green-100 text-green-700 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
              How It Works
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2c2e33] mb-4 sm:mb-6">
              Simple to Start. Built to Scale.
            </h2>
          </div>

          {/* Steps */}
          <div className="space-y-6 sm:space-y-8">
            {[
              {
                step: '01',
                title: 'Discovery Call',
                description: 'We understand your agency, your clients, and your gaps. No generic proposals. No assumptions.',
                icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />
              },
              {
                step: '02',
                title: 'Seamless Onboarding',
                description: 'Contract signed. Brand guidelines absorbed. Tools connected. Ready to deliver in days — not months.',
                icon: <Rocket className="w-6 h-6 sm:w-8 sm:h-8" />
              },
              {
                step: '03',
                title: 'System Design',
                description: 'We build a delivery framework tailored to exactly how your agency operates.',
                icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />
              },
              {
                step: '04',
                title: 'White-Label Delivery',
                description: 'We execute under your brand. Your clients never know we exist. You take the credit.',
                icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />
              },
              {
                step: '05',
                title: 'Scale Together',
                description: 'As your agency grows, our system grows with you. More clients. More revenue. Zero added overhead.',
                icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all group"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl sm:rounded-2xl w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-blue-200">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] sm:text-xs font-bold text-blue-500 mb-1 sm:mb-2 uppercase tracking-widest">STEP {item.step}</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#2c2e33] mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Numbers */}
      <section className="py-12 sm:py-20 lg:py-32 px-4 sm:px-6 bg-gradient-to-br from-green-600 to-green-700 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Built for Agencies That Think in Millions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {[
              { value: '$1.6M+', label: 'Monthly revenue generated for a single agency partner through the Zevenstone delivery system' },
              { value: '1,200+', label: 'Projects delivered across digital marketing, automation, and creative — without a single missed deadline' },
              { value: '98.9%', label: 'Client satisfaction maintained across every engagement, every partner, every project' },
              { value: '$357M+', label: 'In measurable revenue generated for the end clients of our agency partners' },
              { value: '100+', label: 'Endorsements from agency leaders, founders, and business partners across North America and beyond' }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-4xl sm:text-5xl font-extrabold mb-3 sm:mb-4">{stat.value}</div>
                <p className="text-sm sm:text-base text-green-50 leading-relaxed font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiation */}
      <section className="py-12 sm:py-20 lg:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2c2e33] mb-4 sm:mb-6">
              We Are Not a Vendor. We Are Your Growth Partner.
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
              Most white-label providers take briefs and return deliverables.
            </p>
            <p className="text-xl sm:text-2xl font-bold text-blue-600 uppercase tracking-wide">
              Zevenstone installs a system.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-12 mb-10 sm:mb-12 shadow-inner border border-blue-100/50">
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-center font-medium">
              We work from the root — understanding your clients' businesses, building strategies that drive real outcomes,
              and delivering with a consistency that makes your agency look like the most capable team in the room.
            </p>
          </div>

          {/* Key Differentiators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />, text: 'Solution givers — not task doers' },
              { icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />, text: 'Growth partners — not outsourcing vendors' },
              { icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />, text: 'Brand-invisible — your clients, your credit' },
              { icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />, text: 'Scope-complete — marketing, automation, creative unified' },
              { icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />, text: 'US onsite team backed by global execution' },
              { icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" />, text: 'System-driven — built for quality & scale' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-md border border-gray-100 hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 text-blue-600 rounded-lg sm:rounded-xl p-2.5 sm:p-3 shrink-0">
                    {item.icon}
                  </div>
                  <p className="font-bold text-sm sm:text-base text-gray-700 leading-tight">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="py-12 sm:py-20 lg:py-32 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2c2e33] mb-4 sm:mb-6">
              An Engagement Model Built Around <br /> Your Agency
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                title: 'Project-Based',
                description: 'Pay per project. No long-term commitment. Perfect for overflow and one-time client needs.',
                icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />
              },
              {
                title: 'Monthly Retainer',
                description: 'Dedicated delivery capacity every month. Predictable output. Predictable growth.',
                icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8" />
              },
              {
                title: 'Time & Materials (T&M)',
                description: 'Flexible billing based on actual time and resources. Ideal for complex or evolving projects.',
                icon: <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8" />
              },
              {
                title: 'Growth Partnership',
                description: 'Deep strategic alignment where Zevenstone becomes an extension of your agency and shares in building long-term growth.',
                icon: <Rocket className="w-6 h-6 sm:w-8 sm:h-8" />
              }
            ].map((model, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-transparent hover:border-blue-500 hover:shadow-2xl transition-all group flex flex-col items-center sm:items-start text-center sm:text-left"
              >
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-100">
                  {model.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#2c2e33] mb-4">{model.title}</h3>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{model.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 text-center px-4">
            <p className="text-sm sm:text-base text-gray-600 font-bold uppercase tracking-widest opacity-60">
              All models include NDA protection & white-label delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-12 sm:py-20 lg:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
              Results
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2c2e33] mb-4 sm:mb-6">
              Agencies That Partner With Zevenstone <br /> Scale Faster
            </h2>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {[
              {
                title: 'From Overflow to $1M+ Monthly',
                description: 'A US digital agency was turning away clients at capacity. After integrating Zevenstone as their white-label backend — revenue scaled from $180K to $1.2M monthly within 14 months. Zero new hires.',
                metric: '+567%',
                label: 'Revenue Growth'
              },
              {
                title: 'Organic Traffic That Compounds',
                description: 'A B2B SaaS brand built an SEO and content system with Zevenstone. Within 12 months, organic became their number one acquisition channel — at a fraction of the cost of paid ads.',
                metric: '#1',
                label: 'Growth Engine'
              },
              {
                title: 'A Complete Brand in 90 Days',
                description: 'A professional firm got a full brand identity, website, SEO foundation, and CRM — live in 90 days. Page one Google rankings within 6 months of launch.',
                metric: '90 Days',
                label: 'To Full Launch'
              }
            ].map((story, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-blue-100 hover:shadow-xl transition-all duration-300 shadow-sm"
              >
                <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start text-center md:text-left">
                  <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-lg shrink-0 w-full sm:w-48">
                    <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 mb-1 sm:mb-2">{story.metric}</div>
                    <div className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-widest">{story.label}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#2c2e33] mb-3 sm:mb-4">{story.title}</h3>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{story.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-20 lg:py-32 px-4 sm:px-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              What Our Agency Partners Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                quote: "I needed more than a vendor. I needed a team I could trust — and I found that in Zevenstone. From SEO and automations to design and video, they delivered with consistency, creativity, and clarity. More than a service provider, they became a true growth partner.",
                author: 'Dr. Reggie Wright Jr',
                role: 'Founder, Reggie Wright Enterprise'
              },
              {
                quote: "What sets Zevenstone apart is that they actually understand the business behind the brief. They don't just execute — they think.",
                author: 'Jeb Rajan',
                role: 'Founder, Bezhominds'
              },
              // {
              //   quote: "The white-label delivery is flawless. Our clients have no idea they exist — and that's exactly what we needed.",
              //   author: 'Creative Director',
              //   role: 'Boutique Agency, United States'
              // },
              // {
              //   quote: 'Working with Zevenstone feels like having an entire agency on call — except they already know our standards and our brand.',
              //   author: 'Managing Director',
              //   role: 'Professional Services, Ohio'
              // }
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-10 hover:bg-white/20 transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex items-center gap-1.5 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-base sm:text-lg italic mb-6 leading-relaxed flex-grow">"{testimonial.quote}"</p>
                <div className="border-t border-white/20 pt-6">
                  <div className="font-bold text-base sm:text-lg">{testimonial.author}</div>
                  <div className="text-sm text-blue-200 uppercase tracking-widest font-semibold">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualifier Section */}
      <section className="py-12 sm:py-20 lg:py-32 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2c2e33] mb-4 sm:mb-6 leading-tight">
              Is Zevenstone Right for <br /> Your Agency?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              We're the perfect fit if you check 3 or more of these boxes:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12">
            {[
              "You're turning away clients because you're at capacity",
              "You want to offer more services without hiring full-time",
              "You need consistent quality across all deliverables",
              "Your current monthly revenue is $50K+",
              "You're ready to scale to $1M+ ARR within 12-18 months",
              "You value white-label delivery (your brand, your credit)"
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md border-2 border-transparent hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-blue-50 group-hover:bg-blue-500 text-blue-500 group-hover:text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all shrink-0">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 group-hover:text-[#2c2e33] font-bold transition-colors">{item}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
            <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 relative z-10">
              Checked 3 or more? <br /> Let's talk about your growth roadmap.
            </p>
            <button
              onClick={scrollToCTA}
              className="bg-white text-blue-600 px-6 sm:px-12 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-xl shadow-xl hover:scale-105 transition-all inline-flex items-center gap-3 relative z-10 w-full sm:w-auto justify-center"
            >
              <a href="#form-cta-section">Book Your Strategy Call</a>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-20 lg:py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2c2e33] mb-4 sm:mb-8 leading-tight">
            Built in Ohio. Powered Globally.
          </h2>
          <div className="space-y-6 text-gray-600">
            <p className="text-lg sm:text-xl leading-relaxed">
              Zevenstone is headquartered in <span className="font-bold text-[#2c2e33]">Ohio, USA</span> — with a world-class
              delivery team operating from India. This dual-model gives our agency partners the strategic oversight of a North American operation, backed by around-the-clock delivery.
            </p>
            <p className="text-xl sm:text-2xl font-bold text-blue-600 leading-tight">
              We cover every scope your clients will ever need — delivered entirely under your brand.
            </p>
          </div>
          <div className="mt-10 sm:mt-12">
            <p className="text-2xl sm:text-4xl font-extrabold text-[#2c2e33] italic tracking-tight uppercase opacity-90">
              Insight. Execution. Impact.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 sm:py-20 lg:py-32 px-4 sm:px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '50px 50px' }} />
        </div>

        <div id="form-cta-section" className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight px-2">
            Ready to Scale Your Agency Without Scaling Your Overhead?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 sm:mb-12 leading-relaxed opacity-90 px-4">
            Book a free 30-minute strategy call. We'll map exactly how our system can plug into your agency and start delivering from day one.
          </p>

          <div className="px-2 sm:px-0">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-12 mb-8 border border-white/20 shadow-2xl">
              <form onSubmit={(e) => handleFormSubmit(e, 'Strategy Call', ctaFormData)} className="space-y-5 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    <div className="text-left">
                      <label className="block text-xs sm:text-sm font-bold mb-2 text-blue-100 uppercase tracking-widest">
                        Title
                      </label>
                      <select
                        name="title"
                        value={ctaFormData.title}
                        onChange={handleCtaChange}
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-white text-gray-900 border-2 border-transparent focus:border-blue-300 focus:outline-none transition-all font-medium text-sm sm:text-base cursor-pointer appearance-none"
                      >
                        <option value="">Title</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Dr.">Dr.</option>
                      </select>
                    </div>
                    <div className="text-left">
                      <label className="block text-xs sm:text-sm font-bold mb-2 text-blue-100 uppercase tracking-widest">
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-2" />
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={ctaFormData.firstName}
                        onChange={handleCtaChange}
                        required
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 border-2 border-transparent focus:border-blue-300 focus:outline-none transition-all font-medium text-sm sm:text-base"
                        placeholder="John"
                      />
                    </div>
                    <div className="text-left">
                      <label className="block text-xs sm:text-sm font-bold mb-2 text-blue-100 uppercase tracking-widest">
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-2" />
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={ctaFormData.lastName}
                        onChange={handleCtaChange}
                        required
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 border-2 border-transparent focus:border-blue-300 focus:outline-none transition-all font-medium text-sm sm:text-base"
                        placeholder="Smith"
                      />
                    </div>
                    <div className="text-left">
                      <label className="block text-xs sm:text-sm font-bold mb-2 text-blue-100 uppercase tracking-widest">
                        <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-2" />
                        Work Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={ctaFormData.email}
                        onChange={handleCtaChange}
                        required
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 border-2 border-transparent focus:border-blue-300 focus:outline-none transition-all font-medium text-sm sm:text-base"
                        placeholder="john@agency.com"
                      />
                    </div>
                    <div className="text-left">
                      <label className="block text-xs sm:text-sm font-bold mb-2 text-blue-100 uppercase tracking-widest">
                        <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-2" />
                        Agency Name *
                      </label>
                      <input
                        type="text"
                        name="agencyName"
                        value={ctaFormData.agencyName}
                        onChange={handleCtaChange}
                        required
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 border-2 border-transparent focus:border-blue-300 focus:outline-none transition-all font-medium text-sm sm:text-base"
                        placeholder="Your Agency"
                      />
                    </div>
                    <div className="text-left">
                      <label className="block text-xs sm:text-sm font-bold mb-2 text-blue-100 uppercase tracking-widest">
                        <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-2" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={ctaFormData.phone}
                        onChange={handleCtaChange}
                        required
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 border-2 border-transparent focus:border-blue-300 focus:outline-none transition-all font-medium text-sm sm:text-base"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div className="text-left md:col-span-2">
                      <label className="block text-xs sm:text-sm font-bold mb-2 text-blue-100 uppercase tracking-widest">
                        Your biggest growth challenge?
                      </label>
                      <textarea
                        name="challenge"
                        value={ctaFormData.challenge}
                        onChange={handleCtaChange}
                        rows={3}
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 border-2 border-transparent focus:border-blue-300 focus:outline-none transition-all font-medium resize-none text-sm sm:text-base"
                        placeholder="e.g., Turning away clients due to capacity..."
                      />
                    </div>
                  </div>

                  {formStatus['Strategy Call'] === 'error' && (
                    <div className="mb-4 p-4 bg-white/20 text-white rounded-xl border border-white/30 text-sm font-medium animate-shake">
                      Oops! Something went wrong. Please try again.
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={submittingForm === 'Strategy Call'}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-extrabold text-lg sm:text-xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] active:scale-95 transition-all inline-flex items-center justify-center gap-4 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span>{submittingForm === 'Strategy Call' ? 'Sending...' : 'Book Your Free Strategy Call'}</span>
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 group-hover:rotate-12 transition-transform" />
                  </button>
                </form>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-10 text-xs sm:text-sm font-bold uppercase tracking-widest opacity-80">
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              <span>30-minutes free call</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              <span>No pressure, no pitch</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              <span>Custom growth roadmap</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2c2e33] text-white py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <div className="p-2 rounded-lg">
              <img src={imgWhiteLogo} alt="Zevenstone" className="h-16 sm:h-20" />
            </div>
            <span className="hidden font-extrabold text-xl tracking-tight">ZEVENSTONE</span>
          </div>
          <p className="text-gray-400 mb-4 font-medium text-sm sm:text-base">Ohio, USA · info@zevenstone.com</p>
          <div className="w-12 h-1 bg-blue-500 mx-auto mb-6 rounded-full opacity-50" />
          <p className="text-gray-500 text-xs sm:text-sm tracking-wide uppercase font-bold opacity-40">© 2026 Zevenstone. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Sticky Form - Hidden on mobile, shown on tablet+ */}
      {showFloatingForm && (
        <div className="hidden md:block fixed bottom-10 right-8 z-50 max-w-sm w-full animate-slide-up">
          <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden shadow-blue-200/50">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 relative">
              <button
                onClick={() => setShowFloatingForm(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white hover:rotate-90 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold mb-1 tracking-tight">Ready to Scale?</h3>
              <p className="text-blue-100 text-xs font-medium uppercase tracking-widest">Free Strategy Call</p>
            </div>
            <div className="p-6">
              <form onSubmit={(e) => handleFormSubmit(e, 'Ready to Scale', floatingFormData)} className="space-y-4">
                <div className="space-y-4">
                  <select
                    name="title"
                    value={floatingFormData.title}
                    onChange={handleFloatingChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-sm font-medium cursor-pointer"
                  >
                    <option value="">Title</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                  <input
                    type="text"
                    name="firstName"
                    value={floatingFormData.firstName}
                    onChange={handleFloatingChange}
                    required
                    placeholder="First Name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-sm font-medium"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={floatingFormData.lastName}
                    onChange={handleFloatingChange}
                    required
                    placeholder="Last Name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-sm font-medium"
                  />
                  <input
                    type="email"
                    name="email"
                    value={floatingFormData.email}
                    onChange={handleFloatingChange}
                    required
                    placeholder="Work Email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-sm font-medium"
                  />
                  <input
                    type="text"
                    name="agencyName"
                    value={floatingFormData.agencyName}
                    onChange={handleFloatingChange}
                    required
                    placeholder="Agency Name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-sm font-medium"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={floatingFormData.phone}
                    onChange={handleFloatingChange}
                    required
                    placeholder="Phone Number *"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-sm font-medium"
                  />
                </div>
                {formStatus['Ready to Scale'] === 'error' && (
                  <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium animate-shake">
                    Oops! Something went wrong. Please try again.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={submittingForm === 'Ready to Scale'}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-sm shadow-lg shadow-blue-100 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submittingForm === 'Ready to Scale' ? 'Sending...' : 'Book Free Call →'}
                </button>
              </form>
              <p className="text-[10px] text-gray-400 mt-4 text-center font-bold uppercase tracking-widest opacity-60">No commitment required</p>
            </div>
          </div>
        </div>
      )}

      {/* Lead Magnet Modal */}
      {showLeadMagnet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md transition-all duration-500">
          <div className="bg-white rounded-2xl sm:rounded-[2.5rem] max-w-lg w-full shadow-2xl relative animate-scale-up overflow-hidden">
            <button
              onClick={() => setShowLeadMagnet(false)}
              className="absolute top-5 right-5 sm:top-8 sm:right-8 text-gray-400 hover:text-gray-900 hover:rotate-90 transition-all duration-300 z-10"
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            <div className="p-6 sm:p-10 md:p-14 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 sm:w-16 md:w-20 rounded-xl sm:rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 sm:mb-6 md:mb-8 shadow-xl shadow-blue-200">
                <Download className="w-5 h-5 sm:w-8 md:w-10 text-white" />
              </div>
                <h3 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 md:mb-4 leading-tight tracking-tight">
                  Growth System <span className="text-blue-600">Case Study</span>
                </h3>

                <form onSubmit={handleLeadMagnetSubmit} className="space-y-4 sm:space-y-5 text-left">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold mb-2 text-gray-400 uppercase tracking-widest px-1">Title</label>
                      <select
                        name="title"
                        value={leadMagnetFormData.title}
                        onChange={handleLeadMagnetChange}
                        className="w-full px-5 py-3 sm:py-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-base font-medium shadow-sm cursor-pointer"
                      >
                        <option value="">Title</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Dr.">Dr.</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-2 text-gray-400 uppercase tracking-widest px-1">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={leadMagnetFormData.firstName}
                        onChange={handleLeadMagnetChange}
                        required
                        placeholder="John"
                        className="w-full px-5 py-3 sm:py-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-base font-medium shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-2 text-gray-400 uppercase tracking-widest px-1">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={leadMagnetFormData.lastName}
                        onChange={handleLeadMagnetChange}
                        required
                        placeholder="Smith"
                        className="w-full px-5 py-3 sm:py-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-base font-medium shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-2 text-gray-400 uppercase tracking-widest px-1">Work Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={leadMagnetFormData.email}
                        onChange={handleLeadMagnetChange}
                        required
                        placeholder="john@agency.com"
                        className="w-full px-5 py-3 sm:py-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-base font-medium shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-2 text-gray-400 uppercase tracking-widest px-1">Agency Name *</label>
                      <input
                        type="text"
                        name="agencyName"
                        value={leadMagnetFormData.agencyName}
                        onChange={handleLeadMagnetChange}
                        required
                        placeholder="Your Agency Name"
                        className="w-full px-5 py-3 sm:py-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-base font-medium shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-2 text-gray-400 uppercase tracking-widest px-1">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={leadMagnetFormData.phone}
                        onChange={handleLeadMagnetChange}
                        required
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-5 py-3 sm:py-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-base font-medium shadow-sm"
                      />
                    </div>
                  </div>
                  {formStatus['Case Study'] === 'error' && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium animate-shake">
                      Oops! Something went wrong. Please try again.
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={submittingForm === 'Case Study'}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-extrabold text-base sm:text-xl shadow-xl shadow-blue-100 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                  >
                    {submittingForm === 'Case Study' ? 'Sending...' : 'Get Your Free Case Study →'}
                  </button>
                </form>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Instant PDF Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Zero Spam Policy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )}
    </div>
  );
}
