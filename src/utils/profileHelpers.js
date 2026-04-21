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
