import "./Hero.css";

function Hero() {
  return (
    <section className="main__hero">
      <div className="main__hero-container">
        <p className="main__eyebrow">
          <span className="main__eyebrow-dot" aria-hidden="true" />
          Tu universo de entretenimiento
        </p>
        <h1 className="main__title">
          TODO
          <br />
          <span className="main__title-brand">VORTYX</span>
          <br />
          TU MUNDO.
        </h1>
        <p className="main__subtitle">
          Juegos, películas y series en un solo lugar.
          <br />
          Descubre los patrones de lo que te mueve.
        </p>
        <div className="main__stats">
          <div className="main__stat">
            <span className="main__stat-value">500K+</span>
            <span className="main__stat-label">Juegos</span>
          </div>
          <div className="main__stat">
            <span className="main__stat-value">1M+</span>
            <span className="main__stat-label">Películas</span>
          </div>
          <div className="main__stat">
            <span className="main__stat-value">1×</span>
            <span className="main__stat-label">Búsqueda</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
