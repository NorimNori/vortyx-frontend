import ItemBadges from "./ItemBadges";
import ItemExtraData from "./ItemExtraData";
import ItemSaveSection from "./ItemSaveSection";

function ItemInfo({ item, type }) {
  return (
    <div className="item-detail__info">
      <ItemBadges type={type} genres={item.genres} />

      <h1 className="item-detail__title">{item.title}</h1>

      {item.tagline && <p className="item-detail__tagline">{item.tagline}</p>}

      {item.description && (
        <p className="item-detail__description">{item.description}</p>
      )}

      <ItemExtraData item={item} />

      <ItemSaveSection />

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
