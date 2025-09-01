import { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom'; // <-- Agrega esto
import AlertContainer from "../../../Shared/components/molecule/AlertContainer";

const DepartamentMenuButton = ({ idDepartamento, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const menuRef = useRef(null);
  const buttonRef = useRef(null); // <-- Nuevo ref para el botón
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  // Mostrar alerta y opcionalmente ejecutar un callback después de ocultarla
  const showAlert = (type, message, cb) => {
    setAlert({ show: true, type, message });
    setTimeout(() => {
      setAlert({ show: false, type: '', message: '' });
      if (cb) cb();
    }, 2000);
  };

  // Función para manejar la edición con formulario
  const handleEdit = () => {
    setIsEditing(true);
    setIsOpen(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !descripcion.trim()) {
      showAlert('error', 'Por favor, completa todos los campos obligatorios');
      return;
    }
    try {
      if (onEdit) {
        await onEdit(idDepartamento, { nombre, descripcion });
        showAlert('success', 'Departamento editado correctamente', () => {
          setIsEditing(false);
          setNombre('');
          setDescripcion('');
        });
      }
    } catch (error) {
      showAlert('error', 'Error al editar el departamento');
    }
  };

  // Función para manejar la eliminación (hard)
  const handleDelete = async (id) => {
    try {
      if (onDelete) {
        const confirmDelete = confirm('¿Eliminar permanentemente este departamento?');
        if (!confirmDelete) return;
        await onDelete(id);
        showAlert('success', 'Departamento eliminado correctamente');
      }
      setIsOpen(false);
    } catch (error) {
      showAlert('error', 'Error al eliminar el departamento');
    }
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

  // Cuando se abre el menú, calcula la posición absoluta
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen]);

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNombre('');
    setDescripcion('');
  };

  return (
    <>
      <AlertContainer
        show={alert.show && !isEditing}
        type={alert.type}
        message={alert.message}
      />
      <div className="relative inline-block" ref={menuRef}>
        {/* Botón Menu */}
        <button
          ref={buttonRef} // <-- Asigna el ref aquí
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 border-2 border-primary-600 text-primary-600 rounded-lg bg-transparent cursor-pointer transition-all duration-200 ease-in-out hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Menu
        </button>

        {/* Menú desplegable en portal */}
        {isOpen &&
          ReactDOM.createPortal(
            <div
              className="absolute mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-large z-[9999]"
              style={{
                top: menuPosition.top,
                left: menuPosition.left,
                position: "absolute",
                zIndex: 9999,
              }}
            >
              <div className="py-1">
                <button
                  onClick={handleEdit}
                  className="w-full text-left px-4 py-2 text-gray-700 bg-transparent border-none cursor-pointer transition-colors duration-150 ease-in-out hover:bg-gray-100 focus:outline-none"
                >
                  Editar
                </button>
                <hr className="border-0 border-t border-gray-200 m-0" />
                <button
                  onClick={() => handleDelete(idDepartamento)}
                  className="w-full text-left px-4 py-2 text-gray-700 bg-transparent border-none cursor-pointer transition-colors duration-150 ease-in-out hover:bg-gray-100 focus:outline-none"
                >
                  Eliminar
                </button>
              </div>
            </div>,
            document.body // <-- Renderiza en el body
          )
        }
      </div>

      {/* Modal de edición */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
            <div className="p-6">
              {/* Alertas dentro del modal */}
              <AlertContainer
                show={alert.show && isEditing}
                type={alert.type}
                message={alert.message}
              />
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Editar Departamento</h3>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nuevo nombre *
                  </label>
                  <input
                    type="text"
                    placeholder="Nuevo nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nueva descripción *
                  </label>
                  <input
                    type="text"
                    placeholder="Nueva descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors duration-200"
                    disabled={alert.show && alert.type === 'success'}
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-200"
                    disabled={alert.show && alert.type === 'success'}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DepartamentMenuButton;