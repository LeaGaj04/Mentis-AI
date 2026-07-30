'use client';

import React, { useState } from 'react';
import { X, MessageSquare, Plus, Trash2, Network, Sparkles, Crown, Clock, RefreshCw } from 'lucide-react';

export interface ChatSession {
  id: string;
  title: string;
  created_at: string;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chats: ChatSession[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string, e: React.MouseEvent) => void | Promise<void>;
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
  const [activeTab, setActiveTab] = useState<'chats' | 'network'>('chats');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingId(chatId);
    try {
      await onDeleteChat(chatId, e);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-mist-900/40 dark:bg-mist-950/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-80 flex-col border-r border-calm-200 dark:border-calm-800/30 bg-white dark:bg-[#0c0a1a] shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 pt-6 pb-2">
          <h2 className="text-sm font-bold text-mist-800 dark:text-mist-200 uppercase tracking-widest flex items-center gap-2">
            Mentis <span className="font-normal text-calm-400 dark:text-calm-500">Hub</span>
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-mist-400 hover:bg-calm-50 dark:hover:bg-calm-900/30 hover:text-mist-600 dark:hover:text-mist-300 lg:hidden transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-4 mt-4">
          <div className="flex rounded-xl bg-calm-100/50 dark:bg-calm-900/30 p-1">
            <button
              onClick={() => setActiveTab('chats')}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all ${
                activeTab === 'chats'
                  ? 'bg-white dark:bg-mist-800 text-mist-900 dark:text-mist-100 shadow-sm ring-1 ring-calm-200/50 dark:ring-calm-700/50'
                  : 'text-mist-500 dark:text-mist-400 hover:text-mist-700 dark:hover:text-mist-300'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Chats
            </button>
            <button
              onClick={() => setActiveTab('network')}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all ${
                activeTab === 'network'
                  ? 'bg-white dark:bg-mist-800 text-mist-900 dark:text-mist-100 shadow-sm ring-1 ring-calm-200/50 dark:ring-calm-700/50'
                  : 'text-mist-500 dark:text-mist-400 hover:text-mist-700 dark:hover:text-mist-300'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              Red
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto mt-4 custom-scrollbar">
          
          {/* CHATS TAB */}
          {activeTab === 'chats' && (
            <div className="px-4 pb-4 space-y-4">
              <button
                onClick={onNewChat}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-calm-600 to-calm-500 px-4 py-2.5 text-sm font-semibold text-white border-0 hover:from-calm-500 hover:to-calm-400 transition-all shadow-md shadow-calm-600/20"
              >
                <Plus className="h-4 w-4" />
                Nueva Conversación
              </button>

              <div className="space-y-1">
                {chats.length === 0 ? (
                  <div className="mt-8 px-4 text-center text-xs text-mist-500 dark:text-mist-400 leading-relaxed">
                    Aún no hay conversaciones. <br/>Inicia una para empezar a mapear tu mente.
                  </div>
                ) : (
                  chats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => onSelectChat(chat.id)}
                      className={`group flex cursor-pointer items-center justify-between rounded-xl px-3 py-3 text-sm transition-all ${
                        activeChatId === chat.id
                          ? 'bg-calm-100 dark:bg-calm-900/40 text-mist-900 dark:text-mist-100 font-medium shadow-sm'
                          : 'text-mist-600 dark:text-mist-400 hover:bg-calm-50 dark:hover:bg-calm-900/20 hover:text-mist-900 dark:hover:text-mist-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <MessageSquare className={`h-4 w-4 shrink-0 ${activeChatId === chat.id ? 'text-calm-600 dark:text-calm-400' : 'text-mist-400 dark:text-mist-500'}`} />
                        <span className="truncate">{chat.title}</span>
                      </div>
                      
                      <button
                        onClick={(e) => handleDelete(chat.id, e)}
                        disabled={deletingId === chat.id}
                        className="shrink-0 rounded-md p-1.5 opacity-0 text-mist-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 group-hover:opacity-100 transition-all disabled:opacity-100"
                        title="Eliminar conversación"
                      >
                        {deletingId === chat.id ? (
                          <RefreshCw className="h-4 w-4 animate-spin text-red-500" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* NETWORK TAB */}
          {activeTab === 'network' && (
            <div className="px-6 pb-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-calm-500 dark:text-calm-400">Mapa Cognitivo</h3>
                <Sparkles className="w-4 h-4 text-warmth-400 dark:text-warmth-500 opacity-70" />
              </div>
              
              {/* Timeline / Connections Mockup */}
              <div className="relative border-l-2 border-calm-200 dark:border-calm-800 ml-3 space-y-8">
                
                {/* Node 1 */}
                <div className="relative pl-6">
                  <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-white dark:border-[#0c0a1a] bg-calm-400 dark:bg-calm-500" />
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-3 h-3 text-calm-400" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-mist-500 dark:text-mist-400">Hace 8 años (Edad 12)</span>
                  </div>
                  <div className="rounded-xl bg-calm-50 dark:bg-calm-900/20 border border-calm-200 dark:border-calm-800/50 p-3 shadow-sm">
                    <p className="text-xs text-mist-700 dark:text-mist-300 leading-relaxed">
                      "Mis padres discutían mucho y yo me escondía a leer."
                    </p>
                  </div>
                </div>

                {/* Connection Line effect */}
                <div className="absolute left-[-1px] top-12 h-16 w-[2px] bg-gradient-to-b from-calm-300 to-warmth-300 dark:from-calm-700 dark:to-warmth-700" />

                {/* Node 2 */}
                <div className="relative pl-6">
                  <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-white dark:border-[#0c0a1a] bg-warmth-400 dark:bg-warmth-500 shadow-[0_0_8px_rgba(251,146,60,0.3)]" />
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-3 h-3 text-warmth-400" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-mist-800 dark:text-mist-200">Actualidad (Edad 20)</span>
                  </div>
                  <div className="rounded-xl bg-warmth-50 dark:bg-warmth-900/20 border border-warmth-200 dark:border-warmth-800/50 p-3 shadow-sm">
                    <p className="text-xs text-mist-800 dark:text-mist-200 leading-relaxed font-medium">
                      "Evito los conflictos en mi relación actual y me aíslo."
                    </p>
                    <div className="mt-2 pt-2 border-t border-warmth-200 dark:border-warmth-800/50 flex items-start gap-2">
                       <Sparkles className="w-3 h-3 text-calm-500 dark:text-calm-400 shrink-0 mt-0.5" />
                       <p className="text-[10px] text-calm-600 dark:text-calm-400 leading-snug">
                         Mentis encontró un patrón de evasión heredado. Sanar la herida de los 12 años te ayudará hoy.
                       </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* PRO Subscription Card */}
        <div className="p-4 bg-white dark:bg-[#0c0a1a] border-t border-calm-100 dark:border-calm-900/50">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-calm-900 to-calm-950 p-4 shadow-lg ring-1 ring-calm-800 group">
            {/* Therapeutic background effects */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-calm-500/10 rounded-full blur-xl group-hover:bg-calm-500/20 transition-colors" />
            <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-warmth-400/10 rounded-full blur-xl group-hover:bg-warmth-400/20 transition-colors" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-warmth-300" />
                  Mentis <span className="text-calm-300">PRO</span>
                </h4>
              </div>
              <p className="text-xs text-calm-200/60 mb-3 leading-relaxed">
                Desbloquea memoria ilimitada y análisis de patrones profundos.
              </p>
              <button className="w-full rounded-lg bg-white text-calm-900 hover:bg-calm-50 border-0 py-2 text-xs font-bold transition-all shadow-md">
                Ver planes
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
