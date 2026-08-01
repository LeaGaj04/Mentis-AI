'use client';

import Link from 'next/link';
import { User, LogOut, PanelLeft, Sparkles, Home } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { MentisLogo } from '@/components/brand/MentisLogo';
import ShinyText from '@/components/reactbits/ShinyText';

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
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-calm-200/80 dark:border-calm-800/30 bg-white/60 dark:bg-mist-950/60 px-4 py-3 backdrop-blur-md shadow-xs transition-colors">
      <div className="flex items-center gap-3">
        {showSidebarButton && (
          <button
            onClick={onToggleSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-mist-600 dark:text-mist-400 hover:bg-calm-50 dark:hover:bg-calm-900/30 hover:text-calm-700 dark:hover:text-calm-300 transition-colors"
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
              <h1 className="text-lg font-bold text-mist-800 dark:text-mist-200 tracking-tight">Mentis</h1>
              <span className="flex items-center gap-1 rounded-full bg-calm-100 dark:bg-calm-900/30 px-2 py-0.5 text-[10px] font-bold text-calm-700 dark:text-calm-300 border border-calm-200/60 dark:border-calm-700/50">
                <Sparkles className="h-3 w-3" />
                <ShinyText shimmerColor="rgba(139, 92, 246, 0.4)" speed={4}>AI</ShinyText>
              </span>
            </div>
            <p className="text-xs text-mist-500 dark:text-mist-400">Psicoeducación & Orientación Emocional</p>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Link 
          href="/"
          className="flex h-9 items-center justify-center gap-1.5 rounded-xl border border-transparent text-mist-600 dark:text-mist-400 hover:bg-calm-50 dark:hover:bg-calm-900/30 hover:text-calm-700 dark:hover:text-calm-300 px-3 transition-colors"
          title="Volver a Inicio"
        >
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline text-xs font-semibold">Inicio</span>
        </Link>
        <ThemeToggle />
        
        {user ? (
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-semibold text-mist-700 dark:text-mist-300">{user.email}</span>
              <span className="text-[10px] text-calm-600 dark:text-calm-400 font-medium">Modo Evolución Activo</span>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-calm-500 to-warmth-500 text-white font-bold text-sm uppercase shadow-sm border border-white dark:border-mist-800">
              {user.email ? user.email.charAt(0) : <User className="h-4 w-4" />}
            </div>
            <button
              onClick={onSignOut}
              className="flex items-center gap-1.5 rounded-xl border border-calm-200 dark:border-calm-800/50 bg-white dark:bg-mist-900 px-3 py-1.5 text-xs font-medium text-mist-700 dark:text-mist-300 hover:bg-calm-50 dark:hover:bg-calm-900 hover:text-red-600 dark:hover:text-red-400 transition-all ml-1"
              title="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Cerrar</span>
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-1.5 rounded-xl bg-calm-600 dark:bg-calm-700 px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-calm-600/20 hover:bg-calm-500 dark:hover:bg-calm-600 transition-all"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Iniciar Sesión</span>
          </button>
        )}
      </div>
    </header>
  );
}
