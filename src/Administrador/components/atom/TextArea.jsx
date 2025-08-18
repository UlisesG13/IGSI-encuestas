const TextareaAtom = ({ placeholder, value, onChange, name, rows = 4 }) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-700 bg-white resize-none"
    />
  );
};

export default TextareaAtom;