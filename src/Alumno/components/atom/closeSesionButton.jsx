import React from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const CloseSesionButton = () => {
  const navigate = useNavigate();
    const handleClick = () => {
      navigate("/login");
    };

  return (
    <button
      className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-md cursor-pointer text-sm transition-all duration-200 hover:bg-white/20 hover:border-white/30"
      onClick={handleClick}
      title="Cerrar sesión"
    >
      <FiLogOut size={16} />
    </button>
  );
};

export default CloseSesionButton;

