import React, { useState } from "react";
import ChecklistQuestion from "../molecule/ChecklistQuestion.jsx";
import LikertQuestion from "../molecule/LikertQuestion.jsx";

export default function SurveyTypesOrganism() {
  const [checklistSelected, setChecklistSelected] = useState([]);
  const [likertValue, setLikertValue] = useState("");

  return (
    <div className="w-full bg-gray-50 min-h-screen flex justify-center items-start pt-8">
      <div className="bg-white rounded-xl shadow-sm w-11/12 max-w-3xl mx-auto p-8 md:p-6">
        <h2 className="text-xl font-bold text-orange-700 mb-6">Ejemplo de tipos de preguntas</h2>
        <ChecklistQuestion
          question="¿Qué actividades realizas en tu tiempo libre?"
          options={["Leer", "Deporte", "Música", "Videojuegos", "Viajar"]}
          selected={checklistSelected}
          onChange={setChecklistSelected}
        />
        <LikertQuestion
          question="¿Qué tan satisfecho estás con tu vida académica?"
          labels={["1", "2", "3", "4", "5"]}
          value={likertValue}
          onChange={setLikertValue}
        />
      </div>
    </div>
  );
}
