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
    <div className="departaments-list">
      {/* Título principal */}
      <div className="departaments-list__header">
        <h1 className="departaments-list__title">Departamentos</h1>
      </div>

      {/* Contenedor de la lista */}
      <div className="departaments-list__content">
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
          <div className="departaments-list__empty">
            No hay departamentos disponibles
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartamentsList;