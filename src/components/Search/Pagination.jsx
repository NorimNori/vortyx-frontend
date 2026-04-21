import "./Pagination.css";

const SIBLINGS = 1;

function buildPageRange(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = [];
  const leftSibling = Math.max(currentPage - SIBLINGS, 1);
  const rightSibling = Math.min(currentPage + SIBLINGS, totalPages);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  pages.push(1);

  if (showLeftDots) {
    pages.push("...");
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i !== 1 && i !== totalPages) pages.push(i);
  }

  if (showRightDots) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = buildPageRange(currentPage, totalPages);

  return (
    <nav className="pagination" aria-label="Paginación de resultados">
      <button
        className="pagination__btn pagination__btn--arrow"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        type="button"
        aria-label="Página anterior"
      >
        ←
      </button>

      <ul className="pagination__list">
        {pages.map((page, index) =>
          page === "..." ? (
            <li key={`dots-${index}`} className="pagination__dots">
              ...
            </li>
          ) : (
            <li key={page}>
              <button
                className={`pagination__btn${
                  currentPage === page ? " pagination__btn--active" : ""
                }`}
                onClick={() => onPageChange(page)}
                type="button"
                aria-label={`Ir a página ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            </li>
          ),
        )}
      </ul>

      <button
        className="pagination__btn pagination__btn--arrow"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        type="button"
        aria-label="Página siguiente"
      >
        →
      </button>
    </nav>
  );
}

export default Pagination;
