import { getToken } from "./authService.jsx";
const API_BASE = "http://localhost:8080/api";

function authHeaders(extra = {}) {
  return { ...extra, Authorization: `Bearer ${getToken()}` };
}

export async function getEncuestas() {
  const res = await fetch(`${API_BASE}/encuestas/master`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Error al obtener encuestas");
  return res.json();
}

export async function getEncuestasDeleted() {
  const res = await fetch(`${API_BASE}/encuestas/deleted`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Error al obtener encuestas eliminadas");
  return res.json();
}

export async function getEncuestasHabilitadas() {
  const res = await fetch(`${API_BASE}/encuestas/alumnos`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Error al obtener encuestas habilitadas");
  return res.json();
}

export async function getEncuestaById(id) {
  const res = await fetch(`${API_BASE}/encuestas/${id}`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Error al obtener encuesta por ID");
  return res.json();
}

export async function getEncuestasByDepartamento(idDepartamento) {
  const res = await fetch(`${API_BASE}/encuestas/departamento/${idDepartamento}`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Error al obtener encuestas por departamento");
  return res.json();
}

export async function createEncuesta(payload) {
  const res = await fetch(`${API_BASE}/encuestas`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al crear encuesta");
  return res.json();
}

export async function updateEncuesta(id, payload) {
  const res = await fetch(`${API_BASE}/encuestas/${id}`, {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al actualizar encuesta");
  return res.json();
}

export async function deleteEncuesta(id) {
  const res = await fetch(`${API_BASE}/encuestas/${id}`, { method: "DELETE", headers: authHeaders() });
  if (!res.ok) throw new Error("Error al eliminar encuesta");
  return {};
}

export async function softDeleteEncuesta(id) {
  const res = await fetch(`${API_BASE}/encuestas/${id}/soft-delete`, { method: "PATCH", headers: authHeaders() });
  if (!res.ok) throw new Error("Error al hacer soft delete");
  return {};
}

export async function restaurarEncuesta(id) {
  const res = await fetch(`${API_BASE}/encuestas/${id}/restaurar`, { method: "PATCH", headers: authHeaders() });
  if (!res.ok) throw new Error("Error al restaurar encuesta");
  return {};
}
