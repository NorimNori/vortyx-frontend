import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import CardGrid from "../CardGrid/CardGrid";
import { searchGames } from "../../utils/rawgApi";
import { searchMoviesAndSeries } from "../../utils/tmdbApi";
import "./SearchPage.css";

function SearchPage() {
  const [state, setState] = useState({
    games: [],
    movies: [],
    series: [],
    isLoading: false,
    error: false,
    hasSearched: false,
  });

  async function handleSearch(query, filter) {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: false,
      hasSearched: true,
    }));

    try {
      const shouldSearchGames = filter === "all" || filter === "game";
      const shouldSearchMedia =
        filter === "all" || filter === "movie" || filter === "series";

      const [gamesData, mediaData] = await Promise.all([
        shouldSearchGames
          ? searchGames(query)
          : Promise.resolve({ results: [] }),
        shouldSearchMedia
          ? searchMoviesAndSeries(query)
          : Promise.resolve({ results: [] }),
      ]);

      const allMedia = mediaData.results || [];
      const movies =
        filter === "series"
          ? []
          : allMedia.filter((item) => item.media_type === "movie");
      const series =
        filter === "movie"
          ? []
          : allMedia.filter((item) => item.media_type === "tv");

      setState((prev) => ({
        ...prev,
        games: gamesData.results || [],
        movies,
        series,
        isLoading: false,
      }));
    } catch {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: true,
      }));
    }
  }

  const { games, movies, series, isLoading, error, hasSearched } = state;
  const totalResults = games.length + movies.length + series.length;

  return (
    <div className="search-page">
      <div className="search-page__orb" aria-hidden="true" />

      <div className="search-page__container">
        <header className="search-page__header">
          <p className="search-page__eyebrow">
            <span className="search-page__eyebrow-dot" aria-hidden="true" />
            Catálogo completo
          </p>
          <h1 className="search-page__title">
            EXPLORAR <span className="search-page__title-accent">TODO</span>
          </h1>
        </header>

        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        {!hasSearched && (
          <p className="search-page__hint">
            Escribe un juego, película o serie para comenzar.
          </p>
        )}

        {hasSearched && (
          <div className="search-page__results">
            {!isLoading && !error && totalResults > 0 && (
              <p className="search-page__count">
                <strong>{totalResults}</strong> resultado
                {totalResults !== 1 ? "s" : ""} encontrado
                {totalResults !== 1 ? "s" : ""}
              </p>
            )}

            {(state.games.length > 0 || isLoading || error) && (
              <section
                className="search-page__section"
                aria-label="Resultados de juegos"
              >
                <div className="search-page__divider">
                  <span className="search-page__divider-label">JUEGOS</span>
                  <div className="search-page__divider-line" />
                  {!isLoading && (
                    <span className="search-page__divider-count">
                      {games.length}
                    </span>
                  )}
                </div>
                <CardGrid
                  items={games}
                  type="game"
                  isLoading={isLoading}
                  error={error}
                />
              </section>
            )}

            {(movies.length > 0 || isLoading || error) && (
              <section
                className="search-page__section"
                aria-label="Resultados de películas"
              >
                <div className="search-page__divider">
                  <span className="search-page__divider-label">PELÍCULAS</span>
                  <div className="search-page__divider-line" />
                  {!isLoading && (
                    <span className="search-page__divider-count">
                      {movies.length}
                    </span>
                  )}
                </div>
                <CardGrid
                  items={movies}
                  type="movie"
                  isLoading={isLoading}
                  error={error}
                />
              </section>
            )}

            {(series.length > 0 || isLoading || error) && (
              <section
                className="search-page__section"
                aria-label="Resultados de series"
              >
                <div className="search-page__divider">
                  <span className="search-page__divider-label">SERIES</span>
                  <div className="search-page__divider-line" />
                  {!isLoading && (
                    <span className="search-page__divider-count">
                      {series.length}
                    </span>
                  )}
                </div>
                <CardGrid
                  items={series}
                  type="series"
                  isLoading={isLoading}
                  error={error}
                />
              </section>
            )}

            {!isLoading && !error && totalResults === 0 && (
              <div className="search-page__empty">
                <p className="search-page__empty-text">
                  No se ha encontrado nada.
                </p>
                <p className="search-page__empty-hint">
                  Intenta con otro término o cambia el filtro.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
