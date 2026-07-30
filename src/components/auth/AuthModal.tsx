'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { X, Loader2, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MentisLogo } from '@/components/brand/MentisLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!isLogin && password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setIsLoading(false);
      return;
    }

    const supabase = createClient();

    try {
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
              phone: phone,
            }
          }
        });
        if (signUpError) throw signUpError;
      }
      
      router.refresh();
      onSuccess?.();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Ha ocurrido un error en la autenticación.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full rounded-xl border-0 bg-calm-50/50 dark:bg-calm-900/20 px-4 py-2.5 text-sm text-mist-800 dark:text-mist-200 ring-1 ring-calm-200/50 dark:ring-calm-700/50 focus:bg-white dark:focus:bg-mist-800 focus:outline-none focus:ring-2 focus:ring-calm-400 dark:focus:ring-calm-500 transition-all placeholder:text-calm-300 dark:placeholder:text-calm-600";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop (Darkened blur) */}
      <div 
        className="absolute inset-0 bg-mist-900/40 dark:bg-mist-950/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white/80 dark:bg-mist-900/70 backdrop-blur-2xl shadow-2xl dark:shadow-black/50 ring-1 ring-white/50 dark:ring-white/10 animate-fade-in flex flex-col md:flex-row h-[720px] max-h-[95vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-2 bg-calm-50/50 dark:bg-calm-900/50 text-mist-500 hover:bg-calm-100/80 dark:hover:bg-calm-800/80 hover:text-mist-800 dark:hover:text-mist-200 transition-colors backdrop-blur-md"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 overflow-y-auto flex flex-col p-8 sm:p-12 custom-scrollbar">
          <div className="my-auto w-full">
            <div className="mb-8 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="mb-6 flex items-center gap-2">
                 <MentisLogo className="w-8 h-8" />
                 <span className="text-xl font-bold tracking-tight text-mist-800 dark:text-mist-200">Mentis</span>
              </div>
              <h2 className="text-2xl font-bold text-mist-800 dark:text-mist-100">
                {isLogin ? '¡Hola de nuevo!' : 'Crea tu Cuenta'}
              </h2>
              <p className="mt-2 text-sm text-mist-500 dark:text-mist-400">
                {isLogin ? 'Inicia sesión para acceder a tu historial.' : 'Únete para guardar tu evolución personal.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-mist-700 dark:text-mist-300">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={inputClass}
                      placeholder="Juan"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-mist-700 dark:text-mist-300">
                      Apellido
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={inputClass}
                      placeholder="Pérez"
                    />
                  </div>
                </div>
              )}

              {!isLogin && (
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-mist-700 dark:text-mist-300">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                    placeholder="+1 234 567 8900"
                  />
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-mist-700 dark:text-mist-300">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="tu@correo.com"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-mist-700 dark:text-mist-300">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  placeholder="••••••••"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-mist-700 dark:text-mist-300">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputClass}
                    placeholder="••••••••"
                  />
                </div>
              )}

              {error && (
                <div className="rounded-xl bg-red-50/50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400 border border-red-100/50 dark:border-red-900/30 backdrop-blur-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-calm-700 dark:bg-calm-600 py-3 text-sm font-bold text-white shadow-md hover:bg-calm-600 dark:hover:bg-calm-500 focus:outline-none focus:ring-4 focus:ring-calm-500/20 transition-all disabled:opacity-70"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    {isLogin ? 'Entrar a Mentis' : 'Registrarme'}
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center md:text-left text-sm text-mist-600 dark:text-mist-400">
              {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-bold text-calm-700 dark:text-calm-300 hover:underline transition-all"
              >
                {isLogin ? 'Regístrate ahora' : 'Inicia Sesión'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Decorative Panel */}
        <div className="hidden md:flex w-1/2 relative bg-gradient-to-br from-calm-900 via-calm-950 to-mist-950 p-12 flex-col justify-end overflow-hidden">
          {/* Abstract glows — terapéuticos */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-calm-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-warmth-500/8 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-calm-500/5 rounded-full blur-[60px]"></div>
          
          <div className="relative z-10 text-white">
            <h3 className="text-4xl font-bold mb-4 tracking-tight leading-tight">
              Aprovecha tu <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-calm-300 to-warmth-300">Potencial Interior.</span>
            </h3>
            <p className="text-calm-200/60 text-sm leading-relaxed max-w-[90%]">
              Mentis aprende contigo de forma segura, guardando tu progreso y adaptándose a tu perfil para ofrecerte el mejor apoyo psicológico y crecimiento personal.
            </p>
            <div className="mt-8 flex gap-2">
               <div className="w-2.5 h-2.5 rounded-full bg-warmth-400"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-calm-400/40"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-calm-400/20"></div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
