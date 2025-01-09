import axiosClient from "../axiosClient";

// Función para obtener todos los usuarios
export const getUsers = async () => {
    const response = await axiosClient.get("/users"); // Las cookies se envían automáticamente
    return response.data;
};

// Función para obtener un usuario por email
export const getUserByEmail = async (email) => {
    const response = await axiosClient.get(`/users/${email}`); // Las cookies se envían automáticamente
    return response.data;
};

// Función para crear un usuario
export const createUser = async (userData) => {
    const response = await axiosClient.post("/users", userData); // Las cookies se envían automáticamente
    return response.data;
};

// Función para actualizar un usuario
export const updateUser = async (email, userData) => {
    try {
        const response = await axiosClient.put(`/users/${email}`, userData); // Cookies se envían automáticamente
        return response.data;
    } catch (error) {
        console.error("Error en updateUser:", error.response || error.message);
        throw error;
    }
};
// Función para eliminar un usuario
export const deleteUser = async (email) => {
    const response = await axiosClient.delete(`/users/${email}`); // Las cookies se envían automáticamente
    return response.data;
};

// Función para actualizar la contraseña de un usuario
export const updatePassword = async (email, passwordData) => {
    const response = await axiosClient.put(`/users/${email}/password`, passwordData); // Las cookies se envían automáticamente
    return response.data;
};

// Función para obtener las direcciones
export const getDirecciones = async (email) => {
    const response = await axiosClient.get(`/address/${email}`); // Las cookies se envían automáticamente
    return response.data;
};

// Función para crear una dirección
export const createDireccion = async (direccionData) => {
    const response = await axiosClient.post(`/address/${direccionData.email}`, direccionData); // Las cookies se envían automáticamente
    return response.data;
};

// Función para actualizar una dirección
export const updateDireccion = async (id, direccionData) => {
    const response = await axiosClient.put(`/address/${id}`, direccionData); // Las cookies se envían automáticamente
    return response.data;
};

// Función para eliminar una dirección
export const deleteDireccion = async (id) => {
    const response = await axiosClient.delete(`/address/${id}`); // Las cookies se envían automáticamente
    return response.data;
};
