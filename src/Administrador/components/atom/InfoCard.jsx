import React from "react";

const InfoCard = ({ Titulo, Cantidad }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-soft transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-medium">
      <div className="text-sm text-gray-500 mb-2 font-medium">{Titulo}</div>
      <div className="text-3xl font-bold text-gray-900 leading-none">{Cantidad}</div>
    </div>
  );
};

export default InfoCard;
