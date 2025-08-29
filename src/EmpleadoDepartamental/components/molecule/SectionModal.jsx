import React, { useState } from "react";

export default function SectionModal({ isOpen, onClose, onCreate, nextOrder }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    onCreate({ titulo, descripcion, orden: nextOrder });
    setTitulo("");
    setDescripcion("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-orange-600">Crear sección</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-gray-700">Título de la sección</label>
          <input
            type="text"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
          <label className="text-sm font-semibold text-gray-700">Descripción</label>
          <textarea
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            className="border rounded px-3 py-2"
            rows={2}
            placeholder="Escribe una breve descripción de la sección..."
          />
          <div className="flex gap-2 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 rounded px-4 py-2">Cancelar</button>
            <button type="submit" className="bg-orange-500 text-white rounded px-4 py-2">Crear sección</button>
          </div>
        </form>
      </div>
    </div>
  );
}
