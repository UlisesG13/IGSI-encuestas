import React, { useEffect, useMemo, useState } from "react";     
import Header from "../organism/Header"; 
import DashboardCards from "../molecule/DashboardCards";
import EncuestList from "../organism/EncuestList";
import { 
  getTodasLasEncuestas, 
  softDeleteEncuesta, 
  restaurarEncuesta, 
  deleteEncuesta, 
  cambiarEstadoEncuesta,
  getEncuestasEliminadas,
  updateEncuesta
} from "../../services/encuestasService";
import { getEstadisticasUsuarios } from "../../../Shared/services/authService";
import QuestionChartModal from "../molecule/QuestionChartModal";
import { getEstadisticasDepartamentos } from "../../services/departamentosService";

const EncuestDashboards = () => {
  // Encuesta de ejemplo para mostrar en el modal
  const encuestaEjemplo = {
    idEncuesta: 1,
    titulo: "prueba",
    descripcion: "es una prueba de una encuesta",
    idDepartamento: 1,
    fechaInicio: "2025-08-01",
    fechaFin: "2025-08-02",
    estado: "deshabilitada",
    deleted: false,
    secciones: [
      {
        idSeccion: 1,
        titulo: "Infraestructura demo",
        descripcion: "Opinión sobre instalaciones y equipamiento.",
        orden: 1,
        preguntas: [
          {
            idPregunta: 1,
            textoPregunta: "pregunta",
            idTipoPregunta: 1,
            orden: 1,
            ayuda: "esta es una prueba de pregunta no hace falta contestar",
            puntaje: 0,
            respuestas: [
              {
                idRespuestaPosible: 1,
                idPregunta: 1,
                textoRespuesta: "opcion 1",
                puntaje: 0,
                esCorrecta: false
              },
              {
                idRespuestaPosible: 2,
                idPregunta: 1,
                textoRespuesta: "opcion numero 2",
                puntaje: 0,
                esCorrecta: true
              }
            ]
          },
          {
            idPregunta: 2,
            textoPregunta: "pregunta2",
            idTipoPregunta: 1,
            orden: 1,
            ayuda: "esta es otra prueba",
            puntaje: 0,
            respuestas: [
              {
                idRespuestaPosible: 3,
                idPregunta: 2,
                textoRespuesta: "opcion 1",
                puntaje: 0,
                esCorrecta: true
              },
              {
                idRespuestaPosible: 4,
                idPregunta: 2,
                textoRespuesta: "opcion 2",
                puntaje: 0,
                esCorrecta: false
              }
            ]
          }
        ]
      }
    ]
  };
  // Estado para mostrar los modales temporales
  const [showPreguntasModal, setShowPreguntasModal] = useState(false);
  const [showChartModal, setShowChartModal] = useState(false);
  // Ejemplo de pregunta para el modal de gráfica
  const ejemploPregunta = {
    idPregunta: 1,
    textoPregunta: "¿Qué opción prefieres?",
    idTipoPregunta: 1,
    respuestas: [
      { idRespuestaPosible: 1, textoRespuesta: "Opción 1" },
      { idRespuestaPosible: 2, textoRespuesta: "Opción 2" }
    ]
  };
  const titulo = "Dashboard de Encuestas";
  const [encuestas, setEncuestas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);
  const [estadisticas, setEstadisticas] = useState({
    departamentos: 0,
    encuestas: 0,
    empleados: 0
  });

  // 🔹 Fetch de todas las encuestas
  const fetchEncuestas = async () => {
    setLoading(true);
    setError("");
    try {
      let data;
      if (showDeleted) {
        // Si estamos en la papelera, traer encuestas eliminadas
        data = await getEncuestasEliminadas();
      } else {
        // Si estamos en activas, traer encuestas no eliminadas
        data = await getTodasLasEncuestas();
      }
      setEncuestas(Array.isArray(data) ? data : []);

      // Calcular número total de encuestas (solo para estadísticas)
      if (!showDeleted) {
        setEstadisticas(prev => ({ ...prev, encuestas: Array.isArray(data) ? data.length : 0 }));
      }
    } catch (e) {
      console.error("Error fetching encuestas:", e);
      setError("No se pudieron cargar las encuestas");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch de estadísticas globales (departamentos y usuarios)
  const fetchEstadisticas = async () => {
    try {
      const [statsDepartamentos, statsUsuarios] = await Promise.all([
        getEstadisticasDepartamentos(),
        getEstadisticasUsuarios()
      ]);

      setEstadisticas(prev => ({
        ...prev,
        departamentos: statsDepartamentos.totalDepartamentos,
        empleados: statsUsuarios.totalUsuarios
      }));
    } catch (error) {
      console.error("Error cargando estadísticas:", error);
    }
  };

  useEffect(() => {
    fetchEncuestas();
    fetchEstadisticas();
  }, [showDeleted]);

  // 🔹 Lista de encuestas para la tabla
  const listaDeEncuestas = useMemo(() => {
    return encuestas.map(e => ({
      id: e.idEncuesta,
      nombre: e.titulo,
      fecha: `${e.fechaInicio} - ${e.fechaFin}`,
      respuestas: e.numeroRespuestas || 0,
      estado: e.estado,
      deleted: e.deleted,
    }));
  }, [encuestas]);

  // 🔹 Handlers CRUD y de estado
  const handleSoftDelete = async (idEncuesta) => {
    try {
      // Obtener la encuesta antes del soft-delete
      const encuesta = encuestas.find(e => e.idEncuesta === idEncuesta);
      if (!encuesta) return;
      
      // Primero hacer soft-delete
      await softDeleteEncuesta(idEncuesta);
      
      // Luego cambiar el estado a inactiva (usando los datos que teníamos)
      await updateEncuesta(idEncuesta, {
        ...encuesta,
        estado: "inactiva"
      });
      
      // Finalmente recargar la lista
      await fetchEncuestas();
      await fetchEstadisticas();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCambiarEstado = async (idEncuesta, nuevoEstado) => {
    try {
      const encuesta = encuestas.find(e => e.idEncuesta === idEncuesta);
      if (!encuesta) return;
      
      await updateEncuesta(idEncuesta, {
        ...encuesta,
        estado: nuevoEstado
      });
      await fetchEncuestas();
      await fetchEstadisticas();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRestaurar = async (idEncuesta) => {
    try {
      await restaurarEncuesta(idEncuesta);
      await fetchEncuestas();
      await fetchEstadisticas();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (idEncuesta) => {
    try {
      const confirmDelete = confirm('¿Eliminar permanentemente esta encuesta?');
      if (!confirmDelete) return;
      await deleteEncuesta(idEncuesta);
      await fetchEncuestas();
      await fetchEstadisticas();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <div className="w-full max-w-full m-0 p-4 md:p-8 min-h-[calc(100vh-80px)]">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">{titulo}</h1>
          <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-6 md:mb-8">
            Bienvenido al dashboard de encuestas. Aquí podrás gestionar todas las encuestas de la aplicación.
          </p>
        </div>

        {/* Botones temporales para mostrar los modales */}
        <div className="flex gap-4 mb-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow"
            onClick={() => setShowPreguntasModal(true)}
          >
            Ver Modal de Preguntas
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded shadow"
            onClick={() => setShowChartModal(true)}
          >
            Ver Modal de Gráfica
          </button>
        </div>

        {/* Modales temporales */}
        {showPreguntasModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
                onClick={() => setShowPreguntasModal(false)}
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4 text-orange-600">{encuestaEjemplo.titulo}</h2>
              <p className="text-gray-600 mb-2">{encuestaEjemplo.descripcion}</p>
              <div className="flex flex-col gap-4 mt-2">
                {encuestaEjemplo.secciones.map(sec => (
                  <div key={sec.idSeccion} className="border rounded-lg p-3 bg-gray-50">
                    <h3 className="font-semibold text-orange-500 mb-1">{sec.titulo}</h3>
                    <p className="text-sm text-gray-500 mb-2">{sec.descripcion}</p>
                    <ul className="list-disc ml-5">
                      {sec.preguntas.map(preg => (
                        <li key={preg.idPregunta} className="mb-2">
                          <span className="font-medium text-gray-800">{preg.textoPregunta}</span>
                          <span className="text-xs text-gray-500 ml-2">({preg.ayuda})</span>
                          <button
                            className="ml-4 px-2 py-1 bg-green-500 text-white rounded text-xs"
                            onClick={() => {
                              setShowPreguntasModal(false);
                              setShowChartModal(true);
                            }}
                          >Ver gráfica</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {showChartModal && (
          <QuestionChartModal
            open={showChartModal}
            onClose={() => setShowChartModal(false)}
            pregunta={ejemploPregunta}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 md:gap-8 items-start max-w-full">
          {/* Sidebar izquierdo con tarjetas de estadísticas */}
          <div className="flex flex-col gap-4 md:gap-6 order-2 lg:order-1">
            <DashboardCards 
              numeroDepartamentos={estadisticas.departamentos} 
              numeroEncuestas={estadisticas.encuestas} 
              numeroEmpleados={estadisticas.empleados} 
            />
          </div>
          
          {/* Contenido principal con lista de encuestas */}
          <div className="flex flex-col gap-6 md:gap-8 order-1 lg:order-2">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {showDeleted ? 'Papelera' : 'Encuestas Activas'}
                </span>
                <button
                  onClick={() => setShowDeleted(!showDeleted)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    showDeleted 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {showDeleted ? 'Ver Activas' : 'Ver Papelera'}
                </button>
              </div>
            </div>

            <EncuestList 
              encuestas={listaDeEncuestas}
              onSoftDelete={handleSoftDelete}
              onRestaurar={handleRestaurar}
              onDelete={handleDelete}
              onCambiarEstado={handleCambiarEstado}
              loading={loading}
              error={error}
              showDeleted={showDeleted}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncuestDashboards;
