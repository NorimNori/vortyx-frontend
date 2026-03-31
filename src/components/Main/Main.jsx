import { useEffect, useState } from "react";
import "./Main.css";
import Preloader from "../Preloader/Preloader";
import Hero from "../Hero/Hero";
import CardGrid from "../CardGrid/CardGrid";

function Main() {
  const [loading, setIsLoading] = useState(true);

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
          <Hero />
        </>
      )}
    </section>
  );
}

export default Main;
