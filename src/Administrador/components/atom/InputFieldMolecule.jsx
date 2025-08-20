import React from 'react';
import InputAtom from '../atom/InputAtom';
import LabelAtom from '../atom/LabelAtom';

const InputFieldMolecule = ({ label, name, type = "text", placeholder, value, onChange }) => {
  return (
    <div className="mb-6">
      <LabelAtom htmlFor={name}>{label}</LabelAtom>
      <InputAtom
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputFieldMolecule;