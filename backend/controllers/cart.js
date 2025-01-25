const { findOrCreateCart, updateCartTotal } = require("../helpers/cartHelpers");
const CarroProd = require("../models/MySql/carro_prod");
const ImgPro = require("../models/MySql/img_pro");
const Producto = require("../models/MySql/product");

// Obtener el carrito del usuario autenticado
const getCart = async (req, res) => {
    try {
        const email = req.user.email;
        const carrito = await findOrCreateCart(email);

        // Recargar el carrito con los productos e imágenes asociadas
        await carrito.reload({
            include: [
                {
                    model: CarroProd,
                    as: "productos",
                    include: [
                        {
                            model: Producto,
                            as: "producto",
                            include: [
                                {
                                    model: ImgPro,
                                    as: "imagenes", // Asegúrate de que el alias coincida con las asociaciones
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        res.status(200).json(carrito);
    } catch (error) {
        console.error("Error al obtener el carrito:", error.message);
        res.status(500).json({ message: "Error al obtener el carrito" });
    }
};


// Agregar un producto al carrito
const addToCart = async (req, res) => {
    try {
        const email = req.user.email;
        const { id_producto, cantidad } = req.body;

        if (cantidad <= 0) {
            return res.status(400).json({ message: "La cantidad debe ser mayor a cero" });
        }

        const carrito = await findOrCreateCart(email);
        const producto = await Producto.findByPk(id_producto);

        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        let productoEnCarrito = await CarroProd.findOne({
            where: { id_carro: carrito.id_carro, id_producto },
        });

        if (productoEnCarrito) {
            productoEnCarrito.cantidad += cantidad;
            productoEnCarrito.subtotal += cantidad * producto.precio_m2;
            await productoEnCarrito.save();
        } else {
            await CarroProd.create({
                id_carro: carrito.id_carro,
                id_producto,
                cantidad,
                subtotal: cantidad * producto.precio_m2,
            });
        }

        await updateCartTotal(carrito);

        res.status(200).json({ message: "Producto agregado al carrito" });
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error.message);
        res.status(500).json({ message: "Error al agregar producto al carrito" });
    }
};
// Actualizar la cantidad de un producto en el carrito
const updateCart = async (req, res) => {
    try {
        const email = req.user.email;
        const { id_producto, cantidad } = req.body;

        if (cantidad <= 0) {
            return res.status(400).json({ message: "La cantidad debe ser mayor a cero" });
        }

        const carrito = await findOrCreateCart(email);
        const productoEnCarrito = await CarroProd.findOne({
            where: { id_carro: carrito.id_carro, id_producto },
        });

        if (!productoEnCarrito) {
            return res.status(404).json({ message: "Producto no encontrado en el carrito" });
        }

        const producto = await Producto.findByPk(id_producto);

        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        productoEnCarrito.cantidad = cantidad;
        productoEnCarrito.subtotal = cantidad * producto.precio_m2;
        await productoEnCarrito.save();

        await updateCartTotal(carrito);

        res.status(200).json({ message: "Producto actualizado en el carrito" });
    } catch (error) {
        console.error("Error al actualizar producto en el carrito:", error.message);
        res.status(500).json({ message: "Error al actualizar producto en el carrito" });
    }
};

// Eliminar un producto del carrito
const removeFromCart = async (req, res) => {
    try {
        const email = req.user.email;
        const { id_producto } = req.body;

        const carrito = await findOrCreateCart(email);
        const productoEnCarrito = await CarroProd.findOne({
            where: { id_carro: carrito.id_carro, id_producto },
        });

        if (!productoEnCarrito) {
            return res.status(404).json({ message: "Producto no encontrado en el carrito" });
        }

        await productoEnCarrito.destroy();
        await updateCartTotal(carrito);

        res.status(200).json({ message: "Producto eliminado del carrito" });
    } catch (error) {
        console.error("Error al eliminar producto del carrito:", error.message);
        res.status(500).json({ message: "Error al eliminar producto del carrito" });
    }
};

// Vaciar el carrito
const clearCart = async (req, res) => {
    try {
        const email = req.user.email;
        const carrito = await findOrCreateCart(email);

        await CarroProd.destroy({ where: { id_carro: carrito.id_carro } });
        await updateCartTotal(carrito);

        res.status(200).json({ message: "Carrito vaciado" });
    } catch (error) {
        console.error("Error al vaciar el carrito:", error.message);
        res.status(500).json({ message: "Error al vaciar el carrito" });
    }
};

// Actualizar el estatus del carrito
const updateCartStatus = async (req, res) => {
    try {
        const email = req.user.email;
        const { estatus } = req.body;

        if (!["pagado", "no_pagado"].includes(estatus)) {
            return res.status(400).json({ message: "Estatus no válido" });
        }

        const carrito = await findOrCreateCart(email);

        carrito.estatus = estatus;
        await carrito.save();

        res.status(200).json({ message: `Estado del carrito actualizado a ${estatus}` });
    } catch (error) {
        console.error("Error al actualizar el estado del carrito:", error.message);
        res.status(500).json({ message: "Error al actualizar el estado del carrito" });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart,
    updateCartStatus,
};
