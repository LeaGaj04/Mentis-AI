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
        <div className="flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-md shadow-teal-500/20">
          <Bot className="h-5 w-5" />
        </div>
      )}

      <div
        className={`group relative max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-br-none'
            : 'bg-white border border-teal-100 text-slate-800 rounded-bl-none shadow-teal-900/5'
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-1.5 pb-1 mb-1 border-b border-teal-50 text-xs font-semibold text-teal-700">
            <Sparkles className="h-3 w-3" />
            <span>Mentis</span>
          </div>
        )}

        {/* Requirements: Use whitespace-pre-wrap to format lists and line breaks naturally */}
        <div className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed break-words font-sans">
          {content}
        </div>
      </div>

      {isUser && (
        <div className="flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-xl bg-slate-700 text-white shadow-md shadow-slate-900/10">
          <User className="h-5 w-5" />
        </div>
      )}
    </div>
  );
};
