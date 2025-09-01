import { getDepartamentoById } from "../../../Administrador/services/departamentosService";
import Header from "../organism/Header";
import { useState, useEffect, useCallback } from "react";
import { getToken, getUsuarioByCorreo } from "../../../Shared/services/authService";
import { parseJwt } from "../../../Shared/services/jwtUtils";
import SidebarActions from "../molecule/SidebarActions";
import SurveyTable from "../organism/SurveyTable";
import {
  getEncuestas,            // ✅ importar función global
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

  // Obtener info de usuario solo para mostrar el nombre de departamento
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
      } catch {
        setDepartamento("");
      }
    };
    fetchDepartamento();
  }, []);

  // ✅ función única para traer encuestas
  const fetchEncuestas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data = [];
      if (tab === "papelera") {
        data = await getEncuestasDeleted();
      } else {
        // 🔥 Ahora trae todas las encuestas, no solo por depto
        data = await getEncuestas();
      }
      setEncuestas(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError("Ocurrió un error inesperado al cargar las encuestas");
      setEncuestas([]);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  // Cargar encuestas cuando cambia el tab
  useEffect(() => {
    fetchEncuestas();
  }, [tab, fetchEncuestas]);

  // Acciones
  const handleSoftDelete = async (idEncuesta) => {
    try {
      const encuesta = encuestas.find(e => e.idEncuesta === idEncuesta);
      if (!encuesta || encuesta.deleted) return;

      await updateEncuesta(idEncuesta, { ...encuesta, estado: "deshabilitada" });
      await softDeleteEncuesta(idEncuesta);

      await fetchEncuestas();
      setSelectedSurvey(null);
    } catch (e) {
      alert(e.message || "Error al eliminar encuesta");
    }
  };

  const handleRestaurar = async (idEncuesta) => {
    try {
      const encuesta = encuestas.find(e => e.idEncuesta === idEncuesta);
      if (!encuesta) return;

      await restaurarEncuesta(idEncuesta);
      await updateEncuesta(idEncuesta, { ...encuesta, estado: "habilitada" });

      await fetchEncuestas();
      setSelectedSurvey(null);
    } catch (e) {
      alert(e.message || "Error al restaurar encuesta");
    }
  };

  const handleDelete = async (idEncuesta) => {
    try {
      const ok = confirm("¿Eliminar permanentemente esta encuesta?");
      if (!ok) return;
      await deleteEncuesta(idEncuesta);
      await fetchEncuestas();
      setSelectedSurvey(null);
      alert("Encuesta eliminada permanentemente");
    } catch (e) {
      alert(e.message || "Error al eliminar encuesta");
    }
  };

  const handleCambiarEstado = async (idEncuesta, nuevoEstadoUI) => {
    try {
      const encuesta = encuestas.find(e => e.idEncuesta === idEncuesta);
      if (!encuesta) return;

      let estadoBackend = nuevoEstadoUI;
      if (nuevoEstadoUI === "activa") estadoBackend = "habilitada";
      if (nuevoEstadoUI === "inactiva") estadoBackend = "deshabilitada";

      await updateEncuesta(idEncuesta, { ...encuesta, estado: estadoBackend });
      await fetchEncuestas();
      setSelectedSurvey(null);
    } catch (e) {
      alert(e.message || "Error al actualizar estado");
    }
  };

  // Selección de encuesta
  const handleSurveySelect = (index) => {
    setSelectedSurvey(selectedSurvey === index ? null : index);
  };

  const surveys = encuestas;

  const sidebarActionsProps = {
    selectedSurvey,
    tab,
    surveys,
    onSoftDelete: (idx) => handleSoftDelete(surveys[idx].idEncuesta),
    onRestaurar: (idx) => handleRestaurar(surveys[idx].idEncuesta),
    onDelete: (idx) => handleDelete(surveys[idx].idEncuesta),
    onCambiarEstado: (idx, nuevoEstado) => handleCambiarEstado(surveys[idx].idEncuesta, nuevoEstado),
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <div className="w-full max-w-full m-0 p-4 md:p-8 min-h-[calc(100vh-80px)]">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">Encuestas</h1>
          {departamento && (
            <p className="text-base font-semibold text-gray-700 mb-2">
              Departamento: {departamento}
            </p>
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
              className={`px-4 py-2 rounded-t font-semibold border-b-2 transition-colors duration-150 ${
                tab === t.key ? 'border-orange-500 text-orange-600 bg-white' : 'border-transparent text-gray-500 bg-gray-100 hover:text-orange-600'
              }`}
              onClick={() => {
                setTab(t.key);
                setSelectedSurvey(null);
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
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
