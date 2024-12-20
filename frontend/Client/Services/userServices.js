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

export const updatePassword = async (email, passwords) => {
    // `passwords` debe incluir `oldPassword` y `newPassword`
    const response = await axiosClient.put(`/users/${email}/password`, passwords);
    return response.data;
};