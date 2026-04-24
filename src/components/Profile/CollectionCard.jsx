import {
  STATUS_COLORS,
  STATUS_LABELS,
  ITEM_STATUS,
} from "../../utils/profileConstants";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import "./CollectionCard.css";

function CollectionCard({ item, type, onStatusChange, onDelete }) {
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleStatusChange(newStatus) {
    setIsUpdating(true);
    await onStatusChange(item._id, newStatus, type);
    setIsUpdating(false);
  }

  async function handleDelete() {
    if (!window.confirm(`¿Eliminar "${item.title}" de tu colección?`)) return;
    onDelete(item._id, type);
  }

  const statusColor = STATUS_COLORS[item.status] || "var(--color-text-subtle)";

  return (
    <article className="profile-card">
      <div className="profile-card__cover">
        {item.imageUrl ? (
          <img
            className="profile-card__image"
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
          />
        ) : (
          <div className="profile-card__placeholder" aria-hidden="true">
            {item.title.slice(0, 4).toUpperCase()}
          </div>
        )}
        <span
          className="profile-card__status"
          style={{ color: statusColor, borderColor: statusColor }}
        >
          {STATUS_LABELS[item.status]}
        </span>
      </div>

      <div className="profile-card__info">
        <h3 className="profile-card__title">{item.title}</h3>
        {item.genre && <p className="profile-card__genre">{item.genre}</p>}
        {type === "game" && item.playtime > 0 && (
          <p className="profile-card__playtime">{item.playtime} hrs</p>
        )}

        <select
          className="profile-card__select"
          value={item.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={isUpdating}
          aria-label={`Estado de ${item.title}`}
        >
          {Object.values(ITEM_STATUS).map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>

        <button
          className="profile-card__delete"
          onClick={handleDelete}
          type="button"
          aria-label={`Eliminar ${item.title}`}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default CollectionCard;
