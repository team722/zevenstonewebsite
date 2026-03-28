
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { Logo } from './ui/Logo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6"
      >
        <div 
          className={`
            relative flex items-center justify-between
            transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
            ${isScrolled 
              ? 'w-full max-w-5xl bg-white/70 backdrop-blur-xl shadow-lg border border-white/40 py-2 px-6 rounded-full' 
              : 'w-full max-w-7xl bg-transparent py-4 px-0'
            }
          `}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group relative z-20">
            <Logo className={`transition-all duration-300 w-auto ${isScrolled ? 'h-8' : 'h-10 md:h-12'}`} />
          </Link>

          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2`}>
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-5 py-2 group"
                >
                  <span className={`relative z-10 text-sm font-semibold transition-colors duration-300 ${
                    isActive ? 'text-zeven-blue' : 'text-zeven-gray group-hover:text-zeven-dark'
                  }`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/80 rounded-full shadow-sm border border-black/5"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {/* Hover effect for non-active items */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gray-100/50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:block relative z-20">
            <Link to="/contact">
              <button className={`
                group relative px-6 py-2.5 rounded-full overflow-hidden font-semibold text-sm transition-all duration-300
                ${isScrolled 
                  ? 'bg-zeven-dark text-white hover:bg-zeven-blue shadow-lg shadow-zeven-dark/20' 
                  : 'bg-white text-zeven-dark shadow-xl hover:shadow-2xl'
                }
              `}>
                <span className="relative z-10 flex items-center gap-2 group-hover:gap-3 transition-all">
                  Let's Talk <ArrowRight size={14} />
                </span>
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`md:hidden p-2 rounded-full relative z-20 ${isScrolled ? 'bg-zeven-surface' : 'bg-white shadow-md'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ type: "spring", damping: 25, stiffness: 100 }}
            className="fixed inset-0 z-40 bg-white pt-32 px-6 md:hidden overflow-hidden"
          >
            {/* Background elements for mobile menu */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-zeven-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="flex flex-col gap-6 relative z-10">
              {NAV_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between text-3xl font-sans font-bold text-zeven-dark border-b border-zeven-surface pb-4 hover:text-zeven-blue transition-colors group"
                  >
                    {item.label}
                    <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-zeven-blue" />
                  </Link>
                </motion.div>
              ))}
              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 w-full py-4 bg-zeven-blue text-white flex items-center justify-center gap-2 rounded-xl font-bold text-lg shadow-xl shadow-zeven-blue/20 active:scale-95 transition-transform"
                >
                  Let's Build Something
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
