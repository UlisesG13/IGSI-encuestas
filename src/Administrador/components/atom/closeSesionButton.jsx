import React from "react";
import { FiLogOut } from "react-icons/fi";

const CloseSesionButton = () => {
  const handleClick = () => {
    alert("Cerrar sesión");
  };

  const buttonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "5px",
    color: "inherit"
  };

  const hoverStyle = {
    color: "red"
  };

  return (
    <button
      style={buttonStyle}
      onMouseOver={(e) => e.currentTarget.style.color = hoverStyle.color}
      onMouseOut={(e) => e.currentTarget.style.color = "inherit"}
      onClick={handleClick}
      title="Cerrar sesión"
    >
      <FiLogOut size={24} />
    </button>
  );
};

export default CloseSesionButton;
