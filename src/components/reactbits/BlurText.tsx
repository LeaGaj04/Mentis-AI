'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';

/**
 * BlurText — Text that appears with a progressive blur-to-focus effect
 * Inspired by ReactBits BlurText.
 * Zero-dependency implementation using CSS transitions + IntersectionObserver.
 * 
 * @see https://reactbits.dev/ts/text-animations/blur-text
 */

export interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: {
    opacity?: number;
    filter?: string;
    y?: number;
  };
  animationTo?: {
    opacity?: number;
    filter?: string;
    y?: number;
  };
  duration?: number;
  onAnimationComplete?: () => void;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  duration = 400,
  onAnimationComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationCompleted = useRef(false);

  const defaultFrom = {
    opacity: 0,
    filter: 'blur(10px)',
    y: direction === 'top' ? -30 : 30,
  };

  const defaultTo = {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
  };

  const fromStyle = animationFrom || defaultFrom;
  const toStyle = animationTo || defaultTo;

  const elements = useMemo(() => {
    if (animateBy === 'words') {
      return text.split(' ');
    }
    return text.split('');
  }, [text, animateBy]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationCompleted.current) {
          setIsVisible(true);
          animationCompleted.current = true;
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const handleTransitionEnd = (index: number) => {
    if (index === elements.length - 1 && onAnimationComplete) {
      onAnimationComplete();
    }
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: animateBy === 'words' ? '0.3em' : undefined,
      }}
      aria-label={text}
    >
      {elements.map((element, index) => {
        const isSpace = element === ' ';

        return (
          <span
            key={`${element}-${index}`}
            aria-hidden="true"
            style={{
              display: 'inline-block',
              willChange: 'transform, opacity, filter',
              transition: isVisible
                ? `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${index * delay}ms`
                : 'none',
              opacity: isVisible ? (toStyle.opacity ?? 1) : (fromStyle.opacity ?? 0),
              filter: isVisible ? (toStyle.filter ?? 'blur(0px)') : (fromStyle.filter ?? 'blur(10px)'),
              transform: isVisible
                ? `translateY(${toStyle.y ?? 0}px)`
                : `translateY(${fromStyle.y ?? 0}px)`,
              ...(isSpace ? { width: '0.3em' } : {}),
            }}
            onTransitionEnd={() => handleTransitionEnd(index)}
          >
            {isSpace ? '\u00A0' : element}
          </span>
        );
      })}
    </div>
  );
};

export default BlurText;
