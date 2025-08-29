import { getToken } from "./authService.jsx";
const API_BASE = "http://localhost:8080/api";

function authHeaders(extra = {}) {
  return { ...extra, Authorization: `Bearer ${getToken()}` };
}

export async function getTiposPregunta() {
  const res = await fetch(`${API_BASE}/tipo-pregunta`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Error al obtener tipos de pregunta");
  return res.json();
}

export async function getTipoPreguntaById(id) {
  const res = await fetch(`${API_BASE}/tipo-pregunta/${id}`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Error al obtener tipo de pregunta");
  return res.json();
}

export async function createTipoPregunta(payload) {
  const res = await fetch(`${API_BASE}/tipo-pregunta`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al crear tipo de pregunta");
  return res.json();
}

export async function updateTipoPregunta(id, payload) {
  const res = await fetch(`${API_BASE}/tipo-pregunta/${id}`, {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al actualizar tipo de pregunta");
  return {};
}

export async function deleteTipoPregunta(id) {
  const res = await fetch(`${API_BASE}/tipo-pregunta/${id}`, { method: "DELETE", headers: authHeaders() });
  if (!res.ok) throw new Error("Error al eliminar tipo de pregunta");
  return {};
}
