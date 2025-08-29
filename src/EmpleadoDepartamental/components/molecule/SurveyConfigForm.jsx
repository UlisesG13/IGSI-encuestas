import { useState } from "react";
import FormField from "../atom/FormField";

const SurveyConfigForm = ({ side, values, onChange }) => {
  // values: { titulo, descripcion, fechaInicio, fechaFin }
  // onChange: (field, value) => void
  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-md w-[350px]">
      {side === "left" ? (
        <>
          <FormField
            label="Título"
            placeholder="<Encuesta normal>"
            value={values.titulo}
            onChange={e => onChange("titulo", e.target.value)}
          />
          <FormField
            label="Descripción"
            placeholder="Escribe una breve descripción de la encuesta..."
            textarea
            value={values.descripcion}
            onChange={e => onChange("descripcion", e.target.value)}
          />
        </>
      ) : (
        <>
          <FormField
            label="Fecha de inicio"
            placeholder="<14/08/2025>"
            type="date"
            value={values.fechaInicio}
            onChange={e => onChange("fechaInicio", e.target.value)}
          />
          <FormField
            label="Fecha de cierre"
            placeholder="<15/08/2025>"
            type="date"
            value={values.fechaFin}
            onChange={e => onChange("fechaFin", e.target.value)}
          />
        </>
      )}
    </div>
  );
};

export default SurveyConfigForm;
