import { useState, useEffect } from "react";
import { login } from "../Services/authServices";
import axiosClient from "../axiosClient";

export const useAuthProvider = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const checkAuth = async () => {
            if (token) {
                try {
                    const response = await axiosClient.get("/auth/check-auth", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data.user);
                } catch (error) {
                    console.error("Error al verificar la autenticación:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const loginUser = async (credentials) => {
        setLoading(true);
        try {
            const response = await login(credentials);
            const { token, user } = response.data;  // Asegúrate de que la respuesta tiene data
            localStorage.setItem('token', token);
            setUser(user);
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logoutUser = async () => {
        try {
            await axiosClient.post("/auth/logout");
            localStorage.removeItem('token');
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        } finally {
            setUser(null);
        }
    };

    return { user, loginUser, logoutUser, loading, setUser };
};
