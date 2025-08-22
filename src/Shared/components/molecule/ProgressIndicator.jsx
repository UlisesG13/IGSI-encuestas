
import { Badge } from '../atom/Badge';

export const ProgressIndicator = ({ 
  currentQuestion,
  totalQuestions,
  showProgress = true,
  className = '',
  ...props 
}) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className={`space-y-3 ${className}`} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="circle" size="lg">
            {currentQuestion}
          </Badge>
          <span className="text-sm text-gray-600">
            de {totalQuestions} preguntas
          </span>
        </div>
        <span className="text-sm font-medium text-gray-700">
          {Math.round(progressPercentage)}% completado
        </span>
      </div>
      
      {showProgress && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};