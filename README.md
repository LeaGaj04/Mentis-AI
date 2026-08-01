# Mentis AI | Explorador Cognitivo e Inteligencia Artificial

## Demo de mentis-AI V1.0

<img width="1914" height="944" alt="image" src="https://github.com/user-attachments/assets/5d7d8432-569f-424f-b34e-9ec99571e068" />

## Demo de mentis-AI V1.1

Probando colores en texto y logos de la plataforma para encontrar los mas llamativos para los usuarios de Mentis

<img width="1905" height="893" alt="image" src="https://github.com/user-attachments/assets/41b0f058-4dda-4073-8174-7c02ff8fc61e" />

<img width="1908" height="945" alt="image" src="https://github.com/user-attachments/assets/5c39a1e6-d63b-46fc-849b-db95f5e0607e" />

## Demo de mentis-AI v1.2

Demo al *90* porciento funcional responde con normalidad sobre cada tema de conversacion

<img width="1910" height="943" alt="image" src="https://github.com/user-attachments/assets/7da27aa4-897f-4905-aa3f-2bd26e6b166c" />


---

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

---

## Arquitectura del Proyecto

Para mantener el código organizado y escalable, Mentis-AI sigue una arquitectura basada en componentes y el **App Router** de Next.js. A continuación se presenta la estructura principal del directorio `src/`:

```text
src/
├── app/                  # Rutas y páginas de la aplicación
│   ├── api/              # Endpoints del backend (manejo de chats y base de datos)
│   ├── chat/             # Página principal de la interfaz del chat
│   ├── globals.css       # Estilos globales, variables CSS y Tailwind
│   ├── layout.tsx        # Layout global (proveedores de estado y tema)
│   └── page.tsx          # Landing page (Hero, características, privacidad)
├── components/           # Componentes modulares y reutilizables
│   ├── auth/             # Modales y flujos de autenticación
│   ├── background/       # Renderizados de la red neuronal en 3D (Three.js)
│   ├── brand/            # Logos y recursos gráficos de la marca
│   ├── chat/             # Elementos del chat (Mensajes, Input, Sidebar, Selector de Modo)
│   ├── header/           # Barra de navegación principal
│   ├── reactbits/        # Componentes interactivos y animaciones premium
│   ├── theme/            # Proveedores y toggle del modo oscuro
│   └── ui/               # Componentes genéricos de interfaz
├── config/               # Configuraciones (ej. System Prompts de la IA)
├── lib/                  # Lógica de negocio y utilidades
│   └── supabase/         # Clientes de base de datos (Cliente y Servidor)
└── middleware.ts         # Middleware para proteger rutas y verificar sesiones
```
