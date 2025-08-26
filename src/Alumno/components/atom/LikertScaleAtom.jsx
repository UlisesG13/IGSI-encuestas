import React from "react";

export default function LikertScaleAtom({ labels = [], value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 justify-center">
        {labels.map((label, idx) => (
          <label key={idx} className="flex flex-col items-center cursor-pointer">
            <input
              type="radio"
              name="likert"
              value={label}
              checked={value === label}
              onChange={() => onChange(label)}
              className="accent-orange-500 w-5 h-5"
            />
            <span className="text-gray-700 text-xs mt-1">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
