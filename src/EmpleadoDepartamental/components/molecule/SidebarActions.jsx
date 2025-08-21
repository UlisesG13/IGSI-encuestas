import SidebarActionButton from "../atom/SidebarActionButton";
import { Plus, Trash2, Edit, FileText } from 'lucide-react';

const SidebarActions = ({ selectedSurvey }) => {
    const hasSelection = selectedSurvey !== null;
  
    const actions = [
      {
        icon: Plus,
        title: "Nueva encuesta",
        subtitle: "",
        color: "blue",
        disabled: false,
        onClick: () => console.log("Nueva encuesta")
      },
      {
        icon: Trash2,
        title: "Eliminar Encuesta",
        subtitle: "(Todas encuestas habilitadas)",
        color: "red",
        disabled: !hasSelection,
        onClick: () => hasSelection && console.log("Eliminar encuesta", selectedSurvey)
      },
      {
        icon: Edit,
        title: "Editar Encuesta",
        subtitle: "(Recargar encuestas existente)",
        color: "green",
        disabled: !hasSelection,
        onClick: () => hasSelection && console.log("Editar encuesta", selectedSurvey)
      },
      {
        icon: FileText,
        title: "Generar reporte",
        subtitle: "(Buscar tablas y gráficas)",
        color: "orange",
        disabled: !hasSelection,
        onClick: () => hasSelection && console.log("Generar reporte", selectedSurvey)
      }
    ];
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