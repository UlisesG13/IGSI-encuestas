import { Sidebar } from '../organism/Sidebar';
import { QuestionForm } from '../organism/QuestionForm';
import { QuestionProgress } from '../organism/QuestionProgress';
import { QuestionnaireHeader } from '../organism/QuestionnaireHeader';


export const QuestionnaireTemplate = ({
  // Datos del usuario
  userInfo = { name: 'Usuario', role: 'Estudiante' },
  
  // Configuración de secciones
  sections = [],
  activeSection = 'personal',
  onSectionChange,
  
  // Datos de las preguntas
  currentQuestion,
  questions = [],
  currentQuestionIndex = 0,
  
  // Handlers
  onQuestionSelect,
  onAnswerChange,
  onNavigate,
  onSave,
  onExit,
  
  // Estados
  isLoading = false,
  error = null,
  autoSave = true,
  
  // UI Config
  showProgress = true,
  showHeader = true,
  
  className = '',
  ...props
}) => {
  const totalQuestions = questions.length;
  const questionNumber = currentQuestionIndex + 1;

  return (
    <div className={`h-screen flex flex-col bg-gray-50 ${className}`} {...props}>
      {/* Header opcional */}
      {showHeader && (
        <QuestionnaireHeader
          title="Cuestionario de Registro"
          subtitle={`Sección: ${sections.find(s => s.id === activeSection)?.text || activeSection}`}
          onSave={onSave}
          onExit={onExit}
        />
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          sections={sections}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
          userInfo={userInfo}
        />

        {/* Área principal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Progress panel opcional */}
          {showProgress && (
            <QuestionProgress
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              onQuestionSelect={onQuestionSelect}
            />
          )}

          {/* Formulario de pregunta o pregunta personalizada */}
          {typeof props.renderQuestion === 'function'
            ? props.renderQuestion()
            : (
              <QuestionForm
                question={currentQuestion?.text}
                answer={currentQuestion?.answer || ''}
                onAnswerChange={onAnswerChange}
                questionNumber={questionNumber}
                totalQuestions={totalQuestions}
                onPrevious={() => onNavigate('previous')}
                onNext={() => onNavigate('next')}
                onSave={onSave}
                isLoading={isLoading}
                error={error}
                autoSave={autoSave}
              />
            )
          }
        </div>
      </div>
    </div>
  );
};