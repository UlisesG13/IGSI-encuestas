import SidebarActionButton from "../atom/SidebarActionButton";
import { Plus, Trash2, Edit, FileText, XCircle, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SidebarActions = ({ selectedSurvey, tab, surveys, onSoftDelete, onRestaurar, onDelete, onCambiarEstado }) => {
  const navigate = useNavigate();
  const hasSelection = selectedSurvey !== null && surveys[selectedSurvey];
  const isDeshabilitada = hasSelection && (surveys[selectedSurvey].estado === 'deshabilitada');

  // Acciones para la pestaña principal
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
    },
    {
      icon: Edit,
      title: "Editar Encuesta",
      color: "green",
      disabled: !hasSelection,
      onClick: () => hasSelection && navigate(`/editarEncuesta/${surveys[selectedSurvey].idEncuesta}`)
    }
  ];

  // Acciones para la papelera
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
    </div>
  );
}

export default SidebarActions;