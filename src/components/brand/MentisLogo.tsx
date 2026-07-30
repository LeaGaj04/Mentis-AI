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
        {/* Lavanda suave — serenidad e introspección */}
        <linearGradient id="mentis-calm" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c4b5fd" /> {/* calm-300 */}
          <stop offset="100%" stopColor="#a78bfa" /> {/* calm-400 */}
        </linearGradient>
        {/* Coral cálido — empatía y cercanía */}
        <linearGradient id="mentis-warmth" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb923c" /> {/* warmth-400 */}
          <stop offset="100%" stopColor="#f97316" /> {/* warmth-500 */}
        </linearGradient>
        {/* Glow central lavanda */}
        <radialGradient id="mentis-center-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ede9fe" stopOpacity="1" />
          <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.6" />
        </radialGradient>
      </defs>
      
      <g filter="url(#neon-glow)">
        {/* Left Triangle — Lavanda (mente, calma) */}
        <polygon 
          points="10,50 46,15 46,85" 
          fill="url(#mentis-calm)" 
          opacity="0.9"
        />
        
        {/* Right Triangle — Coral (corazón, empatía) */}
        <polygon 
          points="90,50 54,15 54,85" 
          fill="url(#mentis-warmth)" 
          opacity="0.9"
        />
        
        {/* Central Core — punto de conexión mente-corazón */}
        <circle cx="50" cy="50" r="4" fill="url(#mentis-center-glow)" opacity="1" />
        <circle cx="50" cy="35" r="2.5" fill="#ede9fe" opacity="0.8" />
        <circle cx="50" cy="65" r="2.5" fill="#ede9fe" opacity="0.8" />
      </g>
    </svg>
  );
};
