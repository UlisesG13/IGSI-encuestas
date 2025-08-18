import React from "react";
import DepartamentMenuButton from "../atom/DepartamentMenuButton";

const DepartamentCard = ({ 
  nombreDepartamento, 
  descripcionDepartamento, 
  numeroEncuestas, 
  idDepartamento 
}) => {
  return (
    <div className="departament-card">
      {/* Header con títulos */}
      <div className="departament-card__header">
        <div>
          <h3 className="departament-card__header-title">
            DEPARTAMENTO
          </h3>
        </div>
        <div>
          <h3 className="departament-card__header-title">
            Descripción
          </h3>
        </div>
        <div>
          <h3 className="departament-card__header-title">
            Número de encuestas hechas
          </h3>
        </div>
        <div>
          <h3 className="departament-card__header-title">
            Interacción
          </h3>
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="departament-card__content">
        <div>
          <p className="departament-card__field">
            {nombreDepartamento}
          </p>
        </div>
        <div>
          <p className="departament-card__field">
            {descripcionDepartamento}
          </p>
        </div>
        <div>
          <p className="departament-card__field departament-card__field--value">
            {numeroEncuestas}
          </p>
        </div>
        <div className="departament-card__actions">
          <DepartamentMenuButton idDepartamento={idDepartamento} />
        </div>
      </div>
    </div>
  );
};

export default DepartamentCard;