'use client';

import React from 'react';
import { X, MessageSquare, Plus, Trash2 } from 'lucide-react';

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chats: { id: string; title: string; created_at: string }[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string, e: React.MouseEvent) => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  isOpen,
  onClose,
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
}) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 p-4">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Historial</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-600 dark:hover:text-slate-300 lg:hidden transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <button
            onClick={onNewChat}
            className="flex w-full items-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-900/30 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Nueva Conversación
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {chats.length === 0 ? (
            <div className="mt-6 px-4 text-center text-xs text-slate-500 dark:text-slate-400">
              No tienes conversaciones guardadas aún.
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`group flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all ${
                  activeChatId === chat.id
                    ? 'bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-medium'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <MessageSquare className={`h-4 w-4 shrink-0 ${activeChatId === chat.id ? 'text-slate-600 dark:text-slate-500' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span className="truncate">{chat.title}</span>
                </div>
                
                <button
                  onClick={(e) => onDeleteChat(chat.id, e)}
                  className="shrink-0 rounded-md p-1.5 opacity-0 text-slate-400 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 group-hover:opacity-100 transition-all"
                  title="Eliminar conversación"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
