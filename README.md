# Vortyx — Frontend

Aplicación web para centralizar tu historial de entretenimiento. Busca videojuegos, películas y series, guárdalos en tu colección personal y descubre los patrones de lo que te mueve a través de estadísticas visuales.

🌐 **[windy.gammavortex.com](https://windy.gammavortex.com)**

---

## Descripción

Vortyx es el proyecto final del Bootcamp de Desarrollo Web de TripleTen. Permite a los usuarios buscar contenido en catálogos externos (RAWG y TMDB), guardarlo en una colección personal con estados de seguimiento y visualizar estadísticas de consumo con un heatmap de actividad de estilo térmico.

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| React 18 + Vite | SPA — interfaz de usuario |
| React Router DOM v6 | Navegación cliente |
| CSS con metodología BEM | Estilos por componente |
| RAWG API | Catálogo de videojuegos |
| TMDB API | Catálogo de películas y series |
| JWT (localStorage) | Persistencia de sesión |
| Fuse.js | Búsqueda fuzzy en frontend |

---

## Funcionalidades principales

- **Catálogo de videojuegos** — datos en tiempo real de RAWG (+500K juegos)
- **Catálogo de películas y series** — datos en tiempo real de TMDB (+1M títulos)
- **Búsqueda unificada** — busca juegos y películas simultáneamente con `Promise.all`
- **Paginación numérica** — 9 resultados por página con navegación ← 1 2 3 →
- **Colección personal** — guarda items con estados: jugando, completado, backlog, abandonado
- **⭐ Búsqueda indexada** — busca en tu colección con índices de texto MongoDB, ordenada por relevancia
- **Estadísticas térmicas** — heatmap de actividad generado con datos reales de `createdAt`
- **Estimación de backlog** — calcula horas totales de tu backlog con datos de RAWG
- **Autenticación** — registro, login con JWT, persistencia de sesión y logout
- **Diseño responsivo** — adaptado a móvil, tablet y desktop

---

## Estructura del proyecto

```
src/
├── components/
│   ├── App/              ← Raíz, rutas y contexto de auth
│   ├── Header/           ← Navegación y acciones de auth
│   ├── Navigation/       ← Links de navegación con NavLink
│   ├── Footer/           ← Pie de página con créditos de APIs
│   ├── Main/             ← Home con trending de RAWG y TMDB
│   ├── SearchPage/       ← Explorador con tabs y paginación
│   ├── SearchForm/       ← Formulario de búsqueda reutilizable
│   ├── SearchGrid/       ← Grid de resultados con animación stagger
│   ├── CardGrid/         ← Carrusel de cards con scroll
│   ├── Card/             ← Card reutilizable (juego / película / serie)
│   ├── Pagination/       ← Paginación numérica reutilizable
│   ├── ItemDetail/       ← Página de detalle con botón guardar
│   ├── Profile/          ← Colección personal + estadísticas
│   ├── About/            ← Información del proyecto
│   ├── ModalWithForm/    ← Modal base reutilizable (glassmorphism)
│   ├── LoginModal/       ← Formulario de inicio de sesión
│   ├── RegisterModal/    ← Formulario de registro con confirmación
│   ├── Preloader/        ← Animación de carga
│   ├── NotFound/         ← Página 404
│   └── ProtectedRoute/   ← Redirige a / si no hay sesión
├── contexts/
│   └── AuthContext.jsx   ← Estado global de autenticación + JWT
├── utils/
│   ├── mainApi.js        ← Llamadas al backend de Vortyx
│   ├── rawgApi.js        ← Llamadas a RAWG API
│   ├── tmdbApi.js        ← Llamadas a TMDB API (Bearer Token)
│   ├── cardUtils.js      ← Normalización y constantes de cards
│   └── mockData.js       ← Constantes de estados y labels
├── images/               ← Assets estáticos
├── vendor/
│   ├── fonts/            ← Fuentes via @font-face
│   └── normalize/        ← normalize.css
└── index.css             ← Variables CSS globales del sistema de diseño
```

---

## Rutas

| Ruta | Componente | Acceso |
|---|---|---|
| `/` | `Main` | Pública |
| `/search` | `SearchPage` | Pública |
| `/games/:id` | `ItemDetail` | Pública |
| `/movies/:id` | `ItemDetail` | Pública |
| `/about` | `About` | Pública |
| `/profile` | `Profile` | Privada — requiere JWT |
| `*` | `NotFound` | — |

---

## Sistema de diseño

Vortyx usa una paleta oscura con acentos térmicos. Los colores tienen significado semántico:

| Token CSS | Valor | Uso |
|---|---|---|
| `--color-brand` | `#22D3EE` | Color primario, series, UI general |
| `--color-vortex` | `#7C3AED` | Gradientes, inmersión |
| `--color-game` | `#FF7A00` | Identidad de juegos |
| `--color-movie` | `#FF2D95` | Identidad de películas |
| `--color-success` | `#A3FF12` | Completado, logros, pico en heatmap |
| `--color-bg` | `#06080f` | Fondo principal |

Tipografía: **Bebas Neue** (títulos) + **Outfit** (cuerpo)

---

## Instalación local

```bash
# 1. Clona el repositorio
git clone https://github.com/tu-usuario/vortyx-frontend.git
cd vortyx-frontend

# 2. Instala dependencias
npm install

# 3. Configura las variables de entorno
cp .env.example .env
```

Edita `.env` con tus valores:

```env
VITE_RAWG_API_KEY=tu_key_de_rawg
VITE_TMDB_TOKEN=tu_read_access_token_de_tmdb
VITE_API_BASE_URL=http://localhost:3001
```

```bash
# 4. Inicia el servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`

---

## Variables de entorno

| Variable | Descripción | Dónde obtenerla |
|---|---|---|
| `VITE_RAWG_API_KEY` | API Key de RAWG | [rawg.io/apidocs](https://rawg.io/apidocs) |
| `VITE_TMDB_TOKEN` | Read Access Token de TMDB | [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api) |
| `VITE_API_BASE_URL` | URL del backend | `http://localhost:3001` en dev · `https://api.windy.gammavortex.com` en prod |

---

## Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo con hot reload
npm run build    # Build de producción en /dist
npm run preview  # Vista previa del build de producción
npm run lint     # Linter ESLint
```

---

## Backend

Este frontend se conecta al backend de Vortyx para autenticación y almacenamiento de la colección personal.

🔗 **API:** [api.windy.gammavortex.com](https://api.windy.gammavortex.com)
📁 **Repositorio:** [https://github.com/NorimNori/vortyx-backend](https://github.com/NorimNori/vortyx-backend)

---

## Créditos

- Datos de videojuegos: [RAWG Video Games Database](https://rawg.io)
- Datos de películas y series: [The Movie Database (TMDB)](https://www.themoviedb.org)
- Proyecto final — Bootcamp Desarrollo Web — [TripleTen](https://tripleten.com)
