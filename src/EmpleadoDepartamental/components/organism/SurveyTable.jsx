import SidebarActions from "../molecule/SidebarActions";
import TableHeader from "../atom/TableHeader";
import SurveyRow from "../molecule/SurveyRow";

const SurveyTable = ({ surveys, selectedSurvey, onSurveySelect, tab }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-200">
      <h2 className="text-lg font-medium text-gray-900">
        {tab === 'papelera' ? 'Encuestas eliminadas (Papelera)' : 'Encuestas del Departamento <Departamento>'}
      </h2>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <TableHeader>Seleccionar</TableHeader>
            <TableHeader>Nombre</TableHeader>
            <TableHeader>Número de respuestas</TableHeader>
            <TableHeader>Estado</TableHeader>
            <TableHeader>Fecha</TableHeader>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {surveys.map((survey, index) => (
            <SurveyRow 
              key={index} 
              survey={survey} 
              index={index}
              selectedSurvey={selectedSurvey}
              onSurveySelect={onSurveySelect}
              tab={tab}
            />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default SurveyTable;