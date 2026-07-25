-- ====================================================================
-- Mentis-AI: Esquema de Base de Datos para Supabase (PostgreSQL)
-- Ejecutar en el SQL Editor del Panel de Supabase
-- ====================================================================

-- 1. Tabla de Conversaciones / Chats (Modo Evolución)
CREATE TABLE IF NOT EXISTS public.chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Nueva conversación',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Tabla de Mensajes
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID NOT NULL REFERENCES public.chats(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Índices para consultas rápidas por usuario y conversación
CREATE INDEX IF NOT EXISTS idx_chats_user_id ON public.chats(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON public.messages(chat_id, created_at ASC);

-- 4. Habilitar Seguridad a Nivel de Fila (RLS)
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- 5. Políticas RLS para la tabla chats
DROP POLICY IF EXISTS "Usuarios pueden ver sus propios chats" ON public.chats;
CREATE POLICY "Usuarios pueden ver sus propios chats"
  ON public.chats FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuarios pueden crear sus propios chats" ON public.chats;
CREATE POLICY "Usuarios pueden crear sus propios chats"
  ON public.chats FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuarios pueden actualizar sus propios chats" ON public.chats;
CREATE POLICY "Usuarios pueden actualizar sus propios chats"
  ON public.chats FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuarios pueden eliminar sus propios chats" ON public.chats;
CREATE POLICY "Usuarios pueden eliminar sus propios chats"
  ON public.chats FOR DELETE
  USING (auth.uid() = user_id);

-- 6. Políticas RLS para la tabla messages
DROP POLICY IF EXISTS "Usuarios pueden ver mensajes de sus chats" ON public.messages;
CREATE POLICY "Usuarios pueden ver mensajes de sus chats"
  ON public.messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.chats
      WHERE public.chats.id = public.messages.chat_id
      AND public.chats.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Usuarios pueden insertar mensajes en sus chats" ON public.messages;
CREATE POLICY "Usuarios pueden insertar mensajes en sus chats"
  ON public.messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.chats
      WHERE public.chats.id = public.messages.chat_id
      AND public.chats.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Usuarios pueden borrar mensajes de sus chats" ON public.messages;
CREATE POLICY "Usuarios pueden borrar mensajes de sus chats"
  ON public.messages FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.chats
      WHERE public.chats.id = public.messages.chat_id
      AND public.chats.user_id = auth.uid()
    )
  );
