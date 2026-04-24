import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useCollectionSearch } from "../../hooks/useCollectionSearch";
import CollectionTab from "./CollectionTab";
import StatsTab from "./StatsTab";
import Preloader from "../Preloader/Preloader";
import { ITEM_STATUS } from "../../utils/mockData";
import "./Profile.css";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";

const TABS = [
  { id: "games", label: "Juegos" },
  { id: "movies", label: "Películas" },
  { id: "series", label: "Series" },
  { id: "stats", label: "Estadísticas" },
];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("es-MX", {
    month: "long",
    year: "numeric",
  });
}

function Profile() {
  const { currentUser, token } = useAuth();
  const [activeTab, setActiveTab] = useState("games");

  const {
    games,
    movies,
    series,
    isLoading,
    error,
    handleStatusChange,
    handleDelete,
  } = useCollection(token);

  const {
    searchQuery,
    searchResults,
    isSearching,
    handleSearch,
    clearSearch,
    handleQueryChange,
  } = useCollectionSearch(token);

  const displayGames = searchResults ? searchResults.games : games;
  const displayMovies = searchResults ? searchResults.movies : movies;
  const displaySeries = searchResults ? searchResults.series : series;

  function onDelete(id, type) {
    handleDelete(id, type);
    if (searchResults) clearSearch();
  }

  const allItems = [...games, ...movies, ...series];

  const quickStats = [
    { val: games.length, label: "Juegos", color: "var(--color-game)" },
    { val: movies.length, label: "Películas", color: "var(--color-movie)" },
    { val: series.length, label: "Series", color: "var(--color-brand)" },
    {
      val: allItems.filter((i) => i.status === ITEM_STATUS.COMPLETED).length,
      label: "Completados",
      color: "var(--color-success)",
    },
  ];

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "4rem" }}
      >
        <Preloader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile__error">
        <p>No se pudo cargar tu colección. Intenta de nuevo más tarde.</p>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="profile__orb" aria-hidden="true" />

      <div className="profile__container">
        <ProfileHeader
          user={currentUser}
          games={games}
          movies={movies}
          series={series}
        />
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <form
          className="profile__search"
          onSubmit={handleSearch}
          role="search"
          aria-label="Buscar en mi colección"
        >
          <div className="profile__search-wrap">
            <span className="profile__search-icon" aria-hidden="true">
              ⌕
            </span>
            <input
              className="profile__search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Buscar en mi colección..."
              aria-label="Buscar en colección"
            />
            {searchResults && (
              <button
                className="profile__search-clear"
                onClick={clearSearch}
                type="button"
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
            <span className="profile__search-hint">Índice</span>
          </div>
          <button
            className="profile__search-btn"
            type="submit"
            disabled={isSearching || !searchQuery.trim()}
          >
            {isSearching ? "Buscando..." : "Buscar"}
          </button>
        </form>

        {searchResults && (
          <p className="profile__search-result-info">
            {displayGames.length + displayMovies.length + displaySeries.length}{" "}
            resultado(s) para &quot;{searchQuery}&quot;
            <button
              className="profile__search-clear-btn"
              onClick={clearSearch}
              type="button"
            >
              Ver todo
            </button>
          </p>
        )}

        <div className="profile__tab-content" role="tabpanel">
          {activeTab === "games" && (
            <CollectionTab
              items={displayGames}
              type="game"
              onStatusChange={handleStatusChange}
              onDelete={onDelete}
            />
          )}
          {activeTab === "movies" && (
            <CollectionTab
              items={displayMovies}
              type="movie"
              onStatusChange={handleStatusChange}
              onDelete={onDelete}
            />
          )}
          {activeTab === "series" && (
            <CollectionTab
              items={displaySeries}
              type="series"
              onStatusChange={handleStatusChange}
              onDelete={onDelete}
            />
          )}
          {activeTab === "stats" && (
            <StatsTab games={games} movies={movies} series={series} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
