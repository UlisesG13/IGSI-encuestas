import DepartamentCard from "../molecule/DepartamentCard";

const DepartamentsList = ({ listaDeDepartamentos }) => {
  const departamentList = [
    {
      id: 1,
      nombreDepartamento: "24 March 2019",
      descripcionDepartamento: "Tono es un mamaguebo",
      numeroEncuestas: "100"
    },
    {
      id: 2,
      nombreDepartamento: "15 April 2019", 
      descripcionDepartamento: "Departamento de recursos humanos encargado de la gestión del personal",
      numeroEncuestas: "85"
    }
  ];

  // Usar la lista pasada como prop o la lista por defecto
  const departamentos = listaDeDepartamentos || departamentList;

  return (
    <div className="bg-white rounded-lg p-8 shadow-soft mb-8 w-full min-h-90 max-h-100 overflow-y-auto scrollbar-thin">
      {/* Título principal */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Departamentos</h1>
      </div>

      {/* Contenedor de la lista */}
      <div className="flex flex-col gap-4">
        {departamentos.length > 0 ? (
          departamentos.map((departamento) => (
            <DepartamentCard
              key={departamento.id}
              nombreDepartamento={departamento.nombreDepartamento}
              descripcionDepartamento={departamento.descripcionDepartamento}
              numeroEncuestas={departamento.numeroEncuestas}
              idDepartamento={departamento.id}
            />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500 italic">
            No hay departamentos disponibles
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartamentsList;