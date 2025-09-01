import React, { useState } from 'react';

const EmployersFormOrganism = ({ onCreate, departamentos = [] }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',       // ✅ backend espera "password"
    idDepartamento: ''  // ✅ backend espera "idDepartamento"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (onCreate) {
      try {
        await onCreate({ ...formData, rol: "empleado" });
        window.showAlert('Empleado registrado exitosamente', 'success');
        setFormData({
          nombre: '',
          correo: '',
          password: '',
          idDepartamento: ''
        });
      } catch (error) {
        // Aquí podrías mostrar el mensaje real de error si quieres
        // window.showAlert(error.message || 'Error al crear el usuario', 'error');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Agregar empleado</h2>
      </div>
      
      <div className="flex flex-col gap-4">
        {/* Campo Nombre */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Nombre</label>
          <input
            className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder-gray-400 text-gray-700 bg-white"
            name="nombre"
            type="text"
            placeholder="Nombre del empleado"
            value={formData.nombre}
            onChange={handleInputChange}
          />
        </div>

        {/* Campo Correo */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Correo</label>
          <input
            className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder-gray-400 text-gray-700 bg-white"
            name="correo"
            type="email"
            placeholder="jarf@gmail.com"
            value={formData.correo}
            onChange={handleInputChange}
          />
        </div>

        {/* Campo Contraseña */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Contraseña</label>
          <input
            className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder-gray-400 text-gray-700 bg-white"
            name="password"   // ✅ ahora coincide con backend
            type="password"
            placeholder="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        {/* Campo Departamento */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Departamento</label>
          <select
            className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-700 bg-white cursor-pointer"
            name="idDepartamento"   // ✅ ahora coincide con backend
            value={formData.idDepartamento}
            onChange={handleInputChange}
          >
            <option value="" disabled className="text-gray-400">
              Selecciona un departamento
            </option>
            {departamentos.map(dept => (
              <option key={dept.idDepartamento} value={dept.idDepartamento}>
                {dept.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Botón de registro */}
        <button 
          className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-3 focus:ring-offset-2 focus:ring-primary-500"
          onClick={handleSubmit} 
          type="button"
        >
          Registrar
        </button>
      </div>
    </div>
  );
};

export default EmployersFormOrganism;
