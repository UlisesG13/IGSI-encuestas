import React from "react";

export default function QuestionCard({ pregunta, onDelete }) {
  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-lg shadow p-3 mb-2">
      <div>
        <div className="font-semibold text-gray-800">{pregunta.textoPregunta}</div>
        <div className="text-xs text-gray-500">Tipo: {pregunta.idTipoPregunta}</div>
        {pregunta.ayuda && <div className="text-xs text-gray-400">Ayuda: {pregunta.ayuda}</div>}
        <div className="text-xs text-gray-400">Puntaje: {pregunta.puntaje}</div>
      </div>
      <button onClick={onDelete} className="text-red-500 font-bold px-2">X</button>
    </div>
  );
}
