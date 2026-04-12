import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { STATUS_LABELS } from "../../utils/mockData";
import ItemStatusButtons from "./ItemStatusButtons";

function ItemSaveSection() {
  const { isLoggedIn } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  function handleSave() {
    if (!isLoggedIn) {
      return;
    }
    setIsSaved((prev) => !prev);
  }

  const saveLabel = isSaved
    ? "✓ Guardado en colección"
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
        onSelect={setSelectedStatus}
      />
      <button
        className={`item-detail__save-btn${isSaved ? " item-detail__save-btn--saved" : ""}`}
        onClick={handleSave}
        type="button"
        disabled={!selectedStatus}
      >
        {saveLabel}
      </button>
    </div>
  );
}

export default ItemSaveSection;
