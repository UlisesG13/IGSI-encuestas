import { useState } from "react";
import QuestionEditor from "../molecule/QuestionEditor";
import QuestionTypeSelect from "../atom/QuestionTypeSelect";

const QuestionsBackFace = () => {
  const [questions, setQuestions] = useState(["Pregunta 1"]);
  const [selectedType, setSelectedType] = useState("open");

  const addQuestion = () => {
    setQuestions([...questions, `Pregunta ${questions.length + 1}`]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <div className="flex gap-6">
      {/* Panel izquierdo */}
      <div className="p-6 bg-gray-50 rounded-xl shadow-md w-[350px]">
        <h3 className="font-bold mb-3">&lt;Sección&gt;</h3>
        <div className="space-y-2">
          {questions.map((q, i) => (
            <div key={i} className="flex justify-between items-center border-b pb-1">
              <span>{q}</span>
              <button onClick={() => removeQuestion(i)} className="text-red-500">✕</button>
            </div>
          ))}
        </div>
        <button
          onClick={addQuestion}
          className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-full shadow flex items-center gap-2"
        >
          ✓ Agregar Pregunta
        </button>
      </div>

      {/* Panel derecho */}
      <div className="p-6 bg-gray-50 rounded-xl shadow-md w-[350px]">
        <h3 className="font-bold mb-3">Pregunta</h3>
        <QuestionTypeSelect value={selectedType} onChange={setSelectedType} />
        <QuestionEditor type={selectedType} />
      </div>
    </div>
  );
};

export default QuestionsBackFace;
