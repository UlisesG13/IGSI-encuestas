import { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';

const EncuestMenuButton = ({ idEncuesta }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Función para manejar la edición
  const handleEdit = (id) => {
    alert(`Ver encuesta: ${id}`);
    setIsOpen(false);
  };

  // Función para manejar la eliminación
  const handleDelete = (id) => {
    alert(`Eliminar encuesta: ${id}`);
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
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
      >
        <MoreVertical size={16} />
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-large z-50">
          <div className="py-1">
            <button
              onClick={() => handleEdit(idEncuesta)}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 bg-transparent border-none cursor-pointer transition-colors duration-150 hover:bg-gray-100 focus:outline-none"
            >
              Ver
            </button>
            <hr className="border-0 border-t border-gray-200 m-0" />
            <button
              onClick={() => handleDelete(idEncuesta)}
              className="w-full text-left px-3 py-2 text-sm text-red-600 bg-transparent border-none cursor-pointer transition-colors duration-150 hover:bg-red-50 focus:outline-none"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EncuestMenuButton;