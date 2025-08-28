import { useState, useRef, useEffect } from 'react';

const EmployersMenuButton = ({ idEmpleado, onEdit, onDelete, departamentos = [], empleadoData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({ 
    nombre: '', 
    correo: '', 
    contraseña: '', 
    rol: '', 
    departamento: '' 
  });

  // Función para manejar la edición
  const handleEdit = (id) => {
    // Cargar los datos existentes del empleado
    if (empleadoData) {
      setEditData({
        nombre: empleadoData.nombre || '',
        correo: empleadoData.correo || '',
        contraseña: '', // No cargar contraseña existente
        rol: empleadoData.rol || '',
        departamento: empleadoData.idDepartamento?.toString() || ''
      });
    }
    setShowEdit(true);
    setIsOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (id) => {
    if (!onEdit) {
      setShowEdit(false);
      return;
    }
    
    // Validación básica
    if (!editData.nombre.trim() || !editData.correo.trim() || !editData.rol.trim() || !editData.departamento.trim()) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }
    
    await onEdit(id, { ...editData });
    setShowEdit(false);
    setEditData({ nombre: '', correo: '', contraseña: '', rol: '', departamento: '' });
  };

  const handleCancelEdit = () => {
    setShowEdit(false);
    setEditData({ nombre: '', correo: '', contraseña: '', rol: '', departamento: '' });
  };

  // Función para manejar la eliminación
  const handleDelete = async (id) => {
    if (!onDelete) {
      setIsOpen(false);
      return;
    }
    const ok = confirm('¿Eliminar este usuario?');
    if (!ok) return;
    await onDelete(id);
    setIsOpen(false);
  };

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative inline-block" ref={menuRef}>
        {/* Botón Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 border-2 border-primary-600 text-primary-600 rounded-lg bg-transparent cursor-pointer transition-all duration-200 ease-in-out hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Menu
        </button>

        {/* Menú desplegable */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-large z-50">
            <div className="py-1">
              <button
                onClick={() => handleEdit(idEmpleado)}
                className="w-full text-left px-4 py-2 text-gray-700 bg-transparent border-none cursor-pointer transition-colors duration-150 ease-in-out hover:bg-gray-100 focus:outline-none"
              >
                Editar
              </button>
              <hr className="border-0 border-t border-gray-200 m-0" />
              <button
                onClick={() => handleDelete(idEmpleado)}
                className="w-full text-left px-4 py-2 text-gray-700 bg-transparent border-none cursor-pointer transition-colors duration-150 ease-in-out hover:bg-gray-100 focus:outline-none"
              >
                Eliminar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de edición */}
      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Editar Empleado</h3>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Campo Nombre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre *
                  </label>
                  <input
                    name="nombre"
                    type="text"
                    placeholder="Nombre del empleado"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={editData.nombre}
                    onChange={handleEditChange}
                  />
                </div>

                {/* Campo Correo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo *
                  </label>
                  <input
                    name="correo"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={editData.correo}
                    onChange={handleEditChange}
                  />
                </div>

                

                {/* Campo Rol */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rol *
                  </label>
                  <select
                    name="rol"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={editData.rol}
                    onChange={handleEditChange}
                  >
                    <option value="">Selecciona un rol</option>
                    <option value="AdminGeneral">Admin</option>
                    <option value="Empleado">Empleado</option>
                    
                  </select>
                </div>

                {/* Campo Departamento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Departamento *
                  </label>
                  <select
                    name="departamento"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={editData.departamento}
                    onChange={handleEditChange}
                  >
                    <option value="">Selecciona un departamento</option>
                    {departamentos.map(dept => (
                      <option key={dept.idDepartamento} value={dept.idDepartamento}>
                        {dept.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleEditSubmit(idEmpleado)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Guardar Cambios
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-200"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployersMenuButton;