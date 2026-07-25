import React from 'react';

export const MentisLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="mentis-white" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e2e8f0" /> {/* slate-200 */}
        </linearGradient>
        <linearGradient id="mentis-gray" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" /> {/* slate-400 */}
          <stop offset="100%" stopColor="#64748b" /> {/* slate-500 */}
        </linearGradient>
      </defs>
      
      <g filter="url(#neon-glow)">
        {/* Left Triangle (Base facing right) */}
        <polygon 
          points="10,50 46,15 46,85" 
          fill="url(#mentis-white)" 
          opacity="0.9"
        />
        
        {/* Right Triangle (Base facing left) */}
        <polygon 
          points="90,50 54,15 54,85" 
          fill="url(#mentis-gray)" 
          opacity="0.9"
        />
        
        {/* Central Core Connection */}
        <circle cx="50" cy="50" r="4" fill="#ffffff" opacity="1" />
        <circle cx="50" cy="35" r="2.5" fill="#ffffff" opacity="0.8" />
        <circle cx="50" cy="65" r="2.5" fill="#ffffff" opacity="0.8" />
      </g>
    </svg>
  );
};
