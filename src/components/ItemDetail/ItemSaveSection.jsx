import ItemStatusButtons from "./ItemStatusButtons";
import { STATUS_LABELS } from "../../utils/mockData";
import "./ItemSaveSection.css";

function ItemSaveSection({
  selectedStatus,
  onStatusSelect,
  onSave,
  isSaved,
  isSaving,
  saveError,
  isLoggedIn,
}) {
  const saveLabel = isSaved
    ? "✓ Guardado en colección"
    : isSaving
      ? "Guardando..."
      : !isLoggedIn
        ? "Inicia sesión para guardar"
        : !selectedStatus
          ? "Selecciona un estado primero"
          : `+ Agregar como "${STATUS_LABELS[selectedStatus]}"`;

  return (
    <div className="item-detail__save-section">
      <p className="item-detail__save-label">Agregar a mi colección</p>

      <ItemStatusButtons
        selectedStatus={selectedStatus}
        onSelect={onStatusSelect}
        disabled={isSaved}
      />

      {saveError && <p className="item-detail__save-error">{saveError}</p>}

      <button
        className={`item-detail__save-btn${isSaved ? " item-detail__save-btn--saved" : ""}`}
        onClick={onSave}
        type="button"
        disabled={!selectedStatus || isSaving || isSaved}
      >
        {saveLabel}
      </button>
    </div>
  );
}

export default ItemSaveSection;
