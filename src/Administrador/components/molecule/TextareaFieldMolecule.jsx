import LabelAtom from "../atom/LabelAtom";
import TextareaAtom from "../atom/TextArea";

const TextareaFieldMolecule = ({ label, name, placeholder, value, onChange, rows = 4 }) => {
  return (
    <div className="mb-6">
      <LabelAtom htmlFor={name}>{label}</LabelAtom>
      <TextareaAtom
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
      />
    </div>
  );
};

export default TextareaFieldMolecule;
