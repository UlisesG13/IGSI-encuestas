import { useState } from 'react';
import { QuestionCard } from '../molecule/QuestionCard.jsx';
import { NavigationButtons } from '../molecule/NavigationButtons.jsx';
import { ProgressIndicator } from '../molecule/ProgressIndicator.jsx';

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

  // Render dinámico según tipo de pregunta
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
    if (props.type === 'checklist' && props.options) {
      const ChecklistQuestion = require('../molecule/ChecklistQuestion.jsx').default;
      return (
        <div>
          <ChecklistQuestion
            question={question}
            options={props.options}
            selected={answer}
            onChange={onAnswerChange}
          />
          <div className="mt-6">
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
          </div>
        </div>
      );
    }
    // Likert
    if (props.type === 'likert' && props.labels) {
      const LikertQuestion = require('../molecule/LikertQuestion.jsx').default;
      return (
        <div>
          <LikertQuestion
            question={question}
            labels={props.labels}
            value={answer}
            onChange={onAnswerChange}
          />
          <div className="mt-6">
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
          </div>
        </div>
      );
    }
    // Pregunta tradicional
    return (
      <QuestionCard
        question={question}
        answer={answer}
        onAnswerChange={onAnswerChange}
        questionNumber={questionNumber}
        error={error}
      />
    );
  };

  return (
    <div className={`flex-1 flex flex-col h-full ${className}`} {...props}>
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

      {/* Contenido principal */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {renderQuestionContent()}
        </div>
      </div>

      {/* Footer con navegación */}
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