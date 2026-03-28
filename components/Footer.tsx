
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram } from 'lucide-react';
import { Logo } from './ui/Logo';

export const Footer: React.FC = () => {
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
            <p className="text-slate-400 leading-relaxed text-sm">
              We design digital experiences that captivate and convert. Your partner in digital evolution. Built for impact. Backed by data.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Company</h4>
            <ul className="space-y-4">
              {['About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-slate-400 hover:text-zeven-blue transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Expertise</h4>
            <ul className="space-y-4">
              {['SEO & Growth', 'Web Development', 'Marketing Automation', 'AI & Media'].map((item) => (
                <li key={item}>
                  <Link to="/services" className="text-slate-400 hover:text-zeven-blue transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Connect</h4>
            <p className="text-slate-400 mb-2 text-sm">hello@zevenstone.com</p>
            <p className="text-slate-400 mb-6 text-sm">+91-9876-543-210</p>
            <div className="flex gap-4">
              {[<Twitter key="t" size={18}/>, <Linkedin key="l" size={18}/>, <Instagram key="i" size={18}/>].map((icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-zeven-blue transition-all">
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Zevenstone. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-500 text-sm hover:text-white">Privacy Policy</a>
            <a href="#" className="text-slate-500 text-sm hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
