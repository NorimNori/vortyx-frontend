import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader" role="status" aria-label="Cargando...">
      <div className="preloader__container">
        <div className="preloader__ring">
          <div className="preloader__ring-inner"></div>
        </div>
        <p className="preloader__text">Cargando</p>
      </div>
    </div>
  );
}

export default Preloader;
