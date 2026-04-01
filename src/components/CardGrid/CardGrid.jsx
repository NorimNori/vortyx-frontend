import { useRef } from "react";
import Card from "../Card/Card";
import Preloader from "../Preloader/Preloader";
import "./GridCard.css";

const SECTION_LABELS = {
  game: { prefix: "TRENDING", accent: "GAMES" },
  movie: { prefix: "TRENDING", accent: "FILMS" },
  series: { prefix: "TRENDING", accent: "SERIES" },
};

export const API_ERROR_MESSAGE =
  "Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde.";

function CardGrid({ items, type, isLoading, error, onSave, savedItems = [] }) {
  const trackRef = useRef(null);

  function scroll(direction) {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth =
      track.querySelector(".card-grid__item")?.offsetWidth || 200;
    const scrollAmount = (cardWidth + 8) * 2;
    track.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }

  if (isLoading) return <Preloader />;

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
      <div className="card-grid__header">
        <h2 className="card-grid__title">
          {SECTION_LABELS[type]?.prefix}{" "}
          <span className={`card-grid__title-accent--${type}`}>
            {SECTION_LABELS[type]?.accent}
          </span>
        </h2>

        <div className="card-grid__controls">
          <button
            className="card-grid__arrow"
            onClick={() => scroll("prev")}
            type="button"
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            className="card-grid__arrow"
            onClick={() => scroll("next")}
            type="button"
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>
      </div>

      <div className="card-grid__carousel">
        <ul className="card-grid__track" ref={trackRef}>
          {items.map((item) => (
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
      </div>
    </div>
  );
}

export default CardGrid;
