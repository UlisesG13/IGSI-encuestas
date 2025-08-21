import EmployersCard from "../molecule/EmployersCard";

const EmployersList = ({ listaDeEmpleados }) => {
  const employersList = [
    {
      id: 1,
      nombre: "Juan Perez",
      correo: "juanperez@gmail.com",
      idDepartamento: "1",
    },
    {
      id: 2,
      nombre: "Maria Gomez",
      correo: "mariagomez@gmail.com",
      idDepartamento: "2",
    }
  ];

  // Usar la lista pasada como prop o la lista por defecto
  const empleados = listaDeEmpleados || employersList;

  return (
    <div className="bg-white rounded-lg p-8 shadow-soft mb-8 w-full min-h-90 max-h-100 overflow-y-auto scrollbar-thin">
      {/* Título principal */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Empleados</h1>
      </div>

      {/* Contenedor de la lista */}
      <div className="flex flex-col gap-4">
        {empleados.length > 0 ? (
          empleados.map((empleado) => (
            <EmployersCard
              key={empleado.id}
              nombre={empleado.nombre}
              correo={empleado.correo}
              idDepartamento={empleado.idDepartamento}
            />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500 italic">
            No hay empleados disponibles
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployersList;