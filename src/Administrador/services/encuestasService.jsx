import { getToken } from "../../Shared/services/authService";

const API_BASE = "http://localhost:8080/api/encuestas";

function authHeaders(extra = {}) {
  const token = getToken();
  return {
    ...extra,
    Authorization: `Bearer ${token}`,
  };
}

// 🔹 LISTAR TODAS (para admins/estadísticas)
export async function getTodasLasEncuestas() {
  console.log("🔹 getTodasLasEncuestas - llamando endpoint:", `${API_BASE}/master`);
  
  const response = await fetch(`${API_BASE}/master`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  
  console.log("🔹 getTodasLasEncuestas - response status:", response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error("🔹 getTodasLasEncuestas - error response:", errorText);
    throw new Error(`Error al obtener todas las encuestas: ${response.status} - ${errorText}`);
  }
  
  const data = await response.json();
  console.log("🔹 getTodasLasEncuestas - datos recibidos:", data);
  
  return data;
}

// 🔹 LISTAR ENCUESTAS ELIMINADAS (para papelera)
export async function getEncuestasEliminadas() {
  console.log("🔹 getEncuestasEliminadas - llamando endpoint:", `${API_BASE}/deleted`);
  
  const response = await fetch(`${API_BASE}/deleted`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  
  console.log("🔹 getEncuestasEliminadas - response status:", response.status);
  
  if (!response.ok) {
    // Si es 404 (no hay encuestas eliminadas), devolver lista vacía
    if (response.status === 404) {
      console.log("🔹 getEncuestasEliminadas - no hay encuestas eliminadas, devolviendo lista vacía");
      return [];
    }
    
    // Para otros errores, lanzar excepción
    const errorText = await response.text();
    console.error("🔹 getEncuestasEliminadas - error response:", errorText);
    throw new Error(`Error al obtener encuestas eliminadas: ${response.status} - ${errorText}`);
  }
  
  const data = await response.json();
  console.log("🔹 getEncuestasEliminadas - datos recibidos:", data);
  
  return data;
}

// 🔹 LISTAR SOLO HABILITADAS (para alumnos)
export async function getEncuestasHabilitadas() {
  const response = await fetch(`${API_BASE}/alumnos`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener encuestas habilitadas");
  return response.json();
}

// 🔹 OBTENER POR ID
export async function getEncuestaById(idEncuesta) {
  const response = await fetch(`${API_BASE}/${idEncuesta}`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener la encuesta");
  return response.json();
}

// 🔹 OBTENER POR DEPARTAMENTO
export async function getEncuestasByDepartamento(idDepartamento) {
  const response = await fetch(`${API_BASE}/departamento/${idDepartamento}`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener encuestas por departamento");
  return response.json();
}

// 🔹 CREAR ENCUESTA
export async function createEncuesta({ titulo, descripcion, idDepartamento, fechaInicio, fechaFin, estado }) {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ titulo, descripcion, idDepartamento, fechaInicio, fechaFin, estado }),
  });
  if (!response.ok) throw new Error("Error al crear encuesta");
  return response.json();
}

// 🔹 ACTUALIZAR ENCUESTA
export async function updateEncuesta(idEncuesta, { titulo, descripcion, idDepartamento, fechaInicio, fechaFin, estado }) {
  console.log("🔹 updateEncuesta - llamando endpoint:", `${API_BASE}/${idEncuesta}`);
  console.log("🔹 updateEncuesta - datos a enviar:", { titulo, descripcion, idDepartamento, fechaInicio, fechaFin, estado });
  
  const response = await fetch(`${API_BASE}/${idEncuesta}`, {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ titulo, descripcion, idDepartamento, fechaInicio, fechaFin, estado }),
  });
  
  console.log("🔹 updateEncuesta - response status:", response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error("🔹 updateEncuesta - error response:", errorText);
    throw new Error(`Error al actualizar encuesta: ${response.status} - ${errorText}`);
  }
  
  return response.json();
}

// 🔹 ELIMINAR ENCUESTA (hard delete)
export async function deleteEncuesta(idEncuesta) {
  const response = await fetch(`${API_BASE}/${idEncuesta}`, {
    method: "DELETE",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al eliminar encuesta");
  return {};
}

// 🔹 SOFT DELETE ENCUESTA
export async function softDeleteEncuesta(idEncuesta) {
  console.log("🔹 softDeleteEncuesta - llamando endpoint:", `${API_BASE}/${idEncuesta}/soft-delete`);
  
  const response = await fetch(`${API_BASE}/${idEncuesta}/soft-delete`, {
    method: "PATCH",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  
  console.log("🔹 softDeleteEncuesta - response status:", response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error("🔹 softDeleteEncuesta - error response:", errorText);
    throw new Error(`Error al hacer soft delete: ${response.status} - ${errorText}`);
  }
  
  return {};
}

// 🔹 RESTAURAR ENCUESTA
export async function restaurarEncuesta(idEncuesta) {
  console.log("🔹 restaurarEncuesta - llamando endpoint:", `${API_BASE}/${idEncuesta}/restaurar`);
  
  const response = await fetch(`${API_BASE}/${idEncuesta}/restaurar`, {
    method: "PATCH",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  
  console.log("🔹 restaurarEncuesta - response status:", response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error("🔹 restaurarEncuesta - error response:", errorText);
    throw new Error(`Error al restaurar encuesta: ${response.status} - ${errorText}`);
  }
  
  return {};
}

// 🔹 OBTENER ENCUESTA COMPLETA (con secciones, preguntas y respuestas posibles)
export async function getEncuestaCompletaById(idEncuesta) {
  const response = await fetch(`${API_BASE}/${idEncuesta}/completa`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener la encuesta completa");
  return response.json();
}

// 🔹 CAMBIAR ESTADO ENCUESTA (habilitar / deshabilitar / cerrar)
export async function cambiarEstadoEncuesta(idEncuesta, nuevoEstado) {
  if (!isValidEstado(nuevoEstado)) {
    throw new Error(`Estado inválido: ${nuevoEstado}`);
  }

  const response = await fetch(`${API_BASE}/${idEncuesta}/estado`, {
    method: "PATCH",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ estado: nuevoEstado }),
  });

  if (!response.ok) throw new Error("Error al cambiar estado de la encuesta");
  return response.json();
}

// Estados válidos para encuestas
export const ESTADOS_ENCUESTA = {
  ACTIVA: "activa",
  INACTIVA: "inactiva",
  CERRADA: "cerrada"
};

export function isValidEstado(estado) {
  return Object.values(ESTADOS_ENCUESTA).includes(estado);
}

// 🔹 FUNCIÓN DE PRUEBA PARA VERIFICAR CONECTIVIDAD
export async function testBackendConnection() {
  console.log("🔹 testBackendConnection - verificando conectividad con:", API_BASE);
  
  try {
    const response = await fetch(`${API_BASE}/master`, {
      method: "GET",
      headers: authHeaders({ "Content-Type": "application/json" }),
    });
    
    console.log("🔹 testBackendConnection - response status:", response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log("🔹 testBackendConnection - datos recibidos:", data);
      return { success: true, data };
    } else {
      const errorText = await response.text();
      console.error("🔹 testBackendConnection - error response:", errorText);
      return { success: false, error: errorText, status: response.status };
    }
  } catch (error) {
    console.error("🔹 testBackendConnection - error de red:", error);
    return { success: false, error: error.message };
  }
}
