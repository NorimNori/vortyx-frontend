import ItemBadges from "./ItemBadges";
import ItemMeta from "./ItemMeta";
import ItemSaveSection from "./ItemSaveSection";
import "./ItemInfo.css";

function ItemInfo({
  item,
  type,
  selectedStatus,
  onStatusSelect,
  isSaved,
  isSaving,
  saveError,
  isLoggedIn,
  onSave,
}) {
  return (
    <div className="item-detail__info">
      <ItemBadges type={type} genres={item.genres} />

      <h1 className="item-detail__title">{item.title}</h1>

      {item.tagline && <p className="item-detail__tagline">{item.tagline}</p>}

      <ItemMeta item={item} type={type} />

      {item.description && (
        <p className="item-detail__description">{item.description}</p>
      )}

      <ItemSaveSection
        selectedStatus={selectedStatus}
        onStatusSelect={onStatusSelect}
        onSave={onSave}
        isSaved={isSaved}
        isSaving={isSaving}
        saveError={saveError}
        isLoggedIn={isLoggedIn}
      />

      {item.website && (
        <a
          className="item-detail__website"
          href={item.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          Sitio oficial →
        </a>
      )}
    </div>
  );
}

export default ItemInfo;
