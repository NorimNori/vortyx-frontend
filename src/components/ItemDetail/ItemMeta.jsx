function ItemMeta({ item, type }) {
  return (
    <ul className="item-detail__meta" aria-label="Información del título">
      {item.rating && (
        <li
          className={`item-detail__meta-item item-detail__meta-item--rating item-detail__meta-item--${type}`}
        >
          ★ {item.rating}
        </li>
      )}
      {item.metacritic && (
        <li className="item-detail__meta-item">
          Metacritic: {item.metacritic}
        </li>
      )}
      {item.released && (
        <li className="item-detail__meta-item">{item.released}</li>
      )}
      {item.runtime && (
        <li className="item-detail__meta-item">{item.runtime}</li>
      )}
      {item.seasons && (
        <li className="item-detail__meta-item">
          {item.seasons} temporada{item.seasons !== 1 ? "s" : ""}
        </li>
      )}
      {item.playtime && (
        <li className="item-detail__meta-item">~{item.playtime} hrs</li>
      )}
    </ul>
  );
}

export default ItemMeta;
