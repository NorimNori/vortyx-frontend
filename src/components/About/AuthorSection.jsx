import { AUTHOR } from "../../utils/aboutData";
import "./AuthorSection.css";

function AuthorSection() {
  return (
    <section className="about__author" aria-label="Sobre la autora">
      <div className="about__author-avatar" aria-hidden="true">
        {AUTHOR.initial}
      </div>

      <div className="about__author-info">
        <p className="about__author-name">{AUTHOR.name}</p>
        <p className="about__author-role">{AUTHOR.role}</p>
        <p className="about__author-desc">{AUTHOR.desc}</p>

        <ul className="about__author-links" aria-label="Links de contacto">
          {AUTHOR.links.map(({ label, href }) => (
            <li key={label}>
              <a
                className="about__author-link"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default AuthorSection;
