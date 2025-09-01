import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDepartamentos } from "../../../Administrador/services/departamentosService.jsx";
import { createEncuesta } from "../../../Shared/services/encuestasService.jsx";
import { createSeccion } from "../../../Shared/services/seccionesService.jsx";
import { createPregunta } from "../../../Shared/services/preguntasService.jsx";
import { createRespuestaPosible } from "../../../Shared/services/respuestasPosiblesService.jsx";
import { getTiposPregunta } from "../../../Shared/services/tiposPregunta.jsx";
import SectionModal from "../molecule/SectionModal";
import SectionList from "../molecule/SectionList";
import QuestionCreator from "../molecule/QuestionCreator";
import QuestionList from "../molecule/QuestionList";
import PageShell from "../organism/PageShell";
import Navbar from "../molecule/Navbar.jsx";
import WelcomeMessage from "../molecule/WelcomeMessage.jsx";

const estados = ["cerrada", "habilitada", "deshabilitada"];
const CreateSurveyPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    async function checkDepartamental() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.showAlert("No tienes sesión activa", "error");
          navigate("/login");
          return;
        }
        // Decodificar el token para obtener el rol
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.rol !== "AdminDepartamental") {
          window.showAlert("Acceso restringido solo para administradores departamentales", "error");
          navigate("/pageNotFound");
        }
      } catch (e) {
        window.showAlert("Error de autenticación", "error");
        navigate("/login");
      }
    }
    checkDepartamental();
  }, [navigate]);
  // Estado para la encuesta general
  const [info, setInfo] = useState({
    titulo: "",
    descripcion: "",
    idDepartamento: "",
    fechaInicio: "",
    fechaFin: "",
    estado: "",
  });
  const [departamentos, setDepartamentos] = useState([]);
  const [loadingDeptos, setLoadingDeptos] = useState(false);
  const [errorDeptos, setErrorDeptos] = useState("");
  const [encuestaCreada, setEncuestaCreada] = useState(false);
  const [idEncuesta, setIdEncuesta] = useState(null);
  const [secciones, setSecciones] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [tiposPregunta, setTiposPregunta] = useState([]);
  const [finalizado, setFinalizado] = useState(false);

  // Para IDs únicos locales
  const nextSectionId = secciones.length ? Math.max(...secciones.map(s => s.id)) + 1 : 1;

  // Fetch departamentos al montar
  useEffect(() => {
    const fetchDepartamentos = async () => {
      setLoadingDeptos(true);
      setErrorDeptos("");
      try {
        const data = await getDepartamentos();
        setDepartamentos(data);
      } catch (e) {
        setErrorDeptos("Error al obtener departamentos");
      } finally {
        setLoadingDeptos(false);
      }
    };
    fetchDepartamentos();
  }, []);

  // Fetch tipos de pregunta
  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const tipos = await getTiposPregunta();
        setTiposPregunta(tipos);
      } catch (e) {
        // No mostrar error aquí
      }
    };
    fetchTipos();
  }, []);

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

  // Crear encuesta en el backend
  const handleCreateSurvey = async (e) => {
    e.preventDefault();
    if (!isValid) return alert("Completa todos los campos correctamente.");
    try {
      const encuestaPayload = {
        titulo: info.titulo,
        descripcion: info.descripcion,
        idDepartamento: Number(info.idDepartamento),
        fechaInicio: info.fechaInicio,
        fechaFin: info.fechaFin,
        estado: info.estado,
      };
      console.log("JSON encuesta:", encuestaPayload);
      const nuevaEncuesta = await createEncuesta(encuestaPayload);
      setEncuestaCreada(true);
      setIdEncuesta(nuevaEncuesta.idEncuesta || nuevaEncuesta.id || nuevaEncuesta.id_encuesta);
      window.showAlert("Encuesta creada exitosamente", "success");
    } catch (error) {
      window.showAlert("Error al crear la encuesta", "error");
    }
  };

  // Crear sección en el backend
  const handleCreateSection = async (sec) => {
    if (!idEncuesta) {
      alert("Primero crea la encuesta");
      return;
    }

    try {
      const payload = {
        idSeccion: 0, // ignorado por el backend
        idEncuesta: idEncuesta,
        titulo: sec.titulo,
        descripcion: sec.descripcion,
        orden: secciones.length, // número de secciones actuales
      };

      console.log("JSON sección:", payload);

      // Crear sección en el backend
      const nuevoId = await createSeccion(idEncuesta, payload);

      // Rearmar el objeto con el ID real
      const newSection = {
        ...sec,
        id: nuevoId,
        idSeccion: nuevoId,
      };

      // Actualizar estado local
      setSecciones([...secciones, newSection]);
      setShowSectionModal(false);
      setSelectedSectionId(newSection.id);

      alert("Sección creada exitosamente");
    } catch (error) {
      console.error("Error al crear sección:", error);
      alert("Error al crear la sección");
    }
  };
  // Crear pregunta y sus respuestas posibles en el backend
  const handleAddPregunta = async (preguntaData) => {
    if (!idEncuesta || !preguntaData.idSeccion) {
      alert("Primero crea la encuesta y la sección");
      return;
    }

    try {
      // 1️⃣ Crear la pregunta primero
      const preguntaPayload = {
        idSeccion: preguntaData.idSeccion,
        textoPregunta: preguntaData.textoPregunta,
        idTipoPregunta: preguntaData.idTipoPregunta,
        orden: 1,
        ayuda: preguntaData.ayuda || "",
        puntaje: 1,
      };

      console.log("Pregunta: ", preguntaPayload);

      const preguntaCreada = await createPregunta(preguntaData.idSeccion, preguntaPayload);
      const idPregunta = preguntaCreada.idPregunta || preguntaCreada.id || preguntaCreada.id_pregunta;

      if (!idPregunta) throw new Error("No se recibió idPregunta desde el backend");

      // 2️⃣ Iterar sobre las respuestas posibles y enviarlas una por una
      const respuestasCreadas = [];
      if (preguntaData.respuestasPosibles?.length > 0) {
        for (const respuesta of preguntaData.respuestasPosibles) {
          const respuestaPayload = {
            idPregunta: idPregunta,
            textoRespuesta: respuesta.textoRespuesta,
            puntaje: 0,
            esCorrecta: false,
          };

          console.log("Enviando respuesta posible:", respuestaPayload);

          const respCreada = await createRespuestaPosible(idPregunta, respuestaPayload);
          respuestasCreadas.push(respCreada);
        }
      }

      // 3️⃣ Actualizar estado local
      setPreguntas([...preguntas, { ...preguntaData, idPregunta, respuestas: respuestasCreadas }]);
      alert("Pregunta y respuestas creadas exitosamente");
    } catch (error) {
      console.error("Error al crear pregunta o respuestas:", error);
      alert("Error al crear la pregunta o respuestas");
    }
  };

  // Finalizar encuesta
  const handleFinalizarEncuesta = () => {
    setFinalizado(true);
    window.showAlert("Encuesta finalizada y guardada", "success");
    // Aquí podrías redirigir o limpiar el estado si lo deseas
  };

  // Drag&Drop para reordenar secciones
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(secciones);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setSecciones(reordered);
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
            {loadingDeptos ? (
              <div className="text-gray-500">Cargando departamentos...</div>
            ) : errorDeptos ? (
              <div className="text-red-500">{errorDeptos}</div>
            ) : (
              <select
                name="idDepartamento"
                value={info.idDepartamento}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2"
                required
              >
                <option value="">Selecciona departamento</option>
                {departamentos.map((d) => (
                  <option key={d.idDepartamento} value={d.idDepartamento}>
                    {d.nombre}
                  </option>
                ))}
              </select>
            )}
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
        {encuestaCreada && !finalizado && (
          <div className="flex gap-8">
            {/* Sidebar de secciones a la izquierda */}
            <div className="w-[300px] min-w-[220px] bg-white rounded-xl shadow-lg p-6 flex flex-col">
              <h3 className="text-lg font-bold mb-4 text-orange-600">Secciones</h3>
              <div className="flex-1 overflow-y-auto mt-2">
                <SectionList
                  secciones={secciones}
                  selectedId={selectedSectionId}
                  onSelectSection={setSelectedSectionId}
                  onDeleteSection={idx => {
                    setSecciones(secciones.filter((_, i) => i !== idx));
                    if (selectedSectionId === secciones[idx]?.id && secciones.length > 1) {
                      setSelectedSectionId(secciones[0].id);
                    }
                  }}
                  onDragEnd={handleDragEnd}
                />
              </div>
              {/* Botón para abrir el modal de agregar sección, solo abajo */}
              <div className="flex flex-col items-center mt-6">
                <button
                  className="w-full flex flex-col items-center"
                  onClick={() => setShowSectionModal(true)}
                >
                  <span className="border border-gray-300 rounded-full px-6 py-2 text-gray-700 font-medium shadow">Agregar sección</span>
                </button>
              </div>
              <SectionModal
                isOpen={showSectionModal}
                onClose={() => setShowSectionModal(false)}
                onCreate={handleCreateSection}
                nextOrder={secciones.length + 1}
              />
            </div>
            {/* Área de preguntas y lista de preguntas */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4">Agregar pregunta</h3>
                <QuestionCreator
                  onAdd={handleAddPregunta}
                  secciones={secciones}
                  selectedSectionId={selectedSectionId}
                  tiposPregunta={tiposPregunta}
                />
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-md font-semibold mb-2">Preguntas creadas</h4>
                <QuestionList
                  preguntas={preguntas} // todas las preguntas, sin filtrar
                  onDelete={idx => setPreguntas(preguntas.filter((_, i) => i !== idx))}
                />
              </div>
              <button
                className="bg-green-600 text-white font-semibold rounded-lg px-6 py-2 mt-2 hover:bg-green-700 transition-colors"
                onClick={handleFinalizarEncuesta}
              >
                Finalizar encuesta
              </button>
            </div>
          </div>
        )}
        {finalizado && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center mt-10">
            <h2 className="text-2xl font-bold text-green-700 mb-4">¡Encuesta finalizada!</h2>
            <p className="text-gray-700">La encuesta ha sido guardada correctamente.</p>
          </div>
        )}
      </div>
    </PageShell>
  );
};

export default CreateSurveyPage;
