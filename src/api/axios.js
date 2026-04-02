import axios from "axios";

// Configuración base de Axios para consumir la API
const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export default api;