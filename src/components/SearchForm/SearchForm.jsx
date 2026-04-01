import { useState } from "react";
import "./SearchForm.css";

const FILTERS = [
  { value: "all", label: "Todo" },
  { value: "game", label: "Juegos" },
  { value: "movie", label: "Películas" },
  { value: "series", label: "Series" },
];

function SearchForm({ onSearch, isLoading }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch(trimmed, activeFilter);
  }

  function handleFilterClick(value) {
    setActiveFilter(value);

    const trimmed = query.trim();
    if (trimmed) {
      onSearch(trimmed, value);
    }
  }

  return (
    <form
      className="search-form"
      onSubmit={handleSubmit}
      role="search"
      aria-label="Buscar contenido"
    >
      <div className="search-form__input-wrap">
        <span className="search-form__icon" aria-hidden="true">
          ⌕
        </span>
        <input
          className="search-form__input"
          type="search"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca un juego, película o serie..."
          autoComplete="off"
          disabled={isLoading}
          aria-label="Término de búsqueda"
        />
        <div
          className="search-form__filters"
          role="group"
          aria-label="Filtrar por tipo"
        >
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              className={`search-form__filter${
                activeFilter === value ? " search-form__filter--active" : ""
              }`}
              type="button"
              onClick={() => handleFilterClick(value)}
              aria-pressed={activeFilter === value}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <button
        className="search-form__submit"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
}

export default SearchForm;
