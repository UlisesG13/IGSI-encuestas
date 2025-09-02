const API_URL = "http://localhost:8080/api/usuarios"; // base URL usuarios

// ==========================
// AUTH
// ==========================

export async function login(email, password) {
	try {
	  const response = await fetch(`${API_URL}/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ correo: email, password }),
	  });
  
	  if (!response.ok) {
		let errorMsg = "Credenciales incorrectas";
		try {
		  const errorData = await response.json();
		  errorMsg = errorData.message || errorMsg;
		} catch (_) {}
		throw new Error(errorMsg);
	  }
  
	  const data = await response.json();
	  console.log("Login response:", data);
  
	  // Como el backend ya devuelve el usuario completo con el token:
	  localStorage.setItem("token", data.token);
	  localStorage.setItem("user", JSON.stringify({
		idUsuario: data.idUsuario,
		nombre: data.nombre,
		correo: data.correo,
		rol: data.rol,
		idDepartamento: data.idDepartamento
	  }));
  
	  return data;
	} catch (error) {
	  throw error;
	}
  }
  

export function getToken() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user"); // 👈 también borramos el usuario
}

export function getCurrentUser() {
  try {
    const user = localStorage.getItem("user");
    if (!user) return null;
    return JSON.parse(user);
  } catch (error) {
    console.error("Error al parsear usuario de localStorage:", error);
    return null;
  }
}

// ==========================
// USERS SERVICE
// ==========================

export async function getUsuarios() {
  const token = getToken();
  const response = await fetch(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("No autorizado o error al obtener usuarios");
  return await response.json();
}

export async function getUsuarioById(id) {
  const token = getToken();
  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Usuario no encontrado");
  return await response.json();
}

export async function getUsuarioByCorreo(correo) {
  const token = getToken();
  const response = await fetch(`${API_URL}/correo/${correo}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Usuario no encontrado");
  return await response.json();
}

export async function crearUsuario(usuario) {
  const token = getToken();
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nombre: usuario.nombre,
      correo: usuario.correo,
      password: usuario.contraseña,
      rol: usuario.rol,
      idDepartamento: Number(usuario.departamento) || null,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al crear usuario");
  }
  return await response.json();
}

export async function actualizarUsuario(id, usuario) {
  const token = getToken();
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nombre: usuario.nombre,
      correo: usuario.correo,
      password: usuario.password || usuario.contraseña,
      rol: usuario.rol,
      idDepartamento:
        usuario.idDepartamento ||
        (usuario.departamento ? Number(usuario.departamento) : null),
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar usuario");
  }
  return await response.json();
}

export async function eliminarUsuario(id) {
  const token = getToken();
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al eliminar usuario");
  }
  return await response.json();
}

export async function getEstadisticasUsuarios() {
  try {
    const usuarios = await getUsuarios();
    return {
      totalUsuarios: usuarios.length,
      usuariosActivos: usuarios.filter((u) => !u.deleted).length,
      usuariosEliminados: usuarios.filter((u) => u.deleted).length,
      adminGenerales: usuarios.filter(
        (u) => u.rol === "AdminGeneral" && !u.deleted
      ).length,
      empleados: usuarios.filter(
        (u) => u.rol === "Empleado" && !u.deleted
      ).length,
      adminsDepartamentales: usuarios.filter(
        (u) => u.rol === "AdminDepartamental" && !u.deleted
      ).length,
    };
  } catch (error) {
    console.error("Error obteniendo estadísticas de usuarios:", error);
    return {
      totalUsuarios: 0,
      usuariosActivos: 0,
      usuariosEliminados: 0,
      adminGenerales: 0,
      empleados: 0,
      adminsDepartamentales: 0,
    };
  }
}
