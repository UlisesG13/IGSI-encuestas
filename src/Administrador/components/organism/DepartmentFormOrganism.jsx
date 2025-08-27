import React, { useState } from 'react';
import InputFieldMolecule from '../atom/InputFieldMolecule';
import TextareaFieldMolecule from '../molecule/TextareaFieldMolecule';
import ButtonAtom from '../atom/ButtomAtom';


const DepartmentFormOrganism = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Validación básica
    if (!formData.nombre.trim() || !formData.descripcion.trim()) {
      alert('Por favor, completa todos los campos');
      return;
    }

    // Simular registro
    alert(`Departamento registrado:\nNombre: ${formData.nombre}\nDescripción: ${formData.descripcion}`);
    
    // Limpiar formulario
    setFormData({
      nombre: '',
      descripcion: ''
    });
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-soft w-full min-h-96">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Departamentos</h2>
      </div>
      
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* Campo Nombre */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Nombre</label>
          <input
            className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm transition-all duration-200 focus:outline-none focus:border-primary-600 focus:ring-3 focus:ring-primary-100 placeholder-gray-400 text-gray-700 bg-white"
            name="nombre"
            type="text"
            placeholder="Nombre del departamento"
            value={formData.nombre}
            onChange={handleInputChange}
          />
        </div>

        {/* Campo Descripción */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm font-inherit resize-vertical min-h-24 transition-all duration-200 focus:outline-none focus:border-primary-600 focus:ring-3 focus:ring-primary-100 placeholder-gray-400 text-gray-700 bg-white"
            name="descripcion"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleInputChange}
            rows={4}
          />
        </div>

        {/* Botón de registro */}
        <button 
          className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-3 focus:ring-offset-2 focus:ring-primary-500"
          onClick={handleSubmit} 
          type="button"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default DepartmentFormOrganism;