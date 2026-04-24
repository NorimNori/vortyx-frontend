import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGameById } from "../utils/rawgApi";
import { getMovieById, getSeriesById } from "../utils/tmdbApi";
import { saveGame, saveMovie } from "../utils/mainApi";
import { normalizeGame, normalizeMovie } from "../utils/normalizers";
import { useAuth } from "../context/AuthContext";

export function useItemDetail(id, type) {
  const navigate = useNavigate();
  const { isLoggedIn, token } = useAuth();

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const isGame = type === "game";
  const isMovie = type === "movie";

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    setItem(null);
    setIsSaved(false);
    setSelectedStatus("");

    const fetchFn = isGame
      ? getGameById(id)
      : isMovie
        ? getMovieById(id)
        : getSeriesById(id);

    fetchFn
      .then((data) =>
        setItem(isGame ? normalizeGame(data) : normalizeMovie(data, type)),
      )
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [id, type]);

  async function handleSave() {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
    if (!selectedStatus) return;

    setIsSaving(true);
    setSaveError("");

    try {
      if (isGame) {
        await saveGame(token, {
          rawg_id: item.id,
          title: item.title,
          genre: item.genres[0] || "",
          platform: item.platforms?.[0] || "",
          status: selectedStatus,
          imageUrl: item.image || "",
          playtime: item.playtime || 0,
        });
      } else {
        await saveMovie(token, {
          tmdb_id: item.id,
          title: item.title,
          genre: item.genres[0] || "",
          type: isMovie ? "movie" : "series",
          status: selectedStatus,
          imageUrl: item.image || "",
        });
      }
      setIsSaved(true);
    } catch (err) {
      setSaveError(err.message || "Error al guardar. Intenta de nuevo.");
    } finally {
      setIsSaving(false);
    }
  }

  return {
    item,
    isLoading,
    error,
    selectedStatus,
    setSelectedStatus,
    isSaved,
    isSaving,
    saveError,
    isLoggedIn,
    isGame,
    isMovie,
    handleSave,
  };
}
