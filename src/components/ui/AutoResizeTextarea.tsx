'use client';

import React, { useRef, useEffect } from 'react';

export interface AutoResizeTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: number;
}

export const AutoResizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  AutoResizeTextareaProps
>(({ className, value, maxHeight = 160, ...props }, ref) => {
  const internalRef = useRef<HTMLTextAreaElement>(null);
  
  // Use the provided ref if it exists, otherwise use internal
  const textareaRef = (ref as React.MutableRefObject<HTMLTextAreaElement>) || internalRef;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        maxHeight
      )}px`;
    }
  }, [value, maxHeight, textareaRef]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      className={className}
      {...props}
    />
  );
});

AutoResizeTextarea.displayName = 'AutoResizeTextarea';
