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
  <div className={`bg-white border-b border-orange-200 px-6 py-4 ${className}`} {...props}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-white border-b">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-600  bg-white border-b">{subtitle}</p>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {showSaveButton && (
            <button
              onClick={onSave}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-700 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200"
            >
              <Icon name="info" size="sm" />
              Guardar progreso
            </button>
          )}
          
          {showExitButton && (
            <button
              onClick={onExit}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-700 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200"
            >
              Salir
            </button>
          )}
        </div>
      </div>
    </div>
  );
};