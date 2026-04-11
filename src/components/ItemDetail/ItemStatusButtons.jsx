import { ITEM_STATUS, STATUS_LABELS } from "../../utils/mockData";

function ItemStatusButtons({ selectedStatus, onSelect }) {
  return (
    <div
      className="item-detail__status-opts"
      role="group"
      aria-label="Estado en colección"
    >
      {Object.values(ITEM_STATUS).map((status) => (
        <button
          key={status}
          className={`item-detail__status-btn${
            selectedStatus === status ? " item-detail__status-btn--active" : ""
          }`}
          onClick={() => onSelect(status)}
          type="button"
          aria-pressed={selectedStatus === status}
        >
          {STATUS_LABELS[status]}
        </button>
      ))}
    </div>
  );
}

export default ItemStatusButtons;
