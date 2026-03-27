import { useEffect, useState } from "react";
import "./Main.css";
import Preloader from "../Preloader/Preloader";

function Main() {
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return (
    <section className="main">
      {loading ? (
        <Preloader />
      ) : (
        <>
          <div
            className="main__orb main__orb--primary"
            aria-hidden="true"
          ></div>
          <div
            className="main__orb main__orb--secondary"
            aria-hidden="true"
          ></div>

          <div className="main__container">
            <p className="main__eyebrow">Tu universo de entretenimiento</p>
            <h1 className="main__title">
              TODO LO QUE TE
              <span className="main__title-brand">MUEVE</span>
              EN UN SOLO LUGAR.
            </h1>
            <p className="main__subtitle">
              Juegos, películas y series en un solo lugar.
              <br />
              Descubre los patrones de lo que te mueve.
            </p>
          </div>
        </>
      )}
    </section>
  );
}

export default Main;
