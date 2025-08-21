import React from 'react';

// Átomo: Botón de acción del sidebar
// Átomo: Botón de acción del sidebar
const SidebarActionButton = ({ icon: Icon, title, subtitle, color = "blue", onClick, disabled = false }) => {
    const colorClasses = {
      blue: disabled ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600",
      red: disabled ? "bg-gray-300" : "bg-red-500 hover:bg-red-600",
      green: disabled ? "bg-gray-300" : "bg-green-500 hover:bg-green-600",
      orange: disabled ? "bg-gray-300" : "bg-orange-500 hover:bg-orange-600"
    };
  
    return (
      <button 
        onClick={onClick}
        disabled={disabled}
        className={`w-full p-4 bg-white rounded-lg shadow-sm border border-gray-200 text-left group transition-all duration-200 ${
          disabled 
            ? 'cursor-not-allowed opacity-60' 
            : 'hover:shadow-md cursor-pointer'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${colorClasses[color]} text-white ${
            !disabled ? 'group-hover:scale-105' : ''
          } transition-transform`}>
            <Icon size={20} />
          </div>
          <div>
            <div className="font-medium text-gray-900">{title}</div>
            <div className="text-sm text-gray-500">{subtitle}</div>
          </div>
        </div>
      </button>
    );
  };
  
  

export default SidebarActionButton;