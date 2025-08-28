import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionnaireTemplate } from '../template/QuestionnaireTemplate';
import Header from '../organism/Header.jsx';
import ChecklistQuestion from '../molecule/ChecklistQuestion.jsx';
import LikertQuestion from '../molecule/LikertQuestion.jsx';
import { QuestionForm } from '../organism/QuestionForm.jsx';
import { encuestasService } from '../../services/encuestasService.jsx';

export const QuestionnairePage = ({
  initialData = {},
  onComplete,
  onSaveProgress,
  className = '',
  ...props
}) => {
  const navigate = useNavigate();
  // Estados principales
  const [currentSectionId, setCurrentSectionId] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [encuestaData, setEncuestaData] = useState(null);
  const [sections, setSections] = useState([]);
  const [questionsData, setQuestionsData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [userInfo] = useState({
    name: initialData.name || 'Usuario',
    role: initialData.role || 'Estudiante'
  });

  // Cargar encuesta completa al entrar a la página
  useEffect(() => {
    const cargarEncuestaCompleta = async () => {
      try {
        const idEncuesta = encuestasService.getEncuestaIdFromUrl();
        
        if (idEncuesta) {
          console.log('ID de encuesta encontrado:', idEncuesta);
          
          const encuestaCompleta = await encuestasService.getEncuestaCompleta(idEncuesta);
          
          console.log('=== ESTRUCTURA DE LA ENCUESTA COMPLETA ===');
          console.log('Encuesta completa:', encuestaCompleta);
          console.log('==========================================');
          
          // Procesar los datos de la encuesta
          setEncuestaData(encuestaCompleta);
          
          // Convertir secciones al formato que necesita la aplicación
          const seccionesProcesadas = encuestaCompleta.secciones.map(seccion => ({
            id: seccion.idSeccion.toString(),
            icon: getIconForSection(seccion.titulo),
            text: seccion.titulo,
            status: 'pending',
            descripcion: seccion.descripcion,
            orden: seccion.orden
          }));
          
          setSections(seccionesProcesadas);
          
          // Convertir preguntas al formato que necesita la aplicación
          const preguntasProcesadas = {};
          encuestaCompleta.secciones.forEach(seccion => {
            preguntasProcesadas[seccion.idSeccion.toString()] = seccion.preguntas.map(pregunta => ({
              id: pregunta.idPregunta,
              text: pregunta.textoPregunta,
              type: mapQuestionType(pregunta.idTipoPregunta),
              answer: getDefaultAnswer(pregunta.idTipoPregunta),
              answered: false,
              requerida: true, // Por defecto todas las preguntas son requeridas
              orden: pregunta.orden,
              ayuda: pregunta.ayuda,
              puntaje: pregunta.puntaje,
              options: pregunta.respuestas ? pregunta.respuestas.map(resp => resp.textoRespuesta) : [],
              labels: pregunta.respuestas ? pregunta.respuestas.map(resp => resp.textoRespuesta) : [],
              respuestas: pregunta.respuestas || []
            }));
          });
          
          setQuestionsData(preguntasProcesadas);
          
          // Establecer la primera sección como activa
          if (seccionesProcesadas.length > 0) {
            setCurrentSectionId(seccionesProcesadas[0].id);
          }
          
        } else {
          console.log('No se encontró ID de encuesta en la URL');
          setError('No se encontró ID de encuesta en la URL');
        }
      } catch (error) {
        console.error('Error al cargar la encuesta completa:', error);
        setError('Error al cargar la encuesta. Por favor, intenta de nuevo.');
      }
    };

    cargarEncuestaCompleta();
  }, []);

  // Actualizar preguntas cuando cambia la sección
  useEffect(() => {
    const sectionQuestions = questionsData[currentSectionId] || [];
    setQuestions(sectionQuestions);
    setCurrentQuestionIndex(0);
  }, [currentSectionId, questionsData]);

  // Funciones auxiliares para procesar datos de la encuesta
  const getIconForSection = (titulo) => {
    const tituloLower = titulo.toLowerCase();
    if (tituloLower.includes('personal')) return 'user';
    if (tituloLower.includes('académic') || tituloLower.includes('academic')) return 'academic';
    if (tituloLower.includes('satisfacción') || tituloLower.includes('satisfaccion')) return 'star';
    if (tituloLower.includes('general')) return 'info';
    return 'document';
  };

  const mapQuestionType = (idTipoPregunta) => {
    // Mapear idTipoPregunta a tipos de pregunta
    switch (parseInt(idTipoPregunta)) {
      case 1: // Opción única (radio)
        return 'radio';
      case 2: // Múltiple selección (checklist)
        return 'checklist';
      case 3: // Escala Likert
        return 'likert';
      case 4: // Texto corto
        return 'text';
      case 5: // Texto largo
        return 'textarea';
      case 6: // Número
        return 'number';
      case 7: // Fecha
        return 'date';
      case 8: // Email
        return 'email';
      case 9: // Teléfono
        return 'tel';
      default:
        return 'text';
    }
  };

  const getDefaultAnswer = (idTipoPregunta) => {
    switch (parseInt(idTipoPregunta)) {
      case 2: // Múltiple selección
        return [];
      case 1: // Opción única
      case 3: // Likert
        return '';
      default:
        return '';
    }
  };

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
    let newAnswer;
    if (currentQuestion.type === 'checklist') {
      newAnswer = e;
    } else if (currentQuestion.type === 'likert') {
      newAnswer = e;
    } else if (currentQuestion.type === 'radio') {
      newAnswer = e;
    } else {
      newAnswer = e.target.value;
    }

    setQuestions(prev => prev.map((q, index) =>
      index === currentQuestionIndex
        ? { ...q, answer: newAnswer, answered: Array.isArray(newAnswer) ? newAnswer.length > 0 : newAnswer.trim() !== '' }
        : q
    ));

    // También actualizar questionsData para mantener consistencia
    setQuestionsData(prev => ({
      ...prev,
      [currentSectionId]: prev[currentSectionId].map((q, index) =>
        index === currentQuestionIndex
          ? { ...q, answer: newAnswer, answered: Array.isArray(newAnswer) ? newAnswer.length > 0 : newAnswer.trim() !== '' }
          : q
      )
    }));

    if (error) {
      setError(null);
    }
  };

  const handleNavigate = async (direction) => {
    if (direction === 'next') {
      // Validar respuesta actual si es requerida
      if (currentQuestion.requerida) {
        if (currentQuestion.type === 'checklist' && (!currentQuestion?.answer || currentQuestion.answer.length === 0)) {
          setError('Por favor, selecciona al menos una opción.');
          return;
        }
        if (currentQuestion.type === 'likert' && !currentQuestion?.answer) {
          setError('Por favor, selecciona una opción.');
          return;
        }
        if (currentQuestion.type === 'radio' && !currentQuestion?.answer) {
          setError('Por favor, selecciona una opción.');
          return;
        }
        if ((currentQuestion.type === 'text' || currentQuestion.type === 'textarea' || currentQuestion.type === 'number' || currentQuestion.type === 'date' || currentQuestion.type === 'tel' || currentQuestion.type === 'email') && !currentQuestion?.answer?.trim()) {
          setError('Por favor, completa esta pregunta antes de continuar.');
          return;
        }
      }

      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        const currentSectionIndex = sections.findIndex(s => s.id === currentSectionId);
        if (currentSectionIndex < sections.length - 1) {
          const nextSection = sections[currentSectionIndex + 1];
          handleSectionChange(nextSection.id);
        } else {
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
    navigate('/dashboardAlumnos');
  };

  const handleComplete = () => {
    const allAnswers = Object.values(questionsData).flat();
    const completedAnswers = allAnswers.filter(q => q.answered);
    
    const completionData = {
      idEncuesta: encuestaData?.idEncuesta,
      tituloEncuesta: encuestaData?.titulo,
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
    
    // Aquí podrías enviar las respuestas al backend
    // enviarRespuestas(completionData);
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

  // Renderizado de pregunta según tipo
  const renderQuestion = () => {
    if (!currentQuestion) return null;
    
    // Agregar texto de ayuda si existe
    const questionWithHelp = currentQuestion.ayuda 
      ? `${currentQuestion.text}\n\n💡 ${currentQuestion.ayuda}`
      : currentQuestion.text;
    
    if (currentQuestion.type === 'checklist') {
      return (
        <QuestionForm
          question={questionWithHelp}
          answer={currentQuestion.answer}
          onAnswerChange={handleAnswerChange}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          error={error}
          isLoading={isLoading}
          autoSave={true}
          type="checklist"
          options={currentQuestion.options}
          onNext={() => handleNavigate('next')}
          onPrevious={() => handleNavigate('previous')}
        />
      );
    }
    
    if (currentQuestion.type === 'likert') {
      return (
        <QuestionForm
          question={questionWithHelp}
          answer={currentQuestion.answer}
          onAnswerChange={handleAnswerChange}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          error={error}
          isLoading={isLoading}
          autoSave={true}
          type="likert"
          labels={currentQuestion.labels}
          onNext={() => handleNavigate('next')}
          onPrevious={() => handleNavigate('previous')}
        />
      );
    }
    
    if (currentQuestion.type === 'radio') {
      return (
        <QuestionForm
          question={questionWithHelp}
          answer={currentQuestion.answer}
          onAnswerChange={handleAnswerChange}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          error={error}
          isLoading={isLoading}
          autoSave={true}
          type="radio"
          options={currentQuestion.options}
          onNext={() => handleNavigate('next')}
          onPrevious={() => handleNavigate('previous')}
        />
      );
    }
    
    // Pregunta tradicional (texto, textarea, number, date, etc.)
    return (
      <QuestionForm
        question={questionWithHelp}
        answer={currentQuestion.answer}
        onAnswerChange={handleAnswerChange}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        error={error}
        isLoading={isLoading}
        autoSave={true}
        type={currentQuestion.type}
        required={currentQuestion.requerida}
        onNext={() => handleNavigate('next')}
        onPrevious={() => handleNavigate('previous')}
      />
    );
  };

  // Mostrar estado de carga si no hay datos de encuesta
  if (!encuestaData && !error) {
    return (
      <div className={`questionnaire-page ${className}`} {...props}>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando encuesta...</p>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar error si no se pudo cargar la encuesta
  if (error && !encuestaData) {
    return (
      <div className={`questionnaire-page ${className}`} {...props}>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Error al cargar la encuesta</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`questionnaire-page ${className}`} {...props}>
      <Header />
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
        renderQuestion={renderQuestion}
      />
    </div>
  );
};