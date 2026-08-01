'use client';

import React, { useRef, useEffect, useState, Children, cloneElement, isValidElement } from 'react';

/**
 * AnimatedList — Staggered item reveal animation
 * Inspired by ReactBits AnimatedList.
 * Items appear one by one with a staggered delay when scrolled into view.
 * 
 * @see https://reactbits.dev/ts/components/animated-list
 */

export interface AnimatedListProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  from?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  to?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
}

const AnimatedList: React.FC<AnimatedListProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 500,
  staggerDelay = 100,
  from = { opacity: 0, y: 30, scale: 0.95 },
  to = { opacity: 1, y: 0, scale: 1 },
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationCompleted = useRef(false);

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

  const childArray = Children.toArray(children);

  const getFromStyle = (): React.CSSProperties => ({
    opacity: from.opacity ?? 0,
    transform: [
      from.y !== undefined ? `translateY(${from.y}px)` : '',
      from.x !== undefined ? `translateX(${from.x}px)` : '',
      from.scale !== undefined ? `scale(${from.scale})` : '',
    ].filter(Boolean).join(' ') || 'none',
  });

  const getToStyle = (): React.CSSProperties => ({
    opacity: to.opacity ?? 1,
    transform: [
      to.y !== undefined ? `translateY(${to.y}px)` : 'translateY(0)',
      to.x !== undefined ? `translateX(${to.x}px)` : '',
      to.scale !== undefined ? `scale(${to.scale})` : 'scale(1)',
    ].filter(Boolean).join(' ') || 'none',
  });

  const handleTransitionEnd = (index: number) => {
    if (index === childArray.length - 1 && onAnimationComplete) {
      onAnimationComplete();
    }
  };

  return (
    <div ref={containerRef} className={className}>
      {childArray.map((child, index) => {
        const itemDelay = delay + index * staggerDelay;

        return (
          <div
            key={index}
            style={{
              willChange: 'transform, opacity',
              transition: isVisible
                ? `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${itemDelay}ms`
                : 'none',
              ...(isVisible ? getToStyle() : getFromStyle()),
            }}
            onTransitionEnd={() => handleTransitionEnd(index)}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedList;
