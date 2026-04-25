import { useState } from "react";
import { ITEM_STATUS, STATUS_LABELS } from "../../utils/profileConstants";
import { countByStatus } from "../../utils/profileHelpers";
import CollectionCard from "./CollectionCard";
import "./CollectionTab.css";

function CollectionTab({ items, type, onStatusChange, onDelete }) {
  const [activeStatus, setActiveStatus] = useState("all");
  const counts = countByStatus(items);
  const filtered =
    activeStatus === "all"
      ? items
      : items.filter((i) => i.status === activeStatus);

  return (
    <div className="profile__collection">
      <div className="profile__status-filters">
        <button
          className={`profile__status-btn${activeStatus === "all" ? " profile__status-btn--active" : ""}`}
          onClick={() => setActiveStatus("all")}
          type="button"
        >
          Todos ({items.length})
        </button>

        {Object.values(ITEM_STATUS).map(
          (status) =>
            counts[status] > 0 && (
              <button
                key={status}
                className={`profile__status-btn profile__status-btn--${status}${activeStatus === status ? " profile__status-btn--active" : ""}`}
                onClick={() => setActiveStatus(status)}
                type="button"
              >
                {STATUS_LABELS[status]} ({counts[status]})
              </button>
            ),
        )}
      </div>

      {filtered.length > 0 ? (
        <ul className="profile__grid">
          {filtered.map((item) => (
            <li key={item._id} className="profile__grid-item">
              <CollectionCard
                item={item}
                type={type}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="profile__empty">No hay items en esta categoría.</p>
      )}
    </div>
  );
}

export default CollectionTab;
