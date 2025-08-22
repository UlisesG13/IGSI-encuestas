import { useState } from 'react';
import { QuestionCard } from '../molecule/QuestionCard';
import { NavigationButtons } from '../molecule/NavigationButtons';
import { ProgressIndicator } from '../molecule/ProgressIndicator';

export const QuestionForm = ({ 
  question,
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
  className = '',
  ...props 
}) => {
  const [lastSaved, setLastSaved] = useState(null);
  
  const canGoPrevious = questionNumber > 1;
  const canGoNext = questionNumber < totalQuestions;
  const isFirstQuestion = questionNumber === 1;
  const isLastQuestion = questionNumber === totalQuestions;

  return (
    <div className={`flex-1 flex flex-col h-full ${className}`} {...props}>
      {/* Header con progreso */}
      <div className="bg-white border-b border-gray-200 p-6">
        <ProgressIndicator
          currentQuestion={questionNumber}
          totalQuestions={totalQuestions}
          showProgress={true}
        />
        
        {autoSave && lastSaved && (
          <div className="mt-3 text-sm text-green-600 flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Guardado automáticamente a las {lastSaved}
          </div>
        )}
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <span className="ml-3 text-gray-600">Cargando pregunta...</span>
            </div>
          ) : (
            <QuestionCard
              question={question}
              answer={answer}
              onAnswerChange={onAnswerChange}
              questionNumber={questionNumber}
              error={error}
            />
          )}
        </div>
      </div>

      {/* Footer con navegación */}
      <div className="bg-white border-t border-gray-200 p-6">
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
                className="text-sm text-purple-600 hover:text-purple-700 underline"
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