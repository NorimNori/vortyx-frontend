import { useSearch } from "../../hooks/useSearch";
import { usePages } from "../../hooks/usePages";
import { paginate, totalPages } from "../../utils/searchHelpers";
import SearchForm from "../SearchForm/SearchForm";
import SearchHeader from "../Search/SearchHeader";
import SearchResults from "../Search/SearchResults";
import "./SearchPage.css";

function SearchPage() {
  const {
    games,
    movies,
    series,
    isLoading,
    error,
    hasSearched,
    activeFilter,
    handleSearch,
  } = useSearch();

  const { page, setPage, resetPage } = usePages();

  const itemsByFilter = {
    all: [...games, ...movies, ...series],
    game: games,
    movie: movies,
    series: series,
  };

  const currentItems = itemsByFilter[activeFilter] || [];
  const pageCount = totalPages(currentItems);
  const visibleItems = paginate(currentItems, page);

  function onSearch(query, filter) {
    resetPage();
    handleSearch(query, filter);
  }

  function handlePageChange(newPage) {
    setPage(newPage);
    document.getElementById("search-results")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="search-page">
      <div className="search-page__orb" aria-hidden="true" />

      <div className="search-page__container">
        <SearchHeader />

        <SearchForm onSearch={onSearch} isLoading={isLoading} />

        {!hasSearched && (
          <p className="search-page__hint">
            Escribe un juego, película o serie para comenzar.
          </p>
        )}

        {hasSearched && (
          <SearchResults
            items={visibleItems}
            type={activeFilter === "all" ? null : activeFilter}
            isLoading={isLoading}
            error={error}
            currentPage={page}
            totalPages={pageCount}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default SearchPage;
