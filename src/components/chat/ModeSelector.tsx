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
      <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-200/70 rounded-2xl backdrop-blur-sm border border-slate-300/50 shadow-inner">
        {/* Modo Confidente */}
        <button
          type="button"
          onClick={() => onSelectMode('confidente')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
            currentMode === 'confidente'
              ? 'bg-white text-teal-800 shadow-md shadow-slate-400/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
          }`}
        >
          <ShieldCheck className={`h-4 w-4 ${currentMode === 'confidente' ? 'text-teal-600' : 'text-slate-500'}`} />
          <div className="flex flex-col text-left">
            <span>Modo Confidente</span>
            <span className="text-[10px] font-normal text-slate-500 hidden sm:inline">Efímero y Anónimo</span>
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
              ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md shadow-teal-700/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
          }`}
        >
          {isAuthenticated ? (
            <History className={`h-4 w-4 ${currentMode === 'evolucion' ? 'text-teal-200' : 'text-teal-600'}`} />
          ) : (
            <Lock className="h-4 w-4 text-amber-600" />
          )}
          <div className="flex flex-col text-left">
            <span className="flex items-center gap-1">
              Modo Evolución
              {!isAuthenticated && (
                <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-bold uppercase">
                  Login
                </span>
              )}
            </span>
            <span className={`text-[10px] font-normal hidden sm:inline ${currentMode === 'evolucion' ? 'text-teal-100' : 'text-slate-500'}`}>
              Historial Guardado
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
