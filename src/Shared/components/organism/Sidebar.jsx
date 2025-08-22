import { SidebarSection } from '../molecule/SidebarSection';
import { StatusIndicator } from '../molecule/StatusIndicator';
import { Icon } from '../atom/Icon';


export const Sidebar = ({ 
  sections = [],
  activeSection,
  onSectionChange,
  userInfo,
  className = '',
  ...props 
}) => {
  const defaultSections = [
    {
      id: 'personal',
      icon: 'user',
      text: 'Datos personales',
      status: 'completed'
    },
    {
      id: 'academic',
      icon: 'academic',
      text: 'Datos escolares',
      status: 'draft'
    },
    {
      id: 'additional',
      icon: 'info',
      text: 'Datos informales',
      status: 'pending'
    }
  ];

  const sidebarSections = sections.length > 0 ? sections : defaultSections;

  return (
    <div className={`w-64 bg-white border-r border-gray-200 h-full flex flex-col ${className}`} {...props}>
      {/* Header del sidebar */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <Icon name="user" size="md" color="white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">
              {userInfo?.name || 'Usuario'}
            </h2>
            <p className="text-sm text-gray-500">
              {userInfo?.role || 'Cuestionario'}
            </p>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <div className="flex-1 p-4">
        <SidebarSection
          title="Secciones"
          buttons={sidebarSections.map(section => ({
            ...section,
            text: (
              <div className="flex items-center justify-between w-full">
                <span>{section.text}</span>
                <StatusIndicator status={section.status} />
              </div>
            )
          }))}
          activeButton={activeSection}
          onButtonClick={onSectionChange}
        />
      </div>

      {/* Footer del sidebar */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          Guarda tu progreso automáticamente
        </div>
      </div>
    </div>
  );
}