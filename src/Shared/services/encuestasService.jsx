import { getToken } from "./authService.jsx";

const API_BASE = "http://localhost:8080/api";

function authHeaders(extra = {}) {
  const token = getToken();
  return {
    ...extra,
    Authorization: `Bearer ${token}`,
  };
}

// ==========================
// ENCUESTAS
// ==========================

export async function getEncuestas() {
  const response = await fetch(`${API_BASE}/encuestas`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener encuestas");
  return response.json();
}

export async function getEncuestaById(idEncuesta) {
  const response = await fetch(`${API_BASE}/encuestas/${idEncuesta}`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener la encuesta");
  return response.json();
}

export async function getEncuestaCompleta(idEncuesta) {
  const response = await fetch(`${API_BASE}/encuestas/${idEncuesta}/completa`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener la encuesta completa");
  return response.json();
}

export async function createEncuesta(payload) {
  const response = await fetch(`${API_BASE}/encuestas`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Error al crear la encuesta");
  return response.json();
}

export async function updateEncuesta(idEncuesta, payload) {
  const response = await fetch(`${API_BASE}/encuestas/${idEncuesta}`, {
    method: "PATCH",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Error al actualizar la encuesta");
  return response.json();
}

export async function softDeleteEncuesta(idEncuesta) {
  const response = await fetch(`${API_BASE}/encuestas/${idEncuesta}/soft-delete`, {
    method: "PATCH",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al hacer soft-delete de la encuesta");
  return response.json().catch(() => ({}));
}

export async function restaurarEncuesta(idEncuesta) {
  const response = await fetch(`${API_BASE}/encuestas/${idEncuesta}/restaurar`, {
    method: "PATCH",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al restaurar la encuesta");
  return response.json().catch(() => ({}));
}

export async function deleteEncuesta(idEncuesta) {
  const response = await fetch(`${API_BASE}/encuestas/${idEncuesta}`, {
    method: "DELETE",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al eliminar la encuesta");
  return response.json().catch(() => ({}));
}

// ==========================
// PREGUNTAS
// ==========================

export async function getPreguntas(idEncuesta, idSeccion) {
  const response = await fetch(`${API_BASE}/encuestas/${idEncuesta}/secciones/${idSeccion}/preguntas`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener preguntas");
  return response.json();
}

export async function createPregunta(idEncuesta, idSeccion, payload) {
  const response = await fetch(`${API_BASE}/encuestas/${idEncuesta}/secciones/${idSeccion}/preguntas`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Error al crear la pregunta");
  return response.json();
}

export async function updatePregunta(idEncuesta, idSeccion, idPregunta, payload) {
  const response = await fetch(`${API_BASE}/encuestas/${idEncuesta}/secciones/${idSeccion}/preguntas/${idPregunta}`, {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Error al actualizar la pregunta");
  return response.json();
}

export async function deletePregunta(idEncuesta, idSeccion, idPregunta) {
  const response = await fetch(`${API_BASE}/encuestas/${idEncuesta}/secciones/${idSeccion}/preguntas/${idPregunta}`, {
    method: "DELETE",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al eliminar la pregunta");
  return response.json().catch(() => ({}));
}

// ==========================
// RESPUESTAS POSIBLES
// ==========================

export async function getRespuestasPosibles(idEncuesta, idSeccion, idPregunta) {
  const response = await fetch(`${API_BASE}/encuestas/${idEncuesta}/secciones/${idSeccion}/preguntas/${idPregunta}/respuestas`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener respuestas posibles");
  return response.json();
}

export async function createRespuestaPosible(idEncuesta, idSeccion, idPregunta, payload) {
  const response = await fetch(`${API_BASE}/encuestas/${idEncuesta}/secciones/${idSeccion}/preguntas/${idPregunta}/respuestas`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Error al crear la respuesta posible");
  return response.json();
}

export async function updateRespuestaPosible(idEncuesta, idSeccion, idPregunta, idRespuesta, payload) {
  const response = await fetch(`${API_BASE}/encuestas/${idEncuesta}/secciones/${idSeccion}/preguntas/${idPregunta}/respuestas/${idRespuesta}`, {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Error al actualizar la respuesta posible");
  return response.json();
}

export async function deleteRespuestaPosible(idEncuesta, idSeccion, idPregunta, idRespuesta) {
  const response = await fetch(`${API_BASE}/encuestas/${idEncuesta}/secciones/${idSeccion}/preguntas/${idPregunta}/respuestas/${idRespuesta}`, {
    method: "DELETE",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al eliminar la respuesta posible");
  return response.json().catch(() => ({}));
}

// ==========================
// TIPOS DE PREGUNTA
// ==========================

export async function getTiposPregunta() {
  const response = await fetch(`${API_BASE}/tipo-pregunta`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener tipos de pregunta");
  return response.json();
}

export async function getTipoPreguntaById(idTipo) {
  const response = await fetch(`${API_BASE}/tipo-pregunta/${idTipo}`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener el tipo de pregunta");
  return response.json();
}

export async function createTipoPregunta(payload) {
  const response = await fetch(`${API_BASE}/tipo-pregunta`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Error al crear el tipo de pregunta");
  return response.json();
}

export async function updateTipoPregunta(idTipo, payload) {
  const response = await fetch(`${API_BASE}/tipo-pregunta/${idTipo}`, {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Error al actualizar el tipo de pregunta");
  return response.json();
}

export async function deleteTipoPregunta(idTipo) {
  const response = await fetch(`${API_BASE}/tipo-pregunta/${idTipo}`, {
    method: "DELETE",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al eliminar el tipo de pregunta");
  return response.json().catch(() => ({}));
}

export { API_BASE };


