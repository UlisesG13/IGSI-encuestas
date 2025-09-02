import React from "react";

export default function ChecklistAtom({ options = [], selected = [], onChange, singleSelect = false }) {
  const handleToggle = (option) => {
    if (singleSelect) {
      // Para selección única, simplemente establecer la opción seleccionada
      onChange(option);
    } else {
      // Para selección múltiple, agregar/quitar de la lista
      if (selected.includes(option)) {
        onChange(selected.filter((item) => item !== option));
      } else {
        onChange([...selected, option]);
      }
    }
  };

  const isSelected = (option) => {
    if (singleSelect) {
      return selected === option;
    } else {
      return selected.includes(option);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {options.map((option, idx) => (
        <label key={idx} className="flex items-center gap-2 cursor-pointer">
          <input
            type={singleSelect ? "radio" : "checkbox"}
            name={singleSelect ? "single-select" : undefined}
            checked={isSelected(option)}
            onChange={() => handleToggle(option)}
            className={`${singleSelect ? 'text-orange-500' : 'accent-orange-500'} w-4 h-4 rounded`}
          />
          <span className="text-gray-700">{option.text || 'Sin texto'}</span>
        </label>
      ))}
    </div>
  );
}
