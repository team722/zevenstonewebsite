import { ArrowRight, CheckCircle, TrendingUp, Zap, Users, Target, Clock, Shield, Award, Star, DollarSign, BarChart3, Rocket, X, Download, Mail, Building2, User, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import imgLinkLogo from "figma:asset/landingpageLogo.png";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFloatingForm, setShowFloatingForm] = useState(false);
  const [showLeadMagnet, setShowLeadMagnet] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [leadMagnetSubmitted, setLeadMagnetSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    revenue: '',
    challenge: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // Show floating form after 50% scroll
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setShowFloatingForm(scrollPercent > 50 && !formSubmitted);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [formSubmitted]);

  const scrollToCTA = () => {
    document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to your CRM/backend
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setShowFloatingForm(false);
    // Could integrate with Calendly, HubSpot, etc.
  };

  const handleLeadMagnetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would trigger case study download + email capture
    console.log('Lead magnet requested');
    setLeadMagnetSubmitted(true);
    setTimeout(() => setShowLeadMagnet(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white font-['Poppins',sans-serif]">
      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-md' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <img src={imgLinkLogo} alt="Zevenstone" className="h-8" />
            <button
              onClick={scrollToCTA}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <a href="#form-cta-section">Book Free Strategy Call</a>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#2c2e33] mb-6 leading-[1.1] tracking-tight">
              Your Agency Deserves a Delivery Partner That{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Actually Delivers
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              Zevenstone LLC is the white-label growth system behind America's fastest-scaling agencies —
              powering digital marketing, automation, and creative production{' '}
              <span className="font-bold text-[#2c2e33]">under your brand, invisibly.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button
                onClick={scrollToCTA}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-10 py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center justify-center gap-3"
              >
                <a href="#form-cta-section"> Book Your Free Strategy Call</a>
                <ArrowRight className="w-6 h-6" />
              </button>
              <a
                href="#how-it-works"
                className="border-2 border-gray-300 text-gray-700 px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all inline-flex items-center justify-center gap-3"
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
      <section className="bg-[#2c2e33] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <div className="text-3xl font-extrabold text-blue-400 mb-1">$1M+</div>
              <div className="text-xs text-gray-400">Monthly Revenue Per Partner</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-blue-400 mb-1">1,000+</div>
              <div className="text-xs text-gray-400">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-blue-400 mb-1">100%</div>
              <div className="text-xs text-gray-400">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-blue-400 mb-1">$100M+</div>
              <div className="text-xs text-gray-400">Client Revenue Generated</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-blue-400 mb-1">100+</div>
              <div className="text-xs text-gray-400">Agency Endorsements</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-red-100 text-red-600 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
              The Problem
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#2c2e33] mb-6">
              Is Your Agency Leaving Revenue on the Table?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              You have the clients. You have the relationships. But somewhere between the brief and the delivery — things break down.
            </p>
          </div>

          {/* Pain Points Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              "You're turning away clients because your team is at capacity",
              "You're juggling multiple subcontractors with inconsistent quality",
              "You're losing time managing delivery instead of growing your agency",
              "You're missing revenue because you can't offer every service your clients need",
              "You're paying full-time salaries for skills you only need part of the time"
            ].map((point, idx) => (
              <div
                key={idx}
                className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-red-500 text-white rounded-full p-2 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-gray-700 leading-relaxed font-medium pt-1">{point}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Urgency Message */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-3xl p-10 text-center">
            <p className="text-2xl font-bold">
              Every month this continues is revenue your agency will never get back.
            </p>
          </div>

          {/* Lead Magnet CTA */}
          <div className="mt-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-10 text-white text-center">
            <Download className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">Download: The White-Label Growth Playbook</h3>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
              See exactly how 3 agencies scaled from $200K to $1M+ ARR using our delivery system — without hiring a single employee.
            </p>
            <button
              onClick={() => setShowLeadMagnet(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              Get Free Case Study
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
              The Solution
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#2c2e33] mb-6">
              One System. Every Scope. Zero Overhead.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Zevenstone operates as your invisible delivery engine — handling everything your clients need,{' '}
              <span className="font-bold text-[#2c2e33]">under your brand</span>, at the quality and consistency your reputation demands.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Digital Marketing */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2c2e33] mb-4">Digital Marketing</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>SEO · PPC · SEM</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Social Media Advertising</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Email Marketing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Content Marketing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Lead Generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Analytics & Reporting</span>
                </li>
              </ul>
            </div>

            {/* Marketing Automation */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2c2e33] mb-4">Marketing Automation</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500 shrink-0" />
                  <span>CRM Architecture</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500 shrink-0" />
                  <span>Workflow Automation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500 shrink-0" />
                  <span>Lifecycle Sequences</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500 shrink-0" />
                  <span>Lead Nurturing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500 shrink-0" />
                  <span>AI-Assisted Operations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500 shrink-0" />
                  <span>Martech Integration</span>
                </li>
              </ul>
            </div>

            {/* Creative Production */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2c2e33] mb-4">Creative Production</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Brand Identity</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Graphic Design</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>UI/UX Design</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Motion Graphics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Video Editing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Web Design & Development</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Key Message */}
          <div className="text-center">
            <p className="text-2xl font-bold text-[#2c2e33]">
              One partner. Every scope. Delivered under your brand.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
              How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#2c2e33] mb-6">
              Simple to Start. Built to Scale.
            </h2>
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Discovery Call',
                description: 'We understand your agency, your clients, and your gaps. No generic proposals. No assumptions.',
                icon: <Users className="w-8 h-8" />
              },
              {
                step: '02',
                title: 'System Design',
                description: 'We build a delivery framework tailored to exactly how your agency operates.',
                icon: <Target className="w-8 h-8" />
              },
              {
                step: '03',
                title: 'Seamless Onboarding',
                description: 'NDA signed. Brand guidelines absorbed. Tools connected. Ready to deliver in days — not months.',
                icon: <Rocket className="w-8 h-8" />
              },
              {
                step: '04',
                title: 'White-Label Delivery',
                description: 'We execute under your brand. Your clients never know we exist. You take the credit.',
                icon: <Shield className="w-8 h-8" />
              },
              {
                step: '05',
                title: 'Scale Together',
                description: 'As your agency grows, our system grows with you. More clients. More revenue. Zero added overhead.',
                icon: <TrendingUp className="w-8 h-8" />
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all group"
              >
                <div className="flex items-start gap-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-blue-500 mb-2">STEP {item.step}</div>
                    <h3 className="text-2xl font-bold text-[#2c2e33] mb-3">{item.title}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Numbers */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Built for Agencies That Think in Millions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { value: '$1.6M+', label: 'Monthly revenue generated for a single agency partner through the Zevenstone delivery system' },
              { value: '1,200+', label: 'Projects delivered across digital marketing, automation, and creative — without a single missed deadline' },
              { value: '98.9%', label: 'Client satisfaction maintained across every engagement, every partner, every project' },
              { value: '$357M+', label: 'In measurable revenue generated for the end clients of our agency partners' },
              { value: '100+', label: 'Endorsements from agency leaders, founders, and business partners across North America and beyond' }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center hover:bg-white/20 transition-all"
              >
                <div className="text-5xl font-extrabold mb-4">{stat.value}</div>
                <p className="text-green-100 leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiation */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#2c2e33] mb-6">
              We Are Not a Vendor. We Are Your Growth Partner.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
              Most white-label providers take briefs and return deliverables.
            </p>
            <p className="text-2xl font-bold text-blue-600">
              Zevenstone installs a system.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-10 mb-12">
            <p className="text-xl text-gray-700 leading-relaxed text-center mb-8">
              We work from the root — understanding your clients' businesses, building strategies that drive real outcomes,
              and delivering with a consistency that makes your agency look like the most capable team in the room.
            </p>
          </div>

          {/* Key Differentiators */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Target className="w-6 h-6" />, text: 'Solution givers — not task doers' },
              { icon: <TrendingUp className="w-6 h-6" />, text: 'Growth partners — not outsourcing vendors' },
              { icon: <Shield className="w-6 h-6" />, text: 'Brand-invisible — your clients, your credit' },
              { icon: <CheckCircle className="w-6 h-6" />, text: 'Scope-complete — marketing, automation, and creative unified' },
              { icon: <Clock className="w-6 h-6" />, text: 'Always on — US onsite team in Ohio backed by offshore India team' },
              { icon: <Award className="w-6 h-6" />, text: 'System-driven — built for consistency, quality, and scale' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 text-blue-600 rounded-xl p-3 shrink-0">
                    {item.icon}
                  </div>
                  <p className="font-semibold text-gray-700">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#2c2e33] mb-6">
              An Engagement Model Built Around Your Agency
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Project-Based',
                description: 'Pay per project. No long-term commitment. Perfect for overflow and one-time client needs.',
                icon: <Target className="w-8 h-8" />
              },
              {
                title: 'Monthly Retainer',
                description: 'Dedicated delivery capacity every month. Predictable output. Predictable growth.',
                icon: <Clock className="w-8 h-8" />
              },
              {
                title: 'Time & Materials (T&M)',
                description: 'Flexible billing based on actual time and resources. Ideal for complex or evolving projects.',
                icon: <BarChart3 className="w-8 h-8" />
              },
              {
                title: 'Growth Partnership',
                description: 'Deep strategic alignment — where Zevenstone becomes a true extension of your agency and shares in building your long-term commercial growth.',
                icon: <Rocket className="w-8 h-8" />
              }
            ].map((model, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-10 shadow-xl border-2 border-gray-100 hover:border-blue-500 hover:shadow-2xl transition-all group"
              >
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {model.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#2c2e33] mb-4">{model.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{model.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 font-medium">
              All models include NDA protection and brand-invisible white-label delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
              Results
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#2c2e33] mb-6">
              Agencies That Partner With Zevenstone Scale Faster
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                title: 'From Overflow to $1M+ Monthly',
                description: 'A US digital agency was turning away clients at capacity. After integrating Zevenstone as their white-label backend across 12 client accounts — revenue scaled from $180K to $1.2M per month within 14 months. Zero new hires.',
                metric: '+567%',
                label: 'Revenue Growth'
              },
              {
                title: 'Organic Traffic That Compounds',
                description: 'A B2B SaaS brand spending 60% of revenue on paid ads built an SEO and content system with Zevenstone. Within 12 months, organic became their number one acquisition channel — at a fraction of the cost.',
                metric: '#1',
                label: 'Acquisition Channel'
              },
              {
                title: 'A Complete Brand in 90 Days',
                description: 'A professional services firm with zero digital presence got a full brand identity, website, SEO foundation, and CRM — live in 90 days. Page one Google rankings within 6 months.',
                metric: '90 Days',
                label: 'To Full Launch'
              }
            ].map((story, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-10 border border-blue-100 hover:shadow-xl transition-all"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="bg-white rounded-2xl p-8 text-center shadow-lg shrink-0">
                    <div className="text-4xl font-extrabold text-blue-600 mb-2">{story.metric}</div>
                    <div className="text-sm text-gray-600 font-semibold">{story.label}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#2c2e33] mb-4">{story.title}</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">{story.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              What Our Agency Partners Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: 'Zevenstone is not a vendor — they are genuinely part of our team. The quality, consistency, and speed of delivery transformed what our agency is able to offer.',
                author: 'Agency Partner',
                role: 'United States'
              },
              {
                quote: "What sets Zevenstone apart is that they actually understand the business behind the brief. They don't just execute — they think.",
                author: 'Founder, SaaS Company',
                role: 'North America'
              },
              {
                quote: "The white-label delivery is flawless. Our clients have no idea they exist — and that's exactly what we needed.",
                author: 'Creative Director',
                role: 'Boutique Agency, United States'
              },
              {
                quote: 'Working with Zevenstone feels like having an entire agency on call — except they already know our standards and our brand.',
                author: 'Managing Director',
                role: 'Professional Services, Ohio'
              }
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all"
              >
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="border-t border-white/20 pt-4">
                  <div className="font-bold">{testimonial.author}</div>
                  <div className="text-sm text-blue-200">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualifier Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#2c2e33] mb-4">
              Is Zevenstone Right for Your Agency?
            </h2>
            <p className="text-xl text-gray-600">
              We're the perfect fit if you check 3 or more of these boxes:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
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
                className="bg-white rounded-2xl p-6 shadow-md border-2 border-gray-100 hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 group-hover:bg-blue-500 text-blue-500 group-hover:text-white w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <p className="text-gray-700 group-hover:text-gray-900 font-medium transition-colors">{item}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-10 text-white text-center">
            <p className="text-2xl font-bold mb-6">
              Checked 3 or more? Let's talk about your growth roadmap.
            </p>
            <button
              onClick={scrollToCTA}
              className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:scale-105 transition-all inline-flex items-center gap-3"
            >
              <a href="#form-cta-section">Book Your Strategy Call</a>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#2c2e33] mb-6">
            Built in Ohio. Powered Globally.
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            Zevenstone LLC is headquartered in <span className="font-bold text-[#2c2e33]">Ohio, USA</span> — with a world-class
            delivery team operating from India. This dual-model gives our agency partners the strategic oversight and time-zone
            alignment of a North American operation, backed by the execution depth, creative capacity, and around-the-clock delivery
            of a globally distributed specialist team.
          </p>
          <p className="text-2xl font-bold text-blue-600 mb-4">
            We cover every scope your clients will ever need.
          </p>
          <p className="text-xl text-gray-600">
            We deliver it all under your brand. We grow when you grow.
          </p>
          <div className="mt-8">
            <p className="text-3xl font-bold text-[#2c2e33] italic">
              Insight. Execution. Impact.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div id="form-cta-section" className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Ready to Scale Your Agency Without Scaling Your Overhead?
          </h2>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed">
            Book a free 30-minute strategy call with the Zevenstone team. We'll map exactly how our system can plug
            into your agency and start delivering from day one.
          </p>

          {!formSubmitted ? (
            <>
              {/* Contact Form */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 mb-8 border border-white/20">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-left">
                      <label className="block text-sm font-semibold mb-2 text-blue-100">
                        <User className="w-4 h-4 inline mr-2" />
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-4 rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 border-2 border-transparent focus:border-blue-400 focus:outline-none transition-all font-medium"
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="text-left">
                      <label className="block text-sm font-semibold mb-2 text-blue-100">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Work Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-4 rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 border-2 border-transparent focus:border-blue-400 focus:outline-none transition-all font-medium"
                        placeholder="john@agency.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-left">
                      <label className="block text-sm font-semibold mb-2 text-blue-100">
                        <Building2 className="w-4 h-4 inline mr-2" />
                        Agency Name *
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-4 rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 border-2 border-transparent focus:border-blue-400 focus:outline-none transition-all font-medium"
                        placeholder="Your Agency"
                      />
                    </div>
                    <div className="text-left">
                      <label className="block text-sm font-semibold mb-2 text-blue-100">
                        <DollarSign className="w-4 h-4 inline mr-2" />
                        Current Monthly Revenue
                      </label>
                      <select
                        name="revenue"
                        value={formData.revenue}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 rounded-xl bg-white/90 text-gray-900 border-2 border-transparent focus:border-blue-400 focus:outline-none transition-all font-medium"
                      >
                        <option value="">Select range</option>
                        <option value="under-50k">Under $50K</option>
                        <option value="50k-100k">$50K - $100K</option>
                        <option value="100k-250k">$100K - $250K</option>
                        <option value="250k-500k">$250K - $500K</option>
                        <option value="500k-1m">$500K - $1M</option>
                        <option value="1m-plus">$1M+</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-left">
                    <label className="block text-sm font-semibold mb-2 text-blue-100">
                      What's your biggest growth challenge right now?
                    </label>
                    <textarea
                      name="challenge"
                      value={formData.challenge}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-5 py-4 rounded-xl bg-white/90 text-gray-900 placeholder-gray-500 border-2 border-transparent focus:border-blue-400 focus:outline-none transition-all font-medium resize-none"
                      placeholder="e.g., Turning away clients due to capacity, quality inconsistencies, can't offer full service suite..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-auto bg-white text-blue-600 px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all inline-flex items-center justify-center gap-4"
                  >
                    Book Your Free Strategy Call
                    <Calendar className="w-6 h-6" />
                  </button>
                </form>
              </div>

              <p className="text-blue-100 mb-8">
                No commitment. No sales pitch. Just a real conversation about what's possible.
              </p>
            </>
          ) : (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 mb-8 border-2 border-white/40">
              <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-400" />
              <h3 className="text-3xl font-bold mb-4">Thank You!</h3>
              <p className="text-xl text-blue-100 mb-6">
                We've received your request. Our team will reach out within 24 hours to schedule your strategy call.
              </p>
              <p className="text-blue-200">
                In the meantime, check your email for our White-Label Growth Playbook.
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>30-minute free call</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>No pressure, no pitch</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Custom growth roadmap</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2c2e33] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
              <div className="grid grid-cols-3 gap-0.5">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-white rounded-sm" />
                ))}
              </div>
            </div>
            <span className="font-bold text-xl">ZEVENSTONE LLC</span>
          </div>
          <p className="text-gray-400 mb-4">Ohio, USA · zevenstone.com</p>
          <p className="text-gray-500 text-sm">© 2026 Zevenstone LLC. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Sticky Form - Hidden on mobile, shown on tablet+ */}
      {showFloatingForm && (
        <div className="hidden md:block fixed bottom-8 right-8 z-50 max-w-md animate-slide-up">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-blue-500 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 relative">
              <button
                onClick={() => setShowFloatingForm(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold mb-2">Ready to Scale?</h3>
              <p className="text-blue-100 text-sm">Book your free strategy call now</p>
            </div>
            <div className="p-6">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Work Email"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  placeholder="Agency Name"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:shadow-xl hover:scale-105 transition-all"
                >
                  Book Free Call →
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-3 text-center">No commitment required</p>
            </div>
          </div>
        </div>
      )}

      {/* Lead Magnet Modal */}
      {showLeadMagnet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl relative animate-scale-up">
            <button
              onClick={() => setShowLeadMagnet(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {!leadMagnetSubmitted ? (
              <div className="p-10">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Get The White-Label Growth Playbook
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Enter your email to instantly download our complete case study showing how agencies scaled to $1M+ ARR without hiring.
                </p>

                <form onSubmit={handleLeadMagnetSubmit} className="space-y-4">
                  <input
                    type="email"
                    required
                    placeholder="Your work email"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-lg"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Download Free Case Study
                  </button>
                </form>

                <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Instant download</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>No spam ever</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-10 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email!</h3>
                <p className="text-gray-600">
                  We've sent the White-Label Growth Playbook to your inbox. It should arrive within 2 minutes.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
