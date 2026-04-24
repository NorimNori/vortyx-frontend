import { useState, useEffect } from "react";
import {
  getGames,
  getMovies,
  updateGameStatus,
  updateMovieStatus,
  deleteGame,
  deleteMovie,
} from "../../src/utils/mainApi";

export function useCollection(token) {
  const [games, setGames] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) return;

    Promise.all([getGames(token), getMovies(token)])
      .then(([gamesData, moviesData]) => {
        setGames(gamesData);
        setMovies(moviesData.filter((m) => m.type === "movie"));
        setSeries(moviesData.filter((m) => m.type === "series"));
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [token]);

  async function handleStatusChange(id, newStatus, type) {
    try {
      if (type === "game") {
        await updateGameStatus(token, id, newStatus);
        setGames((prev) =>
          prev.map((g) => (g._id === id ? { ...g, status: newStatus } : g)),
        );
      } else {
        await updateMovieStatus(token, id, newStatus);
        const setter = type === "movie" ? setMovies : setSeries;
        setter((prev) =>
          prev.map((m) => (m._id === id ? { ...m, status: newStatus } : m)),
        );
      }
    } catch (err) {
      console.error("Error actualizando estado:", err);
    }
  }

  async function handleDelete(id, type) {
    try {
      if (type === "game") {
        await deleteGame(token, id);
        setGames((prev) => prev.filter((g) => g._id !== id));
      } else {
        await deleteMovie(token, id);
        setMovies((prev) => prev.filter((m) => m._id !== id));
        setSeries((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (err) {
      console.error("Error eliminando item:", err);
    }
  }

  return {
    games,
    movies,
    series,
    isLoading,
    error,
    handleStatusChange,
    handleDelete,
  };
}
