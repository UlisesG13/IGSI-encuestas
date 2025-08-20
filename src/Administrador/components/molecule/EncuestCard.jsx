import EncuestMenuButton from "../atom/EncuestMenuButton";
import React, { useState } from "react";

const EncuestCard = ({ encuesta }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="grid grid-cols-4 gap-6 items-start">
        {/* Checkbox + Nombre de encuesta */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900 mb-1">
              Nombre de encuesta
            </div>
            <div className="text-xs text-gray-500 mb-2">
              <span className="block">Fecha</span>
              <span className="text-gray-400">{encuesta.fecha}</span>
            </div>
          </div>
        </div>

        {/* Número de respuestas */}
        <div>
          <div className="text-sm font-medium text-gray-900 mb-1">
            Número de respuestas
          </div>
          <div className="text-sm text-blue-500 font-medium">
            {encuesta.respuestas}
          </div>
        </div>

        {/* Estado */}
        <div>
          <div className="text-sm font-medium text-gray-900 mb-1">
            Estado
          </div>
          <div className="text-sm text-gray-600">
            {encuesta.estado}
          </div>
        </div>

        {/* Botón menú */}
        <div className="flex justify-end">
          <EncuestMenuButton idEncuesta={encuesta.id} />
        </div>
      </div>
    </div>
  );
};

export default EncuestCard;
