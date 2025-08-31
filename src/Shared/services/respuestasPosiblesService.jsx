import { getToken } from "./authService.jsx";
const API_BASE = "http://localhost:8080/api";

function authHeaders(extra = {}) {
  return { ...extra, Authorization: `Bearer ${getToken()}` };
}

export async function getRespuestas(idPregunta) {
  const res = await fetch(`${API_BASE}/preguntas/${idPregunta}/respuestasPosibles`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Error al obtener respuestas posibles");
  return res.json();
}

export async function createRespuestaPosible(idPregunta, payload) {
  const res = await fetch(`${API_BASE}/preguntas/${idPregunta}/respuestasPosibles`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al crear respuesta posible");
  return res.json();
}

export async function updateRespuesta(idPregunta, idRespuesta, payload) {
  const res = await fetch(`${API_BASE}/preguntas/${idPregunta}/respuestasPosibles/${idRespuesta}`, {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al actualizar respuesta posible");
  return {};
}

export async function deleteRespuesta(idPregunta, idRespuesta) {
  const res = await fetch(`${API_BASE}/preguntas/${idPregunta}/respuestasPosibles/${idRespuesta}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Error al eliminar respuesta posible");
  return {};
}
