'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

/**
 * Counter — Animated counting number component
 * Inspired by ReactBits Counter.
 * Counts from a start value to an end value with easing animation.
 * Triggers when scrolled into view via IntersectionObserver.
 * 
 * @see https://reactbits.dev/ts/components/counter
 */

export interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  separator?: string;
  decimals?: number;
  threshold?: number;
  rootMargin?: string;
  easing?: 'linear' | 'easeOut' | 'easeInOut' | 'spring';
  onComplete?: () => void;
}

// Easing functions
const easingFunctions = {
  linear: (t: number) => t,
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  spring: (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
};

const formatNumber = (num: number, decimals: number, separator: string): string => {
  const fixed = num.toFixed(decimals);
  if (!separator) return fixed;

  const [intPart, decPart] = fixed.split('.');
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return decPart !== undefined ? `${formatted}.${decPart}` : formatted;
};

const Counter: React.FC<CounterProps> = ({
  from = 0,
  to,
  duration = 2000,
  className = '',
  prefix = '',
  suffix = '',
  separator = ',',
  decimals = 0,
  threshold = 0.1,
  rootMargin = '0px',
  easing = 'easeOut',
  onComplete,
}) => {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(from);
  const [hasAnimated, setHasAnimated] = useState(false);
  const animationRef = useRef<number | null>(null);

  const animate = useCallback(() => {
    const easeFn = easingFunctions[easing];
    const startTime = performance.now();

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeFn(progress);
      const currentValue = from + (to - from) * easedProgress;

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayValue(to);
        onComplete?.();
      }
    };

    animationRef.current = requestAnimationFrame(tick);
  }, [from, to, duration, easing, onComplete]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animate();
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [threshold, rootMargin, hasAnimated, animate]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}{formatNumber(displayValue, decimals, separator)}{suffix}
    </span>
  );
};

export default Counter;
