import React from "react";     
import Header from "../organism/Header"; 
import DashboardCards from "../molecule/DashboardCards";
import EncuestList from "../organism/EncuestList";

const EncuestDashboards = () => {
    const titulo = "Dashboard de Encuestas";

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header />
            <div className="w-full max-w-full m-0 p-4 md:p-8 min-h-[calc(100vh-80px)]">
                <div className="mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">{titulo}</h1>
                    <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-6 md:mb-8">
                        Bienvenido al dashboard de encuestas. Aquí podrás gestionar todas las encuestas de la aplicación.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 md:gap-8 items-start max-w-full">
                    {/* Sidebar izquierdo con tarjetas de estadísticas */}
                    <div className="flex flex-col gap-4 md:gap-6 order-2 lg:order-1">
                        <DashboardCards 
                          numeroDepartamentos={24} 
                          numeroEncuestas={1000} 
                          numeroEmpleados={1500} 
                        />
                    </div>
                    
                    {/* Contenido principal con lista de encuestas */}
                    <div className="flex flex-col gap-6 md:gap-8 order-1 lg:order-2">
                        <EncuestList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EncuestDashboards;
