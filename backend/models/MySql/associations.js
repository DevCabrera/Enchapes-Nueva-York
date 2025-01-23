const Carrito = require("./cart");
const CarroProd = require("./carro_prod");
const Producto = require("./product");
const Pago = require("./payment");
const OrderDetails = require("./orders");

// Configurar relaciones
Carrito.hasMany(CarroProd, { foreignKey: "id_carro", as: "productos" });
CarroProd.belongsTo(Carrito, { foreignKey: "id_carro", as: "carrito" });
CarroProd.belongsTo(Producto, { foreignKey: "id_producto", as: "producto" });



//pago
Carrito.hasOne(Pago, { foreignKey: "id_carro", as: "pago" });
Pago.belongsTo(Carrito, { foreignKey: "id_carro", as: "carro" });


//Ordenes
// Relación entre Pago y OrderDetails
Pago.hasMany(OrderDetails, {
    as: "detalles",
    foreignKey: "id_pago",
});
OrderDetails.belongsTo(Pago, {
    as: "pago",
    foreignKey: "id_pago",
});

// Relación entre OrderDetails y Producto
OrderDetails.belongsTo(Producto, {
    as: "producto",
    foreignKey: "id_producto",
});
Producto.hasMany(OrderDetails, {
    as: "detalles",
    foreignKey: "id_producto",
});
module.exports = { Carrito, CarroProd, Producto, Pago, OrderDetails };
