import { environment } from "../environments/environment";

export const endpoints = {
    loginUser: environment.api_node + "/auth/login",
    registerUser: environment.api_node + "/auth/register",
    getEmploye: environment.api_node + "/empleados",
    createEmploye: environment.api_node + "/empleados",
    deleteEmploye: environment.api_node + "/empleados",
    getSolicitud: environment.api_node + "/solicitudes",
    createSolicitud: environment.api_node + "/solicitudes",
    deleteSolicitud: environment.api_node + "/solicitudes",
}