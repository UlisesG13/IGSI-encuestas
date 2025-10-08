import React, { useEffect, useState } from "react";
import AlertContainer from '../molecule/AlertContainer.jsx';
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../../Shared/services/alumnosService.jsx";
import { getEncuestasHabilitadas } from "../../../Shared/services/encuestasService.jsx";

export default function FormsAlumn() {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const token = getAuthToken();
        const idAlumno = token ? JSON.parse(atob(token.split('.')[1])).id : null;
        const data = await getEncuestasHabilitadas(idAlumno);
        if (isMounted && Array.isArray(data)) {
          setSurveys(data.filter(e => !e.deleted));
        } else if (isMounted) {
          setSurveys([]);
        }
      } catch (err) {
        if (isMounted) {
          setSurveys([]); // Siempre dejar surveys vacío si hay error
          setError(null); // No mostrar error, solo el mensaje de "No hay encuestas por hacer"
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
            {surveys.length === 0 ? (
              <div className="text-center text-gray-500 py-8 text-lg font-semibold">
                No hay encuestas por hacer
              </div>
            ) : (
              surveys.map((survey) => (
                <div
                  key={survey.idEncuesta}
                  className="flex flex-row items-center justify-between bg-gray-50 rounded-lg px-8 py-6 shadow-sm border border-gray-100 cursor-pointer hover:bg-orange-50"
                  onClick={() => handleSurveyClick(survey.idEncuesta)}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 text-lg">{survey.titulo}</span>
                    <span className="text-gray-500 text-base mt-1">{survey.descripcion}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="font-semibold text-gray-800 text-base">Vigencia</span>
                    <span className="text-gray-500 text-base mt-1">{survey.fechaInicio} - {survey.fechaFin}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}