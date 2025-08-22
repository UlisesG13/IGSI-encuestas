import FormField from "../atom/FormField";

const SurveyConfigForm  = ({ side }) => {
  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-md w-[350px]">
      {side === "left" ? (
        <>
          <FormField label="Título" placeholder="<Encuesta normal>" />
          <FormField label="Descripción" placeholder="Escribe una breve descripción de la encuesta..." textarea />
        </>
      ) : (
        <>
          <FormField label="Fecha de inicio" placeholder="<14/08/2025>" type="date" />
          <FormField label="Fecha de cierre" placeholder="<15/08/2025>" type="date" />
        </>
      )}
    </div>
  );
};

export default SurveyConfigForm;
