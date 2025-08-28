import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QuestionnaireTemplate } from '../template/QuestionnaireTemplate';
import Header from '../organism/Header.jsx';
import ChecklistQuestion from '../molecule/ChecklistQuestion.jsx';
import LikertQuestion from '../molecule/LikertQuestion.jsx';
import { QuestionForm } from '../organism/QuestionForm.jsx';
import { getEncuestaCompleta, getTiposPregunta } from '../../../Shared/services/encuestasService.jsx';

export const QuestionnairePage = ({
  initialData = {},
  onComplete,
  onSaveProgress,
  className = '',
  ...props
}) => {
  const navigate = useNavigate();
  const { idEncuesta } = useParams();
  
  // Estados principales
  const [currentSectionId, setCurrentSectionId] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [encuestaData, setEncuestaData] = useState(null);
  const [tiposPregunta, setTiposPregunta] = useState({});

  // Estados para datos dinámicos
  const [sections, setSections] = useState([]);
  const [questionsData, setQuestionsData] = useState({});

  // Estados derivados
  const [questions, setQuestions] = useState([]);
  const [userInfo] = useState({
    name: initialData.name || 'Usuario',
    role: initialData.role || 'Estudiante'
  });

  // Cargar datos de la encuesta al montar el componente
  useEffect(() => {
    let isMounted = true;
    
    const loadEncuestaData = async () => {
      if (!idEncuesta) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Cargar encuesta completa y tipos de pregunta en paralelo
        const [encuestaCompleta, tiposPreguntaData] = await Promise.all([
          getEncuestaCompleta(idEncuesta),
          getTiposPregunta()
        ]);
        
        if (!isMounted) return;
        
        setEncuestaData(encuestaCompleta);
        
        // Debug: mostrar la estructura completa de la encuesta
        console.log('Encuesta completa recibida:', encuestaCompleta);
        
        // Crear mapeo de tipos de pregunta
        const tiposMap = {};
        tiposPreguntaData.forEach(tipo => {
          tiposMap[tipo.idTipo] = tipo.nombre;
        });
        setTiposPregunta(tiposMap);
        
        // Procesar secciones
        const seccionesProcesadas = encuestaCompleta.secciones?.map(seccion => ({
          id: seccion.idSeccion.toString(),
          icon: 'section',
          text: seccion.titulo,
          status: 'pending',
          descripcion: seccion.descripcion,
          orden: seccion.orden
        })).sort((a, b) => a.orden - b.orden) || [];
        
        setSections(seccionesProcesadas);
        
        // Procesar preguntas por sección
        const preguntasPorSeccion = {};
        encuestaCompleta.secciones?.forEach(seccion => {
          const preguntasProcesadas = seccion.preguntas?.map(pregunta => {
            // Debug: mostrar el tipo de pregunta que viene del API
            console.log('Pregunta:', pregunta.textoPregunta, 'ID Tipo:', pregunta.idTipoPregunta);
            
            // Mapear el tipo de pregunta según la tabla proporcionada
            let tipoPregunta = 'texto'; // default
            switch (pregunta.idTipoPregunta) {
              case 1: // Opción Múltiple
                tipoPregunta = 'opcion-unica';
                break;
              case 2: // Checklist
                tipoPregunta = 'checklist';
                break;
              case 3: // Escala Likert
                tipoPregunta = 'likert';
                break;
              case 4: // Abierta
                tipoPregunta = 'texto';
                break;
              case 5: // Verdadero/Falso
                tipoPregunta = 'verdadero-falso';
                break;
              default:
                tipoPregunta = 'texto';
            }
            
                         console.log('Tipo mapeado:', tipoPregunta, 'Respuestas posibles:', pregunta.respuestasPosibles?.length || 0);
             console.log('Respuestas posibles completas:', pregunta.respuestasPosibles);
            
            return {
              id: pregunta.idPregunta,
              text: pregunta.textoPregunta,
              type: tipoPregunta,
              answer: '',
              answered: false,
              ayuda: pregunta.ayuda,
              puntaje: pregunta.puntaje,
              orden: pregunta.orden,
              respuestasPosibles: pregunta.respuestasPosibles || []
            };
          }).sort((a, b) => a.orden - b.orden) || [];
          
          preguntasPorSeccion[seccion.idSeccion.toString()] = preguntasProcesadas;
        });
        
        setQuestionsData(preguntasPorSeccion);
        
        // Establecer primera sección como activa
        if (seccionesProcesadas.length > 0) {
          setCurrentSectionId(seccionesProcesadas[0].id);
        }
        
      } catch (err) {
        if (isMounted) {
          console.error('Error cargando encuesta:', err);
          setError('Error al cargar la encuesta. Por favor, intenta de nuevo.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    loadEncuestaData();
    
    return () => {
      isMounted = false;
    };
  }, [idEncuesta]);

  // Actualizar preguntas cuando cambia la sección
  useEffect(() => {
    if (!currentSectionId) return;
    const sectionQuestions = questionsData[currentSectionId] || [];
    setQuestions(sectionQuestions);
    setCurrentQuestionIndex(0);
  }, [currentSectionId, questionsData]);

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
    if (currentQuestion.type === 'checklist' || currentQuestion.type === 'opcion-unica' || currentQuestion.type === 'verdadero-falso') {
      newAnswer = e;
    } else if (currentQuestion.type === 'likert') {
      newAnswer = e;
    } else {
      newAnswer = e.target.value;
    }

    setQuestions(prev => prev.map((q, index) =>
      index === currentQuestionIndex
        ? { ...q, answer: newAnswer, answered: Array.isArray(newAnswer) ? newAnswer.length > 0 : newAnswer.trim() !== '' }
        : q
    ));

    if (error) {
      setError(null);
    }
  };

  const handleNavigate = async (direction) => {
    if (direction === 'next') {
      // Validar respuesta actual
      if ((currentQuestion.type === 'checklist' || currentQuestion.type === 'opcion-unica' || currentQuestion.type === 'verdadero-falso') && (!currentQuestion?.answer || currentQuestion.answer.length === 0)) {
        setError('Por favor, selecciona al menos una opción.');
        return;
      }
      if (currentQuestion.type === 'likert' && !currentQuestion?.answer) {
        setError('Por favor, selecciona una opción.');
        return;
      }
      if (!currentQuestion.type && !currentQuestion?.answer?.trim()) {
        setError('Por favor, completa esta pregunta antes de continuar.');
        return;
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
        idEncuesta: idEncuesta,
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
      idEncuesta: idEncuesta,
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

  // Renderizado de pregunta según tipo
  const renderQuestion = () => {
    if (!currentQuestion) return null;
    
    // Debug: mostrar información de la pregunta actual
    console.log('Renderizando pregunta:', {
      text: currentQuestion.text,
      type: currentQuestion.type,
      respuestasPosibles: currentQuestion.respuestasPosibles?.length || 0
    });
    
    // Para preguntas con respuestas posibles (múltiple opción, checklist, etc.)
    if (currentQuestion.respuestasPosibles && currentQuestion.respuestasPosibles.length > 0) {
      const options = currentQuestion.respuestasPosibles.map(resp => resp.textoRespuesta);
      
      if (currentQuestion.type === 'opcion-unica') {
        console.log('Renderizando opción única con:', options);
        return (
          <ChecklistQuestion
            question={currentQuestion.text}
            options={options}
            selected={currentQuestion.answer}
            onChange={handleAnswerChange}
            singleSelect={true}
          />
        );
      } else if (currentQuestion.type === 'checklist') {
        console.log('Renderizando checklist con:', options);
        return (
          <ChecklistQuestion
            question={currentQuestion.text}
            options={options}
            selected={currentQuestion.answer}
            onChange={handleAnswerChange}
            singleSelect={false}
          />
        );
      } else if (currentQuestion.type === 'verdadero-falso') {
        console.log('Renderizando verdadero/falso');
        return (
          <ChecklistQuestion
            question={currentQuestion.text}
            options={['Verdadero', 'Falso']}
            selected={currentQuestion.answer}
            onChange={handleAnswerChange}
            singleSelect={true}
          />
        );
      }
    } else {
      // Si no hay respuestas posibles pero el tipo es checklist o opción única, 
      // intentar obtener las respuestas del API
      if (currentQuestion.type === 'opcion-unica' || currentQuestion.type === 'checklist') {
        console.log('No hay respuestas posibles para:', currentQuestion.type, 'Intentando obtener del API...');
        // Por ahora, mostrar un mensaje de error
        return (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">Error: No se pudieron cargar las opciones para esta pregunta.</p>
            <p className="text-sm text-red-500 mt-1">Tipo: {currentQuestion.type}</p>
          </div>
        );
      }
    }
    
    if (currentQuestion.type === 'likert') {
      console.log('Renderizando escala Likert');
      return (
        <LikertQuestion
          question={currentQuestion.text}
          labels={['Muy en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Muy de acuerdo']}
          value={currentQuestion.answer}
          onChange={handleAnswerChange}
        />
      );
    }
    
    // Pregunta tradicional (texto) o cualquier tipo
    return (
      <QuestionForm
        question={currentQuestion.text}
        answer={currentQuestion.answer}
        onAnswerChange={handleAnswerChange}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        error={error}
        isLoading={isLoading}
        autoSave={true}
        type={currentQuestion.type}
        options={currentQuestion.respuestasPosibles?.map(resp => resp.textoRespuesta) || []}
        labels={['1', '2', '3', '4', '5']}
        onNext={() => handleNavigate('next')}
        onPrevious={() => handleNavigate('previous')}
      />
    );
  };

  // Mostrar loading mientras se cargan los datos
  if (isLoading && !encuestaData) {
    return (
      <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando encuesta...</p>
        </div>
      </div>
    );
  }

  // Mostrar error si no se pudo cargar la encuesta
  if (error && !encuestaData) {
    return (
      <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Si no hay idEncuesta, mostrar mensaje
  if (!idEncuesta) {
    return (
      <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No se especificó una encuesta</p>
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