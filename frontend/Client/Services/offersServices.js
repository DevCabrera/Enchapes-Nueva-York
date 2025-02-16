import axios from "axios";

const API_URL = "http://localhost:3005/api/offers";

export const getOffers = async () => {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
};

export const createOffer = async (offerData) => {
    const response = await axios.post(API_URL, offerData, { withCredentials: true });
    return response.data;
};

export const updateOffer = async (id_offer, offerData) => {
    const response = await axios.put(`${API_URL}/${id_offer}`, offerData, { withCredentials: true });
    return response.data;
};

export const deleteOffer = async (id_offer) => {
    const response = await axios.delete(`${API_URL}/${id_offer}`, { withCredentials: true });
    return response.data;
};
