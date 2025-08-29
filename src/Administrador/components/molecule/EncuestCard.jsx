import EncuestMenuButton from "../atom/EncuestMenuButton";
import React, { useState } from "react";

const EncuestCard = ({ encuesta, onSoftDelete, onRestaurar, onDelete, onCambiarEstado, showDeleted }) => {
  const [isChecked, setIsChecked] = useState(false);

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'activa':
        return 'text-green-600 bg-green-50';
      case 'inactiva':
        return 'text-yellow-600 bg-yellow-50';
      case 'cerrada':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="flex items-center justify-between gap-10 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
      {/* Checkbox + Nombre de encuesta */}
      <div className="flex items-center gap-3 flex-1">
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900 ">
            {encuesta.nombre}
          </div>
        </div>
      </div>

      {/* Fecha */}
      <div className="text-center min-w-24">
        <div className="text-sm text-gray-600">
          {encuesta.fecha}
        </div>
      </div>

      {/* Número de respuestas */}
      <div className="text-center min-w-24">
        <div className="text-sm font-medium text-gray-900">
          {encuesta.respuestas}
        </div>
      </div>

                    {/* Estado */}
       <div className="text-center min-w-30">
         <span className={`px-2 py-1 text-xs  font-medium rounded-full ${getEstadoColor(encuesta.estado)}`}>
           {encuesta.estado.charAt(0).toUpperCase() + encuesta.estado.slice(1)}
         </span>
       </div>

      
        <div className="flex justify-end min-w-12">
         <EncuestMenuButton 
           idEncuesta={encuesta.idEncuesta || encuesta.id}
           estado={encuesta.estado}
           onSoftDelete={onSoftDelete}
           onRestaurar={onRestaurar}
           onDelete={onDelete}
           onCambiarEstado={onCambiarEstado}
           showDeleted={showDeleted}
         />
       </div>
    </div>
  );
};

export default EncuestCard;
