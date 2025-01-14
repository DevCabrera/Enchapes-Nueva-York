import axiosClient from "../axiosClient";

export const getProducts = async () => {
    const response = await axiosClient.get("/product");
    return response.data;
};

export const getProduct = async (id) => {
    const response = await axiosClient.get(`/product/${id}`);
    return response.data;
};

export const createProduct = async (productoData) => {
    const response = await axiosClient.post("/product", productoData, {
        headers: { "Content-Type": "multipart/form-data" } // Asegura que las imágenes se envíen correctamente
    });
    return response.data;
};

export const updateProduct = async (id, productData) => {
    const formData = new FormData();
    for (const key in productData) {
        formData.append(key, productData[key]);
    }
    const response = await axiosClient.put(`/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
};


export const deleteProduct = async (id) => {
    const response = await axiosClient.delete(`/product/${id}`);
    return response.data;
};
