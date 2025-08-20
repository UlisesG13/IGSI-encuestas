import { useState } from "react";
import { ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";
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
    <div className="flex h-screen md:flex-col md:h-auto">
      {/* Lado izquierdo: imagen y logo */}
      <div className="w-1/2 min-w-80 relative flex items-center justify-center md:w-full md:h-80 md:p-8 md:min-w-0"
           style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('../../../assets/imgLogin.webp')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <img src={logoIGSI} alt="Logo IGSI" className="w-96 mb-0.5 md:w-80" />
          <span className="text-white text-2xl font-medium tracking-wider text-center mt-0 md:text-lg">ENCUESTAS</span>
        </div>
        <div className="absolute left-8 bottom-8 flex gap-4 md:left-8 md:bottom-8">
          <a href="#" className="bg-white text-amber-500 rounded-full w-9 h-9 flex items-center justify-center text-lg shadow-sm hover:opacity-80">
            <Facebook size={18} />
          </a>
          <a href="#" className="bg-white text-amber-500 rounded-full w-9 h-9 flex items-center justify-center text-lg shadow-sm hover:opacity-80">
            <Instagram size={18} />
          </a>
          <a href="#" className="bg-white text-amber-500 rounded-full w-9 h-9 flex items-center justify-center text-lg shadow-sm hover:opacity-80">
            <Twitter size={18} />
          </a>
        </div>
      </div>
      {/* Lado derecho: formulario */}
      <div className="w-2/5 min-w-80 bg-white p-16 flex items-center justify-center md:w-full md:p-8">
        <form className="w-11/12 max-w-md flex flex-col items-stretch" onSubmit={handleSubmit}>
          <div className="text-3xl text-gray-800 font-bold mb-2 md:text-2xl">Inicio de sesión</div>
          <div className="text-sm text-gray-500 mb-6">Por favor, complete su información a continuación</div>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-5 border border-gray-200 rounded-md py-3 px-4 text-sm bg-white mb-6 outline-none transition-colors duration-200 focus:border-blue-500"
            autoComplete="email"
          />
          {errors.email && <p className="text-red-500 text-xs mb-3">{errors.email}</p>}
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full h-5 border border-gray-200 rounded-md py-3 px-4 text-sm bg-white mb-6 outline-none transition-colors duration-200 focus:border-blue-500"
            autoComplete="current-password"
          />
          {errors.password && <p className="text-red-500 text-xs mb-3">{errors.password}</p>}
          {apiError && <p className="text-red-500 text-xs mb-3">{apiError}</p>}
          <button 
            type="submit" 
            className="bg-blue-600 text-white py-3 px-8 rounded-lg font-medium border-none text-lg cursor-pointer flex items-center justify-center gap-2 shadow-lg transition-colors duration-200 hover:bg-blue-700 ml-auto mr-0 w-40 disabled:opacity-50" 
            disabled={loading}
          >
            {loading ? "Cargando..." : "Entrar"}
            {!loading && <ArrowRight size={15} />}
          </button>
          <hr className="w-full h-px bg-gray-300 my-8 mt-8 border-none" />
        </form>
      </div>
    </div>
  );
}
