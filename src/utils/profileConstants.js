import { ITEM_STATUS, STATUS_LABELS } from "./mockData";

export const TABS = [
  { id: "games", label: "Juegos" },
  { id: "movies", label: "Películas" },
  { id: "series", label: "Series" },
  { id: "stats", label: "Estadísticas" },
];

export const HEATMAP_COLORS = [
  "var(--color-surface)",
  "rgba(34,211,238,0.35)",
  "rgba(124,58,237,0.55)",
  "rgba(255,122,0,0.7)",
  "rgba(255,45,149,0.85)",
  "rgba(163,255,18,1)",
];

export const STATUS_COLORS = {
  [ITEM_STATUS.PLAYING]: "var(--color-brand)",
  [ITEM_STATUS.COMPLETED]: "var(--color-success)",
  [ITEM_STATUS.BACKLOG]: "var(--color-text-subtle)",
  [ITEM_STATUS.DROPPED]: "var(--color-movie)",
};

export { ITEM_STATUS, STATUS_LABELS };
