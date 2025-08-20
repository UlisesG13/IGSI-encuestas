import React from "react";     
import Header from "../organism/Header"; 
import DashboardCards from "../molecule/DashboardCards";
import EncuestList from "../organism/EncuestList";

const EncuestDashboards = () => {
    const titulo = "Dashboard de Encuestas";

    return (
        <div className="encuest-dashboards">
            <Header />
            <div className="encuest-dashboards__content">
                <div className="encuest-dashboards__header">
                    <h1 className="encuest-dashboards__title">{titulo}</h1>
                    <p className="encuest-dashboards__description">
                        Bienvenido al dashboard de encuestas. Aquí podrás gestionar todas las encuestas de la aplicación.
                    </p>
                </div>

                <div className="encuest-dashboards__layout">
                    <div className="encuest-dashboards__sidebar-left">
                        <DashboardCards 
                          numeroDepartamentos={30} 
                          numeroEncuestas={1000} 
                          numeroEmpleados={1500} 
                        />
                    </div>

                    <div className="encuest-dashboards__main-content">
                        <EncuestList></EncuestList>
                    </div>

                    <div className="encuest-dashboards__sidebar-right">
                        {/* Aquí puedes poner formularios o filtros */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EncuestDashboards;
