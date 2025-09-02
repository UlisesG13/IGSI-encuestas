import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionnaireTemplate } from '../template/QuestionnaireTemplate';
import AlertContainer from '../molecule/AlertContainer.jsx';
import Header from '../organism/Header.jsx';
import { QuestionForm } from '../organism/QuestionForm.jsx';
import { encuestasService } from '../../services/encuestasService.jsx';

export const QuestionnairePage = ({ initialData = {}, onComplete, className = '' }) => {
  // Estado para navegación de preguntas
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [encuestaData, setEncuestaData] = useState(null);
  const [questionsData, setQuestionsData] = useState({});
  const [userInfo] = useState({
    name: initialData.name || 'Usuario',
    role: initialData.role || 'Estudiante'
  });

  // Derivar secciones y preguntas solo cuando encuestaData y questionsData están listos
  const secciones = encuestaData?.secciones || [];
  const totalQuestions = secciones.length > 0 ? secciones.reduce((acc, sec) => acc + (questionsData[sec.idSeccion]?.length || 0), 0) : 0;
  const currentSection = secciones.length > 0 ? secciones[currentSectionIndex] || {} : {};
  const currentQuestions = currentSection.idSeccion ? (questionsData[currentSection.idSeccion] || []) : [];
  const currentQuestion = currentQuestions.length > 0 ? currentQuestions[currentQuestionIndex] || null : null;
  const currentQuestionNumber = secciones.length > 0 ? secciones.slice(0, currentSectionIndex).reduce((acc, sec) => acc + (questionsData[sec.idSeccion]?.length || 0), 0) + currentQuestionIndex + 1 : 0;

  // Cargar encuesta completa
  useEffect(() => {
    const cargarEncuestaCompleta = async () => {
      try {
        const idEncuesta = encuestasService.getEncuestaIdFromUrl();
        if (!idEncuesta) throw new Error('No se encontró ID de encuesta en la URL');

        const encuestaCompleta = await encuestasService.getEncuestaCompleta(idEncuesta);
        setEncuestaData(encuestaCompleta);

        const preguntasProcesadas = {};
        encuestaCompleta.secciones.forEach(sec => {
          preguntasProcesadas[sec.idSeccion] = sec.preguntas.map(p => ({
            id: p.idPregunta,
            text: p.textoPregunta,
            type: mapQuestionType(p.idTipoPregunta),
            answer: getDefaultAnswer(p.idTipoPregunta),
            answered: false,
            requerida: true,
            ayuda: p.ayuda,
            options: p.respuestas ? p.respuestas.map(r => r.textoRespuesta) : [],
            labels: p.respuestas ? p.respuestas.map(r => r.textoRespuesta) : []
          }));
        });

        setQuestionsData(preguntasProcesadas);

      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    cargarEncuestaCompleta();
  }, []);

  // Funciones auxiliares
  const mapQuestionType = (id) => {
    switch (parseInt(id)) {
      case 1: return 'radio';
      case 2: return 'checklist';
      case 3: return 'likert';
      case 4: return 'text';
      case 5: return 'textarea';
      case 6: return 'number';
      case 7: return 'date';
      case 8: return 'email';
      case 9: return 'tel';
      default: return 'text';
    }
  };

  const getDefaultAnswer = (id) => {
    switch (parseInt(id)) {
      case 2: return [];
      case 1:
      case 3:
        return '';
      default:
        return '';
    }
  };

  const handleAnswerChange = (sectionId, questionIndex, value) => {
    setQuestionsData(prev => ({
      ...prev,
      [sectionId]: prev[sectionId].map((q, i) =>
        i === questionIndex ? { ...q, answer: value, answered: !!value } : q
      )
    }));
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
    if (onComplete) onComplete(completionData);
    window.showAlert('¡Encuesta completada!', 'success');
    console.log('Cuestionario completado:', completionData);
  };

  if (!encuestaData && !error) {
    return (
      <div className={`questionnaire-page ${className} bg-orange-50 min-h-screen`}>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-orange-600">Cargando encuesta...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`questionnaire-page ${className} bg-orange-50 min-h-screen`}>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Error al cargar la encuesta</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`questionnaire-page ${className} bg-orange-50 min-h-screen w-full`}>
      <AlertContainer />
      {/* Header completo y visible, ocupa todo el ancho y altura normal */}
      <header className="w-full bg-white shadow-md py-0 px-0 flex items-center justify-between sticky top-0 z-20 min-h-[96px]">
        <Header />
      </header>
      {/* Cuadro de preguntas más grande */}
      <div className="w-full max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-12 flex flex-col items-center">
        {/* Progreso y sección actual */}
        <div className="w-full mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-orange-700">{currentSection.titulo}</h2>
            <span className="text-base text-gray-500">{currentSection.descripcion}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base text-gray-600">Pregunta {currentQuestionNumber} de {totalQuestions}</span>
            <span className="text-base font-medium text-orange-600">{Math.round((currentQuestionNumber / totalQuestions) * 100)}% contestado</span>
          </div>
          <div className="w-full bg-orange-100 rounded-full h-3 mt-2">
            <div className="bg-orange-500 h-3 rounded-full transition-all duration-300 ease-out" style={{ width: `${(currentQuestionNumber / totalQuestions) * 100}%` }}></div>
          </div>
        </div>
        {/* Pregunta actual */}
        {currentQuestion && (
          <div className="w-full flex flex-col items-center">
            <div className="w-full mb-6">
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{currentQuestion.ayuda ? `${currentQuestion.text}\n💡 ${currentQuestion.ayuda}` : currentQuestion.text}</h3>
                {/* Renderizar opciones según tipo */}
                {currentQuestion.type === 'radio' && (
                  <div className="flex flex-col gap-4 mt-4">
                    {currentQuestion.options.map((opt, idx) => (
                      <label key={idx} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name={`radio-${currentQuestion.id}`}
                          value={opt}
                          checked={currentQuestion.answer === opt}
                          onChange={() => handleAnswerChange(currentSection.idSeccion, currentQuestionIndex, opt)}
                          className="accent-orange-500 w-6 h-6"
                        />
                        <span className="text-gray-700 text-lg">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
                {currentQuestion.type === 'checklist' && (
                  <div className="flex flex-col gap-4 mt-4">
                    {currentQuestion.options.map((opt, idx) => (
                      <label key={idx} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          value={opt}
                          checked={Array.isArray(currentQuestion.answer) && currentQuestion.answer.includes(opt)}
                          onChange={e => {
                            const checked = e.target.checked;
                            let newAnswer = Array.isArray(currentQuestion.answer) ? [...currentQuestion.answer] : [];
                            if (checked) newAnswer.push(opt);
                            else newAnswer = newAnswer.filter(a => a !== opt);
                            handleAnswerChange(currentSection.idSeccion, currentQuestionIndex, newAnswer);
                          }}
                          className="accent-orange-500 w-6 h-6"
                        />
                        <span className="text-gray-700 text-lg">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
                {currentQuestion.type === 'likert' && (
                  <div className="flex flex-row gap-3 mt-4 justify-center">
                    {currentQuestion.labels.map((label, idx) => (
                      <label key={idx} className="flex flex-col items-center cursor-pointer">
                        <input
                          type="radio"
                          name={`likert-${currentQuestion.id}`}
                          value={label}
                          checked={currentQuestion.answer === label}
                          onChange={() => handleAnswerChange(currentSection.idSeccion, currentQuestionIndex, label)}
                          className="accent-orange-500 w-6 h-6 mb-1"
                        />
                        <span className="text-gray-700 text-base">{label}</span>
                      </label>
                    ))}
                  </div>
                )}
                {['text', 'email', 'number', 'date', 'tel'].includes(currentQuestion.type) && (
                  <div className="mt-4">
                    <input
                      type={currentQuestion.type}
                      value={currentQuestion.answer}
                      onChange={e => handleAnswerChange(currentSection.idSeccion, currentQuestionIndex, e.target.value)}
                      className="w-full border border-orange-300 rounded-xl px-6 py-3 text-gray-700 text-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      placeholder="Escribe tu respuesta..."
                    />
                  </div>
                )}
                {currentQuestion.type === 'textarea' && (
                  <div className="mt-4">
                    <textarea
                      value={currentQuestion.answer}
                      onChange={e => handleAnswerChange(currentSection.idSeccion, currentQuestionIndex, e.target.value)}
                      className="w-full border border-orange-300 rounded-xl px-6 py-3 text-gray-700 text-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      rows={5}
                      placeholder="Escribe tu respuesta..."
                    />
                  </div>
                )}
              </div>
            </div>
            {/* Botones de navegación */}
            <div className="flex justify-between w-full mt-8">
              <button
                onClick={() => {
                  if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
                  else if (currentSectionIndex > 0) {
                    setCurrentSectionIndex(currentSectionIndex - 1);
                    setCurrentQuestionIndex(questionsData[secciones[currentSectionIndex - 1].idSeccion].length - 1);
                  }
                }}
                disabled={currentQuestionNumber === 1}
                className={`px-8 py-3 rounded-xl font-semibold text-white bg-orange-400 hover:bg-orange-500 transition-colors text-lg ${currentQuestionNumber === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                ← Anterior
              </button>
              {currentQuestionNumber < totalQuestions ? (
                <button
                  onClick={() => {
                    if (currentQuestionIndex < currentQuestions.length - 1) setCurrentQuestionIndex(currentQuestionIndex + 1);
                    else if (currentSectionIndex < secciones.length - 1) {
                      setCurrentSectionIndex(currentSectionIndex + 1);
                      setCurrentQuestionIndex(0);
                    }
                  }}
                  className="px-8 py-3 rounded-xl font-semibold text-white bg-orange-600 hover:bg-orange-700 transition-colors text-lg"
                >
                  Siguiente →
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  className="px-8 py-3 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors text-lg"
                >
                  Finalizar encuesta
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
