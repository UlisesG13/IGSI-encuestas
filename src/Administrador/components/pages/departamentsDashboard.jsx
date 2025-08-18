import React from "react";
import CloseSesionButton from "../atom/CloseSesionButton";


const DepartamentsDashboard = () => {
  return (
    <div className="departamentos-dashboard">
        <CloseSesionButton></CloseSesionButton>
      <h1>Dashboard de Departamentos</h1>
      <p>Bienvenido al dashboard de departamentos. Aquí podrás gestionar los departamentos de la aplicación.</p>
    </div>
  );
}

export default DepartamentsDashboard;