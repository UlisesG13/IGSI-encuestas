import React from "react";
import LikertScaleAtom from "../atom/LikertScaleAtom.jsx";

export default function LikertQuestion({ question, labels, value, onChange }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-orange-700 mb-2">{question}</h3>
      <LikertScaleAtom labels={labels} value={value} onChange={onChange} />
    </div>
  );
}
