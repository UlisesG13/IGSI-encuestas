import { useState } from "react";
import { QuestionCard } from "../molecule/QuestionCard.jsx";
import { NavigationButtons } from "../molecule/NavigationButtons.jsx";
import { ProgressIndicator } from "../molecule/ProgressIndicator.jsx";
import ChecklistQuestion from "../molecule/ChecklistQuestion.jsx";
import LikertQuestion from "../molecule/LikertQuestion.jsx";

export const QuestionForm = ({
  question,
  ayuda,
  answer,
  onAnswerChange,
  questionNumber,
  totalQuestions,
  onPrevious,
  onNext,
  onSave,
  isLoading = false,
  error,
  autoSave = true,
  className = "",
  type,
  options = [],
  labels = [],
}) => {
  const [lastSaved, setLastSaved] = useState(null);

  const canGoPrevious = questionNumber > 1;
  const canGoNext = questionNumber < totalQuestions;
  const isFirstQuestion = questionNumber === 1;
  const isLastQuestion = questionNumber === totalQuestions;

  const renderQuestionContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
          <span className="ml-3 text-orange-600">Cargando pregunta...</span>
        </div>
      );
    }

    // Checklist
    if (type === "checklist" && options.length > 0) {
      return (
        <ChecklistQuestion
          question={question}
          options={options}
          selected={answer || []}
          onChange={onAnswerChange}
        />
      );
    }

    // Likert
    if (type === "likert" && options.length > 0) {
      // Si options tiene datos, usar options como escala
      return (
        <div className="flex flex-row gap-3 mt-4 justify-center">
          {options.map((opt, idx) => (
            <label key={opt.id || idx} className="flex flex-col items-center cursor-pointer">
              <input
                type="radio"
                name={`likert-${questionNumber}`}
                value={opt.id}
                checked={answer === opt.id}
                onChange={() => onAnswerChange(opt.id)}
                className="accent-orange-500 w-6 h-6 mb-1"
              />
              <span className="text-gray-700 text-base">{opt.text}</span>
            </label>
          ))}
        </div>
      );
    }

    // Radio (opción múltiple, selección única, sí/no)
    if (type === "radio" && options.length > 0) {
      return (
        <div className="flex flex-col gap-4 mt-4">
          {options.map((opt, idx) => (
            <label key={opt.id || idx} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name={`radio-${questionNumber}`}
                value={opt.id}
                checked={answer === opt.id}
                onChange={() => onAnswerChange(opt.id)}
                className="accent-orange-500 w-6 h-6"
              />
              <span className="text-gray-700 text-lg">{opt.text}</span>
            </label>
          ))}
        </div>
      );
    }

    // Text (abierta)
    return (
      <textarea
        className="border p-2 w-full"
        value={answer || ""}
        onChange={(e) => onAnswerChange(e.target.value)}
        placeholder="Escribe tu respuesta aquí..."
      />
    );
  };

  return (
    <div className={`flex-1 flex flex-col h-full ${className}`}>
      {/* Header con progreso */}
      <div className="bg-white border-b border-orange-200 p-6">
        <ProgressIndicator
          currentQuestion={questionNumber}
          totalQuestions={totalQuestions}
          showProgress={true}
        />
        {autoSave && lastSaved && (
          <div className="mt-3 text-sm text-orange-600 flex items-center gap-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            Guardado automáticamente a las {lastSaved}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {/* Mostrar el texto y tipo de pregunta */}
          <div className="mb-2">
            <p className="font-semibold text-gray-700">{question}</p>
            <span className="text-xs text-gray-400">Tip: {ayuda}</span>
          </div>

          {renderQuestionContent()}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-orange-200 p-6">
        <div className="max-w-3xl mx-auto">
          <NavigationButtons
            onPrevious={onPrevious}
            onNext={onNext}
            showPrevious={!isFirstQuestion}
            showNext={true}
            disablePrevious={!canGoPrevious || isLoading}
            disableNext={isLoading}
            previousText="Anterior pregunta"
            nextText={isLastQuestion ? "Finalizar" : "Siguiente"}
          />
          {onSave && (
            <div className="mt-4 text-center">
              <button
                onClick={onSave}
                disabled={isLoading}
                className="text-sm text-orange-600 hover:text-orange-700 underline"
              >
                Guardar y continuar más tarde
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};