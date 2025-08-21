import Header from "../organism/Header";
import DashboardCards from "../molecule/DashboardCards";
import EmployersList from "../organism/EmployersList";
import React, { useState } from "react";
import EmployersFormOrganism from "../organism/EmployersFormOrganims";

const EmployersDashboard = () => {

    const titulo = "Dashboard de Empleados";


    const listaDeEmpleados = [
    {
      id: 1,
      nombre: "Juan Perez",
      correo: "juanperez@gmail.com",
      idDepartamento: "1",
    },
    {
      id: 2,
      nombre: "Maria Gomez",
      correo: "mariagomez@gmail.com",
      idDepartamento: "2",
    },
    {
      id: 3,
      nombre: "Pedro Rodriguez",
      correo: "pedrorodriguez@gmail.com",
      idDepartamento: "3",
    },
    {
      id: 4,
      nombre: "Ana Martinez",
      correo: "anamartinez@gmail.com",
      idDepartamento: "4",
    },
    {
      id: 5,
      nombre: "Luis Garcia",
      correo: "luisgarcia@gmail.com",
      idDepartamento: "5",
    }
  ];


  return (
    <div className="min-h-screen bg-gray-50 font-sans">
    <Header />
    <div className="w-full max-w-full m-0 p-4 md:p-8 min-h-[calc(100vh-80px)]">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">{titulo}</h1>
        <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-6 md:mb-8">
          Bienvenido al dashboard de empleados. Aquí podrás gestionar los empleados de la aplicación.  
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
          <EmployersList listaDeEmpleados={listaDeEmpleados} />
        </div>
        
        <div className="flex flex-col gap-4 md:gap-6 order-3">
          <EmployersFormOrganism />
        </div>
      </div>
      
      
    </div>
  </div>
  );
}

export default EmployersDashboard;