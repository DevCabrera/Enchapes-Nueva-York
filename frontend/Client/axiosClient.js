import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:3005/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Esto permite enviar cookies automáticamente
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("No autenticado. Redirigiendo al login...");
            // Opcional: redirigir al usuario al login
            // window.location.href = "/login"; 
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
