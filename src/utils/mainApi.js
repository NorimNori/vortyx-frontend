const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

function handleResponse(res) {
  if (res.ok) return res.json();
  return res.json().then((data) => Promise.reject(data));
}

function authHeaders(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export function signup({ name, email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  }).then(handleResponse);
}

export function signin({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

export function getCurrentUser(token) {
  return fetch(`${BASE_URL}/users/me`, {
    headers: authHeaders(token),
  }).then(handleResponse);
}

export function getGames(token) {
  return fetch(`${BASE_URL}/games`, {
    headers: authHeaders(token),
  }).then(handleResponse);
}

export function saveGame(token, gameData) {
  return fetch(`${BASE_URL}/games`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(gameData),
  }).then(handleResponse);
}

export function updateGameStatus(token, gameId, status) {
  return fetch(`${BASE_URL}/games/${gameId}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify({ status }),
  }).then(handleResponse);
}

export function deleteGame(token, gameId) {
  return fetch(`${BASE_URL}/games/${gameId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  }).then(handleResponse);
}

export function getMovies(token) {
  return fetch(`${BASE_URL}/movies`, {
    headers: authHeaders(token),
  }).then(handleResponse);
}

export function saveMovie(token, movieData) {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(movieData),
  }).then(handleResponse);
}

export function updateMovieStatus(token, movieId, status) {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify({ status }),
  }).then(handleResponse);
}

export function deleteMovie(token, movieId) {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  }).then(handleResponse);
}

export function searchCollection(token, query) {
  return fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`, {
    headers: authHeaders(token),
  }).then(handleResponse);
}
