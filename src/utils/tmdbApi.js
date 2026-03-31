const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status} ${res.statusText}`);
}

export function getTrendingMovies() {
  return fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-MX&page=1`,
  ).then(handleResponse);
}

export function getTrendingSeries() {
  return fetch(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=es-MX&page=1`,
  ).then(handleResponse);
}

export function searchMoviesAndSeries(query) {
  return fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=es-MX&page=1`,
  ).then(handleResponse);
}

export function getMovieById(id) {
  return fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-MX`,
  ).then(handleResponse);
}

export function getSeriesById(id) {
  return fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=es-MX`).then(
    handleResponse,
  );
}
