import Header from "../organism/Header";
import DashboardCards from "../molecule/DashboardCards";
import DepartamentsList from "../organism/DepartamentsList";
import DepartmentFormOrganism from "../organism/DepartmentFormOrganism";
import React, { useState } from "react";

const DepartamentosDashboard = () => {

    //let alumnos = "Ninguno";
    let titulo = "Dashboard de Departamentos";


    const [nombre,setNombre] = useState("Victor");

    let departamentos = [
        "1",
        "2",
        "3",
        "4",
        "5"
    ]

    const listaDeDepartamentos = [
    {
      id: 1,
      nombreDepartamento: "24 March 2019",
      descripcionDepartamento: "Tono es un mamaguebo",
      numeroEncuestas: "100"
    },
    {
      id: 2,
      nombreDepartamento: "15 April 2019", 
      descripcionDepartamento: "Departamento de recursos humanos encargado de la gestión del personal",
      numeroEncuestas: "85"
    },
    {
      id: 3,
      nombreDepartamento: "02 May 2019",
      descripcionDepartamento: "Departamento de tecnología y sistemas de información",
      numeroEncuestas: "120"
    },
    {
      id: 4,
      nombreDepartamento: "18 June 2019",
      descripcionDepartamento: "Departamento de marketing y comunicaciones corporativas",
      numeroEncuestas: "95"
    },
    {
      id: 5,
      nombreDepartamento: "30 July 2019",
      descripcionDepartamento: "Departamento de finanzas y contabilidad general",
      numeroEncuestas: "110"
    }
  ];

    const cambiarNombre = (nombre) => {
      setNombre(nombre)
    }

  return (
    <div className="departamentos-dashboard">
      <Header />
      <div className="departamentos-dashboard__content">
        <div className="departamentos-dashboard__header">
          <h1 className="departamentos-dashboard__title">{titulo}</h1>
          <p className="departamentos-dashboard__description">
            Bienvenido al dashboard de departamentos. Aquí podrás gestionar los departamentos de la aplicación.  
          </p>
        </div>
        
        <div className="departamentos-dashboard__layout">
          <div className="departamentos-dashboard__sidebar-left">
            <DashboardCards 
              numeroDepartamentos={30} 
              numeroEncuestas={1000} 
              numeroEmpleados={1500} 
            />
          </div>
          
          <div className="departamentos-dashboard__main-content">
            <DepartamentsList listaDeDepartamentos={listaDeDepartamentos} />
          </div>
          
          <div className="departamentos-dashboard__sidebar-right">
            <DepartmentFormOrganism />
          </div>
        </div>
        
        
      </div>
    </div>
  );
}

export default DepartamentosDashboard;