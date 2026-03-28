import React from 'react';

interface LogoProps {
  className?: string;
  white?: boolean; // If true, renders the logo in all white (for footer/dark backgrounds)
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12", white = false }) => {
  // Colors
  const blue = white ? "white" : "#0099FF";
  const brandGray = white ? "white" : "#8B8D91";
  
  // Text Colors
  const textBlue = white ? "white" : "#0099FF";
  const textGray = white ? "white" : "#8B8D91";

  return (
    <svg 
      viewBox="0 0 200 54" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* 
         Icon Grid: 3x3
         Row 1: Center (Blue)
         Row 2: Left (Blue), Center (Grey), Right (Blue)
         Row 3: Left (Grey), Center (Blue), Right (Grey)
         
         Squares: 14px, Gaps: 4px. Total Height: 50px.
         Translate y slightly to center in viewBox if needed.
      */}
      
      <g transform="translate(0, 2)">
        {/* Row 1 */}
        <rect x="18" y="0" width="14" height="14" rx="3" fill={blue} />
        
        {/* Row 2 */}
        <rect x="0" y="18" width="14" height="14" rx="3" fill={blue} />
        <rect x="18" y="18" width="14" height="14" rx="3" fill={brandGray} />
        <rect x="36" y="18" width="14" height="14" rx="3" fill={blue} />
        
        {/* Row 3 */}
        <rect x="0" y="36" width="14" height="14" rx="3" fill={brandGray} />
        <rect x="18" y="36" width="14" height="14" rx="3" fill={blue} />
        <rect x="36" y="36" width="14" height="14" rx="3" fill={brandGray} />
      </g>

      {/* Text: ZEVENSTONE Stacked */}
      <text x="65" y="27" fontFamily="Poppins, sans-serif" fontWeight="800" fontSize="26" letterSpacing="0.5" fill={textBlue}>
        ZEVEN
      </text>
      <text x="65" y="50" fontFamily="Poppins, sans-serif" fontWeight="500" fontSize="26" letterSpacing="2" fill={textGray}>
        STONE
      </text>
    </svg>
  );
};