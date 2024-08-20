import { fetchWithAuth } from './api';
import { endpoints } from "../settings/endpoints";


// Registrar usuario - En caso tal de que no exista
export const registerUser = async (userData) => {
  return await fetchWithAuth(endpoints.registerUser, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

// Crear Empleado
export const createEmployee = async (employeeData) => {
  return await fetchWithAuth(endpoints.createEmploye, {
    method: 'POST',
    body: JSON.stringify(employeeData),
  });
};

// Mostrar Todos los Empleados
export const getEmployees = async () => {
  return await fetchWithAuth(endpoints.getEmploye, {
    method: 'GET',
  });
};

// Crear Solicitud
export const createRequest = async (requestData) => {
  return await fetchWithAuth(endpoints.createSolicitud, {
    method: 'POST',
    body: JSON.stringify(requestData),
  });
};

// Mostrar todas las solicitudes
export const getRequests = async () => {
  return await fetchWithAuth(endpoints.getSolicitud, {
    method: 'GET',
  });
};

// Eliminar solicitud
export const deleteRequest = async (requestId) => {
  return await fetchWithAuth(`${endpoints.deleteSolicitud}/${requestId}`, {
    method: 'DELETE',
  });
};