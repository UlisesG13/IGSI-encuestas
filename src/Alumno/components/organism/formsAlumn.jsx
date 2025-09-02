import React, { useEffect, useState } from "react";
import AlertContainer from '../molecule/AlertContainer.jsx';
import { useNavigate } from "react-router-dom";
import { getEncuestas } from "../../../Shared/services/encuestasService.jsx";

export default function FormsAlumn() {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data = await getEncuestas();
        console.log(data)
        if (isMounted) setSurveys(data.filter(e => !e.deleted));
      } catch (err) {
        if (isMounted) {
          setError("No se pudieron cargar las encuestas");
          window.showAlert("No se pudieron cargar las encuestas", "error");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const handleSurveyClick = (idEncuesta) => {
    navigate(`/formulariosAlumnos/${idEncuesta}`);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen flex justify-center items-start pt-8">
      <AlertContainer />
      <div className="bg-white rounded-xl shadow-sm w-11/12 max-w-6xl mx-auto p-8 md:p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Encuestas</h2>
        {loading && <div className="text-gray-500">Cargando encuestas...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && !error && (
          <div className="w-full flex flex-col gap-4">
            {surveys.map((survey) => (
  <div
    key={survey.idEncuesta}
    className="flex flex-row items-center justify-between bg-gray-50 rounded-lg px-8 py-6 shadow-sm border border-gray-100 cursor-pointer hover:bg-orange-50"
    onClick={() => handleSurveyClick(survey.idEncuesta)}
  >
    <div className="flex flex-col">
      <span className="font-semibold text-gray-800 text-lg">{survey.titulo}</span>
      <span className="text-gray-500 text-base mt-1">{survey.descripcion}</span>
    </div>
  </div> // ← este cierre faltaba
))}

            </div>
          )}
        </div>
      </div>
  );
}
