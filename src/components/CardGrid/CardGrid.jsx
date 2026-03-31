import { useState } from "react";
import Card from "../Card/Card";
import Preloader from "../Preloader/Preloader";

const CARDS_PER_PAGE = 3;

export const API_ERROR_MESSAGE =
  "Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde.";

function CardGrid({ items, type, isLoading, error, onSave, savedItems = [] }) {
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  function handleShowMore() {
    setVisibleCount((prev) => prev + CARDS_PER_PAGE);
  }

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div
        className="card-grid__message card-grid__message--error"
        role="alert"
      >
        <p className="card-grid__message-text">{API_ERROR_MESSAGE}</p>
      </div>
    );
  }

  if (!isLoading && items.length === 0) {
    return (
      <div className="card-grid__message card-grid__message--empty">
        <p className="card-grid__message-text">No se ha encontrado nada.</p>
      </div>
    );
  }

  return (
    <div className="card-grid">
      <ul className="card-grid__list">
        {visibleItems.map((item) => (
          <li className="card-grid__item" key={`${type}-${item.id}`}>
            <Card
              item={item}
              type={type}
              onSave={onSave}
              isSaved={savedItems.some(
                (s) => s.id === item.id && s.type === type,
              )}
            />
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className="card-grid__more">
          <button
            className="card-grid__more-btn"
            onClick={handleShowMore}
            type="button"
          >
            Mostrar más
          </button>
        </div>
      )}
    </div>
  );
}

export default CardGrid;
