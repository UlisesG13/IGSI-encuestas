import React from "react";
import ChecklistAtom from "../atom/ChecklistAtom.jsx";

export default function ChecklistQuestion({ question, options, selected, onChange, singleSelect = false }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-orange-700 mb-2">{question}</h3>
      <ChecklistAtom 
        options={options} 
        selected={selected} 
        onChange={onChange} 
        singleSelect={singleSelect}
      />
    </div>
  );
}
