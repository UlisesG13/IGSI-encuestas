import { useState, useRef, useEffect } from 'react';

const EncuestMenuButton = ({ idEncuesta }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Función para manejar la edición
  const handleEdit = (id) => {
    alert(`Encuestas: ${id}`);
    setIsOpen(false);
  };

  // Función para manejar la eliminación
  const handleDelete = (id) => {
    alert(`Eliminado: ${id}`);
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
    <div className="departament-menu-button" ref={menuRef}>
      {/* Botón Menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="departament-menu-button__trigger"
      >
        Menu
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="departament-menu-button__dropdown">
          <div className="py-1">
            <button
              onClick={() => handleEdit(idEncuesta)}
              className="departament-menu-button__item"
            >
              Ver
            </button>
            <hr className="departament-menu-button__divider" />
            <button
              onClick={() => handleDelete(idEncuesta)}
              className="departament-menu-button__item"
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