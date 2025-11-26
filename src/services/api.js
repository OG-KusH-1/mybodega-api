import axios from "axios";
import AuthService from "./AuthService";

// 👉 URL base de tu API (MODÍFICALA según tus puertos reales)
const API_URL = "http://localhost:8090"; 
// ejemplo: auth-service corre en 8090, product-service en 8092

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 Interceptor para añadir automáticamente el token
api.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔥 Interceptor para capturar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el token expiró o es inválido → cerrar sesión
    if (error.response?.status === 401 || error.response?.status === 403) {
      AuthService.logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
