import React from "react";

export default function ChecklistAtom({ options = [], selected = [], onChange }) {
  const handleToggle = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {options.map((option, idx) => (
        <label key={idx} className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => handleToggle(option)}
            className="accent-orange-500 w-4 h-4 rounded"
          />
          <span className="text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  );
}
