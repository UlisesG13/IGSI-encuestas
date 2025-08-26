import { Icon } from '../atom/Icon';

export const SidebarButton = ({ 
  icon,
  text,
  isActive = false,
  onClick,
  className = '',
  ...props 
}) => {
  const baseStyles = 'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-left';
  const activeStyles = isActive 
    ? 'bg-orange-600 text-white' 
    : 'text-orange-700 hover:bg-orange-100';
  
  return (
    <button
      className={`${baseStyles} ${activeStyles} ${className}`}
      onClick={onClick}
      {...props}
    >
      <Icon 
        name={icon} 
        size="md" 
        color={isActive ? 'white' : 'currentColor'} 
      />
      <span className="font-medium">{text}</span>
    </button>
  );
};