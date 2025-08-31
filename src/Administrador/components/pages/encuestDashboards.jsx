import React, { useEffect, useMemo, useState } from "react";     
import Header from "../organism/Header"; 
import AlertContainer from "../../../Shared/components/molecule/AlertContainer";
import DashboardCards from "../molecule/DashboardCards";
import EncuestList from "../organism/EncuestList";
import { 
  getTodasLasEncuestas, 
  softDeleteEncuesta, 
  restaurarEncuesta, 
  deleteEncuesta, 
  getEncuestasEliminadas,
  updateEncuesta
} from "../../services/encuestasService";
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

  // 🔹 Fetch de todas las encuestas
  const fetchEncuestas = async () => {
    setLoading(true);
    setError("");
    try {
      console.log("🔹 fetchEncuestas - showDeleted:", showDeleted);
      
      let data;
      if (showDeleted) {
        // Si estamos en la papelera, traer encuestas eliminadas
        console.log("📥 Cargando encuestas eliminadas...");
        data = await getEncuestasEliminadas();
      } else {
        // Si estamos en activas, traer encuestas no eliminadas
        console.log("📥 Cargando encuestas activas...");
        data = await getTodasLasEncuestas();
      }
      
      console.log("📋 Datos recibidos:", data);
      
      // Verificar que los datos sean válidos
      if (!Array.isArray(data)) {
        console.warn("⚠️ Los datos recibidos no son un array:", data);
        setEncuestas([]);
        setError("Formato de datos inválido del servidor");
        return;
      }
      
      // Filtrar encuestas según el estado actual (solución temporal)
      let encuestasFiltradas = data;
      if (!showDeleted) {
        // Solo mostrar encuestas no eliminadas
        encuestasFiltradas = data.filter(encuesta => !encuesta.deleted);
        console.log("🔍 Encuestas filtradas (no eliminadas):", encuestasFiltradas.length);
      } else {
        // Solo mostrar encuestas eliminadas
        encuestasFiltradas = data.filter(encuesta => encuesta.deleted);
        console.log("🔍 Encuestas filtradas (eliminadas):", encuestasFiltradas.length);
      }
      
      // Mostrar mensaje informativo si no hay encuestas
      if (encuestasFiltradas.length === 0) {
        if (showDeleted) {
          console.log("📝 No hay encuestas eliminadas en la papelera");
        } else {
          console.log("📝 No hay encuestas activas disponibles");
        }
      }
      
      setEncuestas(encuestasFiltradas);

      // Calcular número total de encuestas (solo para estadísticas)
      if (!showDeleted) {
        setEstadisticas(prev => ({ ...prev, encuestas: encuestasFiltradas.length }));
      }
      
      console.log("✅ fetchEncuestas completado - encuestas cargadas:", data.length);
    } catch (e) {
      console.error("❌ Error fetching encuestas:", e);
      setError(`Error al cargar encuestas: ${e.message}`);
      setEncuestas([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch de estadísticas globales (departamentos y usuarios)
  const fetchEstadisticas = async () => {
    try {
      const [statsDepartamentos, statsUsuarios] = await Promise.all([
        getEstadisticasDepartamentos(),
        getEstadisticasUsuarios()
      ]);

      setEstadisticas(prev => ({
        ...prev,
        departamentos: statsDepartamentos.totalDepartamentos,
        empleados: statsUsuarios.totalUsuarios
      }));
    } catch (error) {
      console.error("Error cargando estadísticas:", error);
    }
  };

  useEffect(() => {
    fetchEncuestas();
    fetchEstadisticas();
  }, [showDeleted]);

  // 🔹 Lista de encuestas para la tabla
  const listaDeEncuestas = useMemo(() => {
    return encuestas.map(e => {
      // Mapear estados del backend a estados del frontend
      let estadoFrontend = e.estado;
      if (e.estado === 'habilitada') estadoFrontend = 'activa';
      if (e.estado === 'deshabilitada') estadoFrontend = 'inactiva';
      
      return {
        idEncuesta: e.idEncuesta,
        nombre: e.titulo,
        fecha: `${e.fechaInicio} - ${e.fechaFin}`,
        respuestas: e.numeroRespuestas || 0,
        estado: estadoFrontend,
        deleted: e.deleted,
      };
    });
  }, [encuestas]);

  // 🔹 Handlers CRUD y de estado
  const handleSoftDelete = async (idEncuesta) => {
    try {
<<<<<<< HEAD
      console.log("🔹 handleSoftDelete llamado con id:", idEncuesta);
      
      // Obtener la encuesta antes del soft-delete
=======
      // Primero hacer soft-delete
      await softDeleteEncuesta(idEncuesta);
      // Luego cambiar el estado a inactiva
>>>>>>> a332c5e09447cef692d262e9435ba84e117e3b3d
      const encuesta = encuestas.find(e => e.idEncuesta === idEncuesta);
      if (!encuesta) {
        console.log("❌ No se encontró la encuesta con id:", idEncuesta);
        alert("No se encontró la encuesta en la lista local");
        return;
      }
<<<<<<< HEAD
      
      console.log("📋 Encuesta encontrada:", encuesta);
      
      // Verificar que la encuesta no esté eliminada
      if (encuesta.deleted) {
        console.log("⚠️ La encuesta ya está eliminada");
        alert("La encuesta ya está eliminada");
        return;
      }
      
      // PASO 1: Deshabilitar la encuesta primero
      console.log("🔄 PASO 1: Deshabilitando encuesta...");
      const datosDeshabilitados = {
        ...encuesta,
        estado: 'deshabilitada'
      };
      
      console.log("📤 Datos para deshabilitar:", datosDeshabilitados);
      await updateEncuesta(idEncuesta, datosDeshabilitados);
      console.log("✅ Encuesta deshabilitada exitosamente");
      
             // PASO 2: Hacer soft-delete
       console.log("🔄 PASO 2: Ejecutando soft-delete...");
       await softDeleteEncuesta(idEncuesta);
      
      // Recargar la lista inmediatamente
      console.log("🔄 Recargando datos...");
      await fetchEncuestas();
      await fetchEstadisticas();
      
      console.log("✅ Soft-delete completado exitosamente");
      alert("Encuesta deshabilitada y eliminada correctamente");
    } catch (error) {
      console.error("❌ Error en handleSoftDelete:", error);
      alert(`Error al eliminar encuesta: ${error.message}`);
=======
      await fetchEncuestas();
      await fetchEstadisticas();
      window.showAlert('Encuesta movida a la papelera correctamente', 'success');
    } catch (error) {
      window.showAlert(error.message, "error");
>>>>>>> a332c5e09447cef692d262e9435ba84e117e3b3d
    }
  };

  const handleCambiarEstado = async (idEncuesta, nuevoEstado) => {
    try {
<<<<<<< HEAD
      console.log("🔹 handleCambiarEstado llamado con id:", idEncuesta, "nuevo estado:", nuevoEstado);
      
      const encuesta = encuestas.find(e => e.idEncuesta === idEncuesta);
      if (!encuesta) {
        console.log("❌ No se encontró la encuesta con id:", idEncuesta);
        return;
      }
      
      console.log("📋 Encuesta encontrada:", encuesta);
      console.log("🔄 Actualizando estado a:", nuevoEstado);
      
      // Verificar que la encuesta no esté eliminada antes de actualizar
      if (encuesta.deleted) {
        console.log("⚠️ La encuesta está marcada como eliminada, no se puede actualizar");
        alert("No se puede actualizar una encuesta eliminada");
        return;
      }
      
      // Mapear estados del frontend a estados del backend
      let estadoBackend = nuevoEstado;
      if (nuevoEstado === 'activa') estadoBackend = 'habilitada';
      if (nuevoEstado === 'inactiva') estadoBackend = 'deshabilitada';
      
      const datosActualizados = {
=======
      const encuesta = encuestas.find(e => e.idEncuesta === idEncuesta);
      if (!encuesta) return;
      await updateEncuesta(idEncuesta, {
>>>>>>> a332c5e09447cef692d262e9435ba84e117e3b3d
        ...encuesta,
        estado: estadoBackend
      };
      
      console.log("📤 Datos a enviar:", datosActualizados);
      
      await updateEncuesta(idEncuesta, datosActualizados);
      
      console.log("🔄 Recargando datos...");
      await fetchEncuestas();
      await fetchEstadisticas();
<<<<<<< HEAD
      
      console.log("✅ Cambio de estado completado exitosamente");
    } catch (error) {
      console.error("❌ Error en handleCambiarEstado:", error);
      alert(error.message);
=======
      window.showAlert('Estado de la encuesta actualizado correctamente', 'success');
    } catch (error) {
      window.showAlert(error.message, "error");
>>>>>>> a332c5e09447cef692d262e9435ba84e117e3b3d
    }
  };

  const handleRestaurar = async (idEncuesta) => {
    try {
      console.log("🔹 handleRestaurar llamado con id:", idEncuesta);
      
      const encuesta = encuestas.find(e => e.idEncuesta === idEncuesta);
      if (!encuesta) {
        console.log("❌ No se encontró la encuesta con id:", idEncuesta);
        return;
      }
      
      console.log("📋 Encuesta encontrada:", encuesta);
      
      // Verificar que la encuesta esté eliminada
      if (!encuesta.deleted) {
        console.log("⚠️ La encuesta no está eliminada");
        alert("La encuesta no está eliminada");
        return;
      }
      
             // PASO 1: Restaurar la encuesta (quitar deleted = true)
       console.log("🔄 PASO 1: Restaurando encuesta...");
       await restaurarEncuesta(idEncuesta);
      console.log("✅ Encuesta restaurada exitosamente");
      
      // PASO 2: Habilitar la encuesta
      console.log("🔄 PASO 2: Habilitando encuesta...");
      const datosHabilitados = {
        ...encuesta,
        estado: 'habilitada'
      };
      
      console.log("📤 Datos para habilitar:", datosHabilitados);
      await updateEncuesta(idEncuesta, datosHabilitados);
      console.log("✅ Encuesta habilitada exitosamente");
      
      console.log("🔄 Recargando datos...");
      await fetchEncuestas();
      await fetchEstadisticas();
<<<<<<< HEAD
      
      console.log("✅ Restaurar completado exitosamente");
      alert("Encuesta restaurada y habilitada correctamente");
    } catch (error) {
      console.error("❌ Error en handleRestaurar:", error);
      alert(error.message);
=======
      window.showAlert('Encuesta restaurada correctamente', 'success');
    } catch (error) {
      window.showAlert(error.message, "error");
>>>>>>> a332c5e09447cef692d262e9435ba84e117e3b3d
    }
  };

  const handleDelete = async (idEncuesta) => {
    try {
      const confirmDelete = confirm('¿Eliminar permanentemente esta encuesta?');
      if (!confirmDelete) return;
      await deleteEncuesta(idEncuesta);
      await fetchEncuestas();
      await fetchEstadisticas();
      window.showAlert('Encuesta eliminada permanentemente', 'success');
    } catch (error) {
      window.showAlert(error.message, "error");
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

                         {encuestas.length === 0 && !loading ? (
               <div className="text-center py-12">
                 <div className="text-gray-400 text-6xl mb-4">📭</div>
                 <h3 className="text-lg font-medium text-gray-900 mb-2">
                   {showDeleted ? 'Papelera vacía' : 'No hay encuestas activas'}
                 </h3>
                 <p className="text-gray-500">
                   {showDeleted 
                     ? 'No hay encuestas eliminadas en la papelera.' 
                     : 'No hay encuestas activas disponibles en este momento.'
                   }
                 </p>
               </div>
             ) : (
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
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncuestDashboards;
