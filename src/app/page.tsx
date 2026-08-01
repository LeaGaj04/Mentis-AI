'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Brain, Users, Sparkles, MessageSquareHeart, Heart, Leaf } from 'lucide-react';
import { MentisLogo } from '@/components/brand/MentisLogo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import SplitText from '@/components/reactbits/SplitText';
import BlurText from '@/components/reactbits/BlurText';
import AnimatedList from '@/components/reactbits/AnimatedList';
import SpotlightCard from '@/components/reactbits/SpotlightCard';
import Counter from '@/components/reactbits/Counter';
import ShinyText from '@/components/reactbits/ShinyText';
import GradientText from '@/components/reactbits/GradientText';
import Magnet from '@/components/reactbits/Magnet';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-y-auto bg-transparent relative scroll-smooth">
      {/* Landing Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-white/40 dark:bg-calm-950/40 border-b border-calm-200/50 dark:border-calm-800/50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10">
            <MentisLogo className="w-8 h-8 drop-shadow-md" />
          </div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl font-bold text-mist-800 dark:text-mist-200 tracking-tight">Mentis</h1>
            <span className="flex items-center gap-1 rounded-full bg-calm-100 dark:bg-calm-900/40 px-2 py-0.5 text-[10px] font-bold text-calm-700 dark:text-calm-300">
              <Sparkles className="h-3 w-3" />
              <ShinyText shimmerColor="rgba(139, 92, 246, 0.4)" speed={4}>AI</ShinyText>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/chat"
            className="flex items-center gap-2 rounded-xl bg-calm-700 dark:bg-calm-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-calm-700/20 hover:bg-calm-600 dark:hover:bg-calm-500 transition-all"
          >
            Ir al Chat
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center z-10 px-4 pb-24">
        {/* Hero Section */}
        <section className="w-full max-w-5xl mt-20 md:mt-32 flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-calm-100/50 dark:bg-calm-900/30 text-calm-700 dark:text-calm-300 text-sm font-medium border border-calm-200/50 dark:border-calm-800/50 backdrop-blur-sm shadow-sm">
            <Heart className="w-4 h-4" />
            <ShinyText shimmerColor="rgba(255, 255, 255, 0.25)" speed={5}>La próxima generación de apoyo emocional</ShinyText>
          </div>
          <SplitText
            text="Descubre una nueva forma de explorar tu mente"
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-mist-900 dark:text-white drop-shadow-sm max-w-4xl leading-tight"
            tag="h2"
            splitType="words"
            delay={80}
            duration={700}
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="0px"
          />
          <BlurText
            text="Mentis-AI es un asistente virtual avanzado diseñado para ofrecerte psicoeducación, orientación y un espacio seguro para conversar sin juicios."
            className="text-lg md:text-xl text-mist-600 dark:text-mist-300 max-w-2xl mt-2 font-medium"
            animateBy="words"
            delay={30}
            duration={500}
            direction="bottom"
          />
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Magnet strength={0.25} maxDistance={12}>
              <Link
                href="/chat"
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-calm-600 to-calm-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-calm-500/25 hover:shadow-calm-500/40 hover:scale-105 transition-all duration-300 group"
              >
                Iniciar Conversación
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Magnet>
          </div>
        </section>

        {/* Stats Section */}
        <AnimatedList
          className="w-full max-w-5xl mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
          staggerDelay={150}
          duration={600}
          from={{ opacity: 0, y: 40, scale: 0.95 }}
          to={{ opacity: 1, y: 0, scale: 1 }}
        >
          <SpotlightCard className="rounded-3xl" spotlightColor="rgba(139, 92, 246, 0.15)">
            <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/60 dark:bg-mist-900/60 backdrop-blur-md border border-calm-200/50 dark:border-calm-800/50 shadow-xl shadow-calm-200/20 dark:shadow-none transition-transform hover:-translate-y-1 duration-300">
              <Users className="w-10 h-10 text-calm-500 dark:text-calm-400 mb-4" />
              <Counter className="text-4xl font-black text-mist-900 dark:text-white mb-2" prefix="+" to={10000} duration={2000} easing="easeOut" separator="," />
              <span className="text-mist-600 dark:text-mist-400 text-center font-medium">Usuarios buscando bienestar emocional cada día</span>
            </div>
          </SpotlightCard>
          <SpotlightCard className="rounded-3xl" spotlightColor="rgba(251, 146, 60, 0.15)">
            <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/60 dark:bg-mist-900/60 backdrop-blur-md border border-calm-200/50 dark:border-calm-800/50 shadow-xl shadow-calm-200/20 dark:shadow-none transition-transform hover:-translate-y-1 duration-300">
              <MessageSquareHeart className="w-10 h-10 text-warmth-400 dark:text-warmth-300 mb-4" />
              <Counter className="text-4xl font-black text-mist-900 dark:text-white mb-2" prefix="+" to={500} suffix="k" duration={2000} easing="easeOut" />
              <span className="text-mist-600 dark:text-mist-400 text-center font-medium">Mensajes intercambiados en un entorno seguro</span>
            </div>
          </SpotlightCard>
          <SpotlightCard className="rounded-3xl" spotlightColor="rgba(34, 197, 94, 0.12)">
            <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/60 dark:bg-mist-900/60 backdrop-blur-md border border-calm-200/50 dark:border-calm-800/50 shadow-xl shadow-calm-200/20 dark:shadow-none transition-transform hover:-translate-y-1 duration-300">
              <ShieldCheck className="w-10 h-10 text-sage-500 dark:text-sage-400 mb-4" />
              <Counter className="text-4xl font-black text-mist-900 dark:text-white mb-2" to={100} suffix="%" duration={1800} easing="easeInOut" />
              <span className="text-mist-600 dark:text-mist-400 text-center font-medium">Privacidad garantizada y datos protegidos</span>
            </div>
          </SpotlightCard>
        </AnimatedList>

        {/* How it works & Why it's useful */}
        <section className="w-full max-w-5xl mt-32 flex flex-col gap-16">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-mist-900 dark:text-white mb-4">¿Por qué usar Mentis-AI?</h3>
            <p className="text-mist-600 dark:text-mist-400 max-w-2xl mx-auto font-medium">
              Diseñado con tecnología de inteligencia artificial de vanguardia para entender, orientar y acompañar en tus procesos personales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h4 className="text-2xl font-bold text-mist-900 dark:text-white mb-4">Apoyo empático y sin prejuicios</h4>
              <p className="text-mist-600 dark:text-mist-300 mb-6 leading-relaxed">
                A diferencia de buscar información dispersa en internet, Mentis-AI te ofrece un diálogo fluido y contextual. 
                Utiliza modelos de lenguaje natural adaptados para la psicoeducación, brindando herramientas de afrontamiento y 
                perspectivas basadas en enfoques cognitivos y de mindfulness.
              </p>
              <AnimatedList
                className="space-y-4 text-mist-700 dark:text-mist-300 font-medium"
                staggerDelay={120}
                duration={500}
                from={{ opacity: 0, x: -20 }}
                to={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-calm-100 dark:bg-calm-900/50"><Brain className="w-5 h-5 text-calm-600 dark:text-calm-400" /></div>
                  Respuestas adaptadas a tu estado de ánimo
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warmth-100 dark:bg-warmth-900/50"><Leaf className="w-5 h-5 text-warmth-600 dark:text-warmth-400" /></div>
                  Ejercicios prácticos de relajación y reflexión
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sage-100 dark:bg-sage-900/50"><Heart className="w-5 h-5 text-sage-600 dark:text-sage-400" /></div>
                  Disponible 24/7 en cualquier momento y lugar
                </div>
              </AnimatedList>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="w-full h-80 rounded-3xl bg-gradient-to-br from-calm-50 to-warmth-50 dark:from-calm-950 dark:to-mist-900 border border-calm-200/60 dark:border-calm-800 p-6 flex flex-col gap-4 shadow-2xl relative overflow-hidden">
                {/* Mockup chat bubbles */}
                <div className="self-end bg-gradient-to-r from-calm-600 to-calm-500 text-white p-4 rounded-2xl rounded-tr-sm max-w-[80%] text-sm shadow-md mt-4 relative z-10 font-medium">
                  Me siento un poco abrumado por el trabajo últimamente. No logro concentrarme.
                </div>
                <div className="self-start bg-white dark:bg-mist-800 text-mist-800 dark:text-mist-200 p-4 rounded-2xl rounded-tl-sm max-w-[90%] text-sm shadow-xl border border-calm-100 dark:border-calm-800 relative z-10 leading-relaxed font-medium">
                  Es completamente normal sentirse así cuando hay mucha carga. Tomemos un momento. ¿Te gustaría probar un ejercicio breve de respiración para despejar la mente o preferirías organizar juntos tus prioridades?
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="w-full max-w-4xl mt-32 mb-16 text-center bg-gradient-to-br from-calm-900 to-calm-950 dark:from-calm-950 dark:to-mist-950 p-12 rounded-3xl shadow-2xl relative overflow-hidden border border-calm-800">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-calm-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-32 bg-warmth-500/5 blur-[80px] rounded-full pointer-events-none"></div>
          <ShieldCheck className="w-16 h-16 text-sage-400 mx-auto mb-6 relative z-10" />
          <h3 className="text-3xl font-bold mb-4 relative z-10"><GradientText colors={['#ffffff', '#86efac', '#a78bfa', '#ffffff']} speed={8} className="text-3xl font-bold">Privacidad desde el diseño</GradientText></h3>
          <p className="text-calm-200/70 max-w-2xl mx-auto mb-8 leading-relaxed relative z-10">
            Tus conversaciones son un espacio íntimo. Mentis-AI no comparte tus datos personales con terceros para fines publicitarios.
            Además, en el <strong className="text-calm-100">Modo Confidente</strong>, tus mensajes son efímeros y no se guardan en ninguna base de datos.
          </p>
          <Magnet strength={0.2} maxDistance={10}>
            <Link
              href="/chat"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-calm-900 shadow-md hover:bg-calm-50 hover:scale-105 transition-all relative z-10"
            >
              Comenzar de forma segura
            </Link>
          </Magnet>
        </section>
      </main>
    </div>
  );
}
