
const QuestionTypeSelect = ({ value, onChange }) => {
  return (
    <select
      className="w-full border rounded-lg p-2 focus:outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="open">📄 Respuesta abierta</option>
      <option value="multiple">🔘 Opción múltiple</option>
      <option value="checklist">☑️ Checkbox</option>
      <option value="likert">📊 Escala Likert</option>
      <option value="boolean">✔️ Verdadero/Falso (Sí o No)</option>
    </select>
  );
};

export default QuestionTypeSelect;
