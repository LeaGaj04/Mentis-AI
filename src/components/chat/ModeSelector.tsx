'use client';

import React from 'react';
import { ShieldCheck, History, Lock, Sparkles } from 'lucide-react';

export type ChatMode = 'confidente' | 'evolucion';

interface ModeSelectorProps {
  currentMode: ChatMode;
  onSelectMode: (mode: ChatMode) => void;
  isAuthenticated: boolean;
  onOpenAuthModal: () => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  currentMode,
  onSelectMode,
  isAuthenticated,
  onOpenAuthModal,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-2">
      <div className="grid grid-cols-2 gap-2 p-1.5 bg-calm-100/70 dark:bg-calm-900/30 rounded-2xl backdrop-blur-sm border border-calm-200/50 dark:border-calm-800/50 shadow-inner">
        {/* Modo Confidente */}
        <button
          type="button"
          onClick={() => onSelectMode('confidente')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
            currentMode === 'confidente'
              ? 'bg-white dark:bg-mist-800 text-sage-700 dark:text-sage-300 shadow-md shadow-calm-400/10 dark:shadow-calm-950/50'
              : 'text-mist-600 dark:text-mist-400 hover:text-mist-900 dark:hover:text-mist-200 hover:bg-white/40 dark:hover:bg-mist-800/40'
          }`}
        >
          <ShieldCheck className={`h-4 w-4 ${currentMode === 'confidente' ? 'text-sage-500 dark:text-sage-400' : 'text-mist-500 dark:text-mist-500'}`} />
          <div className="flex flex-col text-left">
            <span>Modo Confidente</span>
            <span className="text-[10px] font-normal text-mist-500 dark:text-mist-400 hidden sm:inline">Efímero y Anónimo</span>
          </div>
        </button>

        {/* Modo Evolución */}
        <button
          type="button"
          onClick={() => {
            if (!isAuthenticated) {
              onOpenAuthModal();
            } else {
              onSelectMode('evolucion');
            }
          }}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
            currentMode === 'evolucion'
              ? 'bg-gradient-to-r from-calm-600 to-calm-500 text-white shadow-md shadow-calm-700/20 dark:shadow-calm-900/40'
              : 'text-mist-600 dark:text-mist-400 hover:text-mist-900 dark:hover:text-mist-200 hover:bg-white/40 dark:hover:bg-mist-800/40'
          }`}
        >
          {isAuthenticated ? (
            <History className={`h-4 w-4 ${currentMode === 'evolucion' ? 'text-calm-200' : 'text-calm-500 dark:text-calm-500'}`} />
          ) : (
            <Lock className="h-4 w-4 text-warmth-500 dark:text-warmth-400" />
          )}
          <div className="flex flex-col text-left">
            <span className="flex items-center gap-1">
              Modo Evolución
              {!isAuthenticated && (
                <span className="text-[9px] bg-warmth-100 dark:bg-warmth-900/50 text-warmth-700 dark:text-warmth-400 px-1.5 py-0.5 rounded-full font-bold uppercase border border-warmth-200 dark:border-warmth-800">
                  Login
                </span>
              )}
            </span>
            <span className={`text-[10px] font-normal hidden sm:inline ${currentMode === 'evolucion' ? 'text-calm-100' : 'text-mist-500 dark:text-mist-400'}`}>
              Historial Guardado
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
