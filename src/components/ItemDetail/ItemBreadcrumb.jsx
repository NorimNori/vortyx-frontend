import { Link } from "react-router-dom";

function ItemBreadcrumb({ title }) {
  return (
    <nav className="item-detail__breadcrumb" aria-label="Ruta de navegación">
      <Link className="item-detail__breadcrumb-link" to="/">
        Inicio
      </Link>
      <span className="item-detail__breadcrumb-sep" aria-hidden="true">
        /
      </span>
      <Link className="item-detail__breadcrumb-link" to="/search">
        Explorar
      </Link>
      <span className="item-detail__breadcrumb-sep" aria-hidden="true">
        /
      </span>
      <span className="item-detail__breadcrumb-current">{title}</span>
    </nav>
  );
}

export default ItemBreadcrumb;
