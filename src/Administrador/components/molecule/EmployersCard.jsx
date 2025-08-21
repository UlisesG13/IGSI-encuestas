import React from "react";
import EmployersMenuButton from "../atom/EmployersMenuButton";

const EmployersCard = ({ 
  nombre, 
  correo, 
  idDepartamento, 
  idEmpleado
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-soft p-6 max-w-4xl transition-shadow duration-200 hover:shadow-medium">
      {/* Header con títulos */}
      <div className="grid grid-cols-4 gap-6 mb-4">
        <div>
          <h3 className="text-sm text-left font-semibold text-gray-900 uppercase tracking-wider">
            Nombre
          </h3>
        </div>
        <div>
          <h3 className="text-sm text-left font-semibold text-gray-900 uppercase tracking-wider">
            Correo
          </h3>
        </div>
        <div>
          <h3 className="text-sm text-left font-semibold text-gray-900 uppercase tracking-wider">
            Departamento
          </h3>
        </div>
        <div>
          <h3 className="text-sm text-left font-semibold text-gray-900 uppercase tracking-wider">
            Acciones
          </h3>
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="grid grid-cols-4 gap-6 items-center">
        <div>
          <p className="text-sm text-gray-500">
            {nombre}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            {correo}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">
            {idDepartamento}
          </p>
        </div>
        <div className="flex justify-end">
        <EmployersMenuButton idEmpleado={idEmpleado} />
        </div>
      </div>
    </div>
  );
};

export default EmployersCard;