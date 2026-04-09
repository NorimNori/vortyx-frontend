export const TECH_STACK = [
  {
    id: "react",
    abbr: "RE",
    name: "React + Vite",
    role: "Interfaz de usuario · SPA",
    color: "brand",
  },
  {
    id: "node",
    abbr: "NO",
    name: "Node.js + Express",
    role: "API REST del servidor",
    color: "success",
  },
  {
    id: "mongo",
    abbr: "MG",
    name: "MongoDB + Mongoose",
    role: "Base de datos · Índices de texto",
    color: "vortex",
  },
  {
    id: "jwt",
    abbr: "JWT",
    name: "JWT + bcrypt",
    role: "Autenticación y seguridad",
    color: "game",
  },
];

export const FEATURES = [
  {
    id: "search",
    name: "Búsqueda unificada",
    desc: "Busca juegos y películas simultáneamente con una sola consulta. Los resultados llegan en paralelo usando Promise.all.",
    color: "var(--color-brand)",
  },
  {
    id: "index",
    name: "Búsqueda indexada",
    desc: "La colección personal usa índices de texto en MongoDB para búsquedas ordenadas por relevancia con $text y textScore.",
    color: "var(--color-vortex)",
  },
  {
    id: "collection",
    name: "Colección personal",
    desc: "Guarda juegos y películas con estados: jugando, completado, backlog o abandonado. Datos protegidos por JWT.",
    color: "var(--color-success)",
  },
  {
    id: "stats",
    name: "Estadísticas térmicas",
    desc: "Heatmap de actividad con escala de color que va de cyan frío a verde ácido en el pico máximo de consumo.",
    color: "var(--color-game)",
  },
  {
    id: "backlog",
    name: "Estimación de backlog",
    desc: "Calcula automáticamente las horas estimadas para completar tu backlog usando datos de tiempo promedio de RAWG.",
    color: "var(--color-movie)",
  },
  {
    id: "responsive",
    name: "Diseño responsivo",
    desc: "Interfaz completamente adaptada a móvil, tablet y desktop. Dark theme con paleta térmica única.",
    color: "var(--color-brand)",
  },
];

export const APIS = [
  {
    id: "rawg",
    name: "RAWG Video Games Database",
    desc: "+500,000 juegos, géneros, ratings y tiempos de juego",
    badge: "RAWG API",
    color: "game",
    href: "https://rawg.io/apidocs",
  },
  {
    id: "tmdb",
    name: "The Movie Database",
    desc: "+1,000,000 películas y series con imágenes y metadata",
    badge: "TMDB API",
    color: "brand",
    href: "https://developer.themoviedb.org",
  },
];

export const AUTHOR = {
  initial: "G",
  name: "GAMMA",
  role: "Desarrolladora Full-Stack · TripleTen Bootcamp 2026",
  desc: "Apasionada del desarrollo web y los videojuegos. Vortyx nació de la necesidad de tener un solo lugar donde organizar todo el entretenimiento sin depender de apps separadas.",
  links: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Portfolio", href: "#" },
  ],
};
