import Header from "../organism/Header";
import { useState, useEffect } from "react";
import SidebarActions from "../molecule/SidebarActions";
import SurveyTable from "../organism/SurveyTable";
import {
  getEncuestas,
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

  // Cargar encuestas reales
  useEffect(() => {
    fetchEncuestas();
  }, []);

  const fetchEncuestas = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEncuestas();
      setEncuestas(data);
    } catch (err) {
      setError("Error al cargar encuestas");
    } finally {
      setLoading(false);
    }
  };


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
    await softDeleteEncuesta(idEncuesta);
    fetchEncuestas();
    setSelectedSurvey(null);
  };
  const handleRestaurar = async (idEncuesta) => {
    await restaurarEncuesta(idEncuesta);
    fetchEncuestas();
    setSelectedSurvey(null);
  };
  const handleDelete = async (idEncuesta) => {
    await deleteEncuesta(idEncuesta);
    fetchEncuestas();
    setSelectedSurvey(null);
  };
  const handleDeshabilitar = async (idEncuesta) => {
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
  const surveys = tab === "activas" ? encuestasActivas : encuestasEliminadas;

  // Acciones para Sidebar
  const sidebarActionsProps = {
    selectedSurvey,
    tab,
    surveys,
    onSoftDelete: (idx) => handleSoftDelete(surveys[idx].idEncuesta),
    onDeshabilitar: (idx) => handleDeshabilitar(surveys[idx].idEncuesta),
    onHabilitar: (idx) => handleHabilitar(surveys[idx].idEncuesta),
    onRestaurar: (idx) => handleRestaurar(surveys[idx].idEncuesta),
    onDelete: (idx) => handleDelete(surveys[idx].idEncuesta)
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <div className="w-full max-w-full m-0 p-4 md:p-8 min-h-[calc(100vh-80px)]">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">Encuestas</h1>
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