
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContainer from '../molecule/AlertContainer.jsx';
import Header from '../organism/Header.jsx';
import { QuestionForm } from '../organism/QuestionForm.jsx';
import { encuestasService } from '../../services/encuestasService.jsx';
import { getAuthToken } from '../../../Shared/services/alumnosService.jsx';
import { createRespuesta } from '../../../Shared/services/respuestasService.jsx';

export const QuestionnairePage = ({ initialData = {}, onComplete, className = '' }) => {
  // Estados principales primero
  const [encuestaData, setEncuestaData] = useState(null);
  const [questionsData, setQuestionsData] = useState({});
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
  // Calcular progreso solo una vez
  const answeredQuestions = Object.values(questionsData).flat().filter(q => q.answered).length;
  const progress = totalQuestions ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;
  const token = getAuthToken();
  let alumnoId = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      alumnoId = payload.id;
    } catch (e) {
      console.error('Error decodificando token:', e);
    }
  }
  const navigate = useNavigate();

  // Cargar encuesta
  useEffect(() => {
    const cargarEncuestaCompleta = async () => {
      try {
        const idEncuesta = encuestasService.getEncuestaIdFromUrl();
        if (!idEncuesta) throw new Error('No se encontró ID de encuesta en la URL');

        const encuestaCompleta = await encuestasService.getEncuestaCompleta(idEncuesta);
        setEncuestaData(encuestaCompleta);

        // Procesar preguntas
        const preguntasProcesadas = {};
        encuestaCompleta.secciones.forEach(sec => {
          preguntasProcesadas[sec.idSeccion] = sec.preguntas.map(p => {
            const processed = {
              id: p.idPregunta,
              text: p.textoPregunta,
              type: mapQuestionType(p.idTipoPregunta),
              answer: getDefaultAnswer(p.idTipoPregunta, p.respuestas),
              answered: false,
              ayuda: p.ayuda,
              options: p.respuestas ? p.respuestas.map(r => ({ id: r.idRespuestaPosible, text: r.textoRespuesta })) : [],
              labels: p.respuestas ? p.respuestas.map(r => r.textoRespuesta) : []
            };
            console.log('Pregunta procesada:', processed); // 🔹 log
            return processed;
          });
        });
        setQuestionsData(preguntasProcesadas);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    cargarEncuestaCompleta();
  }, []);

  // Mapear tipos
  const mapQuestionType = (id) => {
    switch (parseInt(id)) {
      case 1: return 'text';       // abierta
      case 2: return 'radio';      // opción múltiple (radio)
      case 3: return 'radio';      // selección única
      case 4: return 'likert';     // escala likert
      case 5: return 'radio';      // sí/no
      case 6: return 'checklist';  // check box
      default: return 'text';
    }
  };

  // Respuesta por defecto
  const getDefaultAnswer = (idTipo, respuestas) => {
    switch (parseInt(idTipo)) {
      case 6: return []; // checklist
      case 2: // radio múltiple
      case 3: // radio único
      case 5:
        return respuestas && respuestas.length ? respuestas[0].idRespuestaPosible : null;
      default: return '';
    }
  };

  // Cambiar respuesta
  const handleAnswerChange = (sectionId, questionIndex, value) => {
    setQuestionsData(prev => ({
      ...prev,
      [sectionId]: prev[sectionId].map((q, i) =>
        i === questionIndex
          ? { ...q, answer: value, answered: Array.isArray(value) ? value.length > 0 : !!value }
          : q
      )
    }));
  };

  // Calcular progreso

  // Enviar respuestas
  const handleComplete = async () => {
    try {
      setIsLoading(true);
      const allAnswers = Object.values(questionsData).flat();

      for (const q of allAnswers) {
        const basePayload = {
          id_alumno: alumnoId,
          id_pregunta: q.id,
          id_respuesta_posible: null,
          respuesta_abierta: null,
          fecha_respuesta: new Date().toISOString().split("T")[0]
        };

        if (q.type === 'text') {
          await createRespuesta(q.id, { ...basePayload, respuesta_abierta: q.answer });
        } else if (q.type === 'radio' || q.type === 'likert') {
          await createRespuesta(q.id, { ...basePayload, id_respuesta_posible: q.answer });
        } else if (q.type === 'checklist') {
          for (const ansId of q.answer) {
            await createRespuesta(q.id, { ...basePayload, id_respuesta_posible: ansId });
          }
        }
      }

      if (onComplete) onComplete();
      navigate("/dashboardAlumnos");
    } catch (err) {
      console.error("Error guardando respuestas:", err);
      setError("No se pudieron guardar las respuestas");
    } finally {
      setIsLoading(false);
    }
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
      <Header />
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
                          value={opt.id}
                          checked={currentQuestion.answer === opt.id}
                          onChange={() => handleAnswerChange(currentSection.idSeccion, currentQuestionIndex, opt.id)}
                          className="accent-orange-500 w-6 h-6"
                        />
                        <span className="text-gray-700 text-lg">{opt.text}</span>
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
                          value={opt.id}
                          checked={Array.isArray(currentQuestion.answer) && currentQuestion.answer.includes(opt.id)}
                          onChange={e => {
                            const checked = e.target.checked;
                            let newAnswer = Array.isArray(currentQuestion.answer) ? [...currentQuestion.answer] : [];
                            if (checked) newAnswer.push(opt.id);
                            else newAnswer = newAnswer.filter(a => a !== opt.id);
                            handleAnswerChange(currentSection.idSeccion, currentQuestionIndex, newAnswer);
                          }}
                          className="accent-orange-500 w-6 h-6"
                        />
                        <span className="text-gray-700 text-lg">{opt.text}</span>
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