import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverEffect = true }) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, boxShadow: "0 15px 30px -10px rgba(0, 153, 255, 0.1)" } : {}}
      className={`
        relative overflow-hidden
        bg-white border border-zeven-surface
        rounded-3xl 
        transition-all duration-300
        ${className}
      `}
    >
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};