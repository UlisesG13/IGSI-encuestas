import React, { useState } from "react";

const tipos = [
  { id: 1, label: "Opción Múltiple" },
  { id: 2, label: "Respuesta Corta" },
  { id: 3, label: "Respuesta Larga" },
  { id: 4, label: "Verdadero/Falso" },
];

export default function QuestionCreator({ onAdd, secciones }) {
  const [textoPregunta, setTextoPregunta] = useState("");
  const [idTipoPregunta, setIdTipoPregunta] = useState("");
  const [ayuda, setAyuda] = useState("");
  const [puntaje, setPuntaje] = useState(1);
  const [idSeccion, setIdSeccion] = useState(secciones[0]?.id || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!textoPregunta.trim() || !idTipoPregunta || !idSeccion) return;
    onAdd({ textoPregunta, idTipoPregunta, ayuda, puntaje, idSeccion });
    setTextoPregunta("");
    setIdTipoPregunta("");
    setAyuda("");
    setPuntaje(1);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
      <select
        value={idSeccion}
        onChange={e => setIdSeccion(e.target.value)}
        className="border rounded px-3 py-2"
        required
      >
        {secciones.map(sec => (
          <option key={sec.id} value={sec.id}>{sec.titulo}</option>
        ))}
      </select>
      <input
        type="text"
        value={textoPregunta}
        onChange={e => setTextoPregunta(e.target.value)}
        placeholder="Texto de la pregunta"
        className="border rounded px-3 py-2"
        required
      />
      <select
        value={idTipoPregunta}
        onChange={e => setIdTipoPregunta(e.target.value)}
        className="border rounded px-3 py-2"
        required
      >
        <option value="">Tipo de pregunta</option>
        {tipos.map(tipo => (
          <option key={tipo.id} value={tipo.id}>{tipo.label}</option>
        ))}
      </select>
      <textarea
        value={ayuda}
        onChange={e => setAyuda(e.target.value)}
        placeholder="Ayuda o ejemplo (opcional)"
        className="border rounded px-3 py-2"
        rows={2}
      />
      <input
        type="number"
        min={1}
        value={puntaje}
        onChange={e => setPuntaje(Number(e.target.value))}
        placeholder="Puntaje"
        className="border rounded px-3 py-2"
        required
      />
      <button type="submit" className="bg-green-500 text-white rounded px-4 py-2 mt-1">Agregar pregunta</button>
    </form>
  );
}
