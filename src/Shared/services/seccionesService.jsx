import { getToken } from "./authService.jsx";

const API_BASE = "http://localhost:8080/api";

function authHeaders(extra = {}) {
  const token = getToken();
  return {
    ...extra,
    Authorization: `Bearer ${token}`,
  };
}

// 🔹 Obtener todas las secciones de una encuesta
export async function getSecciones(idEncuesta) {
  const response = await fetch(`${API_BASE}/encuestas/${idEncuesta}/secciones`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener secciones");
  return response.json();
}

// 🔹 Obtener sección por ID
export async function getSeccionById(idEncuesta, idSeccion) {
  const response = await fetch(`${API_BASE}/encuestas/${idEncuesta}/secciones/${idSeccion}`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener la sección");
  return response.json();
}

// 🔹 Crear sección
export async function createSeccion(idEncuesta, payload) {
  const response = await fetch(`${API_BASE}/encuestas/${idEncuesta}/secciones`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Error al crear la sección");
  return response.json(); // backend devuelve el ID generado
}

// 🔹 Actualizar sección
export async function updateSeccion(idEncuesta, idSeccion, payload) {
  const response = await fetch(`${API_BASE}/encuestas/${idEncuesta}/secciones/${idSeccion}`, {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Error al actualizar la sección");
  // El backend devuelve 204 No Content, no hay JSON
  return;
}

// 🔹 Eliminar sección
export async function deleteSeccion(idEncuesta, idSeccion) {
  const response = await fetch(`${API_BASE}/encuestas/${idEncuesta}/secciones/${idSeccion}`, {
    method: "DELETE",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al eliminar la sección");
  // El backend devuelve 204 No Content
  return;
}