import { TextArea } from '../atom/TextArea';
import { Label } from '../atom/Label';

export const AnswerField = ({ 
  value,
  onChange,
  placeholder = "Escribe tu respuesta aquí...",
  error,
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      <Label htmlFor="respuesta" className="text-base font-semibold text-gray-900">
        Respuesta
      </Label>
      <TextArea
        id="respuesta"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
        disabled={disabled}
        rows={4}
        className="min-h-[100px]"
      />
      {error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};
