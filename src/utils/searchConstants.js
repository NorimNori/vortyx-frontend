export const TABS = [
  { id: "all", label: "Todos" },
  { id: "game", label: "Videojuegos" },
  { id: "movie", label: "Películas" },
  { id: "series", label: "Series" },
];

export const INITIAL_SEARCH_STATE = {
  games: [],
  movies: [],
  series: [],
  isLoading: false,
  error: false,
  hasSearched: false,
};

export const INITIAL_PAGES = { all: 1, game: 1, movie: 1, series: 1 };
