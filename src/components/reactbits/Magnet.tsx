'use client';

import React, { useRef, useState } from 'react';

/**
 * Magnet — Wrapper that creates a magnetic hover effect
 * Inspired by ReactBits Magnet.
 * Elements inside this wrapper will "attract" towards the cursor when hovered,
 * creating an interactive magnetic feeling.
 * 
 * @see https://reactbits.dev/ts/animations/magnet
 */

export interface MagnetProps {
  children: React.ReactNode;
  className?: string;
  /** How strong the magnetic pull is (0-1). Default: 0.3 */
  strength?: number;
  /** Max distance in px the element can move. Default: 15 */
  maxDistance?: number;
  /** Whether the effect is disabled. Default: false */
  disabled?: boolean;
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  className = '',
  strength = 0.3,
  maxDistance = 15,
  disabled = false,
}) => {
  const magnetRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !magnetRef.current) return;

    const rect = magnetRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let deltaX = (e.clientX - centerX) * strength;
    let deltaY = (e.clientY - centerY) * strength;

    // Clamp to max distance
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance > maxDistance) {
      const scale = maxDistance / distance;
      deltaX *= scale;
      deltaY *= scale;
    }

    setTransform({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
  };

  return (
    <div
      ref={magnetRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-block',
        transition: transform.x === 0 && transform.y === 0
          ? 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)'
          : 'transform 0.15s cubic-bezier(0.33, 1, 0.68, 1)',
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

export default Magnet;
