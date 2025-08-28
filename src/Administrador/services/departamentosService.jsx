import { getToken } from "../../Shared/services/authService";

const API_BASE = "http://localhost:8080/api/departamentos";

function authHeaders(extra = {}) {
  const token = getToken();
  return {
    ...extra,
    Authorization: `Bearer ${token}`,
  };
}

export async function getDepartamentos() {
  const response = await fetch(API_BASE, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener departamentos");
  return response.json();
}

export async function getDepartamentoById(idDepartamento) {
  const response = await fetch(`${API_BASE}/${idDepartamento}`, {
    method: "GET",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) throw new Error("Error al obtener el departamento");
  return response.json();
}

export async function createDepartamento({ nombre, descripcion }) {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ nombre, descripcion }),
  });
  if (!response.ok) throw new Error("Error al crear el departamento");
  return response.json();
}

export async function updateDepartamento(idDepartamento, { nombre, descripcion }) {
  const response = await fetch(`${API_BASE}/${idDepartamento}`, {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ nombre, descripcion }),
  });
  if (!response.ok) throw new Error("Error al actualizar el departamento");
  return response.json();
}

export async function softDeleteDepartamento(idDepartamento) {
  const response = await fetch(`${API_BASE}/${idDepartamento}/soft-delete`, {
    method: "PATCH",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (errorData.message && errorData.message.includes("foreign key constraint fails")) {
      throw new Error("No se puede eliminar el departamento porque tiene empleados o encuestas asociadas");
    }
    throw new Error("Error al eliminar (soft) el departamento");
  }
  return response.json();
}

export async function deleteDepartamento(idDepartamento) {
  const response = await fetch(`${API_BASE}/${idDepartamento}`, {
    method: "DELETE",
    headers: authHeaders({ "Content-Type": "application/json" }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (errorData.message && errorData.message.includes("foreign key constraint fails")) {
      throw new Error("No se puede eliminar el departamento porque tiene empleados o encuestas asociadas");
    }
    throw new Error("Error al eliminar el departamento");
  }
  return response.json().catch(() => ({}));
}

// Función para obtener estadísticas de departamentos
export async function getEstadisticasDepartamentos() {
  try {
    const departamentos = await getDepartamentos();
    return {
      totalDepartamentos: departamentos.length,
      departamentosActivos: departamentos.filter(d => !d.deleted).length,
      departamentosEliminados: departamentos.filter(d => d.deleted).length
    };
  } catch (error) {
    console.error("Error obteniendo estadísticas de departamentos:", error);
    return { totalDepartamentos: 0, departamentosActivos: 0, departamentosEliminados: 0 };
  }
}


