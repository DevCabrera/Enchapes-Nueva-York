import axios from "axios";

const API_URL = "http://localhost:3005/api/payment";

// Subir comprobante de pago
export const uploadPayment = async (id_carro, comprobante) => {
    const formData = new FormData();
    formData.append("id_carro", id_carro);
    formData.append("comprobante", comprobante);

    const response = await axios.post(`${API_URL}/upload`, formData, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

// Verificar un pago (solo admin)
export const verifyPayment = async (id_pago) => {
    const response = await axios.put(`${API_URL}/verify/${id_pago}`, {}, {
        withCredentials: true,
    });
    return response.data;
};

// Rechazar un pago (solo admin)
export const rejectPayment = async (id_pago) => {
    const response = await axios.put(`${API_URL}/reject/${id_pago}`, {}, {
        withCredentials: true,
    });
    return response.data;
};

// Obtener todos los pagos (solo admin)
export const getPayments = async () => {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
};
