import { Icon } from '../atom/Icon';

export const QuestionnaireHeader = ({ 
  title = "Cuestionario",
  subtitle,
  onSave,
  onExit,
  showSaveButton = true,
  showExitButton = true,
  className = '',
  ...props 
}) => {
  return (
    <div className={`bg-white border-b border-gray-200 px-6 py-4 ${className}`} {...props}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {showSaveButton && (
            <button
              onClick={onSave}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200"
            >
              <Icon name="info" size="sm" />
              Guardar progreso
            </button>
          )}
          
          {showExitButton && (
            <button
              onClick={onExit}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Salir
            </button>
          )}
        </div>
      </div>
    </div>
  );
};