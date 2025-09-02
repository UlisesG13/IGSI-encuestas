// EncuestaModal.jsx
import { useEffect, useState } from 'react';

const EncuestaModal = ({ idEncuesta, onClose }) => {
  const [data, setData] = useState(null);
  const API_BASE = "http://localhost:8080/api";

  useEffect(() => {
    const fetchEncuesta = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE}/encuestas/${idEncuesta}/completa`, {
                      headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
  
        if (!response.ok) throw new Error("Error al obtener la encuesta");
  
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error al obtener la encuesta:", error);
      }
    };
  
    fetchEncuesta();
  }, [idEncuesta]);
  

  if (!data) return <div className="p-4">Cargando...</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-xl font-bold mb-2">{data.titulo}</h2>
        <p className="mb-4 text-gray-600">{data.descripcion}</p>

        {data.secciones.map((seccion) => (
          <div key={seccion.idSeccion} className="mb-6">
            <h3 className="text-lg font-semibold">{seccion.titulo}</h3>
            <p className="text-sm text-gray-500 mb-2">{seccion.descripcion}</p>
            <ul className="space-y-2">
              {seccion.preguntas.map((pregunta) => (
                <li key={pregunta.idPregunta} className="border p-3 rounded">
                  <p className="font-medium">{pregunta.textoPregunta}</p>
                  {pregunta.ayuda && <p className="text-xs text-gray-400">Ayuda: {pregunta.ayuda}</p>}
                  {pregunta.respuestas.length > 0 ? (
                    <ul className="list-disc ml-5 mt-1 text-sm">
                      {pregunta.respuestas.map((r) => (
                        <li key={r.idRespuestaPosible}>
                          {r.textoRespuesta} {r.esCorrecta ? '(Correcta)' : ''}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 italic">Sin respuestas</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default EncuestaModal;
