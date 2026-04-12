import { useParams, useNavigate } from "react-router-dom";
import { useItemDetail } from "../../hooks/useItemDetail";
import Preloader from "../Preloader/Preloader";
import ItemBreadcrumb from "./ItemBreadcrumb";
import ItemPoster from "./ItemPoster";
import ItemInfo from "./ItemInfo";

const ERROR_MESSAGE =
  "Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde.";

function ItemDetail({ type }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { item, isLoading, error } = useItemDetail(id, type);

  if (isLoading) {
    return (
      <div className="item-detail item-detail--loading">
        <Preloader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="item-detail item-detail--error">
        <div className="item-detail__error-container">
          <p className="item-detail__error-text">{ERROR_MESSAGE}</p>
          <button
            className="item-detail__back-btn"
            onClick={() => navigate(-1)}
            type="button"
          >
            ← Volver
          </button>
        </div>
      </div>
    );
  }

  if (!item) return null;

  const isGame = type === "game";

  return (
    <div className="item-detail">
      {item.backdrop && (
        <div
          className="item-detail__backdrop"
          style={{ backgroundImage: `url(${item.backdrop})` }}
          aria-hidden="true"
        />
      )}

      {isGame && <div className="item-detail__orb" aria-hidden="true" />}

      <div className="item-detail__container">
        <ItemBreadcrumb title={item.title} />

        <div className="item-detail__layout">
          <ItemPoster image={item.image} title={item.title} />
          <ItemInfo item={item} type={type} />
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
