'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Brain, Users, Sparkles, MessageSquareHeart } from 'lucide-react';
import { MentisLogo } from '@/components/brand/MentisLogo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-y-auto bg-transparent relative scroll-smooth">
      {/* Landing Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-white/40 dark:bg-slate-950/40 border-b border-slate-200/50 dark:border-slate-800/50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10">
            <MentisLogo className="w-8 h-8 drop-shadow-md" />
          </div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 tracking-tight">Mentis</h1>
            <span className="flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:text-slate-400">
              <Sparkles className="h-3 w-3" /> AI
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/chat"
            className="flex items-center gap-2 rounded-xl bg-slate-800 dark:bg-slate-200 px-4 py-2 text-sm font-semibold text-white dark:text-slate-900 shadow-md hover:bg-slate-700 dark:hover:bg-white transition-all"
          >
            Ir al Chat
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center z-10 px-4 pb-24">
        {/* Hero Section */}
        <section className="w-full max-w-5xl mt-20 md:mt-32 flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium border border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm shadow-sm">
            <Sparkles className="w-4 h-4" /> La próxima generación de apoyo emocional
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white drop-shadow-sm max-w-4xl leading-tight">
            Descubre una nueva forma de <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">explorar tu mente</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mt-2 font-medium">
            Mentis-AI es un asistente virtual avanzado diseñado para ofrecerte psicoeducación, 
            orientación y un espacio seguro para conversar sin juicios.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/chat"
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 group"
            >
              Iniciar Conversación
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full max-w-5xl mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-xl shadow-slate-200/20 dark:shadow-none transition-transform hover:-translate-y-1 duration-300">
            <Users className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
            <span className="text-4xl font-black text-slate-900 dark:text-white mb-2">+10,000</span>
            <span className="text-slate-600 dark:text-slate-400 text-center font-medium">Usuarios buscando bienestar emocional cada día</span>
          </div>
          <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-xl shadow-slate-200/20 dark:shadow-none transition-transform hover:-translate-y-1 duration-300 delay-75">
            <MessageSquareHeart className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-4" />
            <span className="text-4xl font-black text-slate-900 dark:text-white mb-2">+500k</span>
            <span className="text-slate-600 dark:text-slate-400 text-center font-medium">Mensajes intercambiados en un entorno seguro</span>
          </div>
          <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-xl shadow-slate-200/20 dark:shadow-none transition-transform hover:-translate-y-1 duration-300 delay-150">
            <ShieldCheck className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mb-4" />
            <span className="text-4xl font-black text-slate-900 dark:text-white mb-2">100%</span>
            <span className="text-slate-600 dark:text-slate-400 text-center font-medium">Privacidad garantizada y datos protegidos</span>
          </div>
        </section>

        {/* How it works & Why it's useful */}
        <section className="w-full max-w-5xl mt-32 flex flex-col gap-16">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">¿Por qué usar Mentis-AI?</h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              Diseñado con tecnología de inteligencia artificial de vanguardia para entender, orientar y acompañar en tus procesos personales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Apoyo empático y sin prejuicios</h4>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                A diferencia de buscar información dispersa en internet, Mentis-AI te ofrece un diálogo fluido y contextual. 
                Utiliza modelos de lenguaje natural adaptados para la psicoeducación, brindando herramientas de afrontamiento y 
                perspectivas basadas en enfoques cognitivos y de mindfulness.
              </p>
              <ul className="space-y-4 text-slate-700 dark:text-slate-300 font-medium">
                <li className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50"><Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /></div>
                  Respuestas adaptadas a tu estado de ánimo
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50"><Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /></div>
                  Ejercicios prácticos de relajación y reflexión
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50"><Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /></div>
                  Disponible 24/7 en cualquier momento y lugar
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="w-full h-80 rounded-3xl bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-950 dark:to-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-2xl relative overflow-hidden">
                {/* Mockup chat bubbles */}
                <div className="self-end bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-2xl rounded-tr-sm max-w-[80%] text-sm shadow-md mt-4 relative z-10 font-medium">
                  Me siento un poco abrumado por el trabajo últimamente. No logro concentrarme.
                </div>
                <div className="self-start bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-4 rounded-2xl rounded-tl-sm max-w-[90%] text-sm shadow-xl border border-slate-100 dark:border-slate-700 relative z-10 leading-relaxed font-medium">
                  Es completamente normal sentirse así cuando hay mucha carga. Tomemos un momento. ¿Te gustaría probar un ejercicio breve de respiración para despejar la mente o preferirías organizar juntos tus prioridades?
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="w-full max-w-4xl mt-32 mb-16 text-center bg-slate-900 dark:bg-slate-950 p-12 rounded-3xl shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          <ShieldCheck className="w-16 h-16 text-emerald-400 mx-auto mb-6 relative z-10" />
          <h3 className="text-3xl font-bold text-white mb-4 relative z-10">Privacidad desde el diseño</h3>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed relative z-10">
            Tus conversaciones son un espacio íntimo. Mentis-AI no comparte tus datos personales con terceros para fines publicitarios.
            Además, en el <strong className="text-slate-300">Modo Confidente</strong>, tus mensajes son efímeros y no se guardan en ninguna base de datos.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-slate-900 shadow-md hover:bg-slate-100 hover:scale-105 transition-all relative z-10"
          >
            Comenzar de forma segura
          </Link>
        </section>
      </main>
    </div>
  );
}
