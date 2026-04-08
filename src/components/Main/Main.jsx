import { useEffect, useState } from "react";
import "./Main.css";
import Preloader from "../Preloader/Preloader";
import Hero from "../Hero/Hero";
import CardGrid from "../CardGrid/CardGrid";
import { getTrendingGames } from "../../utils/rawgApi";
import { getTrendingMovies } from "../../utils/tmdbApi";

function Main() {
  const [loading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [gamesError, setGamesError] = useState(false);

  const [movies, setMovies] = useState([]);
  const [moviesLoading, setMoviesLoading] = useState(true);
  const [moviesError, setMoviesError] = useState(false);

  useEffect(() => {
    getTrendingGames()
      .then((data) => {
        setGames(data.results || []);
      })
      .catch(() => {
        setGamesError(true);
      })
      .finally(() => {
        setGamesLoading(false);
      });

    getTrendingMovies()
      .then((data) => {
        setMovies(data.results || []);
      })
      .catch(() => {
        setMoviesError(true);
      })
      .finally(() => {
        setMoviesLoading(false);
      });
  }, []);
  return (
    <section className="main">
      {loading ? (
        <Preloader />
      ) : (
        <>
          <div
            className="main__orb main__orb--primary"
            aria-hidden="true"
          ></div>
          <div
            className="main__orb main__orb--secondary"
            aria-hidden="true"
          ></div>
          <Hero />
          <section className="main__section" aria-label="Juegos populares">
            <div className="main__section-container">
              <div className="main__section-head">
                <div className="main__divider">
                  <span className="main__divider-label">JUEGOS POPULARES</span>
                  <div className="main__divider-line" />
                  <div className="main__divider-accent main__divider-accent--game" />
                </div>
              </div>
              <CardGrid
                items={games}
                type="game"
                isLoading={gamesLoading}
                error={gamesError}
              />
            </div>
          </section>

          <section className="main__section" aria-label="Películas populares">
            <div className="main__section-container">
              <div className="main__section-head">
                <div className="main__divider">
                  <span className="main__divider-label">
                    PELÍCULAS Y SERIES
                  </span>
                  <div className="main__divider-line" />
                  <div className="main__divider-accent main__divider-accent--movie" />
                </div>
              </div>
              <CardGrid
                items={movies}
                type="movie"
                isLoading={moviesLoading}
                error={moviesError}
              />
            </div>
          </section>
        </>
      )}
    </section>
  );
}

export default Main;
