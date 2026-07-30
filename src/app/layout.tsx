import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { BlackWhiteNeuralBackground } from '@/components/background/BlackWhiteNeuralBackground';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mentis AI — Psicoeducación, Bienestar Emocional y Orientación con IA',
  description: 'Mentis es un asistente virtual de inteligencia artificial especializado en psicoeducación, orientación emocional y bienestar mental. Un espacio seguro y confidencial para explorar tu mente.',
  keywords: ['psicoeducación', 'bienestar emocional', 'salud mental', 'IA', 'inteligencia artificial', 'orientación psicológica', 'mindfulness', 'terapia', 'Mentis'],
  openGraph: {
    title: 'Mentis AI — Tu espacio seguro de bienestar emocional',
    description: 'Asistente virtual de IA para psicoeducación, orientación y apoyo emocional.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full" suppressHydrationWarning>
      <body className="h-full antialiased flex flex-col bg-calm-50 dark:bg-[#0c0a1a] text-mist-800 dark:text-mist-200 transition-colors">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BlackWhiteNeuralBackground />
          <div className="relative flex flex-col flex-1 h-full w-full z-0">
            {children}
          </div>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
