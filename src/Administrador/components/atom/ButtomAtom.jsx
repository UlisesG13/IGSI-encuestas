const ButtonAtom = ({ children, onClick, type = "button", variant = "primary" }) => {
  const baseClasses = "w-full py-3 px-6 rounded-md text-sm font-medium text-white transition-colors duration-200 focus:outline-none focus:ring-3 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 focus:ring-primary-500",
    secondary: "bg-gray-700 hover:bg-gray-800 focus:ring-gray-500"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default ButtonAtom;