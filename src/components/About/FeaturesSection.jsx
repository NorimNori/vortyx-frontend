import { FEATURES } from "../../utils/aboutData";
import SectionTitle from "../About/SectionTitle";

function FeaturesSection() {
  return (
    <section
      className="about__features"
      aria-label="Funcionalidades principales"
    >
      <SectionTitle main="FUNCIONALIDADES" accent="PRINCIPALES" />

      <ul className="about__feat-grid">
        {FEATURES.map(({ id, name, desc, color }) => (
          <li key={id} className="about__feat-card">
            <div
              className="about__feat-accent"
              style={{ background: color }}
              aria-hidden="true"
            />
            <h3 className="about__feat-name">{name}</h3>
            <p className="about__feat-desc">{desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FeaturesSection;
