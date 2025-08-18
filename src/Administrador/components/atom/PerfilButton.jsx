import React from "react";
import { FiUser } from "react-icons/fi"; // Icono para perfil
import { useNavigate } from "react-router-dom";

const PerfilButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/perfilDelUsuario"); // Ruta a la que quieres ir
  };

  const buttonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "5px",
    color: "inherit"
  };

  const hoverStyle = {
    color: "blue"
  };

  return (
    <button
      style={buttonStyle}
      onMouseOver={(e) => e.currentTarget.style.color = hoverStyle.color}
      onMouseOut={(e) => e.currentTarget.style.color = "inherit"}
      onClick={handleClick}
      title="Perfil del usuario"
    >
      <FiUser size={24} />
    </button>
  );
};

export default PerfilButton;
