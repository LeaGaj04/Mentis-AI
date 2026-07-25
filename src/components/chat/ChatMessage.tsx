'use client';

import React from 'react';
import { Bot, User, Sparkles } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt?: Date | string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  const isUser = role === 'user';

  return (
    <div
      className={`flex w-full gap-3 p-4 transition-all animate-fade-in ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {!isUser && (
        <div className="flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 dark:from-teal-600 dark:to-teal-800 text-white shadow-md shadow-teal-500/20 dark:shadow-teal-900/40">
          <Bot className="h-5 w-5" />
        </div>
      )}

      <div
        className={`group relative max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm transition-colors ${
          isUser
            ? 'bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-700 dark:to-teal-800 text-white rounded-br-none'
            : 'bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-900/50 text-slate-800 dark:text-slate-200 rounded-bl-none shadow-teal-900/5 dark:shadow-none'
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-1.5 pb-1 mb-1 border-b border-teal-50 dark:border-teal-900/50 text-xs font-semibold text-teal-700 dark:text-teal-500">
            <Sparkles className="h-3 w-3" />
            <span>Mentis</span>
          </div>
        )}

        <div className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed break-words font-sans">
          {content}
        </div>
      </div>

      {isUser && (
        <div className="flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-xl bg-slate-700 dark:bg-slate-800 text-white shadow-md shadow-slate-900/10">
          <User className="h-5 w-5" />
        </div>
      )}
    </div>
  );
};
