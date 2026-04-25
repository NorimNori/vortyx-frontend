import { ITEM_STATUS } from "./profileConstants";

export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("es-MX", {
    month: "long",
    year: "numeric",
  });
}

export function calcBacklogHours(games) {
  return games
    .filter((g) => g.status === ITEM_STATUS.BACKLOG)
    .reduce((acc, g) => acc + (g.playtime || 0), 0);
}

export function countByStatus(items) {
  return Object.values(ITEM_STATUS).reduce((acc, status) => {
    acc[status] = items.filter((i) => i.status === status).length;
    return acc;
  }, {});
}

export function getTopGenres(items, top = 3) {
  const map = items.reduce((acc, item) => {
    if (item.genre) acc[item.genre] = (acc[item.genre] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, top)
    .map(([genre]) => genre);
}

export function buildHeatmap(games, movies) {
  const allItems = [...games, ...movies];
  const countByDay = {};
  allItems.forEach((item) => {
    const day = item.createdAt?.slice(0, 10);
    if (day) countByDay[day] = (countByDay[day] || 0) + 1;
  });

  return Array.from({ length: 70 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (69 - i));
    const key = date.toISOString().slice(0, 10);
    const count = countByDay[key] || 0;
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count === 2) return 2;
    if (count <= 4) return 3;
    if (count <= 6) return 4;
    return 5;
  });
}
