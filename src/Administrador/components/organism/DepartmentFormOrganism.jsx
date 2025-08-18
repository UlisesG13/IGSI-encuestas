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
    <div className="department-form-organism">
      <div className="department-form-organism__header">
        <h2 className="department-form-organism__title">Departamentos</h2>
      </div>
      
      <form className="department-form-organism__form" onSubmit={handleSubmit}>
        {/* Campo Nombre */}
        <div className="department-form-organism__field">
          <label className="department-form-organism__label">Nombre</label>
          <input
            className="department-form-organism__input"
            name="nombre"
            type="text"
            placeholder="Value"
            value={formData.nombre}
            onChange={handleInputChange}
          />
        </div>

        {/* Campo Descripción */}
        <div className="department-form-organism__field">
          <label className="department-form-organism__label">Descripción</label>
          <textarea
            className="department-form-organism__textarea"
            name="descripcion"
            placeholder="Hola mi nombre es tono"
            value={formData.descripcion}
            onChange={handleInputChange}
            rows={4}
          />
        </div>

        {/* Botón de registro */}
        <button 
          className="department-form-organism__button"
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