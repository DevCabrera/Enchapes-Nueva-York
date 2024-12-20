import axiosClient from "../axiosClient";

export const getUsers = async () => {
    const response = await axiosClient.get("/users");
    return response.data;
};

export const getUserByEmail = async (email) => {
    const response = await axiosClient.get(`/users/${email}`);
    return response.data;
};

export const createUser = async (userData) => {
    const response = await axiosClient.post("/users", userData);
    return response.data;
};

export const updateUser = async (email, userData) => {
    const response = await axiosClient.put(`/users/${email}`, userData);
    return response.data;
};

export const deleteUser = async (email) => {
    const response = await axiosClient.delete(`/users/${email}`);
    return response.data;
};

export const updatePassword = async (email, passwordData) => {
    const response = await axiosClient.put(`/users/${email}/password`, passwordData);
    return response.data;
};

//importar controlador de direcciones
export const getDirecciones = async (email) => {
    const response = await axiosClient.get(`/address/${email}`);
    return response.data;
};

export const createDireccion = async (direccionData) => {
    const response = await axiosClient.post(`/address/${direccionData.email_usuario}`, direccionData);
    return response.data;
};

export const updateDireccion = async (id, direccionData) => {
    const response = await axiosClient.put(`/address/${id}`, direccionData);
    return response.data;
};

export const deleteDireccion = async (id) => {
    const response = await axiosClient.delete(`/address/${id}`);
    return response.data;
};
