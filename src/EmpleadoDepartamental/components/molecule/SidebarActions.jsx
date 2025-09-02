import SidebarActionButton from "../atom/SidebarActionButton";
import { Plus, Trash2, FileText, XCircle, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EncuestaModal from './EncuestaModal'; // <-- Asegúrate de tenerlo


const SidebarActions = ({ selectedSurvey, tab, surveys, onSoftDelete, onRestaurar, onDelete, onCambiarEstado }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const hasSelection = selectedSurvey !== null && surveys[selectedSurvey];
  const isDeshabilitada = hasSelection && (surveys[selectedSurvey].estado === 'deshabilitada');

  const handleVerEncuesta = () => {
    if (hasSelection) setShowModal(true);
  };

  const mainActions = [
    {
      icon: Plus,
      title: "Nueva encuesta",
      subtitle: "",
      color: "blue",
      disabled: false,
      onClick: () => navigate('/crearEncuestas')
    },
    {
      icon: FileText,
      title: "Ver Encuesta",
      color: "indigo",
      disabled: !hasSelection,
      onClick: handleVerEncuesta
    },
    {
      icon: XCircle,
      title: "Deshabilitar encuesta",
      color: "orange",
      disabled: !hasSelection || isDeshabilitada,
      onClick: () => hasSelection && onCambiarEstado(selectedSurvey, 'inactiva')
    },
    {
      icon: RefreshCcw,
      title: "Habilitar encuesta",
      color: "green",
      disabled: !hasSelection || !isDeshabilitada,
      onClick: () => hasSelection && isDeshabilitada && onCambiarEstado(selectedSurvey, 'activa')
    },
    {
      icon: Trash2,
      title: "Enviar a Papelera",
      color: "red",
      disabled: !hasSelection,
      onClick: () => hasSelection && onSoftDelete(selectedSurvey)
    }
    // 🔴 Eliminamos la opción de Editar Encuesta
  ];

  const trashActions = [
    {
      icon: RefreshCcw,
      title: "Restaurar encuesta",
      color: "blue",
      disabled: !hasSelection,
      onClick: () => hasSelection && onRestaurar(selectedSurvey)
    },
    {
      icon: Trash2,
      title: "Eliminar permanentemente",
      color: "red",
      disabled: !hasSelection,
      onClick: () => hasSelection && onDelete(selectedSurvey)
    }
  ];

  const actions = tab === 'activas' ? mainActions : trashActions;

  return (
    <div className="w-full md:w-64 space-y-4">
      {actions.map((action, index) => (
        <SidebarActionButton
          key={index}
          icon={action.icon}
          title={action.title}
          subtitle={action.subtitle}
          color={action.color}
          disabled={action.disabled}
          onClick={action.onClick}
        />
      ))}

      {showModal && (
        <EncuestaModal
          idEncuesta={surveys[selectedSurvey].idEncuesta}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default SidebarActions;
