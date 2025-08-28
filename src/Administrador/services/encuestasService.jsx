import { getToken } from "../../Shared/services/authService";

const API_BASE = "http://localhost:8080/api/encuestas";

function authHeaders(extra = {}) {
  const token = getToken();
  return {
    ...extra,
    Authorization: `Bearer ${token}`,
  };
}

// Devuelve todas las encuestas sin filtrar (para estadísticas)
export async function getTodasLasEncuestas() {
  let url = `${API_BASE}?includeDeleted=true`;
  const response = await fetch(url, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) {
    throw new Error("Error al obtener encuestas");
  }
  const data = await response.json();
  return data;
}

// Devuelve solo activas o solo eliminadas según showDeleted
export async function getEncuestas({ showDeleted = false } = {}) {
  let url = `${API_BASE}?includeDeleted=true`;
  const response = await fetch(url, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) {
    throw new Error("Error al obtener encuestas");
  }
  const data = await response.json();
  if (showDeleted) {
    return data.filter(encuesta => encuesta.deleted === 1 || encuesta.deleted === true);
  } else {
    return data.filter(encuesta => encuesta.deleted === 0 || encuesta.deleted === false);
  }
}

export async function getEncuestaById(idEncuesta) {
  const response = await fetch(`${API_BASE}/${idEncuesta}`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener la encuesta");
  return response.json();
}

export async function getEncuestaCompleta(idEncuesta) {
  const response = await fetch(`${API_BASE}/${idEncuesta}/completa`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener la encuesta completa");
  return response.json();
}

export async function getEncuestasByDepartamento(idDepartamento) {
  const response = await fetch(`${API_BASE}/departamento/${idDepartamento}`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener encuestas del departamento");
  return response.json();
}

export async function createEncuesta({ titulo, descripcion, idDepartamento, fechaInicio, fechaFin, estado }) {
  // Validar y formatear fechas
  const fechaInicioFormateada = validateAndFormatDate(fechaInicio);
  const fechaFinFormateada = validateAndFormatDate(fechaFin);
  
  if (!fechaInicioFormateada || !fechaFinFormateada) {
    throw new Error("Las fechas de inicio y fin son obligatorias y deben ser válidas");
  }
  
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ 
      titulo, 
      descripcion, 
      idDepartamento, 
      fechaInicio: fechaInicioFormateada, 
      fechaFin: fechaFinFormateada, 
      estado 
    }),
  });
  if (!response.ok) throw new Error("Error al crear la encuesta");
  return response.json();
}

export async function updateEncuesta(idEncuesta, { titulo, descripcion, idDepartamento, fechaInicio, fechaFin, estado }) {
  // Validar y formatear fechas
  const fechaInicioFormateada = validateAndFormatDate(fechaInicio);
  const fechaFinFormateada = validateAndFormatDate(fechaFin);
  
  if (!fechaInicioFormateada || !fechaFinFormateada) {
    throw new Error("Las fechas de inicio y fin son obligatorias y deben ser válidas");
  }
  
  const response = await fetch(`${API_BASE}/${idEncuesta}`, {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ 
      titulo, 
      descripcion, 
      idDepartamento, 
      fechaInicio: fechaInicioFormateada, 
      fechaFin: fechaFinFormateada, 
      estado 
    }),
  });
  if (!response.ok) throw new Error("Error al actualizar la encuesta");
  return response.json();
}

export async function softDeleteEncuesta(idEncuesta) {
  try {
    // Primero obtener la encuesta actual
    const encuestaActual = await getEncuestaById(idEncuesta);
    
    // Validar y formatear fechas
    const fechaInicioFormateada = validateAndFormatDate(encuestaActual.fechaInicio);
    const fechaFinFormateada = validateAndFormatDate(encuestaActual.fechaFin);
    
    if (!fechaInicioFormateada || !fechaFinFormateada) {
      throw new Error("La encuesta tiene fechas inválidas que no se pueden actualizar");
    }
    
    // Primero deshabilitar la encuesta
    const updateResponse = await fetch(`${API_BASE}/${idEncuesta}`, {
      method: "PUT",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        titulo: encuestaActual.titulo,
        descripcion: encuestaActual.descripcion,
        idDepartamento: encuestaActual.idDepartamento,
        fechaInicio: fechaInicioFormateada,
        fechaFin: fechaFinFormateada,
        estado: ESTADOS_ENCUESTA.DESHABILITADA
      }),
    });
    
    if (!updateResponse.ok) throw new Error("Error al deshabilitar la encuesta");
    
    // Luego hacer el soft-delete
    const softDeleteResponse = await fetch(`${API_BASE}/${idEncuesta}/soft-delete`, {
      method: "PATCH",
      headers: authHeaders({ "Content-Type": "application/json" }),
    });
    if (!softDeleteResponse.ok) throw new Error("Error al eliminar (soft) la encuesta");
    
    return { message: "Encuesta deshabilitada y eliminada exitosamente" };
  } catch (error) {
    console.error("Error en softDeleteEncuesta:", error);
    throw new Error("Error al deshabilitar y eliminar la encuesta");
  }
}

export async function cambiarEstadoEncuesta(idEncuesta, nuevoEstado) {
  try {
    // Primero obtener la encuesta actual para mantener los datos existentes
    const encuestaActual = await getEncuestaById(idEncuesta);
    
    // Validar y formatear fechas
    const fechaInicioFormateada = validateAndFormatDate(encuestaActual.fechaInicio);
    const fechaFinFormateada = validateAndFormatDate(encuestaActual.fechaFin);
    
    if (!fechaInicioFormateada || !fechaFinFormateada) {
      throw new Error("La encuesta tiene fechas inválidas que no se pueden actualizar");
    }
    
    // Actualizar solo el estado manteniendo los demás datos
    const response = await fetch(`${API_BASE}/${idEncuesta}`, {
      method: "PUT",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        titulo: encuestaActual.titulo,
        descripcion: encuestaActual.descripcion,
        idDepartamento: encuestaActual.idDepartamento,
        fechaInicio: fechaInicioFormateada,
        fechaFin: fechaFinFormateada,
        estado: nuevoEstado
      }),
    });
    
    if (!response.ok) throw new Error("Error al cambiar el estado de la encuesta");
    return response.json();
  } catch (error) {
    console.error("Error en cambiarEstadoEncuesta:", error);
    throw new Error("Error al cambiar el estado de la encuesta");
  }
}

export async function restaurarEncuesta(idEncuesta) {
  try {
    // Primero restaurar la encuesta
    const restaurarResponse = await fetch(`${API_BASE}/${idEncuesta}/restaurar`, {
      method: "PATCH",
      headers: authHeaders({ "Content-Type": "application/json" }),
    });
    if (!restaurarResponse.ok) throw new Error("Error al restaurar la encuesta");
    
    // Obtener la encuesta actualizada
    const encuestaActual = await getEncuestaById(idEncuesta);
    
    // Validar y formatear fechas
    const fechaInicioFormateada = validateAndFormatDate(encuestaActual.fechaInicio);
    const fechaFinFormateada = validateAndFormatDate(encuestaActual.fechaFin);
    
    if (!fechaInicioFormateada || !fechaFinFormateada) {
      throw new Error("La encuesta tiene fechas inválidas que no se pueden actualizar");
    }
    
    // Mantener la encuesta deshabilitada al restaurarla
    const updateResponse = await fetch(`${API_BASE}/${idEncuesta}`, {
      method: "PUT",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        titulo: encuestaActual.titulo,
        descripcion: encuestaActual.descripcion,
        idDepartamento: encuestaActual.idDepartamento,
        fechaInicio: fechaInicioFormateada,
        fechaFin: fechaFinFormateada,
        estado: ESTADOS_ENCUESTA.DESHABILITADA
      }),
    });
    
    if (!updateResponse.ok) throw new Error("Error al actualizar el estado de la encuesta restaurada");
    
    return { message: "Encuesta restaurada y mantenida deshabilitada" };
  } catch (error) {
    console.error("Error en restaurarEncuesta:", error);
    throw new Error("Error al restaurar la encuesta");
  }
}

export async function deleteEncuesta(idEncuesta) {
  const response = await fetch(`${API_BASE}/${idEncuesta}`, {
    method: "DELETE",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al eliminar la encuesta");
  return response.json().catch(() => ({}));
}

// Estados válidos para encuestas
export const ESTADOS_ENCUESTA = {
  HABILITADA: "habilitada",
  DESHABILITADA: "deshabilitada", 
  CERRADA: "cerrada"
};

// Función para validar estado
export function isValidEstado(estado) {
  return Object.values(ESTADOS_ENCUESTA).includes(estado);
}

// Función para validar y formatear fechas
export function validateAndFormatDate(date) {
  if (!date) return null;
  
  // Si es una fecha válida, convertirla a formato ISO
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  }
  
  // Si es un string, verificar que sea una fecha válida
  if (typeof date === 'string') {
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toISOString().split('T')[0];
    }
  }
  
  return null;
}

// Actualiza getEstadisticasEncuestas para usar getTodasLasEncuestas
export async function getEstadisticasEncuestas() {
  try {
    const encuestas = await getTodasLasEncuestas(); // Obtener todas incluyendo eliminadas
    return {
      totalEncuestas: encuestas.length,
      encuestasActivas: encuestas.filter(e => !e.deleted).length,
      encuestasEliminadas: encuestas.filter(e => e.deleted).length,
      encuestasHabilitadas: encuestas.filter(e => e.estado === 'habilitada' && !e.deleted).length,
      encuestasDeshabilitadas: encuestas.filter(e => e.estado === 'deshabilitada' && !e.deleted).length,
      encuestasCerradas: encuestas.filter(e => e.estado === 'cerrada' && !e.deleted).length
    };
  } catch (error) {
    console.error("Error obteniendo estadísticas de encuestas:", error);
    return { 
      totalEncuestas: 0, 
      encuestasActivas: 0, 
      encuestasEliminadas: 0,
      encuestasHabilitadas: 0,
      encuestasDeshabilitadas: 0,
      encuestasCerradas: 0
    };
  }
}
