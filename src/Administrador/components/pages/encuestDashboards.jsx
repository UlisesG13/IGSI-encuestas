import React, { useEffect, useMemo, useState } from "react";     
import Header from "../organism/Header"; 
import DashboardCards from "../molecule/DashboardCards";
import EncuestList from "../organism/EncuestList";
import { getEncuestas, softDeleteEncuesta, restaurarEncuesta, deleteEncuesta, cambiarEstadoEncuesta, getEstadisticasEncuestas } from "../../services/encuestasService";
import { getEstadisticasUsuarios } from "../../../Shared/services/authService";
import { getEstadisticasDepartamentos } from "../../services/departamentosService";

const EncuestDashboards = () => {
    const titulo = "Dashboard de Encuestas";
    const [encuestas, setEncuestas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showDeleted, setShowDeleted] = useState(false);
    const [estadisticas, setEstadisticas] = useState({
      departamentos: 0,
      encuestas: 0,
      empleados: 0
    });

    const fetchEncuestas = async () => {
      setLoading(true);
      setError("");
      try {
        console.log(`Fetching encuestas, showDeleted: ${showDeleted}`);
        const data = await getEncuestas({ showDeleted });
        console.log(`Dashboard received ${data.length} encuestas`);
        setEncuestas(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Error fetching encuestas:", e);
        setError("No se pudieron cargar las encuestas");
      } finally {
        setLoading(false);
      }
    };

    const fetchEstadisticas = async () => {
      try {
        const [statsDepartamentos, statsUsuarios, statsEncuestas] = await Promise.all([
          getEstadisticasDepartamentos(),
          getEstadisticasUsuarios(),
          getEstadisticasEncuestas()
        ]);
        
        setEstadisticas({
          departamentos: statsDepartamentos.totalDepartamentos,
          empleados: statsUsuarios.totalUsuarios,
          encuestas: statsEncuestas.totalEncuestas
        });
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      }
    };

    useEffect(() => {
      fetchEncuestas();
      fetchEstadisticas();
    }, [showDeleted]);

    const listaDeEncuestas = useMemo(() => {
      return encuestas.map(e => ({
        id: e.idEncuesta,
        nombre: e.titulo,
        fecha: `${e.fechaInicio} - ${e.fechaFin}`,
        respuestas: e.numeroRespuestas || 0,
        estado: e.estado,
        deleted: e.deleted,
      }));
    }, [encuestas]);

    const handleSoftDelete = async (idEncuesta) => {
      try {
        const result = await softDeleteEncuesta(idEncuesta);
        alert(result.message || "Encuesta deshabilitada y eliminada exitosamente");
        await fetchEncuestas();
        await fetchEstadisticas();
      } catch (error) {
        alert(error.message);
      }
    };

    const handleCambiarEstado = async (idEncuesta, nuevoEstado) => {
      try {
        await cambiarEstadoEncuesta(idEncuesta, nuevoEstado);
        await fetchEncuestas();
        await fetchEstadisticas();
      } catch (error) {
        alert(error.message);
      }
    };

    const handleRestaurar = async (idEncuesta) => {
      try {
        const result = await restaurarEncuesta(idEncuesta);
        alert(result.message || "Encuesta restaurada y mantenida deshabilitada");
        await fetchEncuestas();
        await fetchEstadisticas();
      } catch (error) {
        alert(error.message);
      }
    };

    const handleDelete = async (idEncuesta) => {
      try {
        const confirmDelete = confirm('¿Eliminar permanentemente esta encuesta?');
        if (!confirmDelete) return;
        await deleteEncuesta(idEncuesta);
        await fetchEncuestas();
        await fetchEstadisticas();
      } catch (error) {
        alert(error.message);
      }
    };

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
                          numeroDepartamentos={estadisticas.departamentos} 
                          numeroEncuestas={estadisticas.encuestas} 
                          numeroEmpleados={estadisticas.empleados} 
                        />
                    </div>
                    
                    {/* Contenido principal con lista de encuestas */}
                    <div className="flex flex-col gap-6 md:gap-8 order-1 lg:order-2">
                                                 <div className="flex justify-between items-center mb-4">
                           <div className="flex items-center gap-4">
                             <span className="text-sm text-gray-600">
                               {showDeleted ? 'Papelera' : 'Encuestas Activas'}
                             </span>
                              <button
                                onClick={() => setShowDeleted(!showDeleted)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                  showDeleted 
                                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {showDeleted ? 'Ver Activas' : 'Ver Papelera'}
                              </button>
                           </div>
                         </div>
                        <EncuestList 
                          encuestas={listaDeEncuestas}
                          onSoftDelete={handleSoftDelete}
                          onRestaurar={handleRestaurar}
                          onDelete={handleDelete}
                          onCambiarEstado={handleCambiarEstado}
                          loading={loading}
                          error={error}
                          showDeleted={showDeleted}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EncuestDashboards;
