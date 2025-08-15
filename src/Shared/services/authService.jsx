const API_URL = "http://localhost:3000"; // cambiar la url de la api bagre

export async function login(email, password) {
	try {
		const response = await fetch(`${API_URL}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Credenciales incorrectas");
		}
		const data = await response.json();
		localStorage.setItem("token", data.token);
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
}
