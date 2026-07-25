# Mentis AI | Explorador Cognitivo e Inteligencia Artificial

## Sobre el Proyecto

**Mentis AI** es una plataforma web vanguardista que combina Inteligencia Artificial con el análisis psicológico para rastrear, mapear y conectar tus patrones cognitivos. Diseñada con una estética premium, oscura y minimalista (utilizando técnicas de *glassmorphism*), integra un modelo 3D interactivo de una red neuronal que refleja la actividad de la mente.

El proyecto está diseñado para funcionar de manera fluida y privada, utilizando una arquitectura moderna para gestionar la autenticación de usuarios, la persistencia del historial de chats y la creación de un "Mapa Cognitivo" (vinculando sucesos del pasado con comportamientos del presente).

---

## Funcionalidades Principales

* **Interfaz Premium Monocromática:** Diseño UI/UX de alta gama centrado en transmitir sofisticación, utilizando una paleta de colores oscura (Tailwind CSS) y efectos de cristal.
* **Red Neuronal 3D Interactiva:** Fondo dinámico construido con React Three Fiber que simula un cerebro interconectado.
* **Autenticación Segura (Supabase):** Flujo de registro y login completo con campos personalizados (Nombre, Teléfono) y validación de seguridad.
* **Mentis Hub (Panel de Usuario):** Un panel lateral exclusivo que gestiona el historial de chats y aloja la innovadora pestaña "Red", una línea de tiempo que traza los descubrimientos psicológicos de la IA.
* **Backend y Base de Datos:** Almacenamiento seguro de perfiles, variables de sistema y mapeo de datos mediante PostgreSQL (Supabase).

---

## Tecnologías Utilizadas

* **Framework:** Next.js 15 (App Router)
* **Librería UI:** React 19
* **Estilos:** Tailwind CSS
* **Renderizado 3D:** Three.js / React Three Fiber
* **Backend & Auth:** Supabase (PostgreSQL)
* **Lenguaje:** TypeScript

---

## Cómo ejecutarlo localmente

**Pasos de instalación**

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/LeaGaj04/Mentis-AI.git
   cd Mentis-AI
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Copia el archivo `.env.example` y renómbralo a `.env.local`. Rellena las claves de Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
   ```

4. **Configurar la Base de Datos (Supabase):**
   Abre el archivo `supabase/schema.sql` y ejecuta su contenido en el **SQL Editor** de tu panel de Supabase para crear las tablas necesarias (`profiles`, etc.) y configurar los *triggers*.

5. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en funcionamiento.
