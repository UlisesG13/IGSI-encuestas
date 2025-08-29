import React, { useState } from "react";

export default function SectionCreator({ onAdd }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    onAdd({ titulo, descripcion });
    setTitulo("");
    setDescripcion("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
      <input
        type="text"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        placeholder="Título de la sección"
        className="border rounded px-3 py-2"
        required
      />
      <textarea
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
        placeholder="Descripción de la sección (opcional)"
        className="border rounded px-3 py-2"
        rows={2}
      />
      <button type="submit" className="bg-orange-500 text-white rounded px-4 py-2 mt-1">Agregar sección</button>
    </form>
  );
}
