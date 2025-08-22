import { Label } from '../atom/Label';
import { Badge } from '../atom/Badge';

export const QuestionField = ({ 
  question,
  questionNumber,
  className = '',
  ...props 
}) => {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      <div className="flex items-center gap-3">
        <Badge variant="circle" size="md">
          {questionNumber}
        </Badge>
        <Label className="text-base font-semibold text-gray-900">
          Pregunta
        </Label>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg border">
        <p className="text-gray-800 leading-relaxed">
          {question || 'Cargando pregunta...'}
        </p>
      </div>
    </div>
  );
};