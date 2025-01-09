import { useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import { Navigate } from "react-router-dom";



export const useAuthProvider = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axiosClient.get("/auth/check-auth"); // Cookie enviada automáticamente
                setUser(response.data.user); // Usuario autenticado
            } catch (error) {
                console.warn("Usuario no autenticado:", error.message);
                setUser(null); // No autenticado
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);


    const loginUser = async (credentials) => {
        setLoading(true);
        try {
            const response = await axiosClient.post("/auth/login", credentials);
            setUser(response.data.user); // Guardar datos del usuario tras el login
        } catch (error) {
            console.error("Error al iniciar sesión:", error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logoutUser = async () => {
        try {
            await axiosClient.get("/auth/logout"); // Cerrar sesión
            setUser(null); // Limpiar el estado del usuario
            Navigate("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error.message);
        }
    };

    return { user, loginUser, logoutUser, loading, setUser };
};
