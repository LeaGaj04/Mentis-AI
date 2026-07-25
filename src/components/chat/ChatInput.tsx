'use client';

import React, { useRef, useEffect } from 'react';
import { Send, Loader2, Info } from 'lucide-react';

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  placeholder = 'Escribe tu mensaje o cuéntame cómo te sientes...',
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        const form = e.currentTarget.form;
        if (form) form.requestSubmit();
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4 pt-2">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg shadow-slate-900/5 dark:shadow-slate-900/10 focus-within:border-slate-500 dark:focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-500/20 dark:focus-within:ring-slate-500/10 transition-all"
      >
        <div className="flex items-end p-2 sm:p-3 gap-2">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1 resize-none bg-transparent px-2 py-1.5 text-sm sm:text-base text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none max-h-40 min-h-[44px]"
          />

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-600 dark:bg-slate-700 text-white font-medium shadow-md shadow-slate-600/30 dark:shadow-slate-900/40 transition-all hover:bg-slate-700 dark:hover:bg-slate-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-600 dark:disabled:hover:bg-slate-700"
            aria-label="Enviar mensaje"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </form>

      <div className="mt-2 flex items-center justify-center gap-1.5 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
        <Info className="h-3.5 w-3.5 text-slate-600 dark:text-slate-500 shrink-0" />
        <span>Esta IA proporciona información general y no reemplaza la terapia profesional.</span>
      </div>
    </div>
  );
};
