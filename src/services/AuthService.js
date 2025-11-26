import axios from "axios";

const API_URL = "http://localhost:8090/auth";

const AuthService = {
  async loginUser(username, password) {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });

    const token = response.data.token;

    if (!token) {
      throw new Error("La API no devolvió un token válido.");
    }

    // Guarda el token
    localStorage.setItem("token", token);

    // Devuelve un objeto consistente
    return { token };
  },

  logout() {
    localStorage.removeItem("token");
  },

  getToken() {
    return localStorage.getItem("token");
  },

  isAuthenticated() {
    return !!localStorage.getItem("token");
  }
};

export default AuthService;
