import { SidebarButton } from "./SidebarButton";

export const SidebarSection = ({ 
  title,
  buttons = [],
  activeButton,
  onButtonClick,
  className = '',
  ...props 
}) => {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {title && (
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-4">
          {title}
        </h3>
      )}
      <nav className="space-y-1">
        {buttons.map((button, index) => (
          <SidebarButton
            key={button.id || index}
            icon={button.icon}
            text={button.text}
            isActive={activeButton === button.id}
            onClick={() => onButtonClick(button.id)}
          />
        ))}
      </nav>
    </div>
  );
};