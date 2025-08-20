import Header from "../organism/Header";
import DashboardCards from "../molecule/DashboardCards";
import DepartamentsList from "../organism/DepartamentsList";
import DepartmentFormOrganism from "../organism/DepartmentFormOrganism";
import React, { useState } from "react";

const DepartamentosDashboard = () => {

    //let alumnos = "Ninguno";
    let titulo = "Dashboard de Departamentos";

    const listaDeDepartamentos = [
    {
      id: 1,
      nombreDepartamento: "24 March 2019",
      descripcionDepartamento: "Tono es un chupa guebo",
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


  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <div className="w-full max-w-full m-0 p-4 md:p-8 min-h-[calc(100vh-80px)]">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">{titulo}</h1>
          <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-6 md:mb-8">
            Bienvenido al dashboard de departamentos. Aquí podrás gestionar los departamentos de la aplicación.  
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_350px] gap-4 md:gap-8 items-start max-w-full">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 order-2 lg:order-1">
            <DashboardCards 
              numeroDepartamentos={30} 
              numeroEncuestas={1000} 
              numeroEmpleados={1500} 
            />
          </div>
          
          <div className="flex flex-col gap-6 md:gap-8 order-1 lg:order-2">
            <DepartamentsList listaDeDepartamentos={listaDeDepartamentos} />
          </div>
          
          <div className="flex flex-col gap-4 md:gap-6 order-3">
            <DepartmentFormOrganism />
          </div>
        </div>
        
        
      </div>
    </div>
  );
}

export default DepartamentosDashboard;