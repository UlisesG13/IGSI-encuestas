import React from "react";

export default function Alert({ type = "info", message, onClose }) {
  const colors = {
    info: "bg-blue-100 text-blue-800 border-blue-300",
    success: "bg-green-100 text-green-800 border-green-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    error: "bg-red-100 text-red-800 border-red-300"
  };
  return (
    <div className={`border rounded-lg px-4 py-3 flex items-center gap-2 mb-2 ${colors[type]}`}> 
      <span className="flex-1">{message}</span>
      {onClose && (
        <button className="ml-2 text-lg font-bold text-gray-500 hover:text-gray-700" onClick={onClose}>×</button>
      )}
    </div>
  );
}
