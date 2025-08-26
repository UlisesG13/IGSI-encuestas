import { ProgressIndicator } from '../molecule/ProgressIndicator';


export const QuestionProgress = ({ 
  questions = [],
  currentQuestionIndex = 0,
  onQuestionSelect,
  className = '',
  ...props 
}) => {
  const totalQuestions = questions.length;
  const currentQuestion = currentQuestionIndex + 1;

  return (
    <div className={`bg-white border-b border-gray-200 p-4 ${className}`} {...props}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Progreso del Cuestionario
        </h3>
        <ProgressIndicator
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          showProgress={false}
        />
      </div>

      {/* Indicadores de preguntas */}
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => {
          const questionNumber = index + 1;
          const isActive = index === currentQuestionIndex;
          const isCompleted = question.answered;
          const hasError = question.error;

          let variant = 'default';
          if (hasError) variant = 'error';
          else if (isCompleted) variant = 'success';
          else if (isActive) variant = 'primary';

          return (
            <button
              key={index}
              onClick={() => onQuestionSelect(index)}
              className={`
                w-10 h-10 rounded-full border-2 text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'border-orange-500 bg-orange-500 text-white scale-110' 
                  : hasError
                  ? 'border-red-300 bg-red-50 text-red-700 hover:border-red-400'
                  : isCompleted
                  ? 'border-orange-300 bg-orange-50 text-orange-700 hover:border-orange-400'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }
              `}
            >
              {questionNumber}
            </button>
          );
        })}
      </div>

      {/* Leyenda */}
      <div className="flex items-center gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-orange-100 border border-orange-300"></div>
          <span className="text-gray-600">Completada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-orange-500"></div>
          <span className="text-gray-600">Actual</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-white border border-gray-300"></div>
          <span className="text-gray-600">Pendiente</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-100 border border-red-300"></div>
          <span className="text-gray-600">Con errores</span>
        </div>
      </div>
    </div>
  );
};