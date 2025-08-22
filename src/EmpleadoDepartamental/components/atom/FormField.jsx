const FormField = ({ label, placeholder, type = "text", textarea }) => {
  return (
    <div className="mb-4">
      <label className="block font-medium text-gray-800 mb-1">{label}</label>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          className="w-full border-b border-black bg-transparent outline-none resize-none"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full border-b border-black bg-transparent outline-none"
        />
      )}
    </div>
  );
};

export default FormField;
