const InputAtom = ({ type = "text", placeholder, value, onChange, name }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm transition-all duration-200 focus:outline-none focus:border-primary-600 focus:ring-3 focus:ring-primary-100 placeholder-gray-400 text-gray-700 bg-white"
    />
  );
};

export default InputAtom;