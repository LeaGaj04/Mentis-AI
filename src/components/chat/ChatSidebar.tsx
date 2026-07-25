'use client';

import React from 'react';
import { MessageSquare, Plus, Trash2, X, Sparkles } from 'lucide-react';

export interface ChatSession {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chats: ChatSession[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
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
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-72 flex flex-col bg-slate-900 text-slate-100 border-r border-slate-800 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white font-bold">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-bold text-sm text-slate-200">Mis Conversaciones</span>
          </div>

          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-600/20 border border-teal-500/30 text-teal-300 py-2.5 px-4 text-xs font-semibold hover:bg-teal-600/30 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Nueva Conversación</span>
          </button>
        </div>

        {/* List of Chats */}
        <div className="flex-1 overflow-y-auto px-2 py-1 space-y-1">
          {chats.length === 0 ? (
            <div className="text-center py-8 px-4 text-xs text-slate-500">
              No tienes conversaciones guardadas aún.
            </div>
          ) : (
            chats.map((chat) => {
              const isActive = chat.id === activeChatId;
              return (
                <div
                  key={chat.id}
                  className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-800 text-teal-400 font-semibold'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                  onClick={() => onSelectChat(chat.id)}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <MessageSquare className={`h-4 w-4 shrink-0 ${isActive ? 'text-teal-400' : 'text-slate-500'}`} />
                    <span className="truncate">{chat.title || 'Conversación'}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(chat.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 transition-opacity"
                    title="Eliminar conversación"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-800 text-[10px] text-slate-500 text-center">
          Mentis AI • Modo Evolución
        </div>
      </aside>
    </>
  );
};
