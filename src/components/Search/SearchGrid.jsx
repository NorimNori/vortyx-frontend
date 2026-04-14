import Card from "../Card/Card";
import Preloader from "../Preloader/Preloader";
import "./SearchGrid.css";

export const API_ERROR_MESSAGE =
  "Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde.";

function inferType(item) {
  if (item.media_type === "movie") return "movie";
  if (item.media_type === "tv") return "series";
  if (item.background_image !== undefined || item.rating !== undefined)
    return "game";
  return "movie";
}

function SearchGrid({
  items,
  type,
  isLoading,
  error,
  onSave,
  savedItems = [],
}) {
  if (isLoading) return <Preloader />;

  if (error) {
    return (
      <div
        className="search-grid__message search-grid__message--error"
        role="alert"
      >
        <p className="search-grid__message-text">{API_ERROR_MESSAGE}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="search-grid__message search-grid__message--empty">
        <p className="search-grid__message-text">No se ha encontrado nada.</p>
      </div>
    );
  }

  return (
    <div className="search-grid">
      <ul className="search-grid__list">
        {items.map((item) => {
          const itemType = type || inferType(item);
          return (
            <li className="search-grid__item" key={`${itemType}-${item.id}`}>
              <Card
                item={item}
                type={itemType}
                onSave={onSave}
                isSaved={savedItems.some(
                  (s) => s.id === item.id && s.type === itemType,
                )}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchGrid;
