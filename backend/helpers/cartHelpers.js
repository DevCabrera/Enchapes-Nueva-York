const CarroProd = require("../models/MySql/carro_prod");
const Carrito = require("../models/MySql/cart");

const findOrCreateCart = async (email) => {
    let carrito = await Carrito.findOne({ where: { email } });
    if (!carrito) {
        carrito = await Carrito.create({ email, estatus: "no_pagado" });
    }
    return carrito;
};

const updateCartTotal = async (carrito) => {
    const total = await CarroProd.sum("subtotal", { where: { id_carro: carrito.id_carro } });
    carrito.total = total || 0;
    await carrito.save();
};

module.exports = {
    findOrCreateCart,
    updateCartTotal,
};
