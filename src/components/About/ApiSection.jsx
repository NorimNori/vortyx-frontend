import { APIS } from "../../utils/aboutData";
import SectionTitle from "./SectionTitle";

function ApisSection() {
  return (
    <section className="about__apis" aria-label="APIs utilizadas">
      <SectionTitle main="DATOS" accent="PROVISTOS POR" accentMuted />

      <ul className="about__apis-grid">
        {APIS.map(({ id, name, desc, badge, color, href }) => (
          <li key={id} className="about__api-card">
            <div className="about__api-info">
              <p className="about__api-name">{name}</p>
              <p className="about__api-desc">{desc}</p>
            </div>
            <a
              className={`about__api-badge about__api-badge--${color}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {badge}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ApisSection;
