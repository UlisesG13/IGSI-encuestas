// services/alumnoService.js
const API_BASE = "http://localhost:8080/api";

function authHeaders(additionalHeaders = {}) {
  const token = localStorage.getItem("authToken");
  const headers = { ...additionalHeaders };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
}

// Obtener todos los alumnos
export async function getAllAlumnos() {
  const res = await fetch(`${API_BASE}/alumnos`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Error al obtener alumnos");
  return res.json();
}

// Obtener alumno por ID
export async function getAlumnoById(id) {
  const res = await fetch(`${API_BASE}/alumnos/${id}`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Error al obtener alumno por ID");
  return res.json();
}

// Obtener alumno por nombre
export async function getAlumnoByNombre(nombre) {
  const res = await fetch(`${API_BASE}/alumnos/nombre/${encodeURIComponent(nombre)}`, { 
    headers: authHeaders() 
  });
  if (!res.ok) throw new Error("Error al obtener alumno por nombre");
  return res.json();
}

// Crear un nuevo alumno
export async function createAlumno(payload) {
  const res = await fetch(`${API_BASE}/alumnos`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al crear alumno");
  return res.json();
}

// Eliminar un alumno
export async function deleteAlumno(id) {
  const res = await fetch(`${API_BASE}/alumnos/${id}`, { 
    method: "DELETE", 
    headers: authHeaders() 
  });
  if (!res.ok) throw new Error("Error al eliminar alumno");
  return {};
}

// Login de alumno
export async function loginAlumno(payload) {
  const res = await fetch(`${API_BASE}/alumnos/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Error en login");

  const data = await res.json();

  // Guardar token en localStorage si está presente en la respuesta
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
}

// Logout de alumno
export function logoutAlumno() {
  localStorage.removeItem("authToken");
}

// Verificar si el usuario está autenticado
export function isAuthenticated() {
  return !!localStorage.getItem("authToken");
}

// Obtener token almacenado
export function getAuthToken() {
  return localStorage.getItem("authToken");
}