import { useState, useEffect } from 'react';
import { QuestionnaireTemplate } from '../templates/QuestionnaireTemplate';

export const QuestionnairePage = ({
  initialData = {},
  onComplete,
  onSaveProgress,
  className = '',
  ...props
}) => {
  // Estados principales
  const [currentSectionId, setCurrentSectionId] = useState('personal');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Configuración de secciones
  const [sections] = useState([
    {
      id: 'personal',
      icon: 'user',
      text: 'Datos personales',
      status: 'draft'
    },
    {
      id: 'academic',
      icon: 'academic',
      text: 'Datos escolares',
      status: 'pending'
    },
    {
      id: 'additional',
      icon: 'info',
      text: 'Datos informales',
      status: 'pending'
    }
  ]);

  // Datos de preguntas por sección
  const [questionsData] = useState({
    personal: [
      { id: 1, text: '¿Cuál es tu nombre completo?', answer: '', answered: false },
      { id: 2, text: '¿Cuál es tu fecha de nacimiento?', answer: '', answered: false },
      { id: 3, text: '¿Cuál es tu número de teléfono?', answer: '', answered: false },
      { id: 4, text: '¿Cuál es tu dirección de correo electrónico?', answer: '', answered: false },
      { id: 5, text: '¿Cuál es tu dirección de residencia?', answer: '', answered: false }
    ],
    academic: [
      { id: 6, text: '¿En qué institución estudias actualmente?', answer: '', answered: false },
      { id: 7, text: '¿Qué carrera o programa académico cursas?', answer: '', answered: false },
      { id: 8, text: '¿En qué semestre o año te encuentras?', answer: '', answered: false },
      { id: 9, text: '¿Cuál es tu promedio académico actual?', answer: '', answered: false }
    ],
    additional: [
      { id: 10, text: '¿Cuáles son tus pasatiempos favoritos?', answer: '', answered: false },
      { id: 11, text: '¿Practicas algún deporte?', answer: '', answered: false },
      { id: 12, text: '¿Tienes alguna habilidad especial?', answer: '', answered: false }
    ]
  });

  // Estados derivados
  const [questions, setQuestions] = useState(questionsData[currentSectionId] || []);
  const [userInfo] = useState({
    name: initialData.name || 'Usuario',
    role: initialData.role || 'Estudiante'
  });

  // Actualizar preguntas cuando cambia la sección
  useEffect(() => {
    const sectionQuestions = questionsData[currentSectionId] || [];
    setQuestions(sectionQuestions);
    setCurrentQuestionIndex(0);
  }, [currentSectionId]);

  // Pregunta actual
  const currentQuestion = questions[currentQuestionIndex];

  // Handlers
  const handleSectionChange = (sectionId) => {
    if (sectionId !== currentSectionId) {
      setCurrentSectionId(sectionId);
      setError(null);
    }
  };

  const handleQuestionSelect = (questionIndex) => {
    if (questionIndex >= 0 && questionIndex < questions.length) {
      setCurrentQuestionIndex(questionIndex);
      setError(null);
    }
  };

  const handleAnswerChange = (e) => {
    const newAnswer = e.target.value;
    
    setQuestions(prev => prev.map((q, index) => 
      index === currentQuestionIndex 
        ? { ...q, answer: newAnswer, answered: newAnswer.trim() !== '' }
        : q
    ));
    
    // Limpiar error al empezar a escribir
    if (error) {
      setError(null);
    }
  };

  const handleNavigate = async (direction) => {
    if (direction === 'next') {
      // Validar respuesta actual
      if (!currentQuestion?.answer?.trim()) {
        setError('Por favor, completa esta pregunta antes de continuar.');
        return;
      }

      setIsLoading(true);
      
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navegar a siguiente pregunta o sección
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Cambiar a siguiente sección si existe
        const currentSectionIndex = sections.findIndex(s => s.id === currentSectionId);
        if (currentSectionIndex < sections.length - 1) {
          const nextSection = sections[currentSectionIndex + 1];
          handleSectionChange(nextSection.id);
        } else {
          // Cuestionario completado
          handleComplete();
          return;
        }
      }
      
      setIsLoading(false);
      setError(null);
    } else if (direction === 'previous') {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
      } else {
        // Ir a sección anterior si existe
        const currentSectionIndex = sections.findIndex(s => s.id === currentSectionId);
        if (currentSectionIndex > 0) {
          const prevSection = sections[currentSectionIndex - 1];
          handleSectionChange(prevSection.id);
          const prevSectionQuestions = questionsData[prevSection.id] || [];
          setCurrentQuestionIndex(prevSectionQuestions.length - 1);
        }
      }
      setError(null);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      const progressData = {
        currentSection: currentSectionId,
        currentQuestion: currentQuestionIndex,
        answers: questionsData,
        timestamp: new Date().toISOString()
      };
      
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSaveProgress) {
        onSaveProgress(progressData);
      }
      
      console.log('Progreso guardado:', progressData);
    } catch (err) {
      setError('Error al guardar el progreso. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExit = () => {
    if (window.confirm('¿Estás seguro de que quieres salir? Se guardará tu progreso actual.')) {
      handleSave();
      // Aquí podrías redirigir o cerrar la aplicación
    }
  };

  const handleComplete = () => {
    const allAnswers = Object.values(questionsData).flat();
    const completedAnswers = allAnswers.filter(q => q.answered);
    
    const completionData = {
      totalQuestions: allAnswers.length,
      completedQuestions: completedAnswers.length,
      completionRate: (completedAnswers.length / allAnswers.length) * 100,
      answers: questionsData,
      completedAt: new Date().toISOString()
    };

    if (onComplete) {
      onComplete(completionData);
    }

    console.log('Cuestionario completado:', completionData);
  };

  // Actualizar estado de secciones basado en respuestas
  const updatedSections = sections.map(section => {
    const sectionQuestions = questionsData[section.id] || [];
    const answeredQuestions = sectionQuestions.filter(q => q.answered);
    const completionRate = sectionQuestions.length > 0 
      ? answeredQuestions.length / sectionQuestions.length 
      : 0;

    let status = 'pending';
    if (completionRate === 1) status = 'completed';
    else if (completionRate > 0) status = 'draft';

    return { ...section, status };
  });

  return (
    <div className={`questionnaire-page ${className}`} {...props}>
      <QuestionnaireTemplate
        userInfo={userInfo}
        sections={updatedSections}
        activeSection={currentSectionId}
        onSectionChange={handleSectionChange}
        currentQuestion={currentQuestion}
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        onQuestionSelect={handleQuestionSelect}
        onAnswerChange={handleAnswerChange}
        onNavigate={handleNavigate}
        onSave={handleSave}
        onExit={handleExit}
        isLoading={isLoading}
        error={error}
        autoSave={true}
        showProgress={true}
        showHeader={true}
      />
    </div>
  );
};