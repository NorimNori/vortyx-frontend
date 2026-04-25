import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({ isLoggedIn, onLoginClick, onRegisterClick, onLogout }) {
  const { currentUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          <span className="header__logo-mark" aria-hidden="true" />
          <span className="header__logo-text">VORTYX</span>
        </Link>

        <div className="header__nav-desktop">
          <Navigation />
        </div>

        <div className="header__actions header__actions--desktop">
          <Actions
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            onLoginClick={onLoginClick}
            onRegisterClick={onRegisterClick}
            onLogout={onLogout}
          />
        </div>

        <button
          className={`header__burger${menuOpen ? " header__burger--open" : ""}`}
          onClick={toggleMenu}
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <span className="header__burger-line" />
          <span className="header__burger-line" />
          <span className="header__burger-line" />
        </button>
      </div>

      <div
        className={`header__mobile-menu${menuOpen ? " header__mobile-menu--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <Navigation onNavClick={closeMenu} />
        <div className="header__mobile-actions">
          <Actions
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            onLoginClick={() => {
              onLoginClick();
              closeMenu();
            }}
            onRegisterClick={() => {
              onRegisterClick();
              closeMenu();
            }}
            onLogout={() => {
              onLogout();
              closeMenu();
            }}
          />
        </div>
      </div>
    </header>
  );
}

function Actions({
  isLoggedIn,
  currentUser,
  onLoginClick,
  onRegisterClick,
  onLogout,
}) {
  if (isLoggedIn) {
    return (
      <div className="header__user">
        <Link to="/profile" className="header__user-chip">
          <div className="header__user-avatar" aria-label="Perfil">
            {currentUser?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <span className="header__user-name">
            {currentUser?.name || "Usuario"}
          </span>
        </Link>
        <button
          className="header__btn header__btn--ghost"
          onClick={onLogout}
          type="button"
        >
          Salir
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        className="header__btn header__btn--ghost"
        onClick={onLoginClick}
        type="button"
      >
        Iniciar sesión
      </button>
      <button
        className="header__btn header__btn--primary"
        onClick={onRegisterClick}
        type="button"
      >
        Registrarse
      </button>
    </>
  );
}

export default Header;
