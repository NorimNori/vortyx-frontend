import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({ isOpen, onClose, title, subtitle, children, name }) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className={`modal modal--${name}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${name}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__container">
        <div
          className={`modal__orb modal__orb--${name}`}
          aria-hidden="true"
        ></div>

        <div className="modal__highlight" aria-hidden="true"></div>

        <div className="modal__header">
          <div className="modal__logo">
            <span className="modal__logo-mark" aria-hidden="true"></span>
            <span className="modal__logo-text">VORTYX</span>
          </div>
          <button
            className="modal__close"
            onClick={onClose}
            type="button"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        <h2 className="modal__title" id={`modal-title-${name}`}>
          {title}
        </h2>
        {subtitle && <p className="modal__subtitle">{subtitle}</p>}

        {children}
      </div>
    </div>
  );
}

export default ModalWithForm;
