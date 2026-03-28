import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }
  function validate() {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un correo válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 8) {
      newErrors.password = "Mínimo 8 caracteres";
    }

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onLogin?.(formData);
      handleClose();
    } catch (err) {
      setErrors({ general: err.message || "Correo o contraseña incorrectos" });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    setFormData({ email: "", password: "" });
    setErrors({});
    setIsSubmitting(false);
    onClose();
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={handleClose}
      name="login"
      title="BIENVENIDO DE VUELTA"
      subtitle="Inicia sesión para acceder a tu universo personal."
    >
      <form
        className="login-form"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Formulario de inicio de sesión"
      >
        {errors.general && (
          <p className="login-form__error-general" role="alert">
            {errors.general}
          </p>
        )}

        <div className="login-form__field">
          <label className="login-form__label" htmlFor="login-email">
            Correo electrónico
          </label>
          <input
            className={`login-form__input${errors.email ? " login-form__input--error" : ""}`}
            id="login-email"
            type="email"
            name="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          {errors.email && (
            <span className="login-form__error" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className="login-form__field">
          <label className="login-form__label" htmlFor="login-password">
            Contraseña
          </label>
          <input
            className={`login-form__input${errors.password ? " login-form__input--error" : ""}`}
            id="login-password"
            type="password"
            name="password"
            placeholder="Mínimo 8 caracteres"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
          {errors.password && (
            <span className="login-form__error" role="alert">
              {errors.password}
            </span>
          )}
        </div>

        <button
          className={`login-form__submit${isSubmitting ? " login-form__submit--loading" : ""}`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>

        <p className="login-form__footer">
          ¿No tienes cuenta?{" "}
          <button
            className="login-form__switch"
            type="button"
            onClick={onSwitchToRegister}
          >
            Regístrate gratis
          </button>
        </p>
      </form>
    </ModalWithForm>
  );
}

export default LoginModal;
