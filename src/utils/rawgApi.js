const BASE_URL = "https://api.rawg.io/api";
const API_KEY_RAWG = import.meta.env.VITE_RAWG_API_KEY_RAWG;

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status} ${res.statusText}`);
}

export function getTrendingGames() {
  return fetch(
    `${BASE_URL}/games?key=${API_KEY_RAWG}&ordering=-rating&page_size=6&metacritic=80,100`,
  ).then(handleResponse);
}

export function searchGames(query) {
  return fetch(
    `${BASE_URL}/games?key=${API_KEY_RAWG}&search=${encodeURIComponent(query)}&page_size=20`,
  ).then(handleResponse);
}

export function getGameById(id) {
  return fetch(`${BASE_URL}/games/${id}?key=${API_KEY_RAWG}`).then(
    handleResponse,
  );
}
