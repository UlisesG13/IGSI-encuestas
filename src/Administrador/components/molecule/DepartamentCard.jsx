import React from "react";
import DepartamentMenuButton from "../atom/DepartamentMenuButton";

const DepartamentCard = ({ 
  nombreDepartamento, 
  descripcionDepartamento, 
  numeroEncuestas, 
  idDepartamento,
  onEdit,
  onSoftDelete,
  onDelete,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-soft p-6 max-w-4xl transition-shadow duration-200 hover:shadow-medium">
      {/* Header con títulos */}
      <div className="grid grid-cols-3 gap-6 mb-4">
        <div>
          <h3 className="text-sm text-left font-semibold text-gray-900 uppercase tracking-wider">
            DEPARTAMENTO
          </h3>
        </div>
        <div>
          <h3 className="text-sm text-left font-semibold text-gray-900 uppercase tracking-wider">
            Descripción
          </h3>
        </div>
      
        <div>
          <h3 className="text-sm text-left  font-semibold text-gray-900 uppercase tracking-wider">
            Interacción
          </h3>
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="grid grid-cols-3 gap-6 items-center">
        <div>
          <p className="text-sm text-gray-500">
            {nombreDepartamento}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            {descripcionDepartamento}
          </p>
        </div>
        
        <div className="flex justify-end ">
          <DepartamentMenuButton 
            idDepartamento={idDepartamento}
            onEdit={onEdit}
            onSoftDelete={onSoftDelete}
            onDelete={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default DepartamentCard;