'use client';

import React from 'react';
import { HeartHandshake, User, LogOut, PanelLeft, Sparkles } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface HeaderProps {
  user: SupabaseUser | null;
  onOpenAuthModal: () => void;
  onSignOut: () => void;
  onToggleSidebar: () => void;
  showSidebarButton: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenAuthModal,
  onSignOut,
  onToggleSidebar,
  showSidebarButton,
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 py-3 backdrop-blur-md shadow-xs">
      <div className="flex items-center gap-3">
        {showSidebarButton && (
          <button
            onClick={onToggleSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            title="Abrir historial"
          >
            <PanelLeft className="h-5 w-5" />
          </button>
        )}

        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-md shadow-teal-600/20">
            <HeartHandshake className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-bold text-slate-800 tracking-tight">Mentis</h1>
              <span className="flex items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-700 border border-teal-200/60">
                <Sparkles className="h-3 w-3" /> AI
              </span>
            </div>
            <p className="text-xs text-slate-500">Psicoeducación & Orientación Emocional</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {user ? (
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-semibold text-slate-700">{user.email}</span>
              <span className="text-[10px] text-teal-600 font-medium">Modo Evolución Activo</span>
            </div>
            <button
              onClick={onSignOut}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-red-600 transition-all"
              title="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-1.5 rounded-xl bg-teal-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-teal-600/20 hover:bg-teal-700 transition-all"
          >
            <User className="h-4 w-4" />
            <span>Iniciar Sesión / Registro</span>
          </button>
        )}
      </div>
    </header>
  );
};
