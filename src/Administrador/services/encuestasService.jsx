import { getToken } from "../../Shared/services/authService";

const API_BASE = "http://localhost:8080/api/encuestas";

function authHeaders(extra = {}) {
  const token = getToken();
  return {
    ...extra,
    Authorization: `Bearer ${token}`,
  };
}

export async function getEncuestas() {
  const response = await fetch(API_BASE, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener encuestas");
  return response.json();
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
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ titulo, descripcion, idDepartamento, fechaInicio, fechaFin, estado }),
  });
  if (!response.ok) throw new Error("Error al crear la encuesta");
  return response.json();
}

export async function updateEncuesta(idEncuesta, { titulo, descripcion, idDepartamento, fechaInicio, fechaFin, estado }) {
  const response = await fetch(`${API_BASE}/${idEncuesta}`, {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ titulo, descripcion, idDepartamento, fechaInicio, fechaFin, estado }),
  });
  if (!response.ok) throw new Error("Error al actualizar la encuesta");
  return response.json();
}

export async function softDeleteEncuesta(idEncuesta) {
  const response = await fetch(`${API_BASE}/${idEncuesta}/soft-delete`, {
    method: "PATCH",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al eliminar (soft) la encuesta");
  return response.json();
}

export async function restaurarEncuesta(idEncuesta) {
  const response = await fetch(`${API_BASE}/${idEncuesta}/restaurar`, {
    method: "PATCH",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al restaurar la encuesta");
  return response.json();
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
