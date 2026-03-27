import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found" aria-label="Página no encontrada">
      <div className="not-found__container">
        <p className="not-found__code">404</p>
        <h1 className="not-found__title">Página no encontrada</h1>
        <p className="not-found__subtitle">
          Esta ruta no existe en el universo Vortyx.
        </p>
        <Link className="not-found__btn" to="/">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
