import React from "react";
import { FiTrash2 } from "react-icons/fi";

const DeleteSectionButton = ({ onClick, ...props }) => (
  <button
    className="flex items-center justify-center p-2 rounded-md bg-red-100 hover:bg-red-200 text-red-600 transition-all duration-200"
    title="Eliminar sección"
    onClick={onClick}
    {...props}
  >
    <FiTrash2 size={16} />
  </button>
);

export default DeleteSectionButton;
