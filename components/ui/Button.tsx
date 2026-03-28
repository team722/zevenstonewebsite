import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  icon,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-300 rounded-lg overflow-hidden group";
  
  const variants = {
    primary: "bg-zeven-blue text-white hover:bg-zeven-deep shadow-lg hover:shadow-zeven-blue/40 border border-transparent bg-gradient-to-r from-zeven-blue to-zeven-deep hover:to-zeven-blue",
    secondary: "bg-zeven-dark text-white hover:bg-zeven-dark/90 shadow-md hover:shadow-xl",
    outline: "bg-transparent border-2 border-zeven-blue text-zeven-blue hover:bg-zeven-blue/5 hover:border-zeven-deep",
    ghost: "bg-transparent text-zeven-dark hover:text-zeven-blue hover:bg-zeven-surface"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <motion.span className="inline-block" transition={{ type: "spring", stiffness: 400 }}>{icon}</motion.span>}
      </span>
      {/* Shine Effect */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
      )}
    </motion.button>
  );
};