import { useState } from "react";
import { searchGames } from "../utils/rawgApi";
import { searchMoviesAndSeries } from "../utils/tmdbApi";
import { INITIAL_SEARCH_STATE } from "../utils/searchConstants";

export function useSearch() {
  const [state, setState] = useState(INITIAL_SEARCH_STATE);

  async function handleSearch(query) {
    let isMounted = true;

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: false,
      hasSearched: true,
    }));

    try {
      const [gamesData, mediaData] = await Promise.all([
        searchGames(query),
        searchMoviesAndSeries(query),
      ]);

      if (!isMounted) return;

      const allMedia = mediaData.results || [];

      setState((prev) => ({
        ...prev,
        games: gamesData.results || [],
        movies: allMedia.filter((i) => i.media_type === "movie"),
        series: allMedia.filter((i) => i.media_type === "tv"),
        isLoading: false,
      }));
    } catch {
      if (isMounted) {
        setState((prev) => ({ ...prev, isLoading: false, error: true }));
      }
    }

    return () => {
      isMounted = false;
    };
  }

  return { ...state, handleSearch };
}
