import { TMDB_IMAGE_BASE } from "./tmdbApi";

export function normalizeGame(data) {
  return {
    id: data.id,
    title: data.name,
    description: data.description_raw || data.description || "",
    image: data.background_image || null,
    rating: data.rating ? data.rating.toFixed(1) : null,
    ratingTop: data.rating_top || null,
    metacritic: data.metacritic || null,
    released: data.released ? data.released.slice(0, 4) : null,
    playtime: data.playtime || null,
    genres: data.genres?.map((g) => g.name) || [],
    platforms: data.platforms?.map((p) => p.platform.name) || [],
    developers: data.developers?.map((d) => d.name).join(", ") || null,
    publishers: data.publishers?.map((p) => p.name).join(", ") || null,
    website: data.website || null,
  };
}

export function normalizeMovie(data, type) {
  const isMovie = type === "movie";
  return {
    id: data.id,
    title: isMovie ? data.title : data.name,
    description: data.overview || "",
    image: data.poster_path ? `${TMDB_IMAGE_BASE}${data.poster_path}` : null,
    backdrop: data.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`
      : null,
    rating: data.vote_average ? data.vote_average.toFixed(1) : null,
    released: isMovie
      ? data.release_date?.slice(0, 4)
      : data.first_air_date?.slice(0, 4),
    runtime: isMovie
      ? data.runtime
        ? `${data.runtime} min`
        : null
      : data.episode_run_time?.[0]
        ? `${data.episode_run_time[0]} min/ep`
        : null,
    seasons: !isMovie ? data.number_of_seasons : null,
    episodes: !isMovie ? data.number_of_episodes : null,
    genres: data.genres?.map((g) => g.name) || [],
    status: data.status || null,
    tagline: data.tagline || null,
    website: data.homepage || null,
  };
}
