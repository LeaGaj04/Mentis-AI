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
        <div className="flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-xl bg-gradient-to-br from-slate-500 to-slate-700 dark:from-slate-600 dark:to-slate-800 text-white shadow-md shadow-slate-500/20 dark:shadow-slate-900/40">
          <Bot className="h-5 w-5" />
        </div>
      )}

      <div
        className={`group relative max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm transition-colors ${
          isUser
            ? 'bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-700 dark:to-slate-800 text-white rounded-br-none'
            : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-900/50 text-slate-800 dark:text-slate-200 rounded-bl-none shadow-slate-900/5 dark:shadow-none'
        }`}
      >
        {!isUser && (
          <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-50 dark:border-slate-900/50">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-500">
              <Sparkles className="h-3 w-3" />
              <span>Mentis</span>
            </div>
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              title="Copiar mensaje"
            >
              {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        )}

        <div className="text-sm sm:text-base leading-relaxed break-words font-sans">
          {isUser ? (
            <div className="whitespace-pre-wrap">{content}</div>
          ) : (
            <div className="prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-800 prose-pre:text-slate-100 prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          )}
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
