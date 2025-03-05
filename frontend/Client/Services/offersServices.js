import axios from "axios";

const API_URL = "http://localhost:3005/api/offers";

export const getOffers = async () => {
    try {
        const response = await axios.get(API_URL, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error al obtener ofertas:", error.response?.data || error.message);
        throw error;
    }
};

export const createOffer = async (offerData) => {
    try {
        const response = await axios.post(API_URL, offerData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error al crear oferta:", error.response?.data || error.message);
        throw error;
    }
};

export const updateOffer = async (id_offer, offerData) => {
    try {
        const response = await axios.put(`${API_URL}/${id_offer}`, offerData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar oferta:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteOffer = async (id_offer) => {
    try {
        const response = await axios.delete(`${API_URL}/${id_offer}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error al eliminar oferta:", error.response?.data || error.message);
        throw error;
    }
};