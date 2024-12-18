import { useState, useEffect } from "react";
import { login } from "../Services/authServices"; // Servicio de autenticación
import axiosClient from "../axiosClient"; // Cliente Axios

export const useAuthProvider = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axiosClient.get("/check-auth");
                setUser(response.data.user);
            } catch (error) {
                console.error("Error al verificar la autenticación:", error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const loginUser = async (credentials) => {
        setLoading(true); // Muestra el estado de carga
        try {
            const data = await login(credentials);
            setUser(data.user);
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            throw error;
        } finally {
            setLoading(false); // Oculta el estado de carga
        }
    };

    const logoutUser = async () => {
        try {
            await axiosClient.post("/logout"); // Llamada al backend
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        } finally {
            setUser(null); // Limpia el estado del usuario
        }
    };

    return { user, loginUser, logoutUser, loading };
};
