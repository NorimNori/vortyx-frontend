function ItemBadges({ type, genres }) {
  const typeLabel =
    type === "game" ? "Juego" : type === "movie" ? "Película" : "Serie";

  return (
    <div className="item-detail__badges">
      <span
        className={`item-detail__type-badge item-detail__type-badge--${type}`}
      >
        {typeLabel}
      </span>
      {genres.slice(0, 3).map((genre) => (
        <span key={genre} className="item-detail__genre-badge">
          {genre}
        </span>
      ))}
    </div>
  );
}

export default ItemBadges;
