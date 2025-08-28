import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";
import logoIGSI from '../../../assets/logoIGSI.png';
import imgLogin from '../../../assets/imgLogin.webp';
import { login as loginApi } from '../../services/authService';

export default function Login() {
  const navigate = useNavigate(); 
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
    else if (!/\S+@\S+\.\S+/.test(formData.email))
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
      navigate("/");
    } catch (error) {
      setApiError(error.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 relative flex items-center justify-center overflow-hidden">
        <img src={imgLogin} alt="Fondo" className="absolute inset-0 w-full h-full object-cover z-0" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <img src={logoIGSI} alt="Logo IGSI" className="w-[28rem] md:w-[36rem] lg:w-[44rem]" />
          <span className="text-white text-lg font-semibold tracking-wider text-center mt-2 drop-shadow-lg">ENCUESTAS</span>
        </div>
        <div className="absolute left-8 bottom-8 flex gap-4">
          <a href="https://www.facebook.com/UniversidadelSur" target="_blank" rel="noopener noreferrer" className="bg-white text-amber-500 rounded-full w-9 h-9 flex items-center justify-center shadow-sm hover:opacity-80"><Facebook size={18} /></a>
          <a href="https://www.instagram.com/unidelsur?igsh=NmQwanpwOWh6N3J1" target="_blank" rel="noopener noreferrer" className="bg-white text-amber-500 rounded-full w-9 h-9 flex items-center justify-center shadow-sm hover:opacity-80"><Instagram size={18} /></a>
          <a href="https://x.com/unidelsur" target="_blank" rel="noopener noreferrer" className="bg-white text-amber-500 rounded-full w-9 h-9 flex items-center justify-center shadow-sm hover:opacity-80"><Twitter size={18} /></a>
        </div>
      </div>

      <div className="w-1/2 bg-white flex items-center justify-center">
        <form className="w-10/12 max-w-md flex flex-col" onSubmit={handleSubmit}>
          <h2 className="text-3xl text-gray-800 font-bold mb-2">Inicio de sesión</h2>
          <p className="text-sm text-gray-500 mb-6">Por favor, complete su información a continuación</p>

          <label htmlFor="email" className="text-sm text-gray-700 font-semibold mb-1 flex items-center gap-2">
            Correo electrónico <ArrowRight size={16} className="text-blue-500" />
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="abc@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg py-3 px-4 mb-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            autoComplete="email"
          />
          {errors.email && <p className="text-red-500 text-xs mb-3">{errors.email}</p>}

          <label htmlFor="password" className="text-sm text-gray-700 font-semibold mb-1 flex items-center gap-2">
            Password <ArrowRight size={16} className="text-blue-500" />
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="************"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg py-3 px-4 mb-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            autoComplete="current-password"
          />
          {errors.password && <p className="text-red-500 text-xs mb-3">{errors.password}</p>}
          {apiError && <p className="text-red-500 text-xs mb-3">{apiError}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-8 rounded-lg font-medium flex items-center justify-center gap-2 shadow-lg hover:bg-blue-700 disabled:opacity-50 w-40 ml-auto"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Next"}
            {!loading && <ArrowRight size={15} />}
          </button>

          <hr className="w-full h-px bg-gray-300 my-8 border-none" />
        </form>
      </div>
    </div>
  );
}
