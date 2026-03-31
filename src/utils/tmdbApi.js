const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY_TMDB = import.meta.env.VITE_TMDB_API_KEY_TMDB;

export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status} ${res.statusText}`);
}

export function getTrendingMovies() {
  return fetch(
    `${BASE_URL}/movie/popular?API_KEY_TMDB=${API_KEY_TMDB}&language=es-MX&page=1`,
  ).then(handleResponse);
}

export function getTrendingSeries() {
  return fetch(
    `${BASE_URL}/tv/popular?API_KEY_TMDB=${API_KEY_TMDB}&language=es-MX&page=1`,
  ).then(handleResponse);
}

export function searchMoviesAndSeries(query) {
  return fetch(
    `${BASE_URL}/search/multi?API_KEY_TMDB=${API_KEY_TMDB}&query=${encodeURIComponent(query)}&language=es-MX&page=1`,
  ).then(handleResponse);
}

export function getMovieById(id) {
  return fetch(
    `${BASE_URL}/movie/${id}?API_KEY_TMDB=${API_KEY_TMDB}&language=es-MX`,
  ).then(handleResponse);
}

export function getSeriesById(id) {
  return fetch(
    `${BASE_URL}/tv/${id}?API_KEY_TMDB=${API_KEY_TMDB}&language=es-MX`,
  ).then(handleResponse);
}
