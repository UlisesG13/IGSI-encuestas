import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionnaireTemplate } from '../template/QuestionnaireTemplate';
import AlertContainer from '../molecule/AlertContainer.jsx';
import Header from '../organism/Header.jsx';
import { QuestionForm } from '../organism/QuestionForm.jsx';
import { encuestasService } from '../../services/encuestasService.jsx';
import { getAuthToken } from '../../../Shared/services/alumnosService.jsx';

export const QuestionnairePage = ({ initialData = {}, onComplete, className = '' }) => {

  let token = getAuthToken()

  const payload = JSON.parse(atob(token.split('.')[1]));
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [encuestaData, setEncuestaData] = useState(null);
  const [questionsData, setQuestionsData] = useState({});
  const [userInfo] = useState({
    name: initialData.name || 'Usuario',
    role: initialData.role || 'Estudiante'
  });

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
    console.log('Cuestionario completado:', completionData);
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
      {encuestaData.secciones.map(sec => (
        <div key={sec.idSeccion} className="mb-6">
          <h2 className="text-xl font-bold mb-2">{sec.titulo}</h2>
          <p className="mb-4 text-gray-600">{sec.descripcion}</p>
          {questionsData[sec.idSeccion]?.map((q, index) => (
            <QuestionForm
              key={q.id}
              question={q.ayuda ? `${q.text}\n💡 ${q.ayuda}` : q.text}
              answer={q.answer}
              onAnswerChange={(value) => handleAnswerChange(sec.idSeccion, index, value)}
              type={q.type}
              options={q.options}
              labels={q.labels}
            />
          ))}
        </div>
      ))}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleComplete}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Completar Encuesta
        </button>
      </div>
    </div>
  );
};
