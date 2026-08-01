'use client';

import React from 'react';
import { Send, Loader2, Info, Square } from 'lucide-react';
import { AutoResizeTextarea } from '@/components/ui/AutoResizeTextarea';
import Magnet from '@/components/reactbits/Magnet';

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  stop: () => void;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  stop,
  placeholder = 'Escribe tu mensaje o cuéntame cómo te sientes...',
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if ((input || '').trim() && !isLoading) {
        const form = e.currentTarget.form;
        if (form) form.requestSubmit();
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4 pt-2">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col rounded-2xl border border-calm-200 dark:border-calm-800/50 bg-white/90 dark:bg-mist-900/90 backdrop-blur-md shadow-lg shadow-calm-900/5 dark:shadow-calm-900/10 focus-within:border-calm-400 dark:focus-within:border-calm-500 focus-within:ring-2 focus-within:ring-calm-400/20 dark:focus-within:ring-calm-500/10 transition-all"
      >
        <div className="flex items-end p-2 sm:p-3 gap-2">
          <AutoResizeTextarea
            rows={1}
            value={input || ''}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1 resize-none bg-transparent px-2 py-1.5 text-sm sm:text-base text-mist-800 dark:text-mist-200 placeholder-calm-300 dark:placeholder-calm-600 focus:outline-none max-h-40 min-h-[44px]"
          />

          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500 dark:bg-red-600 text-white font-medium shadow-md shadow-red-500/30 transition-all hover:bg-red-600 dark:hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500/50"
              aria-label="Detener generación"
            >
              <Square className="h-4 w-4 fill-current" />
            </button>
          ) : (
            <Magnet strength={0.3} maxDistance={8} disabled={!(input || '').trim()}>
              <button
                type="submit"
                disabled={!(input || '').trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-calm-600 dark:bg-calm-700 text-white font-medium shadow-md shadow-calm-600/30 dark:shadow-calm-900/40 transition-all hover:bg-calm-500 dark:hover:bg-calm-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-calm-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-calm-600 dark:disabled:hover:bg-calm-700"
                aria-label="Enviar mensaje"
              >
                <Send className="h-5 w-5" />
              </button>
            </Magnet>
          )}
        </div>
      </form>

      <div className="mt-2 flex items-center justify-center gap-1.5 text-center text-xs text-mist-500 dark:text-mist-400 font-medium">
        <Info className="h-3.5 w-3.5 text-calm-400 dark:text-calm-500 shrink-0" />
        <span>Esta IA proporciona información general y no reemplaza la terapia profesional.</span>
      </div>
    </div>
  );
};
