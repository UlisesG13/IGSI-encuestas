import React, { useState } from "react";
import SectionCreator from "../molecule/SectionCreator";
import SectionModal from "../molecule/SectionModal";
import SectionList from "../molecule/SectionList";
import QuestionCreator from "../molecule/QuestionCreator";
import QuestionList from "../molecule/QuestionList";
import PageShell from "../organism/PageShell";
import Navbar from "../molecule/Navbar.jsx";
import WelcomeMessage from "../molecule/WelcomeMessage.jsx";

const departamentos = [
  { id: 1, nombre: "Sistemas" },
  { id: 2, nombre: "Administración" },
  { id: 3, nombre: "Contabilidad" },
];
const estados = ["Borrador", "Activa", "Finalizada"];

const CreateSurveyPage = () => {
  // Estado para la encuesta general
  const [info, setInfo] = useState({
    titulo: "",
    descripcion: "",
    idDepartamento: "",
    fechaInicio: "",
    fechaFin: "",
    estado: "",
  });
  const [encuestaCreada, setEncuestaCreada] = useState(false);
  const [secciones, setSecciones] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [showSectionModal, setShowSectionModal] = useState(false);
  // Para IDs únicos
  const nextSectionId = secciones.length ? Math.max(...secciones.map(s => s.id)) + 1 : 1;

  // Handlers para inputs
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  // Validación simple
  const isValid =
    info.titulo &&
    info.idDepartamento &&
    info.fechaInicio &&
    info.fechaFin &&
    info.estado &&
    new Date(info.fechaInicio) < new Date(info.fechaFin);

  // Simula creación de encuesta
  const handleCreateSurvey = (e) => {
    e.preventDefault();
    if (!isValid) return alert("Completa todos los campos correctamente.");
    setEncuestaCreada(true);
    // Aquí iría la llamada al backend para crear la encuesta y obtener el idEncuesta
  };

  return (
    <PageShell>
      <Navbar />
      <WelcomeMessage />
      <div className="max-w-6xl mx-auto mt-10">
        {/* Formulario de información general */}
        {!encuestaCreada && (
          <form
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 mb-8"
            onSubmit={handleCreateSurvey}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Información general de la encuesta
            </h2>
            <label className="text-sm font-semibold text-gray-700">Título</label>
            <input
              type="text"
              name="titulo"
              value={info.titulo}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2"
              required
            />
            <label className="text-sm font-semibold text-gray-700">Descripción</label>
            <textarea
              name="descripcion"
              value={info.descripcion}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2"
              rows={2}
            />
            <label className="text-sm font-semibold text-gray-700">Departamento</label>
            <select
              name="idDepartamento"
              value={info.idDepartamento}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2"
              required
            >
              <option value="">Selecciona departamento</option>
              {departamentos.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nombre}
                </option>
              ))}
            </select>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-semibold text-gray-700">Fecha inicio</label>
                <input
                  type="date"
                  name="fechaInicio"
                  value={info.fechaInicio}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-semibold text-gray-700">Fecha fin</label>
                <input
                  type="date"
                  name="fechaFin"
                  value={info.fechaFin}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                  required
                />
              </div>
            </div>
            <label className="text-sm font-semibold text-gray-700">Estado</label>
            <select
              name="estado"
              value={info.estado}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2"
              required
            >
              <option value="">Selecciona estado</option>
              {estados.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-orange-500 text-white font-semibold rounded-lg px-6 py-2 mt-2 hover:bg-orange-600 transition-colors"
              disabled={!isValid}
            >
              Crear encuesta
            </button>
          </form>
        )}

        {/* Sidebar y área de preguntas/secciones */}
        {encuestaCreada && (
          <div className="flex gap-8">
            {/* Sidebar de secciones a la izquierda */}
            <div className="w-[300px] min-w-[220px] bg-white rounded-xl shadow-lg p-6 flex flex-col">
              <h3 className="text-lg font-bold mb-4 text-orange-600">Secciones</h3>
              <div className="flex-1 overflow-y-auto mt-2">
                <SectionList
                  secciones={secciones}
                  preguntas={preguntas}
                  onDeleteSection={idx => setSecciones(secciones.filter((_, i) => i !== idx))}
                  onDeletePregunta={(secId, i) => setPreguntas(preguntas.filter((p, idx) => !(p.idSeccion === secId && idx === i)))}
                />
              </div>
              {/* Botón para abrir el modal de agregar sección, solo abajo */}
              <div className="flex flex-col items-center mt-6">
                <button
                  className="w-full flex flex-col items-center"
                  onClick={() => setShowSectionModal(true)}
                >
                  <span className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center mb-2 shadow">
                    <span className="text-xl text-gray-700 font-bold">+</span>
                  </span>
                  <span className="border border-gray-300 rounded-full px-6 py-2 text-gray-700 font-medium shadow">Agregar sección</span>
                </button>
              </div>
              <SectionModal
                isOpen={showSectionModal}
                onClose={() => setShowSectionModal(false)}
                onCreate={sec => {
                  setSecciones([...secciones, { ...sec, id: nextSectionId }]);
                  setShowSectionModal(false);
                }}
                nextOrder={secciones.length + 1}
              />
            </div>
            {/* Área de preguntas y lista de preguntas */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4">Agregar pregunta</h3>
                <QuestionCreator
                  onAdd={q => setPreguntas([...preguntas, { ...q }])}
                  secciones={secciones}
                />
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-md font-semibold mb-2">Preguntas creadas</h4>
                <QuestionList
                  preguntas={preguntas}
                  onDelete={idx => setPreguntas(preguntas.filter((_, i) => i !== idx))}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
};

export default CreateSurveyPage;
