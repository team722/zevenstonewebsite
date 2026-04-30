import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { sanityClient } from '../lib/sanity';
import { SITE_SETTINGS_QUERY, CONTACT_PAGE_QUERY } from '../lib/queries';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorState } from '../components/ui/ErrorState';
import { Helmet } from 'react-helmet-async';
import { urlFor } from '../lib/sanity';

import { useState } from 'react';

export const Contact: React.FC = () => {

   const { data: contactPageData, isLoading: loadingContact, error: errorContact } = useQuery({
      queryKey: ['contactPage'],
      queryFn: () => sanityClient.fetch(CONTACT_PAGE_QUERY),
   });

   const { data: siteSettings, isLoading: loadingSettings, error: errorSettings } = useQuery({
      queryKey: ['siteSettings'],
      queryFn: () => sanityClient.fetch(SITE_SETTINGS_QUERY),
   });

   const [formData, setFormData] = useState({
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      budget: '',
      expectations: '',
      botField: '', // Honeypot
   });

   const [isSubmitting, setIsSubmitting] = useState(false);
   const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

   const isLoading = loadingContact || loadingSettings;
   const error = errorContact || errorSettings;

   if (isLoading) return <LoadingSpinner />;
   if (error) return <ErrorState />;

   const headerHeading = contactPageData?.contactHeader?.heading || "Let's Build Something <br/>Amazing.";
   const headerDescription = contactPageData?.contactHeader?.description || "Have a project in mind or just want to say hi? Fill out the form and let’s start a conversation about your growth.";

   const email = siteSettings?.contactEmail || "hello@zevenstone.com";
   const phone = siteSettings?.phoneNumber || "+91-9876-543-210";
   const address = siteSettings?.address || "Tech Park, Sector 5\nNew Delhi, India";

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus('idle');

      try {
         const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
         });

         if (response.ok) {
            setSubmitStatus('success');
         } else {
            setSubmitStatus('error');
         }
      } catch (err) {
         console.error('Submission error:', err);
         setSubmitStatus('error');
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="pt-32 pb-20 min-h-screen bg-slate-50 font-sans relative overflow-hidden flex items-center">
         <Helmet>
            <title>{contactPageData?.seo?.title || contactPageData?.seo?.metaTitle || 'Contact Us | Zevenstone – Get in Touch'}</title>
            <meta name="description" content={contactPageData?.seo?.description || contactPageData?.seo?.metaDescription || "Get in touch with Zevenstone. We're ready to help you build something amazing."} />
            {(contactPageData?.seo?.metaImage || contactPageData?.seo?.ogImage) && <meta property="og:image" content={urlFor(contactPageData.seo.metaImage || contactPageData.seo.ogImage).url()} />}
         </Helmet>

         {/* --- BACKGROUND ENGINE --- */}
         <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <motion.div
               animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
               transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
               className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-zeven-blue/5 rounded-full mix-blend-multiply blur-[120px]"
            />
         </div>

         <div className="container mx-auto px-6 relative z-10">
            <motion.div
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="bg-white/80 backdrop-blur-2xl border border-white/60 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px]"
            >
               {/* Left Blue Panel */}
               <div className="lg:w-2/5 p-8 lg:p-20 text-white flex flex-col justify-between relative overflow-hidden bg-zeven-blue">
                  {/* Texture/Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-zeven-blue to-zeven-deep opacity-100" />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/20 rounded-full blur-3xl" />

                  <div className="relative z-10">
                     <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight" dangerouslySetInnerHTML={{ __html: headerHeading }}></h2>
                     <p className="text-blue-100 mb-12 text-lg font-light leading-relaxed">
                        {headerDescription}
                     </p>

                     <div className="space-y-10">
                        <div className="group">
                           <div className="flex items-center gap-4 font-bold text-xl mb-1 group-hover:translate-x-2 transition-transform"><Mail size={24} /> Email Us</div>
                           <p className="text-blue-100/80 ml-10 text-sm">{email}</p>
                        </div>
                        <div className="group">
                           <div className="flex items-center gap-4 font-bold text-xl mb-1 group-hover:translate-x-2 transition-transform"><Phone size={24} /> Call Us</div>
                           <p className="text-blue-100/80 ml-10 text-sm">{phone}</p>
                        </div>
                        <div className="group">
                           <div className="flex items-center gap-4 font-bold text-xl mb-1 group-hover:translate-x-2 transition-transform"><MapPin size={24} /> Visit Us</div>
                           <p className="text-blue-100/80 ml-10 text-sm whitespace-pre-line">{address}</p>
                        </div>
                     </div>
                  </div>

                  <div className="relative z-10 mt-12">
                     <div className="text-blue-200 text-xs font-medium uppercase tracking-widest">Built for the World. Tuned for Your Market.</div>
                  </div>
               </div>

               {/* Right White Form */}
               <div className="lg:w-3/5 p-12 lg:p-20 flex flex-col justify-center bg-white/50 relative">
                  {submitStatus === 'success' ? (
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                     >
                        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h3 className="text-3xl font-bold text-zeven-dark mb-4">Message Sent!</h3>
                        <p className="text-zeven-gray text-lg">Thank you for reaching out. We've received your details and will get back to you shortly.</p>
                        <Button className="mt-8 rounded-xl" onClick={() => {
                           setSubmitStatus('idle');
                           setFormData({
                              title: '',
                              firstName: '',
                              lastName: '',
                              email: '',
                              budget: '',
                              expectations: '',
                              botField: '',
                           });
                        }}>Send Another Message</Button>
                     </motion.div>
                  ) : (
                     <form className="space-y-8" onSubmit={handleSubmit}>
                        {submitStatus === 'error' && (
                           <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium">
                              Oops! Something went wrong while sending your message. Please try again.
                           </div>
                        )}
                        
                        {/* Honeypot field (hidden from users, traps bots) */}
                        <div className="absolute opacity-0 -z-10 pointer-events-none" aria-hidden="true">
                           <input type="text" name="botField" value={formData.botField} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                        </div>

                        <div className="grid md:grid-cols-1 gap-8">
                           <div className="space-y-2 group">
                              <label className="text-zeven-blue font-bold text-xs uppercase tracking-wider group-focus-within:text-zeven-deep transition-colors">Title</label>
                              <select name="title" value={formData.title} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-zeven-dark focus:outline-none focus:border-zeven-blue focus:bg-white focus:shadow-lg transition-all">
                                 <option value="">Select Title</option>
                                 <option value="Mr">Mr</option>
                                 <option value="Mrs">Mrs</option>
                                 <option value="Miss">Miss</option>
                                 <option value="Dr">Dr</option>
                              </select>
                           </div>
                           <div className="space-y-2 group">
                              <label className="text-zeven-blue font-bold text-xs uppercase tracking-wider group-focus-within:text-zeven-deep transition-colors">First Name *</label>
                              <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-zeven-dark focus:outline-none focus:border-zeven-blue focus:bg-white focus:shadow-lg transition-all" placeholder="John" />
                           </div>
                           <div className="space-y-2 group">
                              <label className="text-zeven-blue font-bold text-xs uppercase tracking-wider group-focus-within:text-zeven-deep transition-colors">Last Name *</label>
                              <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-zeven-dark focus:outline-none focus:border-zeven-blue focus:bg-white focus:shadow-lg transition-all" placeholder="Doe" />
                           </div>
                           <div className="space-y-2 group">
                              <label className="text-zeven-blue font-bold text-xs uppercase tracking-wider group-focus-within:text-zeven-deep transition-colors">Email Address *</label>
                              <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-zeven-dark focus:outline-none focus:border-zeven-blue focus:bg-white focus:shadow-lg transition-all" placeholder="john@example.com" />
                           </div>
                        </div>

                        <div className="space-y-2 group">
                           <label className="text-zeven-blue font-bold text-xs uppercase tracking-wider group-focus-within:text-zeven-deep transition-colors">Budget</label>
                           <div className="relative">
                              <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-zeven-dark focus:outline-none focus:border-zeven-blue focus:bg-white focus:shadow-lg transition-all appearance-none cursor-pointer">
                                 <option value="">Select a range</option>
                                 <option value="$50k+">$50k+</option>
                                 <option value="$25k - $50k">$25k - $50k</option>
                                 <option value="$10k - $25k">$10k - $25k</option>
                                 <option value="$5k - $10k">$5k - $10k</option>
                                 <option value="$1k - $5k">$1k - $5k</option>
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zeven-gray">
                                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-2 group">
                           <label className="text-zeven-blue font-bold text-xs uppercase tracking-wider group-focus-within:text-zeven-deep transition-colors">Your Expectations *</label>
                           <textarea required name="expectations" value={formData.expectations} onChange={handleChange} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-zeven-dark focus:outline-none focus:border-zeven-blue focus:bg-white focus:shadow-lg transition-all resize-none" placeholder="Tell us about your project..."></textarea>
                        </div>

                        <Button 
                           type="submit" 
                           disabled={isSubmitting}
                           className="w-full rounded-xl py-4 bg-zeven-dark hover:bg-zeven-blue text-white shadow-xl text-lg font-bold disabled:opacity-70" 
                           icon={!isSubmitting && <Send size={20} />}
                        >
                           {isSubmitting ? 'Sending Message...' : 'Send Message'}
                        </Button>
                     </form>
                  )}
               </div>
            </motion.div>
         </div>
      </div>
   );
};