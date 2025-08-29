import { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';

const EncuestMenuButton = ({ idEncuesta, estado, onSoftDelete, onRestaurar, onDelete, onCambiarEstado, showDeleted }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Función para manejar soft delete
  const handleSoftDelete = async (id) => {
    if (onSoftDelete) {
      await onSoftDelete(id);
    }
    setIsOpen(false);
  };

  // Función para manejar restaurar
  const handleRestaurar = async (id) => {
    if (onRestaurar) {
      await onRestaurar(id);
    }
    setIsOpen(false);
  };

  // Función para manejar hard delete
  const handleDelete = async (id) => {
    if (onDelete) {
      await onDelete(id);
    }
    setIsOpen(false);
  };

  // Función para cambiar estado
  const handleCambiarEstado = async (id, nuevoEstado) => {
    if (onCambiarEstado) {
      await onCambiarEstado(id, nuevoEstado);
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
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
      >
        <MoreVertical size={16} />
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-large z-50">
          <div className="py-1">
            {/* Opciones de estado */}
            {!showDeleted && estado !== 'activa' && (
              <>
                <button
                  onClick={() => handleCambiarEstado(idEncuesta, 'activa')}
                  className="w-full text-left px-3 py-2 text-sm text-green-600 bg-transparent border-none cursor-pointer transition-colors duration-150 hover:bg-green-50 focus:outline-none"
                >
                  Habilitar
                </button>
                <hr className="border-0 border-t border-gray-200 m-0" />
              </>
            )}
            
            {!showDeleted && estado !== 'inactiva' && (
              <>
                <button
                  onClick={() => handleCambiarEstado(idEncuesta, 'inactiva')}
                  className="w-full text-left px-3 py-2 text-sm text-yellow-600 bg-transparent border-none cursor-pointer transition-colors duration-150 hover:bg-yellow-50 focus:outline-none"
                >
                  Deshabilitar
                </button>
                <hr className="border-0 border-t border-gray-200 m-0" />
              </>
            )}

            {/* Soft delete - solo si no está eliminada */}
            {!showDeleted && (
              <button
                onClick={() => handleSoftDelete(idEncuesta)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 bg-transparent border-none cursor-pointer transition-colors duration-150 hover:bg-gray-100 focus:outline-none"
              >
                Eliminar
              </button>
            )}

            {/* Restaurar - solo si está en vista de eliminadas */}
            {showDeleted && (
              <>
                <button
                  onClick={() => handleRestaurar(idEncuesta)}
                  className="w-full text-left px-3 py-2 text-sm text-green-600 bg-transparent border-none cursor-pointer transition-colors duration-150 hover:bg-green-50 focus:outline-none"
                >
                  Restaurar
                </button>
                <hr className="border-0 border-t border-gray-200 m-0" />
              </>
            )}

            {/* Hard delete - solo en vista de eliminadas */}
            {showDeleted && (
              <button
                onClick={() => handleDelete(idEncuesta)}
                className="w-full text-left px-3 py-2 text-sm text-red-600 bg-transparent border-none cursor-pointer transition-colors duration-150 hover:bg-red-50 focus:outline-none"
              >
                Eliminar Permanentemente
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EncuestMenuButton;