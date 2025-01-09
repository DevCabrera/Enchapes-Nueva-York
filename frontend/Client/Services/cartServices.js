import axios from 'axios';

const API_URL = 'http://localhost:3005/api/cart';

export const getCart = async (token) => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const addToCart = async (product, quantity, token) => {
    const response = await axios.post(
        `${API_URL}/add`,
        { id_producto: product.id_producto, cantidad: quantity },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const updateCart = async (productId, quantity, token) => {
    const response = await axios.put(
        `${API_URL}/update`,
        { id_producto: productId, cantidad: quantity },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const removeFromCart = async (productId, token) => {
    const response = await axios.delete(
        `${API_URL}/remove`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                id_producto: productId,
            },
        }
    );
    return response.data;
};

export const clearCart = async (token) => {
    const response = await axios.delete(`${API_URL}/clear`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
