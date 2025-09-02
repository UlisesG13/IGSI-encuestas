import { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { MoreVertical } from 'lucide-react';
import EncuestaModal from './EncuestaModal'; // <-- Importa el modal

const EncuestMenuButton = ({ idEncuesta, estado, onSoftDelete, onRestaurar, onDelete, onCambiarEstado, showDeleted }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // <-- Estado para el modal
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const handleSoftDelete = async (id) => {
    if (onSoftDelete) await onSoftDelete(id);
    setIsOpen(false);
  };

  const handleRestaurar = async (id) => {
    if (onRestaurar) await onRestaurar(id);
    setIsOpen(false);
  };

  const handleDelete = async (id) => {
    if (onDelete) await onDelete(id);
    setIsOpen(false);
  };

  const handleCambiarEstado = async (id, nuevoEstado) => {
    if (onCambiarEstado) await onCambiarEstado(id, nuevoEstado);
    setIsOpen(false);
  };

  const handleVerEncuesta = () => {
    setShowModal(true);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen]);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen &&
        ReactDOM.createPortal(
          <div
            ref={menuRef}
            className="absolute w-48 bg-white border border-gray-200 rounded-lg shadow-large z-[9999]"
            style={{ top: menuPosition.top, left: menuPosition.left }}
          >
            <div className="py-1">
              <button
                onClick={handleVerEncuesta}
                className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50"
              >
                Ver Encuesta
              </button>
              <hr className="border-t border-gray-200" />

              {!showDeleted && estado !== 'activa' && (
                <>
                  <button
                    onClick={() => handleCambiarEstado(idEncuesta, 'activa')}
                    className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50"
                  >
                    Habilitar
                  </button>
                  <hr className="border-t border-gray-200" />
                </>
              )}

              {!showDeleted && estado !== 'inactiva' && (
                <>
                  <button
                    onClick={() => handleCambiarEstado(idEncuesta, 'inactiva')}
                    className="w-full text-left px-3 py-2 text-sm text-yellow-600 hover:bg-yellow-50"
                  >
                    Deshabilitar
                  </button>
                  <hr className="border-t border-gray-200" />
                </>
              )}

              {!showDeleted && (
                <button
                  onClick={() => handleSoftDelete(idEncuesta)}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Eliminar
                </button>
              )}

              {showDeleted && (
                <>
                  <button
                    onClick={() => handleRestaurar(idEncuesta)}
                    className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50"
                  >
                    Restaurar
                  </button>
                  <hr className="border-t border-gray-200" />
                  <button
                    onClick={() => handleDelete(idEncuesta)}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Eliminar Permanentemente
                  </button>
                </>
              )}
            </div>
          </div>,
          document.body
        )}

      {showModal && (
        <EncuestaModal idEncuesta={idEncuesta} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default EncuestMenuButton;
