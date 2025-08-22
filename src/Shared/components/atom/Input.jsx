export const Input = ({ 
  type = 'text', 
  placeholder,
  value,
  onChange,
  disabled = false,
  error = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const normalStyles = 'border-gray-300 focus:ring-purple-500 focus:border-purple-500';
  const errorStyles = 'border-red-300 focus:ring-red-500 focus:border-red-500';
  const disabledStyles = disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white';
  
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`${baseStyles} ${error ? errorStyles : normalStyles} ${disabledStyles} ${className}`}
      {...props}
    />
  );
};