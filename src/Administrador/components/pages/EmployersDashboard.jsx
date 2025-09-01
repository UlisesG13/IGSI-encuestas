import React, { useEffect, useMemo, useState } from "react";
import Header from "../organism/Header";
import AlertContainer from "../../../Shared/components/molecule/AlertContainer";
import DashboardCards from "../molecule/DashboardCards";
import EmployersList from "../organism/EmployersList";
import EmployersFormOrganism from "../organism/EmployersFormOrganims";
import { 
  getUsuarios, 
  crearUsuario, 
  actualizarUsuario, 
  eliminarUsuario, 
  getEstadisticasUsuarios 
} from "../../../Shared/services/authService";
import { 
  getDepartamentos, 
  getEstadisticasDepartamentos 
} from "../../services/departamentosService";
import { getTodasLasEncuestas } from "../../services/encuestasService";

const EmployersDashboard = () => {

  const titulo = "Dashboard de Empleados";

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [departamentos, setDepartamentos] = useState([]);
  const [estadisticas, setEstadisticas] = useState({
    departamentos: 0,
    encuestas: 0,
    empleados: 0
  });

  // 🔹 Fetch de usuarios
  const fetchUsuarios = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getUsuarios();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("No se pudieron cargar los usuarios");
      window.showAlert("No se pudieron cargar los usuarios", "error");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch de departamentos
  const fetchDepartamentos = async () => {
    try {
      const data = await getDepartamentos();
      setDepartamentos(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error cargando departamentos:", e);
    }
  };

  // 🔹 Fetch de estadísticas globales
  const fetchEstadisticas = async () => {
    try {
      const [statsDepartamentos, statsUsuarios, encuestas] = await Promise.all([
        getEstadisticasDepartamentos(),
        getEstadisticasUsuarios(),
        getTodasLasEncuestas().catch(() => []) // fallback si falla
      ]);

      setEstadisticas(prev => ({
        ...prev,
        departamentos: statsDepartamentos?.totalDepartamentos || 0,
        empleados: statsUsuarios?.totalUsuarios || 0,
        encuestas: Array.isArray(encuestas) ? encuestas.length : 0
      }));
    } catch (error) {
      setEstadisticas(prev => ({
        ...prev,
        departamentos: 0,
        empleados: 0,
        encuestas: 0
      }));
      console.error("Error cargando estadísticas:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
    fetchDepartamentos();
    fetchEstadisticas();
  }, []);

  // 🔹 Obtener nombre del departamento de un usuario
  const getDepartamentoName = (idDepartamento) => {
    const dept = departamentos.find(d => d.idDepartamento === idDepartamento);
    return dept ? dept.nombre : `ID: ${idDepartamento}`;
  };

  // 🔹 Lista de empleados para la tabla
  const listaDeEmpleados = useMemo(() => {
    return usuarios.map(u => ({
      id: u.idUsuario,
      nombre: u.nombre,
      correo: u.correo,
      rol: u.rol,
      idDepartamento: u.idDepartamento,
      nombreDepartamento: getDepartamentoName(u.idDepartamento),
    }));
  }, [usuarios, departamentos]);

  // 🔹 Handlers CRUD
  const handleCreate = async ({ nombre, correo, contraseña, departamento }) => {
    await crearUsuario({
      nombre,
      correo,
      password: contraseña,
      rol: "empleado", // Siempre empleado
      idDepartamento: Number(departamento) || 0,
    });
    await fetchUsuarios();
    await fetchEstadisticas();
  };

  const handleEdit = async (idUsuario, { nombre, correo, contraseña, rol, departamento }) => {
    await actualizarUsuario(idUsuario, {
      nombre,
      correo,
      password: contraseña,
      rol,
      idDepartamento: Number(departamento) || 0,
    });
    setUsuarios((prev) =>
      prev.map((u) =>
        u.idUsuario === idUsuario
          ? { ...u, nombre, correo, rol, idDepartamento: Number(departamento) || 0 }
          : u
      )
    );
    await fetchEstadisticas();
  };

  const handleDelete = async (idUsuario) => {
    const prevLength = usuarios.length;
    try {
      await eliminarUsuario(idUsuario).catch(e => {
        // Si el error es de JSON vacío, lo ignoramos
        if (e instanceof SyntaxError && e.message.includes('JSON')) {
          // Ignorar error de JSON vacío
          return;
        }
        throw e;
      });
      await fetchUsuarios();
      await fetchEstadisticas();
      setTimeout(() => {
        if (usuarios.length - 1 === prevLength - 1 || usuarios.length < prevLength) {
          alert("Usuario eliminado correctamente.");
        } else {
          alert("No se pudo confirmar la eliminación del usuario.");
        }
      }, 500);
    } catch (e) {
      alert("Error al eliminar usuario: " + (e?.message || e));
    }
  };

  const handleCreateEmployer = async (data) => {
    try {
      await crearUsuario(data);
      await fetchUsuarios();
      await fetchEstadisticas();
    } catch (error) {
      const backendMsg = error?.response?.data?.message || error?.message;
      const mensaje = backendMsg === "Nombre, correo y contraseña son obligatorios"
        ? "Error al crear el usuario"
        : backendMsg || "Error al crear el usuario";
      window.showAlert(mensaje, "error");
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <AlertContainer />
      <Header />
      <div className="w-full max-w-full m-0 p-4 md:p-8 min-h-[calc(100vh-80px)]">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">{titulo}</h1>
          <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-6 md:mb-8">
            Bienvenido al dashboard de empleados. Aquí podrás gestionar los empleados de la aplicación.  
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_350px] gap-4 md:gap-8 items-start max-w-full">
          {/* Tarjetas de estadísticas */}
          <div className="flex flex-col gap-4 md:gap-6 order-2 lg:order-1">
            <DashboardCards 
              numeroDepartamentos={estadisticas.departamentos} 
              numeroEncuestas={estadisticas.encuestas} 
              numeroEmpleados={estadisticas.empleados} 
            />
          </div>
          
          {/* Lista de empleados */}
          <div className="flex flex-col gap-6 md:gap-8 order-1 lg:order-2">
            <EmployersList 
              listaDeEmpleados={listaDeEmpleados} 
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
              error={error}
              departamentos={departamentos}
            />
          </div>
          
          {/* Formulario de nuevo empleado */}
          <div className="flex flex-col gap-4 md:gap-6 order-3">
            <EmployersFormOrganism onCreate={handleCreateEmployer} departamentos={departamentos} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployersDashboard;
