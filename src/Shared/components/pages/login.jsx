import { useState } from "react";
import { ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";
import './login.css';
import logoIGSI from '../../../assets/logoIGSI.png';
import { login as loginApi } from '../../services/authService';

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "El correo es obligatorio";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Ingrese un correo válido";
    if (!formData.password) newErrors.password = "La contraseña es obligatoria";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const data = await loginApi(formData.email, formData.password);
      // Redirigir a dashboard o página de encuestas
      window.location.href = "/dashboard";
    } catch (error) {
      setApiError(error.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Lado izquierdo: imagen y logo */}
      <div className="login-left login-bg">
        <div className="login-logo-center">
          <img src={logoIGSI} alt="Logo IGSI" className="login-logo-img" />
          <span className="login-logo-text-below">ENCUESTAS</span>
        </div>
        <div className="login-socials">
          <a href="#" className="login-social-icon"><Facebook size={18} /></a>
          <a href="#" className="login-social-icon"><Instagram size={18} /></a>
          <a href="#" className="login-social-icon"><Twitter size={18} /></a>
        </div>
      </div>
      {/* Lado derecho: formulario */}
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-title">Inicio de sesión</div>
          <div className="login-subtitle">Por favor, complete su información a continuación</div>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
            autoComplete="email"
          />
          {errors.email && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>{errors.email}</p>}
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
            autoComplete="current-password"
          />
          {errors.password && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>{errors.password}</p>}
          {apiError && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>{apiError}</p>}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Cargando..." : "Entrar"}
            {!loading && <ArrowRight size={15} />}
          </button>
            <div className="login-divider"></div>
        </form>
      </div>
    </div>
  );
}
