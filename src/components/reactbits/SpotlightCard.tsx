'use client';

import React, { useRef, useState } from 'react';

/**
 * SpotlightCard — Card with a spotlight glow that follows the cursor
 * Inspired by ReactBits SpotlightCard.
 * Creates a radial gradient glow effect that tracks the mouse position.
 * 
 * @see https://reactbits.dev/ts/components/spotlight-card
 */

export interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
  spotlightOpacity?: number;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(139, 92, 246, 0.15)',
  spotlightSize = 300,
  spotlightOpacity = 1,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
        style={{
          opacity: isHovered ? spotlightOpacity : 0,
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {/* Card content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
