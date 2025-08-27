import { useState, useRef, useEffect } from 'react';

const DepartamentMenuButton = ({ idDepartamento, onEdit, onSoftDelete, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Función para manejar la edición
  const handleEdit = async (id) => {
    if (!onEdit) {
      setIsOpen(false);
      return;
    }
    const nombre = prompt('Nuevo nombre del departamento:');
    if (nombre === null) return; // cancelado
    const descripcion = prompt('Nueva descripción del departamento:');
    if (descripcion === null) return;
    await onEdit(id, { nombre, descripcion });
    setIsOpen(false);
  };

  // Función para manejar la eliminación (soft)
  const handleSoftDeleteClick = async (id) => {
    if (onSoftDelete) {
      await onSoftDelete(id);
    }
    setIsOpen(false);
  };

  // Función para manejar la eliminación (hard)
  const handleDelete = async (id) => {
    if (onDelete) {
      const confirmDelete = confirm('¿Eliminar permanentemente este departamento?');
      if (!confirmDelete) return;
      await onDelete(id);
    }
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
              onClick={() => handleEdit(idDepartamento)}
              className="w-full text-left px-4 py-2 text-gray-700 bg-transparent border-none cursor-pointer transition-colors duration-150 ease-in-out hover:bg-gray-100 focus:outline-none"
            >
              Editar
            </button>
            <hr className="border-0 border-t border-gray-200 m-0" />
            <button
              onClick={() => handleSoftDeleteClick(idDepartamento)}
              className="w-full text-left px-4 py-2 text-gray-700 bg-transparent border-none cursor-pointer transition-colors duration-150 ease-in-out hover:bg-gray-100 focus:outline-none"
            >
              Eliminar (Soft)
            </button>
            <hr className="border-0 border-t border-gray-200 m-0" />
            <button
              onClick={() => handleDelete(idDepartamento)}
              className="w-full text-left px-4 py-2 text-gray-700 bg-transparent border-none cursor-pointer transition-colors duration-150 ease-in-out hover:bg-gray-100 focus:outline-none"
            >
              Eliminar (Hard)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartamentMenuButton;