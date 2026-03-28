import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({ isLoggedIn, onLoginClick, onRegisterClick }) {
  return (
    <header className="header">
      <div className="header__container">
        <a href="/" className="header__logo">
          <span className="header__logo-mark" aria-hidden="true"></span>
          <span className="header__logo-text">VORTYX</span>
        </a>
        <Navigation />

        <div className="header__actions">
          {isLoggedIn ? (
            <div className="header__user">
              <div
                className="header__user-avatar"
                aria-label="Perfil de usuario"
              >
                G
              </div>
              <span className="header__user-name">Gamma</span>
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
