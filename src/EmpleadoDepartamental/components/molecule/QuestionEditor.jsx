const QuestionEditor = ({ type }) => {
  switch (type) {
    case "open":
      return (
        <textarea
          placeholder="Respuesta abierta"
          className="w-full border rounded-lg p-3 mt-3 outline-none"
          rows={4}
        />
      );

    case "multiple":
      return (
        <div className="mt-3 space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Opción 1
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Opción 2
          </label>
          <button className="text-blue-500 text-sm mt-1">+ Agregar opción</button>
        </div>
      );

    case "checklist":
      return (
        <div className="mt-3 space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Opción 1
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Opción 2
          </label>
          <button className="text-blue-500 text-sm mt-1">+ Agregar opción</button>
        </div>
      );

    case "likert":
      return (
        <div className="mt-3 flex gap-2">
          {[1, 2, 3, 4, 5].map((val) => (
            <label key={val} className="flex flex-col items-center">
              <input type="radio" name="likert" />
              <span>{val}</span>
            </label>
          ))}
        </div>
      );

    case "boolean":
      return (
        <div className="mt-3 flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="boolean" disabled /> Sí
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="boolean" disabled /> No
          </label>
        </div>
      );

    default:
      return <p className="text-gray-500">Selecciona un tipo de pregunta</p>;
  }
};

export default QuestionEditor;
