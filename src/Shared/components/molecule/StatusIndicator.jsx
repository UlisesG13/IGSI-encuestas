import { Badge } from '../atom/Badge';

export const StatusIndicator = ({ 
  status = 'draft',
  text,
  className = '',
  ...props 
}) => {
  const statusConfig = {
    draft: {
      variant: 'default',
      text: text || 'Borrador'
    },
    completed: {
      variant: 'success',
      text: text || 'Completado'
    },
    pending: {
      variant: 'warning',
      text: text || 'Pendiente'
    },
    error: {
      variant: 'error',
      text: text || 'Error'
    }
  };
  
  const config = statusConfig[status] || statusConfig.draft;
  
  return (
    <Badge 
      variant={config.variant}
      size="sm"
      className={className}
      {...props}
    >
      {config.text}
    </Badge>
  );
};