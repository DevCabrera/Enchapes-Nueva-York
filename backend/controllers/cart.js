const Carrito = require("../models/MySql/cart");
const CarroProd = require("../models/MySql/carro_prod");
const Producto = require("../models/MySql/product");

// Obtener el carrito del usuario autenticado
const getCart = async (req, res) => {
    try {
        const email = req.user.email;
        let carrito = await Carrito.findOne({
            where: { email },
            include: {
                model: CarroProd,
                as: "productos",
                include: {
                    model: Producto,
                    as: "producto",
                },
            },
        });

        if (!carrito) {
            // Si el usuario no tiene un carrito, crear uno vacío
            carrito = await Carrito.create({ email });
        }

        res.status(200).json(carrito);
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        res.status(500).json({ message: "Error al obtener el carrito" });
    }
};

// Agregar un producto al carrito
const addToCart = async (req, res) => {
    try {
        const email = req.user.email;
        const { id_producto, cantidad } = req.body;

        let carrito = await Carrito.findOne({ where: { email } });

        if (!carrito) {
            carrito = await Carrito.create({ email });
        }

        let producto = await Producto.findByPk(id_producto);

        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        let productoEnCarrito = await CarroProd.findOne({
            where: { id_carrito: carrito.id_carrito, id_producto },
        });

        if (productoEnCarrito) {
            productoEnCarrito.cantidad += cantidad;
            productoEnCarrito.subtotal += cantidad * producto.precio_m2;
            await productoEnCarrito.save();
        } else {
            await CarroProd.create({
                id_carrito: carrito.id_carrito,
                id_producto,
                cantidad,
                subtotal: cantidad * producto.precio_m2,
            });
        }

        res.status(200).json({ message: "Producto agregado al carrito" });
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
        res.status(500).json({ message: "Error al agregar producto al carrito" });
    }
};



// Actualizar la cantidad de un producto en el carrito
const updateCart = async (req, res) => {
    try {
        const email = req.user.email;
        const { id_producto, cantidad } = req.body;

        let carrito = await Carrito.findOne({ where: { email } });
        let productoEnCarrito = await CarroProd.findOne({
            where: { id_carrito: carrito.id_carrito, id_producto },
        });

        if (!productoEnCarrito) {
            return res.status(404).json({ message: "Producto no encontrado en el carrito" });
        }

        let producto = await Producto.findByPk(id_producto);

        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        productoEnCarrito.cantidad = cantidad;
        productoEnCarrito.subtotal = cantidad * producto.precio_m2;
        await productoEnCarrito.save();

        res.status(200).json({ message: "Producto actualizado en el carrito" });
    } catch (error) {
        console.error("Error al actualizar producto en el carrito:", error);
        res.status(500).json({ message: "Error al actualizar producto en el carrito" });
    }
};


// Eliminar un producto del carrito
const removeFromCart = async (req, res) => {
    try {
        const email = req.user.email;
        const { id_producto } = req.body;

        let carrito = await Carrito.findOne({ where: { email } });
        let productoEnCarrito = await CarroProd.findOne({
            where: { id_carrito: carrito.id_carrito, id_producto },
        });

        if (!productoEnCarrito) {
            return res.status(404).json({ message: "Producto no encontrado en el carrito" });
        }

        await productoEnCarrito.destroy();

        res.status(200).json({ message: "Producto eliminado del carrito" });
    } catch (error) {
        console.error("Error al eliminar producto del carrito:", error);
        res.status(500).json({ message: "Error al eliminar producto del carrito" });
    }
};

// Vaciar el carrito
const clearCart = async (req, res) => {
    try {
        const email = req.user.email;

        let carrito = await Carrito.findOne({ where: { email } });
        await CarroProd.destroy({ where: { id_carrito: carrito.id_carrito } });

        res.status(200).json({ message: "Carrito vaciado" });
    } catch (error) {
        console.error("Error al vaciar el carrito:", error);
        res.status(500).json({ message: "Error al vaciar el carrito" });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart,
};
