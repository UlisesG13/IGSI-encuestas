import React from "react";

export default function QuestionChartModal({ open, onClose, pregunta }) {
  if (!open || !pregunta) return null;

  // Determina el tipo de pregunta para mostrar el gráfico adecuado
  const renderChart = () => {
    switch (pregunta.idTipoPregunta) {
      case 1: // Opción múltiple
      case 5: // Checkbox
        return <MultipleChoiceChart respuestas={pregunta.respuestas} textoPregunta={pregunta.textoPregunta} />;
      case 6: // Escala de Likert
        return <LikertChart respuestas={pregunta.respuestas} textoPregunta={pregunta.textoPregunta} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-64">
            <img src="/public/chart-placeholder.svg" alt="chart" className="w-24 h-24 mb-4 opacity-80" />
            <span className="text-gray-400 text-center">No se puede graficar este tipo de pregunta</span>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-orange-600">{pregunta.textoPregunta}</h2>
        {renderChart()}
      </div>
    </div>
  );
}

// Componente para graficar opción múltiple y checkbox
function MultipleChoiceChart({ respuestas, textoPregunta }) {
  // Simulación de datos para graficar
  const data = respuestas.map(r => ({ label: r.textoRespuesta, value: Math.floor(Math.random() * 20) + 1 }));
  return (
    <div className="flex flex-col items-center">
      <span className="mb-2 text-gray-600">Gráfica de respuestas</span>
      <div className="w-full h-48 flex items-end gap-4">
        {data.map((d, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="bg-orange-400 rounded-t w-8" style={{ height: `${d.value * 6}px` }}></div>
            <span className="text-xs mt-1 text-gray-700">{d.label}</span>
            <span className="text-xs text-gray-500">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente para graficar escala de Likert
function LikertChart({ respuestas, textoPregunta }) {
  // Simulación de datos para graficar
  const opciones = ["Muy en desacuerdo", "En desacuerdo", "Neutral", "De acuerdo", "Muy de acuerdo"];
  const data = opciones.map((label, i) => ({ label, value: Math.floor(Math.random() * 20) + 1 }));
  return (
    <div className="flex flex-col items-center">
      <span className="mb-2 text-gray-600">Gráfica de escala Likert</span>
      <div className="w-full h-48 flex items-end gap-4">
        {data.map((d, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="bg-blue-400 rounded-t w-8" style={{ height: `${d.value * 6}px` }}></div>
            <span className="text-xs mt-1 text-gray-700">{d.label}</span>
            <span className="text-xs text-gray-500">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
