import React, { useState, useEffect } from "react";

const tipos = [
  { id: 'open', label: 'Respuesta Abierta' },
  { id: 'multiple', label: 'Opción Múltiple' },
  { id: 'checklist', label: 'Checkbox' },
  { id: 'likert', label: 'Escala Likert' },
  { id: 'boolean', label: 'Verdadero/Falso (Sí o No)' },
];

export default function QuestionCreator({ onAdd, secciones, selectedSectionId }) {
  const [textoPregunta, setTextoPregunta] = useState("");
  const [idTipoPregunta, setIdTipoPregunta] = useState("");
  const [ayuda, setAyuda] = useState("");
  const [idSeccion, setIdSeccion] = useState(selectedSectionId || secciones[0]?.id || "");
  const [opciones, setOpciones] = useState(["", ""]);

  // Actualizar el select cuando cambian las secciones o la selección del sidebar
  useEffect(() => {
    if (selectedSectionId && secciones.some(s => s.id === selectedSectionId)) {
      setIdSeccion(selectedSectionId);
    } else if (secciones.length > 0) {
      setIdSeccion(secciones[0].id);
    } else {
      setIdSeccion("");
    }
  }, [secciones, selectedSectionId]);

  useEffect(() => {
    if (idTipoPregunta === "multiple" || idTipoPregunta === "checklist") {
      setOpciones(["", ""]);
    } else {
      setOpciones([]);
    }
  }, [idTipoPregunta]);

  const handleOpcionChange = (idx, value) => {
    const nuevasOpciones = [...opciones];
    nuevasOpciones[idx] = value;
    setOpciones(nuevasOpciones);
  };

  const handleAddOpcion = () => {
    setOpciones([...opciones, ""]);
  };

  const handleRemoveOpcion = (idx) => {
    if (opciones.length > 2) {
      setOpciones(opciones.filter((_, i) => i !== idx));
    }
  };

  const opcionesValidas = opciones.filter(op => op.trim() !== "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!textoPregunta.trim() || !idTipoPregunta || !idSeccion) return;
    if ((idTipoPregunta === "multiple" || idTipoPregunta === "checklist") && opcionesValidas.length < 2) return;
    onAdd({ textoPregunta, idTipoPregunta, ayuda, idSeccion, opciones: (idTipoPregunta === "multiple" || idTipoPregunta === "checklist") ? opcionesValidas : undefined });
    setTextoPregunta("");
    setIdTipoPregunta("");
    setAyuda("");
    setOpciones(["", ""]);
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
          <option key={sec.id} value={sec.id}>{sec.titulo || sec.label}</option>
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
      {(idTipoPregunta === "multiple" || idTipoPregunta === "checklist") && (
        <div className="flex flex-col gap-2 bg-gray-50 p-3 rounded">
          <label className="font-semibold text-sm">Opciones (mínimo 2)</label>
          {opciones.map((op, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                type="text"
                value={op}
                onChange={e => handleOpcionChange(idx, e.target.value)}
                placeholder={`Opción ${idx + 1}`}
                className="border rounded px-3 py-2 flex-1"
                required
              />
              {opciones.length > 2 && (
                <button type="button" onClick={() => handleRemoveOpcion(idx)} className="text-red-500 font-bold">X</button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddOpcion} className="text-blue-500 text-sm mt-1 self-start">+ Agregar opción</button>
        </div>
      )}
      <textarea
        value={ayuda}
        onChange={e => setAyuda(e.target.value)}
        placeholder="Ayuda o ejemplo (opcional)"
        className="border rounded px-3 py-2"
        rows={2}
      />
      <button type="submit" className="bg-green-500 text-white rounded px-4 py-2 mt-1"
        disabled={(idTipoPregunta === "multiple" || idTipoPregunta === "checklist") && opcionesValidas.length < 2}
      >Agregar pregunta</button>
    </form>
  );
}
