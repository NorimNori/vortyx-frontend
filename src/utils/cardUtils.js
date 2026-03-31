import { TMDB_IMAGE_BASE } from "./tmdbApi";

export const CARD_TYPE = {
  GAME: "game",
  MOVIE: "movie",
  SERIES: "series",
};

export const TYPE_LABELS = {
  [CARD_TYPE.GAME]: "Juego",
  [CARD_TYPE.MOVIE]: "Película",
  [CARD_TYPE.SERIES]: "Serie",
};

export function normalizeItem(item, type) {
  if (type === CARD_TYPE.GAME) {
    return {
      id: item.id,
      title: item.name,
      image: item.background_image || null,
      rating: item.rating ? item.rating.toFixed(1) : null,
      genre: item.genres?.[0]?.name || "",
      year: item.released ? item.released.slice(0, 4) : "",
    };
  }
  return {
    id: item.id,
    title: item.title || item.name,
    image: item.poster_path ? `${TMDB_IMAGE_BASE}${item.poster_path}` : null,
    rating: item.vote_average ? item.vote_average.toFixed(1) : null,
    genre: item.genre_ids?.[0] ? "" : "",
    year: (item.release_date || item.first_air_date || "").slice(0, 4),
  };
}
