// src/components/organisms/SurveyConfigCard.tsx
import { useState } from "react";
import SurveyConfigForm from "../molecule/SurveyConfigForm";
import QuestionsBackFace from "./QuestionsBackFace";

const SurveyConfigCard = () => {
  const [flipped, setFlipped] = useState(false);
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: ""
  });

  const handleFormChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCrearEncuesta = () => {
    // Aquí deberías llamar a tu servicio para crear la encuesta
    // y asegurarte de que form.fechaInicio y form.fechaFin sean válidas
    if (!form.titulo || !form.fechaInicio || !form.fechaFin) {
      alert("Completa todos los campos obligatorios");
      return;
    }
    // Aquí iría la llamada a createEncuesta(form)
    console.log("Payload a enviar:", form);
    // ...
  };

  return (
    <div className="flex flex-col items-center">
      {/* Contenedor 3D */}
      <div className="relative w-[750px] h-[300px] perspective">
        <div
          className={`absolute inset-0 transition-transform duration-700 transform-style-preserve-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Cara frontal */}
          <div className="absolute inset-0 flex gap-6 justify-center backface-hidden">
            <SurveyConfigForm side="left" values={form} onChange={handleFormChange} />
            <SurveyConfigForm side="right" values={form} onChange={handleFormChange} />
          </div>

          {/* Cara trasera (por ahora vacía, pero lista para más info) */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-xl rotate-y-180 backface-hidden">
            <QuestionsBackFace />
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="mt-6 flex gap-6">
        <button
          className="flex items-center gap-2 bg-gray-700 text-white px-6 py-2 rounded-full shadow"
          onClick={handleCrearEncuesta}
        >
          ✓ Crear encuesta
        </button>
        <button className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-full shadow">
          ✕ Cancelar
        </button>
        <button
          onClick={() => setFlipped(!flipped)}
          className="ml-4 border px-4 py-2 rounded-full"
        >
          Voltear
        </button>
      </div>
    </div>
  );
};

export default SurveyConfigCard;
