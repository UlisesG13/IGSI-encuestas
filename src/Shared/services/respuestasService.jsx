const API_BASE = "http://localhost:8080/api";

function authHeaders(additionalHeaders = {}) {
  const token = localStorage.getItem("authToken");
  const headers = { ...additionalHeaders };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Guardar la respuesta de un alumno para una pregunta específica
 * @param {number} idPregunta 
 * @param {object} payload { id_alumno, id_pregunta, id_respuesta_posible, respuesta_abierta, fecha_respuesta }
 */
export async function createRespuesta(idPregunta, payload) {
  const res = await fetch(`${API_BASE}/preguntas/${idPregunta}/respuestas`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al guardar respuesta");
  return res.json();
}

/**
 * Actualizar la respuesta de un alumno para esa pregunta
 * @param {number} idPregunta 
 * @param {number} idRespuesta 
 * @param {object} payload { id_alumno, id_pregunta, id_respuesta_posible, respuesta_abierta, fecha_respuesta }
 */
export async function updateRespuesta(idPregunta, idRespuesta, payload) {
  const res = await fetch(`${API_BASE}/preguntas/${idPregunta}/respuestas/${idRespuesta}`, {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al actualizar respuesta");
  return {};
}

/**
 * Obtener cuántas veces se escogió cada respuesta (estadísticas)
 * @param {number} idPregunta 
 * @returns {Array<{id_respuesta_posible: number, cantidad: number}>}
 */
export async function getEstadisticasRespuestas(idPregunta) {
  const res = await fetch(`${API_BASE}/preguntas/${idPregunta}/respuestas/respuestas`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Error al obtener estadísticas de respuestas");
  return res.json();
}
