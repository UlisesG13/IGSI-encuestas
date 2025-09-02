import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContainer from '../molecule/AlertContainer.jsx';
import Header from '../organism/Header.jsx';
import { QuestionForm } from '../organism/QuestionForm.jsx';
import { encuestasService } from '../../services/encuestasService.jsx';
import { getAuthToken } from '../../../Shared/services/alumnosService.jsx';
import { createRespuesta } from '../../../Shared/services/respuestasService.jsx';

export const QuestionnairePage = ({ initialData = {}, onComplete, className = '' }) => {
  const token = getAuthToken();
  const payload = JSON.parse(atob(token.split('.')[1]));
  const alumnoId = payload.id; 
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [encuestaData, setEncuestaData] = useState(null);
  const [questionsData, setQuestionsData] = useState({});
  const [userInfo] = useState({
    name: initialData.name || 'Usuario',
    role: initialData.role || 'Estudiante'
  });

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
  const totalQuestions = Object.values(questionsData).flat().length;
  const answeredQuestions = Object.values(questionsData)
    .flat()
    .filter(q => q.answered).length;
  const progress = totalQuestions ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;

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
      <div className={`questionnaire-page ${className}`}>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <p>Cargando encuesta...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`questionnaire-page ${className}`}>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`questionnaire-page ${className}`}>
      <AlertContainer />
      <Header />

      <div className="w-full bg-gray-200 h-3 rounded-full mb-2">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mb-4 text-sm text-gray-600">{progress}% completado</p>

      {encuestaData.secciones.map(sec => (
        <div key={sec.idSeccion} className="mb-6">
          <h2 className="text-xl font-bold mb-2">{sec.titulo}</h2>
          <p className="mb-4 text-gray-600">{sec.descripcion}</p>

          {questionsData[sec.idSeccion]?.map((q, index) => (
            <QuestionForm
              key={q.id}
              question={q.text}
              ayuda={q.ayuda}
              answer={q.answer}
              onAnswerChange={(value) => handleAnswerChange(sec.idSeccion, index, value)}
              type={q.type}
              options={q.options} // array completo [{id, text}]
              labels={q.labels}
            />
          ))}
        </div>
      ))}

      <div className="flex justify-end mt-4">
        <button
          onClick={handleComplete}
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isLoading ? "Guardando..." : "Completar Encuesta"}
        </button>
      </div>
    </div>
  );
};
