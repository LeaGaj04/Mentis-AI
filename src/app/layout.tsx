import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { BlackWhiteNeuralBackground } from '@/components/background/BlackWhiteNeuralBackground';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mentis - Chatbot de Psicoeducación y Bienestar Emocional',
  description: 'Asistente virtual y amigo comprensivo especializado en psicoeducación, orientación y comportamiento humano.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full" suppressHydrationWarning>
      <body className="h-full antialiased flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BlackWhiteNeuralBackground />
          <div className="relative flex flex-col flex-1 h-full w-full z-0">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
