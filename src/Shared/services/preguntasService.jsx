import { getToken } from "./authService.jsx";
const API_BASE = "http://localhost:8080/api";

function authHeaders(extra = {}) {
  return { ...extra, Authorization: `Bearer ${getToken()}` };
}

export async function getPreguntas(idSeccion) {
  const res = await fetch(`${API_BASE}/secciones/${idSeccion}/preguntas`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Error al obtener preguntas");
  return res.json();
}

export async function getPreguntaById(idSeccion, idPregunta) {
  const res = await fetch(`${API_BASE}/secciones/${idSeccion}/preguntas/${idPregunta}`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Error al obtener pregunta por ID");
  return res.json();
}

export async function createPregunta(idSeccion, payload) {
  const res = await fetch(`${API_BASE}/secciones/${idSeccion}/preguntas`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al crear pregunta");
  return res.json();
}

export async function updatePregunta(idPregunta, payload) {
  const res = await fetch(`${API_BASE}/secciones/preguntas/${idPregunta}`, {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al actualizar pregunta");
  return {};
}

export async function deletePregunta(idSeccion, idPregunta) {
  const res = await fetch(`${API_BASE}/secciones/${idSeccion}/preguntas/${idPregunta}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Error al eliminar pregunta");
  return {};
}
