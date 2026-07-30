'use client';

import React, { useState } from 'react';
import { Bot, User, Sparkles, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt?: Date | string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  const isUser = role === 'user';
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    toast.success('Mensaje copiado al portapapeles');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      className={`flex w-full gap-3 p-4 transition-all animate-fade-in ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {!isUser && (
        <div className="flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-xl bg-gradient-to-br from-calm-400 to-calm-600 text-white shadow-md shadow-calm-500/20">
          <Bot className="h-5 w-5" />
        </div>
      )}

      <div
        className={`group relative max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm transition-colors ${
          isUser
            ? 'bg-gradient-to-r from-calm-600 to-calm-700 dark:from-calm-700 dark:to-calm-800 text-white rounded-br-none'
            : 'bg-white dark:bg-mist-900 border border-calm-100 dark:border-calm-900/50 text-mist-800 dark:text-mist-200 rounded-bl-none shadow-calm-900/5 dark:shadow-none'
        }`}
      >
        {!isUser && (
          <div className="flex items-center justify-between pb-1 mb-1 border-b border-calm-50 dark:border-calm-900/50">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-calm-600 dark:text-calm-400">
              <Sparkles className="h-3 w-3" />
              <span>Mentis</span>
            </div>
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-calm-50 dark:hover:bg-calm-900/50 text-mist-400 hover:text-calm-600 dark:hover:text-calm-300"
              title="Copiar mensaje"
            >
              {isCopied ? <Check className="h-3.5 w-3.5 text-sage-500" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        )}

        <div className="text-sm sm:text-base leading-relaxed break-words font-sans">
          {isUser ? (
            <div className="whitespace-pre-wrap">{content}</div>
          ) : (
            <div className="prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-mist-800 prose-pre:text-mist-100 prose-headings:font-bold prose-a:text-calm-600 dark:prose-a:text-calm-400">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {isUser && (
        <div className="flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-xl bg-gradient-to-br from-calm-500 to-warmth-500 text-white shadow-md shadow-calm-900/10">
          <User className="h-5 w-5" />
        </div>
      )}
    </div>
  );
};
