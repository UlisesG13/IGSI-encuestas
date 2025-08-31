import { getDepartamentoById } from "../../../Administrador/services/departamentosService";
import Header from "../organism/Header";
import { useState, useEffect } from "react";
import { getToken, getUsuarioByCorreo } from "../../../Shared/services/authService";
import { parseJwt } from "../../../Shared/services/jwtUtils";
import SidebarActions from "../molecule/SidebarActions";
import SurveyTable from "../organism/SurveyTable";
import {
  getEncuestasByDepartamento,
  softDeleteEncuesta,
  restaurarEncuesta,
  deleteEncuesta,
  updateEncuesta,
  getEncuestasDeleted,
} from "../../../Shared/services/encuestasService";

const TABS = [
  { key: "activas", label: "Encuestas activas" },
  { key: "papelera", label: "Papelera" }
];


const EncuestList = () => {
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [tab, setTab] = useState("activas");
  const [loading, setLoading] = useState(false);
  const [encuestas, setEncuestas] = useState([]);
  const [error, setError] = useState(null);
  const [departamento, setDepartamento] = useState("");
  const [idDepartamento, setIdDepartamento] = useState(null);

  // Obtener departamento y usuario al montar
  useEffect(() => {
    const fetchDepartamento = async () => {
      try {
        const token = getToken();
        const payload = parseJwt(token);
        if (payload && payload.sub) {
          const usuario = await getUsuarioByCorreo(payload.sub);
          setIdDepartamento(usuario.idDepartamento);
          let nombreDepto = usuario.departamentoNombre || usuario.nombreDepartamento || "";
          if (usuario.idDepartamento) {
            const departamentoObj = await getDepartamentoById(usuario.idDepartamento);
            if (departamentoObj && departamentoObj.nombre) {
              nombreDepto = departamentoObj.nombre;
            }
          }
          setDepartamento(nombreDepto);
        }
      } catch (e) {
        setDepartamento("");
      }
    };
    fetchDepartamento();
  }, []);

  // Cargar encuestas cuando cambia el tab o el departamento
  useEffect(() => {
    const fetchEncuestas = async () => {
      setLoading(true);
      setError(null);
      try {
        let data = [];
        if (tab === "papelera") {
          try {
            if (idDepartamento) {
              data = await getEncuestasEliminadas(idDepartamento);
            }
          } catch (err) {
            if (err.message && err.message.includes('404')) {
              data = [];
            } else {
              throw err;
            }
          }
        } else {
          try {
            if (idDepartamento) {
              data = await getEncuestasByDepartamento(idDepartamento);
            }
          } catch (err) {
            if (err.message && err.message.includes('404')) {
              data = [];
            } else {
              throw err;
            }
          }
        }
        setEncuestas(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError("Ocurrió un error inesperado al cargar las encuestas");
        setEncuestas([]);
      } finally {
        setLoading(false);
      }
    };
    if (idDepartamento) fetchEncuestas();
  }, [tab, idDepartamento]);


  const fetchEncuestasDeleted = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEncuestasDeleted(); // llamamos al service para encuestas eliminadas
      setEncuestas(data);
    } catch (err) {
      setError("Error al cargar encuestas eliminadas");
    } finally {
      setLoading(false);
    }
  };

  // Filtrar encuestas según tab
  const encuestasActivas = encuestas.filter(e => !e.deleted);
  const encuestasEliminadas = encuestas.filter(e => e.deleted);

  // Acciones
  const handleSoftDelete = async (idEncuesta) => {
    const encuesta = encuestas.find(e => e.idEncuesta === idEncuesta);
    if (!encuesta || encuesta.deleted) return;
    // Deshabilitar antes de eliminar
    await updateEncuesta(idEncuesta, { ...encuesta, estado: "deshabilitada" });
    await softDeleteEncuesta(idEncuesta);
    await fetchEncuestas();
    setSelectedSurvey(null);
  };
  const handleRestaurar = async (idEncuesta) => {
    const encuesta = encuestas.find(e => e.idEncuesta === idEncuesta);
    if (!encuesta || !encuesta.deleted) return;
    await restaurarEncuesta(idEncuesta);
    await updateEncuesta(idEncuesta, { ...encuesta, estado: "habilitada" });
    await fetchEncuestas();
    setSelectedSurvey(null);
  };
  const handleDelete = async (idEncuesta) => {
    await deleteEncuesta(idEncuesta);
    await fetchEncuestas();
    setSelectedSurvey(null);
  };
  const handleCambiarEstado = async (idEncuesta, nuevoEstado) => {
    const encuesta = encuestas.find(e => e.idEncuesta === idEncuesta);
    if (!encuesta) return;
    await updateEncuesta(idEncuesta, {
      ...encuesta,
      estado: "deshabilitada"
    });
    fetchEncuestas();
    setSelectedSurvey(null);
  };
  const handleHabilitar = async (idEncuesta) => {
    const encuesta = encuestas.find(e => e.idEncuesta === idEncuesta);
    if (!encuesta) return;
    await updateEncuesta(idEncuesta, {
      ...encuesta,
      estado: "habilitada"
    });
    fetchEncuestas();
    setSelectedSurvey(null);
  };

  // Selección de encuesta
  const handleSurveySelect = (index) => {
    setSelectedSurvey(selectedSurvey === index ? null : index);
  };


  // Encuestas a mostrar según tab
  const surveys = encuestas;


  // Acciones para Sidebar
  const sidebarActionsProps = {
    selectedSurvey,
    tab,
    surveys,
    onSoftDelete: (idx) => handleSoftDelete(surveys[idx].idEncuesta),
    onRestaurar: (idx) => handleRestaurar(surveys[idx].idEncuesta),
    onDelete: (idx) => handleDelete(surveys[idx].idEncuesta),
    onCambiarEstado: (idx, nuevoEstado) => handleCambiarEstado(surveys[idx].idEncuesta, nuevoEstado)
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <div className="w-full max-w-full m-0 p-4 md:p-8 min-h-[calc(100vh-80px)]">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">Encuestas</h1>
          {departamento && (
            <p className="text-base font-semibold text-gray-700 mb-2">Departamento: {departamento}</p>
          )}
          {selectedSurvey !== null && (
            <p className="text-sm text-gray-600">
              Encuesta seleccionada: {surveys[selectedSurvey]?.titulo || surveys[selectedSurvey]?.nombre}
            </p>
          )}
        </div>
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {TABS.map(t => (
            <button
              key={t.key}
              className={`px-4 py-2 rounded-t font-semibold border-b-2 transition-colors duration-150 ${tab === t.key ? 'border-orange-500 text-orange-600 bg-white' : 'border-transparent text-gray-500 bg-gray-100 hover:text-orange-600'}`}
              onClick={async () => {
                setTab(t.key);
                setSelectedSurvey(null);
                // Traemos encuestas según tab
                if (t.key === "activas") await fetchEncuestas();
                if (t.key === "papelera") await fetchEncuestasDeleted();
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar con acciones */}
          <SidebarActions {...sidebarActionsProps} />
          {/* Tabla de encuestas */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-12 text-orange-600">Cargando encuestas...</div>
            ) : error ? (
              <div className="text-center py-12 text-red-600">{error}</div>
            ) : (
              <SurveyTable
                surveys={surveys}
                selectedSurvey={selectedSurvey}
                onSurveySelect={handleSurveySelect}
                tab={tab}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncuestList; 