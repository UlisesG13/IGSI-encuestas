import { Button } from '../atom/Button';
import { Icon } from '../atom/Icon';

export const NavigationButtons = ({ 
  onPrevious,
  onNext,
  showPrevious = true,
  showNext = true,
  previousText = "Anterior pregunta",
  nextText = "Siguiente",
  disablePrevious = false,
  disableNext = false,
  className = '',
  ...props 
}) => {
  return (
    <div className={`flex justify-between items-center ${className}`} {...props}>
      {showPrevious ? (
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={disablePrevious}
          className="flex items-center gap-2"
        >
          <Icon name="chevronLeft" size="sm" />
          {previousText}
        </Button>
      ) : (
        <div></div>
      )}
      
      {showNext && (
        <Button
          variant="primary"
          onClick={onNext}
          disabled={disableNext}
          className="flex items-center gap-2"
        >
          {nextText}
          <Icon name="chevronRight" size="sm" />
        </Button>
      )}
    </div>
  );
};