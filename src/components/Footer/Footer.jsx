function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <span className="footer__logo">VORTYX</span>

        <p className="footer__credits">
          Datos por{" "}
          <a
            className="footer__link"
            href="https://rawg.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            RAWG
          </a>{" "}
          &amp;{" "}
          <a
            className="footer__link"
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            TMDB
          </a>
        </p>

        <p className="footer__copy">
          &copy; {currentYear} Vortyx & TripleTen Student
        </p>
      </div>
    </footer>
  );
}

export default Footer;
