'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';

/**
 * SplitText — Animated text reveal component
 * Inspired by ReactBits SplitText.
 * Zero-dependency implementation using CSS animations + IntersectionObserver.
 * 
 * @see https://reactbits.dev/ts/text-animations/split-text
 */

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  splitType?: 'chars' | 'words';
  from?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotate?: number;
  };
  to?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotate?: number;
  };
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  textAlign?: React.CSSProperties['textAlign'];
  onAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 50,
  duration = 600,
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-50px',
  tag = 'p',
  textAlign = 'center',
  onAnimationComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationCompleted = useRef(false);

  // Split text into words or chars
  const elements = useMemo(() => {
    if (splitType === 'words') {
      return text.split(' ');
    }
    // For chars, we need to preserve word boundaries for wrapping
    return text.split('');
  }, [text, splitType]);

  // Intersection Observer to trigger animation on scroll
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

  // Build initial and final transform strings
  const getFromStyle = (): React.CSSProperties => ({
    opacity: from.opacity ?? 0,
    transform: [
      from.y !== undefined ? `translateY(${from.y}px)` : '',
      from.x !== undefined ? `translateX(${from.x}px)` : '',
      from.scale !== undefined ? `scale(${from.scale})` : '',
      from.rotate !== undefined ? `rotate(${from.rotate}deg)` : '',
    ].filter(Boolean).join(' ') || 'none',
  });

  const getToStyle = (): React.CSSProperties => ({
    opacity: to.opacity ?? 1,
    transform: [
      to.y !== undefined ? `translateY(${to.y}px)` : 'translateY(0)',
      to.x !== undefined ? `translateX(${to.x}px)` : '',
      to.scale !== undefined ? `scale(${to.scale})` : '',
      to.rotate !== undefined ? `rotate(${to.rotate}deg)` : '',
    ].filter(Boolean).join(' ') || 'none',
  });

  // Handle animation end for the last element
  const handleAnimationEnd = (index: number) => {
    if (index === elements.length - 1 && onAnimationComplete) {
      onAnimationComplete();
    }
  };

  const Tag = tag;

  return (
    <Tag
      ref={containerRef as React.RefObject<any>}
      className={className}
      style={{
        textAlign,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start',
        gap: splitType === 'words' ? '0.3em' : undefined,
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
              willChange: 'transform, opacity',
              transition: isVisible
                ? `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${index * delay}ms`
                : 'none',
              ...(isVisible ? getToStyle() : getFromStyle()),
              ...(isSpace ? { width: '0.3em' } : {}),
            }}
            onTransitionEnd={() => handleAnimationEnd(index)}
          >
            {isSpace ? '\u00A0' : element}
          </span>
        );
      })}
    </Tag>
  );
};

export default SplitText;
