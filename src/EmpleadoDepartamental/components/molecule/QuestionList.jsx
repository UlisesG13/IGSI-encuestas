import React from "react";
import QuestionCard from "./QuestionCard";

export default function QuestionList({ preguntas, onDelete }) {
  return (
    <div className="max-h-64 overflow-y-auto">
      {preguntas.map((pregunta, idx) => (
        <QuestionCard key={idx} pregunta={pregunta} onDelete={() => onDelete(idx)} />
      ))}
    </div>
  );
}
