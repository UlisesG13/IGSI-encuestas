import EncuestCard from "../molecule/EncuestCard";

const EncuestList = ({ encuestas, onSoftDelete, onRestaurar, onDelete, onCambiarEstado, loading, error, showDeleted }) => {
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
      respuestas: "85",
      estado: "Pendiente"
    },
    {
      id: 3,
      nombre: "Clima Organizacional 2024",
      fecha: "2024-2025",
      respuestas: "120",
      estado: "Finalizada"
    },
    {
      id: 4,
      nombre: "Feedback de Capacitaciones",
      fecha: "2024-2025",
      respuestas: "95",
      estado: "Activa"
    },
    {
      id: 5,
      nombre: "Encuesta de Innovación",
      fecha: "2024-2025",
      respuestas: "75",
      estado: "Activa"
    },
    {
      id: 6,
      nombre: "Evaluación de Liderazgo",
      fecha: "2024-2025",
      respuestas: "110",
      estado: "Pendiente"
    }
  ];

  const encuestasToShow = encuestas || encuestasDefault;

  return (
    <div className="bg-white rounded-lg shadow-soft p-6 w-full">
      {/* Header con título */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Encuestas</h2>
      </div>

             {/* Header de columnas */}
       <div className="flex items-center justify-between gap-6 p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
         <div className="flex items-center gap-3 flex-1">
           <div className="w-4 h-4"></div> {/* Espacio para checkbox */}
           <div className="flex-1">
             <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
               Nombre de encuesta
             </div>
           </div>
         </div>

         <div className="text-center min-w-24">
           <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
             Fecha
           </div>
         </div>

         <div className="text-center min-w-24">
           <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
             Número de respuestas
           </div>
         </div>

         <div className="text-center min-w-20">
           <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
             Estado
           </div>
         </div>

         <div className="flex justify-end min-w-12">
           <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
             Acciones
           </div>
         </div>
       </div>

      {/* Lista de encuestas */}
      <div className="max-h-96 overflow-y-auto scrollbar-thin">
        {loading && (
          <div className="text-center py-12 text-gray-500">Cargando...</div>
        )}
        {error && (
          <div className="text-center py-12 text-red-500">{error}</div>
        )}
        {!loading && !error && encuestasToShow.length > 0 ? (
          encuestasToShow.map(encuesta => (
                         <EncuestCard 
               key={encuesta.id} 
               encuesta={encuesta}
               onSoftDelete={onSoftDelete}
               onRestaurar={onRestaurar}
               onDelete={onDelete}
               onCambiarEstado={onCambiarEstado}
               showDeleted={showDeleted}
             />
          ))
        ) : !loading && !error ? (
          <div className="text-center py-12 text-gray-500 italic">
            No hay encuestas disponibles
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EncuestList;