const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
};

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status} ${res.statusText}`);
}

export function getTrendingMovies() {
  return fetch(`${BASE_URL}/movie/popular?language=es-MX&page=1`, options).then(
    handleResponse,
  );
}

export function getTrendingSeries() {
  return fetch(`${BASE_URL}/tv/popular?language=es-MX&page=1`, options).then(
    handleResponse,
  );
}

export function searchMoviesAndSeries(query) {
  return fetch(
    `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&language=es-MX&page=1`,
    options,
  ).then(handleResponse);
}

export function getMovieById(id) {
  return fetch(`${BASE_URL}/movie/${id}?language=es-MX`, options).then(
    handleResponse,
  );
}

export function getSeriesById(id) {
  return fetch(`${BASE_URL}/tv/${id}?language=es-MX`, options).then(
    handleResponse,
  );
}
