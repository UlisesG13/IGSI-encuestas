import { getToken } from "../../Shared/services/authService";

const API_BASE = "http://localhost:8080/api/encuestas";

function authHeaders(extra = {}) {
  const token = getToken();
  return {
    ...extra,
    Authorization: `Bearer ${token}`,
  };
}

export async function getTodasLasEncuestas() {
  const response = await fetch(`${API_BASE}/master`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener todas las encuestas");
  return response.json();
}

export async function getEncuestasEliminadas() {
  const response = await fetch(`${API_BASE}/deleted`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener encuestas eliminadas");
  return response.json();
}

export async function updateEncuesta(idEncuesta, datos) {
  const response = await fetch(`${API_BASE}/${idEncuesta}`, {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(datos),
  });
  if (!response.ok) throw new Error("Error al actualizar encuesta");
  return response.json();
}

export async function softDeleteEncuesta(idEncuesta) {
  const response = await fetch(`${API_BASE}/${idEncuesta}/soft-delete`, {
    method: "PATCH",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al hacer soft delete");
  return {};
}

export async function restaurarEncuesta(idEncuesta) {
  const response = await fetch(`${API_BASE}/${idEncuesta}/restaurar`, {
    method: "PATCH",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al restaurar encuesta");
  return {};
}

export async function deleteEncuesta(idEncuesta) {
  const response = await fetch(`${API_BASE}/${idEncuesta}`, {
    method: "DELETE",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al eliminar encuesta");
  return {};
}
