import { endpoints } from "../settings/endpoints";
import { fetchWithAuth } from "./api";

export const login = async (username, password) => {
    const response = await fetchWithAuth(endpoints.loginUser, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  
    // Guardar el token JWT en localStorage
    localStorage.setItem('token', response.token);
  
    return response;
  };