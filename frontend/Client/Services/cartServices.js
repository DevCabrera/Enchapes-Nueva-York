import axios from "axios";

const API_URL = "http://localhost:3005/api/cart";

// Manejo de errores centralizado
const handleRequest = async (request) => {
    try {
        const response = await request();
        return response.data;
    } catch (error) {
        console.error("Error en la solicitud del carrito:", error.message);
        throw error;
    }
};

// Obtener el carrito
export const getCart = async () => {
    return handleRequest(() =>
        axios.get(API_URL, { withCredentials: true })
    );
};

// Agregar un producto al carrito
export const addToCart = async (product, quantity) => {
    if (!product || !product.id_producto) {
        throw new Error("El producto es inválido o no tiene un ID.");
    }
    if (quantity <= 0) {
        throw new Error("La cantidad debe ser mayor a cero.");
    }
    return handleRequest(() =>
        axios.post(
            `${API_URL}/add`,
            { id_producto: product.id_producto, cantidad: quantity },
            { withCredentials: true }
        )
    );
};

// Actualizar la cantidad de un producto en el carrito
export const updateCart = async (productId, quantity) => {
    if (!productId) {
        throw new Error("El ID del producto es requerido.");
    }
    if (quantity <= 0) {
        throw new Error("La cantidad debe ser mayor a cero.");
    }
    return handleRequest(() =>
        axios.put(
            `${API_URL}/update`,
            { id_producto: productId, cantidad: quantity },
            { withCredentials: true }
        )
    );
};

// Eliminar un producto del carrito
export const removeFromCart = async (productId) => {
    if (!productId) {
        throw new Error("El ID del producto es requerido.");
    }
    return handleRequest(() =>
        axios.delete(`${API_URL}/remove`, {
            withCredentials: true,
            data: { id_producto: productId },
        })
    );
};

// Vaciar el carrito
export const clearCart = async () => {
    return handleRequest(() =>
        axios.delete(`${API_URL}/clear`, { withCredentials: true })
    );
};

// Actualizar el estado del carrito (pago/no pagado)
export const updateCartStatus = async (status) => {
    if (!["pagado", "no_pagado"].includes(status)) {
        throw new Error("Estado no válido para el carrito.");
    }
    return handleRequest(() =>
        axios.put(
            `${API_URL}/status`,
            { estatus: status },
            { withCredentials: true }
        )
    );
};
