import axios from "axios";

const API_URL = "http://localhost:3005/api/gallery";

// Obtener todas las imágenes
export const getGalleryImages = async () => {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
};

// Subir una imagen
export const uploadGalleryImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await axios.post(`${API_URL}/upload`, formData, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

// Eliminar una imagen
export const deleteGalleryImage = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
    return response.data;
};
