import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({ isLoggedIn, onLoginClick, onRegisterClick, onLogout }) {
  const { currentUser } = useAuth();

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <span className="header__logo-mark" aria-hidden="true" />
          <span className="header__logo-text">VORTYX</span>
        </Link>

        <Navigation />

        <div className="header__actions">
          {isLoggedIn ? (
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
          ) : (
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
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
