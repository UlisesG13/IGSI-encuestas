import { useState } from "react";
import { ArrowRight, Facebook, Instagram, Twitter} from "lucide-react";

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
      const response = await fetch("http://localhost:3000/login", { // 🔹 Cambia esta URL por tu API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();
      console.log("Login exitoso:", data);

      // Guardar token en localStorage
      localStorage.setItem("token", data.token);

      // Redirigir a dashboard o página de encuestas
      window.location.href = "/dashboard";

    } catch (error) {
      console.error("Error en login:", error);
      setApiError(error.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sección izquierda */}
      <div
        className="relative md:w-1/2 w-full h-64 md:h-auto bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="absolute top-6 left-6 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
            I
          </div>
          <h1 className="text-white text-2xl font-semibold">IGSI ENCUESTAS</h1>
        </div>

        <div className="absolute bottom-6 left-6 flex space-x-3">
          <a href="#" className="bg-white rounded-full p-2 hover:bg-gray-200 transition">
            <Facebook size={16} className="text-blue-600" />
          </a>
          <a href="#" className="bg-white rounded-full p-2 hover:bg-gray-200 transition">
            <Instagram size={16} className="text-pink-500" />
          </a>
          <a href="#" className="bg-white rounded-full p-2 hover:bg-gray-200 transition">
            <Twitter size={16} className="text-blue-400" />
          </a>
        </div>
      </div>

      {/* Sección derecha */}
      <div className="md:w-1/2 w-full bg-white flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-6 bg-white"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Inicio de sesión</h2>
            <p className="text-gray-500">
              Por favor, complete su información a continuación
            </p>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="abc@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Next"} 
            {!loading && <ArrowRight className="ml-2" size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}
