import EncuestCard from "../molecule/EncuestCard";

const EncuestList = ({ encuestas }) => {
  // Lista de encuestas por defecto
  const encuestasDefault = [
    {
      id: 1,
      nombre: "Encuesta de Satisfacción Q1 2024",
      fecha: "2024-2025",
      respuestas: "100",
      estado: "Activa"
    },
    {
      id: 2,
      nombre: "Evaluación de Desempeño Anual",
      fecha: "2024-2025",
      respuestas: "100#",
      estado: "Pendiente"
    },
    {
      id: 3,
      nombre: "Clima Organizacional 2024",
      fecha: "2024-2025",
      respuestas: "100#",
      estado: "Finalizada"
    },
    {
      id: 4,
      nombre: "Feedback de Capacitaciones",
      fecha: "2024-2025",
      respuestas: "100",
      estado: "Activa"
    }
  ];

  const encuestasToShow = encuestas || encuestasDefault;

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {/* Título principal */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Encuestas</h1>
      </div>

      {/* Container principal */}
      <div className="max-w-6xl mx-auto">
        {/* Lista de encuestas */}
        <div className="encuest-list">
          {encuestasToShow.map(encuesta => (
            <EncuestCard key={encuesta.id} encuesta={encuesta} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EncuestList;