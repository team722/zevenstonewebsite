import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';

export const ContactForm: React.FC = () => {   const [formData, setFormData] = useState({
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      budget: '',
      expectations: '',
      website_url: '',
   });

   const navigate = useNavigate();

   const [isSubmitting, setIsSubmitting] = useState(false);
   const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus('idle');

      try {
         const API_URL = import.meta.env.VITE_CONTACT_API_URL || '/api/contact';

         const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json',
            },
            body: JSON.stringify(formData),
         });

         const contentType = response.headers.get('content-type');
         let result = null;

         if (contentType && contentType.includes('application/json')) {
            try {
               result = await response.json();
               console.log('Worker Result:', result);
            } catch (jsonError) {
               console.error('Failed to parse JSON response:', jsonError);
            }
         }

         if (response.ok && (result?.success || (contentType && contentType.includes('application/json')))) {
            navigate('/thank-you');
         } else {
            console.error('Server returned an unexpected response. Expected JSON API response.');
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
      <>
         <form className="space-y-5" onSubmit={handleSubmit}>
            {submitStatus === 'error' && (
               <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium">
                  Oops! Something went wrong while sending your message. Please try again.
               </div>
            )}

            {/* Improved Honeypot field (hidden from users & extensions) */}
            <div style={{ position: 'absolute', opacity: 0, top: 0, left: 0, height: 0, width: 0, zIndex: -1, pointerEvents: 'none' }} aria-hidden="true">
               <input
                  type="text"
                  name="website_url"
                  value={formData.website_url}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="new-password"
               />
            </div>

            <div className="grid  gap-5">
               <div className="space-y-1.5 group">
                  <label className="text-zeven-blue font-bold text-xs uppercase tracking-wider group-focus-within:text-zeven-deep transition-colors">Title</label>
                  <select name="title" value={formData.title} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-zeven-dark focus:outline-none focus:border-zeven-blue focus:bg-white focus:shadow-lg transition-all">
                     <option value="">Select Title</option>
                     <option value="Mr.">Mr.</option>
                     <option value="Mrs.">Mrs.</option>
                     <option value="Ms.">Ms.</option>
                     <option value="Dr.">Dr.</option>
                  </select>
               </div>
               <div className="space-y-1.5 group">
                  <label className="text-zeven-blue font-bold text-xs uppercase tracking-wider group-focus-within:text-zeven-deep transition-colors">First Name *</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-zeven-dark focus:outline-none focus:border-zeven-blue focus:bg-white focus:shadow-lg transition-all" placeholder="John" />
               </div>
               <div className="space-y-1.5 group">
                  <label className="text-zeven-blue font-bold text-xs uppercase tracking-wider group-focus-within:text-zeven-deep transition-colors">Last Name *</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-zeven-dark focus:outline-none focus:border-zeven-blue focus:bg-white focus:shadow-lg transition-all" placeholder="Smith" />
               </div>
               <div className="space-y-1.5 group">
                  <label className="text-zeven-blue font-bold text-xs uppercase tracking-wider group-focus-within:text-zeven-deep transition-colors">Email Address *</label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-zeven-dark focus:outline-none focus:border-zeven-blue focus:bg-white focus:shadow-lg transition-all" placeholder="john@example.com" />
               </div>
            </div>

            <div className="space-y-1.5 group">
               <label className="text-zeven-blue font-bold text-xs uppercase tracking-wider group-focus-within:text-zeven-deep transition-colors">Budget</label>
               <div className="relative">
                  <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-zeven-dark focus:outline-none focus:border-zeven-blue focus:bg-white focus:shadow-lg transition-all appearance-none cursor-pointer">
                     <option value="">Select a range</option>
                     <option value="5K-10K">5K-10K</option>
                     <option value="10K-50K">10K-50K</option>
                     <option value="50K-100K">50K-100K</option>
                     <option value="100K-500K">100K-500K</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zeven-gray">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                  </div>
               </div>
            </div>

            <div className="space-y-1.5 group">
               <label className="text-zeven-blue font-bold text-xs uppercase tracking-wider group-focus-within:text-zeven-deep transition-colors">Your Expectations *</label>
               <textarea required name="expectations" value={formData.expectations} onChange={handleChange} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-zeven-dark focus:outline-none focus:border-zeven-blue focus:bg-white focus:shadow-lg transition-all resize-none" placeholder="Tell us about your project..."></textarea>
            </div>

            <Button
               type="submit"
               disabled={isSubmitting}
               className="w-full rounded-xl border-none py-3.5 bg-zeven-dark hover:bg-zeven-blue text-white shadow-xl text-base font-bold disabled:opacity-70"
               icon={!isSubmitting && <Send size={18} />}
            >
               {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </Button>
         </form>
      </>
   );
};
