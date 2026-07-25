import type { Metadata } from 'next';
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
    <html lang="es" className="h-full">
      <body className="h-full antialiased flex flex-col bg-slate-50 text-slate-800">
        {children}
      </body>
    </html>
  );
}
