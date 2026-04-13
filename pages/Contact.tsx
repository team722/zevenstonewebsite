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

export const Contact: React.FC = () => {

  const { data: contactPageData, isLoading: loadingContact, error: errorContact } = useQuery({
    queryKey: ['contactPage'],
    queryFn: () => sanityClient.fetch(CONTACT_PAGE_QUERY),
  });

  const { data: siteSettings, isLoading: loadingSettings, error: errorSettings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => sanityClient.fetch(SITE_SETTINGS_QUERY),
  });

  const isLoading = loadingContact || loadingSettings;
  const error = errorContact || errorSettings;

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorState />;

  const headerHeading = contactPageData?.contactHeader?.heading || "Let's Build Something <br/>Amazing.";
  const headerDescription = contactPageData?.contactHeader?.description || "Have a project in mind or just want to say hi? Fill out the form and let’s start a conversation about your growth.";
  
  const email = siteSettings?.contactEmail || "hello@zevenstone.com";
  const phone = siteSettings?.phoneNumber || "+91-9876-543-210";
  const address = siteSettings?.address || "Tech Park, Sector 5\nNew Delhi, India";

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
                       <div className="flex items-center gap-4 font-bold text-xl mb-1 group-hover:translate-x-2 transition-transform"><Mail size={24}/> Email Us</div>
                       <p className="text-blue-100/80 ml-10 text-sm">{email}</p>
                    </div>
                    <div className="group">
                       <div className="flex items-center gap-4 font-bold text-xl mb-1 group-hover:translate-x-2 transition-transform"><Phone size={24}/> Call Us</div>
                       <p className="text-blue-100/80 ml-10 text-sm">{phone}</p>
                    </div>
                    <div className="group">
                       <div className="flex items-center gap-4 font-bold text-xl mb-1 group-hover:translate-x-2 transition-transform"><MapPin size={24}/> Visit Us</div>
                       <p className="text-blue-100/80 ml-10 text-sm whitespace-pre-line">{address}</p>
                    </div>
                 </div>
              </div>
              
              <div className="relative z-10 mt-12">
                 <div className="text-blue-200 text-xs font-medium uppercase tracking-widest">Global Standards. Local Insights.</div>
              </div>
           </div>

           {/* Right White Form */}
           <div className="lg:w-3/5 p-12 lg:p-20 flex flex-col justify-center bg-white/50">
              <form className="space-y-8">
                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2 group">
                       <label className="text-zeven-blue font-bold text-xs uppercase tracking-wider group-focus-within:text-zeven-deep transition-colors">Full Name</label>
                       <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-zeven-dark focus:outline-none focus:border-zeven-blue focus:bg-white focus:shadow-lg transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2 group">
                       <label className="text-zeven-blue font-bold text-xs uppercase tracking-wider group-focus-within:text-zeven-deep transition-colors">Email Address</label>
                       <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-zeven-dark focus:outline-none focus:border-zeven-blue focus:bg-white focus:shadow-lg transition-all" placeholder="john@example.com" />
                    </div>
                 </div>
                 
                 <div className="space-y-2 group">
                    <label className="text-zeven-blue font-bold text-xs uppercase tracking-wider group-focus-within:text-zeven-deep transition-colors">Budget (Optional)</label>
                    <div className="relative">
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-zeven-dark focus:outline-none focus:border-zeven-blue focus:bg-white focus:shadow-lg transition-all appearance-none cursor-pointer">
                        <option>Select a range</option>
                        <option>$5k - $10k</option>
                        <option>$10k - $25k</option>
                        <option>$25k - $50k</option>
                        <option>$50k+</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zeven-gray">
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                      </div>
                    </div>
                 </div>

                 <div className="space-y-2 group">
                    <label className="text-zeven-blue font-bold text-xs uppercase tracking-wider group-focus-within:text-zeven-deep transition-colors">Your Message</label>
                    <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-zeven-dark focus:outline-none focus:border-zeven-blue focus:bg-white focus:shadow-lg transition-all resize-none" placeholder="Tell us about your project..."></textarea>
                 </div>

                 <Button type="submit" className="w-full rounded-xl py-4 bg-zeven-dark hover:bg-zeven-blue text-white shadow-xl text-lg font-bold" icon={<Send size={20}/>}>Send Message</Button>
              </form>
           </div>
        </motion.div>
      </div>
    </div>
  );
};