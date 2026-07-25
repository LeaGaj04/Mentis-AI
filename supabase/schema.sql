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

-- ====================================================================
-- 7. Tabla de Perfiles (Profiles) para Personalización de IA
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Habilitar RLS en profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuarios pueden ver su propio perfil" ON public.profiles;
CREATE POLICY "Usuarios pueden ver su propio perfil"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Usuarios pueden actualizar su propio perfil" ON public.profiles;
CREATE POLICY "Usuarios pueden actualizar su propio perfil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 9. Trigger para crear perfil automáticamente al registrarse en auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, phone)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'phone'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
