import SearchForm from "../SearchForm/SearchForm";
import SearchHeader from "../Search/SearchHeader";
import SearchTabs from "../Search/SearchTabs";
import SearchResults from "../Search/SearchResults";
import { useSearch } from "../../hooks/useSearch";
import { usePages } from "../../hooks/usePages";
import { paginate, totalPages } from "../../utils/searchHelpers";
import "./SearchPage.css";
import { useState } from "react";

function SearchPage() {
  const { games, movies, series, isLoading, error, hasSearched, handleSearch } =
    useSearch();

  const { pages, setPage } = usePages();

  const [activeTab, setActiveTab] = useState("all");

  const allItems = [...games, ...movies, ...series];
  const tabItems = {
    all: allItems,
    game: games,
    movie: movies,
    series: series,
  };

  const currentItems = tabItems[activeTab] || [];
  const currentPage = pages[activeTab];
  const pageCount = totalPages(currentItems);
  const visibleItems = paginate(currentItems, currentPage);

  function handlePageChange(page) {
    setPage(activeTab, page);
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

        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        {!hasSearched && (
          <p className="search-page__hint">
            Escribe un juego, película o serie para comenzar.
          </p>
        )}

        {hasSearched && (
          <>
            <SearchTabs
              activeTab={activeTab}
              tabItems={tabItems}
              isLoading={isLoading}
              onTabChange={setActiveTab}
            />
            <SearchResults
              items={visibleItems}
              type={activeTab === "all" ? null : activeTab}
              isLoading={isLoading}
              error={error}
              currentPage={currentPage}
              totalPages={pageCount}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
