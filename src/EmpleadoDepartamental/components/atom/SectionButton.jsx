// src/components/atoms/SectionButton.tsx
import React from "react";


const SectionButton = ({ label, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left px-4 py-2 rounded-r-full shadow-sm mb-2
        ${selected ? "bg-orange-500 text-white" : "bg-gradient-to-r from-orange-500 to-yellow-400 text-white"}
      `}
    >
      {label}
    </button>
  );
};

export default SectionButton;
