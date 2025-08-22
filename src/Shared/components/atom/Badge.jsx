export const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-purple-100 text-purple-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    circle: 'bg-pink-500 text-white'
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs min-w-[20px] h-5',
    md: 'px-2.5 py-1 text-sm min-w-[24px] h-6',
    lg: 'px-3 py-1.5 text-base min-w-[32px] h-8'
  };
  
  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};