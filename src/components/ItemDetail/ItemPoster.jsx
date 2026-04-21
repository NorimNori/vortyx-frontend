import "./ItemPoster.css";

function ItemPoster({ image, title }) {
  return (
    <aside className="item-detail__poster-wrap">
      {image ? (
        <img
          className="item-detail__poster"
          src={image}
          alt={`Portada de ${title}`}
        />
      ) : (
        <div className="item-detail__poster-placeholder" aria-hidden="true">
          {title?.slice(0, 4).toUpperCase()}
        </div>
      )}
    </aside>
  );
}

export default ItemPoster;
