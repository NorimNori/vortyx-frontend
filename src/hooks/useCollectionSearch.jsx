import { useState, useCallback } from "react";
import { searchCollection } from "../utils/mainApi";

export function useCollectionSearch(token) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault();
      const q = searchQuery.trim();
      if (!q) {
        setSearchResults(null);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchCollection(token, q);
        setSearchResults({
          games: results.games,
          movies: results.movies.filter((m) => m.type === "movie"),
          series: results.movies.filter((m) => m.type === "series"),
        });
      } catch (err) {
        console.error("Error en búsqueda:", err);
      } finally {
        setIsSearching(false);
      }
    },
    [searchQuery, token],
  );

  function clearSearch() {
    setSearchQuery("");
    setSearchResults(null);
  }

  function handleQueryChange(value) {
    setSearchQuery(value);
    if (!value) clearSearch();
  }

  return {
    searchQuery,
    searchResults,
    isSearching,
    handleSearch,
    clearSearch,
    handleQueryChange,
  };
}
