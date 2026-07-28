'use client';

import Link from 'next/link';
import { User, LogOut, PanelLeft, Sparkles, Home } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { MentisLogo } from '@/components/brand/MentisLogo';

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
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-950/60 px-4 py-3 backdrop-blur-md shadow-xs transition-colors">
      <div className="flex items-center gap-3">
        {showSidebarButton && (
          <button
            onClick={onToggleSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            title="Abrir historial"
          >
            <PanelLeft className="h-5 w-5" />
          </button>
        )}

        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity" title="Ir a la página de información">
          <div className="flex h-10 w-10 items-center justify-center">
            <MentisLogo className="w-8 h-8 drop-shadow-md" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-bold text-slate-800 dark:text-slate-200 tracking-tight">Mentis</h1>
              <span className="flex items-center gap-1 rounded-full bg-slate-50 dark:bg-slate-900/30 px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/50">
                <Sparkles className="h-3 w-3" /> AI
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Psicoeducación & Orientación Emocional</p>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Link 
          href="/"
          className="flex h-9 items-center justify-center gap-1.5 rounded-xl border border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 px-3 transition-colors"
          title="Volver a Inicio"
        >
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline text-xs font-semibold">Inicio</span>
        </Link>
        <ThemeToggle />
        
        {user ? (
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{user.email}</span>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Modo Evolución Activo</span>
            </div>
            <button
              onClick={onSignOut}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-red-600 dark:hover:text-red-400 transition-all"
              title="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-1.5 rounded-xl bg-slate-600 dark:bg-slate-700 px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-slate-600/20 hover:bg-slate-700 dark:hover:bg-slate-600 transition-all"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Iniciar Sesión</span>
          </button>
        )}
      </div>
    </header>
  );
}
