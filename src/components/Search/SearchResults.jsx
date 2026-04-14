import Pagination from "./Pagination";
import SearchGrid from "./SearchGrid";

function SearchResults({
  items,
  type,
  isLoading,
  error,
  currentPage,
  totalPages,
  onPageChange,
}) {
  const totalCount = items.length;

  return (
    <div className="search-page__results" id="search-results">
      {!isLoading && !error && totalCount > 0 && (
        <p className="search-page__count">
          <strong>{totalCount}</strong> resultado
          {totalCount !== 1 ? "s" : ""} · página {currentPage} de {totalPages}
        </p>
      )}

      <SearchGrid
        items={items}
        type={type}
        isLoading={isLoading}
        error={error}
      />

      {!isLoading && !error && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}

      {!isLoading && !error && totalCount === 0 && (
        <div className="search-page__empty">
          <p className="search-page__empty-text">No se ha encontrado nada.</p>
          <p className="search-page__empty-hint">
            Intenta con otro término de búsqueda.
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
