const TextareaAtom = ({ placeholder, value, onChange, name, rows = 4 }) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm font-inherit resize-vertical min-h-24 transition-all duration-200 focus:outline-none focus:border-primary-600 focus:ring-3 focus:ring-primary-100 placeholder-gray-400 text-gray-700 bg-white"
    />
  );
};

export default TextareaAtom;