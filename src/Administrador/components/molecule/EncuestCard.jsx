import EncuestMenuButton from "../atom/EncuestMenuButton";
import React, { useState } from "react";

const EncuestCard = ({ encuesta }) => {
  const [isChecked, setIsChecked] = useState(false);

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Activa':
        return 'text-green-600 bg-green-50';
      case 'Pendiente':
        return 'text-yellow-600 bg-yellow-50';
      case 'Finalizada':
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
      <div className="text-rigth min-w-20">
        <span className={`inline-flex  px-2 py-1 text-xs font-medium rounded-full ${getEstadoColor(encuesta.estado)}`}>
          {encuesta.estado}
        </span>
      </div>

      {/* Botón menú */}
      <div className="flex justify-end min-w-12">
        <EncuestMenuButton idEncuesta={encuesta.id} />
      </div>
    </div>
  );
};

export default EncuestCard;
