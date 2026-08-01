'use client';

import React from 'react';

/**
 * GradientText — Text with animated color-shifting gradient
 * Inspired by ReactBits GradientText.
 * Applies an animated gradient that smoothly shifts colors across the text.
 * 
 * @see https://reactbits.dev/ts/text-animations/gradient-text
 */

export interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
  animationDirection?: 'horizontal' | 'diagonal' | 'vertical';
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = '',
  colors = ['#8b5cf6', '#a78bfa', '#fb923c', '#fdba74', '#8b5cf6'],
  speed = 6,
  animationDirection = 'horizontal',
}) => {
  const gradientDirection =
    animationDirection === 'horizontal' ? '90deg' :
    animationDirection === 'diagonal' ? '135deg' : '180deg';

  const gradientStops = colors.map((color, i) => {
    const percentage = (i / (colors.length - 1)) * 100;
    return `${color} ${percentage}%`;
  }).join(', ');

  const animationDuration = `${speed}s`;

  return (
    <>
      <style>{`
        @keyframes gradientTextShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      <span
        className={className}
        style={{
          background: `linear-gradient(${gradientDirection}, ${gradientStops})`,
          backgroundSize: '200% 200%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          animation: `gradientTextShift ${animationDuration} ease infinite`,
          display: 'inline-block',
        }}
      >
        {children}
      </span>
    </>
  );
};

export default GradientText;
