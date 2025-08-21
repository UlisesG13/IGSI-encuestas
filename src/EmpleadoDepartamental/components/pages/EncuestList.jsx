import Header from "../organism/Header";
import { useState } from "react";
import SidebarActions from "../molecule/SidebarActions";
import SurveyTable from "../organism/SurveyTable";

const EncuestList = () => {
    const [selectedSurvey, setSelectedSurvey] = useState(null);
  
    // Datos de ejemplo
    const surveys = [
      {
        nombre: "Encuesta 1",
        numeroRespuestas: "100#",
        estado: "Habilitada",
        fecha: "13/08/2025"
      },
      {
        nombre: "Encuesta 2",
        numeroRespuestas: "100#",
        estado: "Habilitada",
        fecha: "13/08/2025"
      },
      {
        nombre: "Encuesta 3",
        numeroRespuestas: "100#",
        estado: "Habilitada",
        fecha: "13/08/2025"
      },
      {
        nombre: "Encuesta 4",
        numeroRespuestas: "100#",
        estado: "Habilitada",
        fecha: "13/08/2025"
      }
    ];
  
    const handleSurveySelect = (index) => {
      // Si se selecciona la misma encuesta, deseleccionar
      setSelectedSurvey(selectedSurvey === index ? null : index);
    };
  
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <Header></Header>

        <div className="w-full max-w-full m-0 p-4 md:p-8 min-h-[calc(100vh-80px)]">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">Encuestas</h1>
            {selectedSurvey !== null && (
              <p className="text-sm text-gray-600">
                Encuesta seleccionada: {surveys[selectedSurvey].nombre}
              </p>
            )}
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar con acciones */}
            <SidebarActions selectedSurvey={selectedSurvey} />
            
            {/* Tabla de encuestas */}
            <div className="flex-1">
              <SurveyTable 
                surveys={surveys} 
                selectedSurvey={selectedSurvey}
                onSurveySelect={handleSurveySelect}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

export default EncuestList; 