import React from "react";
import { FiUser } from "react-icons/fi"; // Icono para perfil
import { useNavigate } from "react-router-dom";

const PerfilButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login"); // Ruta a la que quieres ir
  };

  return (
    <button
      className="flex items-center gap-2 p-2 bg-transparent border-none cursor-pointer text-white rounded-md transition-colors duration-200 hover:bg-white/10"
      onClick={handleClick}
      title="Perfil del usuario"
    >
      <FiUser size={24} />
    </button>
  );
};

export default PerfilButton;
