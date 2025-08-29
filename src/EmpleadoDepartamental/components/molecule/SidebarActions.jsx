import SidebarActionButton from "../atom/SidebarActionButton";
import { Plus, Trash2, Edit, FileText, XCircle, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SidebarActions = ({ selectedSurvey, tab, surveys, onSoftDelete, onDeshabilitar, onHabilitar, onRestaurar, onDelete }) => {
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
      subtitle: "(No visible para alumnos)",
      color: "orange",
      disabled: !hasSelection || isDeshabilitada,
      onClick: () => hasSelection && onDeshabilitar(selectedSurvey)
    },
    // Botón para habilitar encuesta si está deshabilitada
    {
      icon: RefreshCcw,
      title: "Habilitar encuesta",
      subtitle: "(Volver a activa)",
      color: "green",
      disabled: !hasSelection || !isDeshabilitada,
      onClick: () => hasSelection && isDeshabilitada && onHabilitar(selectedSurvey)
    },
    {
      icon: Trash2,
      title: "Eliminar (Papelera)",
      subtitle: "(Soft delete)",
      color: "red",
      disabled: !hasSelection,
      onClick: () => hasSelection && onSoftDelete(selectedSurvey)
    },
    {
      icon: Edit,
      title: "Editar Encuesta",
      subtitle: "(Recargar encuesta existente)",
      color: "green",
      disabled: !hasSelection,
      onClick: () => hasSelection && navigate(`/editarEncuesta/${surveys[selectedSurvey].idEncuesta}`)
    },
    {
      icon: FileText,
      title: "Generar reporte",
      subtitle: "(Buscar tablas y gráficas)",
      color: "orange",
      disabled: !hasSelection,
      onClick: () => hasSelection && console.log("Generar reporte", surveys[selectedSurvey].idEncuesta)
    }
  ];

  // Acciones para la papelera
  const trashActions = [
    {
      icon: RefreshCcw,
      title: "Restaurar encuesta",
      subtitle: "(Volver a lista principal)",
      color: "blue",
      disabled: !hasSelection,
      onClick: () => hasSelection && onRestaurar(selectedSurvey)
    },
    {
      icon: Trash2,
      title: "Eliminar permanentemente",
      subtitle: "(Borrado definitivo)",
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