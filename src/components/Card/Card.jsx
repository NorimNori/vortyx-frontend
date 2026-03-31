import { normalizeItem, TYPE_LABELS } from "../../utils/cardUtils";
import "./Card.css";

function Card({ item, type, onSave, isSaved }) {
  const data = normalizeItem(item, type);
  const typeLabel = TYPE_LABELS[type] || type;

  function handleSaveClick(e) {
    e.stopPropagation();
    onSave?.(item, type);
  }

  return (
    <article className="card">
      <div className="card__cover">
        {data.image ? (
          <img
            className="card__image"
            src={data.image}
            alt={data.title}
            loading="lazy"
          />
        ) : (
          <div className="card__placeholder" aria-hidden="true">
            {data.title?.slice(0, 4).toUpperCase()}
          </div>
        )}
        <div className={`card__glow card__glow--${type}`} aria-hidden="true" />
        <span className={`card__badge card__badge--${type}`}>{typeLabel}</span>

        {onSave && (
          <button
            className={`card__save${isSaved ? " card__save--saved" : ""}`}
            onClick={handleSaveClick}
            type="button"
            aria-label={
              isSaved ? "Quitar de colección" : "Guardar en colección"
            }
          >
            {isSaved ? "✓" : "+"}
          </button>
        )}
      </div>

      <div className="card__overlay">
        {data.genre && (
          <p className={`card__genre card__genre--${type}`}>{data.genre}</p>
        )}
        <h3 className="card__title">{data.title}</h3>
        <div className="card__meta">
          {data.rating && (
            <span className={`card__rating card__rating--${type}`}>
              ★ {data.rating}
            </span>
          )}
          {data.year && <span className="card__year">{data.year}</span>}
        </div>
      </div>
    </article>
  );
}

export default Card;
