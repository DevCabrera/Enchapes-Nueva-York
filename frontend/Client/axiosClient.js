import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:3005/api",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Enviar cookies con las solicitudes
});


axiosClient.interceptors.response.use(
    response => response,
    error => {
        // Maneja el error aquí antes de pasarlo
        console.error("Error en la respuesta de Axios:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default axiosClient;
