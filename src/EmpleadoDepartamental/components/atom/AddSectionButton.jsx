const AddSectionButton = ({ small, onClick }) => {
  if (small) {
    return (
      <button
        onClick={onClick}
        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full shadow-md text-lg font-bold"
      >
        +
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="mt-auto w-full border rounded-full py-2 text-gray-600 hover:bg-gray-100"
    >
      Agregar sección
    </button>
  );
};

export default AddSectionButton;
