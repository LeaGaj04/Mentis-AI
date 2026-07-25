'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useChat } from 'ai/react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatMode } from './ModeSelector';
import { Sparkles, AlertTriangle, ShieldCheck, HeartHandshake, RefreshCw } from 'lucide-react';

interface ChatContainerProps {
  currentMode: ChatMode;
  activeChatId: string | null;
  onNewChatCreated?: (newChatId: string) => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  currentMode,
  activeChatId,
  onNewChatCreated,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [fetchingHistory, setFetchingHistory] = useState(false);
  const [customError, setCustomError] = useState<string | null>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setMessages,
    reload,
  } = useChat({
    api: '/api/chat',
    body: {
      chatId: activeChatId,
      mode: currentMode,
    },
    onError: (err) => {
      console.error('API Chat Error:', err);
      setCustomError('No pudimos conectar con Mentis en este momento. Por favor verifica tu conexión o intenta nuevamente.');
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (currentMode === 'evolucion' && activeChatId) {
      setFetchingHistory(true);
      setCustomError(null);
      fetch(`/api/chats/${activeChatId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.messages && Array.isArray(data.messages)) {
            setMessages(
              data.messages.map((msg: any) => ({
                id: msg.id,
                role: msg.role,
                content: msg.content,
                createdAt: new Date(msg.created_at),
              }))
            );
          }
        })
        .catch((err) => {
          console.error('Error loading chat messages:', err);
          setCustomError('Error al cargar el historial de la conversación.');
        })
        .finally(() => {
          setFetchingHistory(false);
        });
    } else if (currentMode === 'confidente') {
      setMessages([]);
      setCustomError(null);
    }
  }, [activeChatId, currentMode, setMessages]);

  const welcomeMessage = currentMode === 'confidente'
    ? '¡Hola! Soy Mentis, tu confidente y apoyo emocional. Estás en Modo Confidente (100% anónimo y efímero). Nada de lo que hablemos aquí quedará guardado al cerrar esta sesión. ¿De qué te gustaría hablar hoy?'
    : '¡Hola! Bienvenido de nuevo a Mentis en Modo Evolución. Tus mensajes se guardarán para que puedas retomar nuestra conversación en cualquier momento. ¿Cómo te has sentido hoy?';

  return (
    <div className="flex flex-1 flex-col h-full bg-slate-50/50 dark:bg-slate-950/50 overflow-hidden">
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-4 space-y-2">
        {fetchingHistory ? (
          <div className="flex h-full items-center justify-center text-slate-400 dark:text-slate-500 gap-2 text-sm">
            <RefreshCw className="h-5 w-5 animate-spin text-teal-600 dark:text-teal-500" />
            <span>Cargando tu conversación...</span>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center p-6 max-w-lg mx-auto animate-fade-in">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-400 to-teal-700 dark:from-teal-600 dark:to-teal-800 text-white shadow-xl shadow-teal-500/20 dark:shadow-teal-900/40 mb-4">
              <HeartHandshake className="h-8 w-8" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              Te doy la bienvenida a <span className="text-teal-700 dark:text-teal-400">Mentis</span>
            </h2>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border border-teal-200/80 dark:border-teal-700/50 text-xs font-semibold mb-4">
              {currentMode === 'confidente' ? (
                <>
                  <ShieldCheck className="h-3.5 w-3.5" /> Modo Confidente • Anónimo & Efímero
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" /> Modo Evolución • Historial Guardado
                </>
              )}
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 bg-white dark:bg-slate-900/80 p-4 rounded-2xl border border-teal-100 dark:border-teal-900/50 shadow-xs">
              {welcomeMessage}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-left w-full">
              <div className="p-3 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200/80 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 hover:border-teal-300 dark:hover:border-teal-700 transition-colors">
                💡 <span className="font-semibold text-slate-800 dark:text-slate-300">Psicoeducación:</span> "¿Cómo puedo gestionar la frustración cuando algo no me sale bien?"
              </div>
              <div className="p-3 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200/80 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 hover:border-teal-300 dark:hover:border-teal-700 transition-colors">
                🌱 <span className="font-semibold text-slate-800 dark:text-slate-300">Orientación:</span> "Me siento muy estresado por el trabajo, ¿qué técnicas me recomiendas?"
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                role={msg.role as 'user' | 'assistant' | 'system'}
                content={msg.content}
                createdAt={msg.createdAt}
              />
            ))}
          </>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 p-4 text-xs text-teal-700 dark:text-teal-500 font-medium animate-pulse">
            <Sparkles className="h-4 w-4 animate-spin" />
            <span>Mentis está pensando y escribiendo...</span>
          </div>
        )}

        {(error || customError) && (
          <div className="m-4 flex items-center justify-between gap-3 rounded-2xl bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800/50 text-xs text-red-700 dark:text-red-400 shadow-sm">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 shrink-0" />
              <span>{customError || 'Ha ocurrido un error en la comunicación con Mentis.'}</span>
            </div>
            <button
              onClick={() => {
                setCustomError(null);
                reload();
              }}
              className="flex items-center gap-1 font-semibold text-red-700 dark:text-red-400 hover:underline bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-red-300 dark:border-red-800/50"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Reintentar
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={(e) => {
          setCustomError(null);
          handleSubmit(e);
        }}
        isLoading={isLoading}
      />
    </div>
  );
};
