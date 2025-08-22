import TableCell from "../atom/TableCell";
import StatusBadge from "../atom/StatusBadge";
import RadioCheckbox from "../atom/RadioCheckbox";

const SurveyRow = ({ survey, index, selectedSurvey, onSurveySelect }) => {
    const isSelected = selectedSurvey === index;
  
    const handleRowClick = () => {
      onSurveySelect(index);
    };
  
    return (
      <tr 
        className={`transition-colors duration-150 cursor-pointer ${
          isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
        }`}
        onClick={handleRowClick}
      >
        <TableCell className="text-center">
          <RadioCheckbox
            checked={isSelected}
            onChange={() => {}} // El onChange se maneja en el click de la fila
            id={`survey-${index}`}
          />
        </TableCell>
        <TableCell className="font-medium">{survey.nombre}</TableCell>
        <TableCell className="text-center">{survey.numeroRespuestas}</TableCell>
        <TableCell>
          <StatusBadge status={survey.estado} />
        </TableCell>
        <TableCell>{survey.fecha}</TableCell>
      </tr>
    );
  };
  
export default SurveyRow;