import { TECH_STACK } from "../../utils/aboutData";
import TechCard from "./TechCard";
import "./HeroSection.css";

function HeroSection() {
  return (
    <section className="about__hero">
      <div className="about__hero-left">
        <p className="about__eyebrow">
          <span className="about__eyebrow-dot" aria-hidden="true" />
          Proyecto final · TripleTen Bootcamp
        </p>
        <h1 className="about__title">
          SOBRE
          <br />
          <span className="about__title-accent">VORTYX</span>
        </h1>
        <p className="about__desc">
          Vortyx es una aplicación full-stack que centraliza tu historial de
          entretenimiento. Busca videojuegos, películas y series, guárdalos en
          tu colección y descubre los patrones de lo que te mueve a través de
          estadísticas visuales.
        </p>
        <p className="about__desc">
          Construido como proyecto final del Bootcamp de Desarrollo Web de
          TripleTen, con React en el frontend, Node.js + Express en el backend y
          MongoDB como base de datos.
        </p>
      </div>

      <ul className="about__tech-list" aria-label="Tecnologías utilizadas">
        {TECH_STACK.map((tech) => (
          <TechCard key={tech.id} {...tech} />
        ))}
      </ul>
    </section>
  );
}

export default HeroSection;
