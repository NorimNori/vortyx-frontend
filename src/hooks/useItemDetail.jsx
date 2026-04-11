import { useState, useEffect } from "react";
import { getGameById } from "../utils/rawgApi";
import { getMovieById, getSeriesById } from "../utils/tmdbApi";
import { normalizeGame, normalizeMovie } from "../utils/normalizers";

export function useItemDetail(id, type) {
  const [state, setState] = useState({
    item: null,
    isLoading: true,
    error: false,
  });

  const isGame = type === "game";
  const isMovie = type === "movie";

  useEffect(() => {
    let isMounted = true;

    setState({ item: null, isLoading: true, error: false });

    const fetchFn = isGame
      ? getGameById(id)
      : isMovie
        ? getMovieById(id)
        : getSeriesById(id);

    fetchFn
      .then((data) => {
        if (isMounted) {
          const normalized = isGame
            ? normalizeGame(data)
            : normalizeMovie(data, type);
          setState({ item: normalized, isLoading: false, error: false });
        }
      })
      .catch(() => {
        if (isMounted) {
          setState({ item: null, isLoading: false, error: true });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id, type, isGame, isMovie]);

  return { ...state };
}
