import Header from "../organism/Header";
import DashboardCards from "../molecule/DashboardCards";
import DepartamentsList from "../organism/DepartamentsList";
import DepartmentFormOrganism from "../organism/DepartmentFormOrganism";
import React, { useEffect, useMemo, useState } from "react";
import {
  getDepartamentos,
  createDepartamento,
  updateDepartamento,
  softDeleteDepartamento,
  deleteDepartamento,
  getEstadisticasDepartamentos,
} from "../../services/departamentosService";
import { getEstadisticasUsuarios } from "../../../Shared/services/authService";
import { getEstadisticasEncuestas } from "../../services/encuestasService";

const DepartamentosDashboard = () => {

    let titulo = "Dashboard de Departamentos";
    const [departamentos, setDepartamentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [estadisticas, setEstadisticas] = useState({
      departamentos: 0,
      encuestas: 0,
      empleados: 0
    });

    const fetchDepartamentos = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getDepartamentos();
        setDepartamentos(Array.isArray(data) ? data : []);
      } catch (e) {
        setError("No se pudieron cargar los departamentos");
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
      fetchDepartamentos();
      fetchEstadisticas();
    }, []);

    const listaDeDepartamentos = useMemo(() => {
      return departamentos.map((d) => ({
        id: d.idDepartamento,
        nombreDepartamento: d.nombre,
        descripcionDepartamento: d.descripcion,
        numeroEncuestas: d.numeroEncuestas ?? 0,
      }));
    }, [departamentos]);

    const handleCreate = async ({ nombre, descripcion }) => {
      await createDepartamento({ nombre, descripcion });
      await fetchDepartamentos();
      await fetchEstadisticas();
    };

    const handleEdit = async (idDepartamento, { nombre, descripcion }) => {
      await updateDepartamento(idDepartamento, { nombre, descripcion });
      await fetchDepartamentos();
      await fetchEstadisticas();
    };

    const handleSoftDelete = async (idDepartamento) => {
      try {
        await softDeleteDepartamento(idDepartamento);
        await fetchDepartamentos();
        await fetchEstadisticas();
      } catch (error) {
        alert(error.message);
      }
    };

    const handleHardDelete = async (idDepartamento) => {
      try {
        await deleteDepartamento(idDepartamento);
        await fetchDepartamentos();
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
            Bienvenido al dashboard de departamentos. Aquí podrás gestionar los departamentos de la aplicación.  
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_350px] gap-4 md:gap-8 items-start max-w-full">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 order-2 lg:order-1">
            <DashboardCards 
              numeroDepartamentos={estadisticas.departamentos} 
              numeroEncuestas={estadisticas.encuestas} 
              numeroEmpleados={estadisticas.empleados} 
            />
          </div>
          
          <div className="flex flex-col gap-6 md:gap-8 order-1 lg:order-2">
            <DepartamentsList 
              listaDeDepartamentos={listaDeDepartamentos} 
              onEdit={handleEdit}
              onSoftDelete={handleSoftDelete}
              onDelete={handleHardDelete}
              loading={loading}
              error={error}
            />
          </div>
          
          <div className="flex flex-col gap-4 md:gap-6 order-3">
            <DepartmentFormOrganism onCreate={handleCreate} />
          </div>
        </div>
        
        
      </div>
    </div>
  );
}

export default DepartamentosDashboard;