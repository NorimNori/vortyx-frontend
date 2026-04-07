import { STATUS_COLORS, STATUS_LABELS } from "../../utils/profileConstants";

function CollectionCard({ item, type }) {
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
        {type === "game" && item.playtime && (
          <p className="profile-card__playtime">{item.playtime} hrs</p>
        )}
      </div>
    </article>
  );
}

export default CollectionCard;
