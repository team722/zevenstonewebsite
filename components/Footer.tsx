import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';
import { Logo } from './ui/Logo';
import { useQuery } from '@tanstack/react-query';
import { sanityClient } from '../lib/sanity';
import { SITE_SETTINGS_QUERY } from '../lib/queries';

export const Footer: React.FC = () => {
  const { data: siteSettings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => sanityClient.fetch(SITE_SETTINGS_QUERY),
  });

  const defaultDescription = "We design digital experiences that captivate and convert. Your partner in digital evolution. Built for impact. Backed by data.";
  const defaultQuickLinks = [
    { text: 'About', url: '/about' },
    { text: 'Services', url: '/services' },
    { text: 'Portfolio', url: '/portfolio' },
    { text: 'Contact', url: '/contact' }
  ];
  const defaultServices = [
    { text: 'SEO & Growth', url: '/services' },
    { text: 'Web Development', url: '/services' },
    { text: 'Marketing Automation', url: '/services' },
    { text: 'AI & Media', url: '/services' }
  ];

  const quickLinks = siteSettings?.footerNavigation || defaultQuickLinks;
  const servicesLinks = siteSettings?.footerServices || defaultServices;
  const legalLinks = siteSettings?.legalLinks || [
    { text: 'Privacy Policy', url: '#' },
    { text: 'Terms of Service', url: '#' }
  ];
  return (
    <footer className="bg-zeven-dark border-t border-white/5 pt-20 pb-10 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              {/* Use white version of the logo */}
              <Logo white className="h-10 w-auto opacity-90" />
            </div>
            <p className="text-slate-400 leading-relaxed text-sm whitespace-pre-wrap">
              {siteSettings?.footerDescription || defaultDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Company</h4>
            <ul className="space-y-4">
              {quickLinks.map((item: any, idx: number) => (
                <li key={idx}>
                  <Link to={item.url || '#'} className="text-slate-400 hover:text-zeven-blue transition-colors text-sm">
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Expertise</h4>
            <ul className="space-y-4">
              {servicesLinks.map((item: any, idx: number) => (
                <li key={idx}>
                  <Link to={item.url || '#'} className="text-slate-400 hover:text-zeven-blue transition-colors text-sm">
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Connect</h4>
            <p className="text-slate-400 mb-2 text-sm">{siteSettings?.contactEmail || 'hello@zevenstone.com'}</p>
            <p className="text-slate-400 mb-6 text-sm">{siteSettings?.phoneNumber || '+91-9876-543-210'}</p>
            <div className="flex gap-4">
              {siteSettings?.facebook && (
                <a href={siteSettings.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-zeven-blue transition-all">
                  <Facebook size={18} />
                </a>
              )}
              {siteSettings?.linkedIn && (
                <a href={siteSettings.linkedIn} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-zeven-blue transition-all">
                  <Linkedin size={18} />
                </a>
              )}
              {siteSettings?.instagram && (
                <a href={siteSettings.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-zeven-blue transition-all">
                  <Instagram size={18} />
                </a>
              )}
              {(!siteSettings?.facebook && !siteSettings?.linkedIn && !siteSettings?.instagram) && (
                [<Facebook key="f" size={18} />, <Linkedin key="l" size={18} />, <Instagram key="i" size={18} />].map((icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-zeven-blue transition-all">
                    {icon}
                  </a>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            {siteSettings?.copyrightText
              ? siteSettings.copyrightText.replace('{{year}}', new Date().getFullYear().toString())
              : `© ${new Date().getFullYear()} Zevenstone. All rights reserved.`}
          </p>
          <div className="flex gap-8">
            {legalLinks.map((item: any, idx: number) => (
              <a key={idx} href={item.url || '#'} className="text-slate-500 text-sm hover:text-white">
                {item.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
