'use client';

import React from 'react';

/**
 * ShinyText — Text with an animated shimmer/shine effect
 * Inspired by ReactBits ShinyText.
 * A continuous, subtle shine passes across the text for a premium look.
 * 
 * @see https://reactbits.dev/ts/text-animations/shiny-text
 */

export interface ShinyTextProps {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  speed?: number;
  disabled?: boolean;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  children,
  className = '',
  shimmerColor = 'rgba(255, 255, 255, 0.3)',
  shimmerSize = '200px',
  speed = 3,
  disabled = false,
}) => {
  if (disabled) {
    return <span className={className}>{children}</span>;
  }

  const animationDuration = `${speed}s`;

  return (
    <>
      <style>{`
        @keyframes shinyTextShimmer {
          0% {
            background-position: -${shimmerSize} 0;
          }
          100% {
            background-position: calc(100% + ${shimmerSize}) 0;
          }
        }
      `}</style>
      <span
        className={className}
        style={{
          backgroundImage: `linear-gradient(
            90deg,
            transparent 0%,
            ${shimmerColor} 50%,
            transparent 100%
          )`,
          backgroundSize: `${shimmerSize} 100%`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: `-${shimmerSize} 0`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          animation: `shinyTextShimmer ${animationDuration} ease-in-out infinite`,
          display: 'inline-block',
        }}
      >
        {children}
      </span>
    </>
  );
};

export default ShinyText;
