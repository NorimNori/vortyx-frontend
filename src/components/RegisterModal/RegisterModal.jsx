import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "confirmPassword" && errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
    if (name === "password" && formData.confirmPassword) {
      if (value !== formData.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Las contraseñas no coinciden",
        }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      }
    }
  }

  function validate() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Mínimo 2 caracteres";
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
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
      await onRegister?.({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      handleClose();
    } catch (err) {
      setErrors({ general: err.message || "Este correo ya está registrado" });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
    setIsSubmitting(false);
    onClose();
  }

  function getPasswordStrength(password) {
    if (!password) return null;
    if (password.length < 8)
      return { level: "weak", label: "Muy corta", color: "var(--color-movie)" };
    if (password.length < 10)
      return { level: "fair", label: "Débil", color: "var(--color-game)" };
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return {
        level: "strong",
        label: "Fuerte",
        color: "var(--color-success)",
      };
    }
    return { level: "medium", label: "Aceptable", color: "var(--color-brand)" };
  }

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={handleClose}
      name="register"
      title="CREA TU UNIVERSO"
      subtitle="Empieza a construir tu colección y descubre los patrones de lo que te mueve."
    >
      <form
        className="register-form"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Formulario de registro"
      >
        {errors.general && (
          <p className="register-form__error-general" role="alert">
            {errors.general}
          </p>
        )}

        <div className="register-form__field">
          <label className="register-form__label" htmlFor="register-name">
            Nombre
          </label>
          <input
            className={`register-form__input${errors.name ? " register-form__input--error" : ""}`}
            id="register-name"
            type="text"
            name="name"
            placeholder="¿Cómo te llamas?"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />
          {errors.name && (
            <span className="register-form__error" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className="register-form__field">
          <label className="register-form__label" htmlFor="register-email">
            Correo electrónico
          </label>
          <input
            className={`register-form__input${errors.email ? " register-form__input--error" : ""}`}
            id="register-email"
            type="email"
            name="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          {errors.email && (
            <span className="register-form__error" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className="register-form__field">
          <label className="register-form__label" htmlFor="register-password">
            Contraseña
          </label>
          <input
            className={`register-form__input${errors.password ? " register-form__input--error" : ""}`}
            id="register-password"
            type="password"
            name="password"
            placeholder="Mínimo 8 caracteres"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          {formData.password && !errors.password && (
            <div className="register-form__strength">
              <div
                className={`register-form__strength-bar register-form__strength-bar--${passwordStrength?.level}`}
                style={{ "--strength-color": passwordStrength?.color }}
              ></div>
              <span
                className="register-form__strength-label"
                style={{ color: passwordStrength?.color }}
              >
                {passwordStrength?.label}
              </span>
            </div>
          )}
          {errors.password && (
            <span className="register-form__error" role="alert">
              {errors.password}
            </span>
          )}
        </div>

        <div className="register-form__field">
          <label
            className="register-form__label"
            htmlFor="register-confirm-password"
          >
            Confirmar contraseña
          </label>
          <input
            className={`register-form__input${errors.confirmPassword ? " register-form__input--error" : ""} ${formData.confirmPassword && !errors.confirmPassword ? "register-form__input--valid" : ""}`}
            id="register-confirm-password"
            type="password"
            name="confirmPassword"
            placeholder="Repite tu contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
          {errors.confirmPassword && (
            <span className="register-form__error" role="alert">
              {errors.confirmPassword}
            </span>
          )}

          {formData.confirmPassword &&
            formData.password === formData.confirmPassword && (
              <span
                className="register-form__match"
                aria-label="Las contraseñas coinciden"
              >
                ✓ Las contraseñas coinciden
              </span>
            )}
        </div>

        <button
          className={`register-form__submit${isSubmitting ? " register-form__submit--loading" : ""}`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creando cuenta..." : "Crear cuenta gratis"}
        </button>

        <p className="register-form__footer">
          ¿Ya tienes cuenta?{" "}
          <button
            className="register-form__switch"
            type="button"
            onClick={onSwitchToLogin}
          >
            Inicia sesión
          </button>
        </p>
      </form>
    </ModalWithForm>
  );
}

export default RegisterModal;
