import { NavLink } from "react-router-dom";
import "./Navigation.css";

const NAV_LINKS = [
  { to: "/", label: "Inicio", end: true },
  { to: "/search", label: "Explorar" },
  { to: "/profile", label: "Perfil" },
  { to: "/about", label: "Acerca de" },
];

function Navigation({ onNavClick }) {
  return (
    <nav className="navigation" aria-label="Navegación principal">
      <ul className="navigation__list">
        {NAV_LINKS.map(({ to, label, end }) => (
          <li className="navigation__item" key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `navigation__link${isActive ? " navigation__link--active" : ""}`
              }
              onClick={onNavClick}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
