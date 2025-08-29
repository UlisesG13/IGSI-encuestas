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
  const response = await fetch(`${API_BASE}/master`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener todas las encuestas");
  return response.json();
}

// 🔹 LISTAR ENCUESTAS ELIMINADAS (para papelera)
export async function getEncuestasEliminadas() {
  const response = await fetch(`${API_BASE}/deleted`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener encuestas eliminadas");
  return response.json();
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
  const response = await fetch(`${API_BASE}/${idEncuesta}`, {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ titulo, descripcion, idDepartamento, fechaInicio, fechaFin, estado }),
  });
  if (!response.ok) throw new Error("Error al actualizar encuesta");
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
  const response = await fetch(`${API_BASE}/${idEncuesta}/soft-delete`, {
    method: "PATCH",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al hacer soft delete");
  return {};
}

// 🔹 RESTAURAR ENCUESTA
export async function restaurarEncuesta(idEncuesta) {
  const response = await fetch(`${API_BASE}/${idEncuesta}/restaurar`, {
    method: "PATCH",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al restaurar encuesta");
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
  HABILITADA: "habilitada",
  DESHABILITADA: "deshabilitada",
  CERRADA: "cerrada"
};

export function isValidEstado(estado) {
  return Object.values(ESTADOS_ENCUESTA).includes(estado);
}
