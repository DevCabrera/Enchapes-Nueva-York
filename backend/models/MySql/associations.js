const Carrito = require("./cart");
const CarroProd = require("./carro_prod");
const Producto = require("./product");
const Pago = require("./payment");

// Configurar relaciones
Carrito.hasMany(CarroProd, { foreignKey: "id_carro", as: "productos" });
CarroProd.belongsTo(Carrito, { foreignKey: "id_carro", as: "carrito" });
CarroProd.belongsTo(Producto, { foreignKey: "id_producto", as: "producto" });



//pago
Carrito.hasOne(Pago, { foreignKey: "id_carro", as: "pago" });
Pago.belongsTo(Carrito, { foreignKey: "id_carro", as: "carro" });

module.exports = { Carrito, CarroProd, Producto };
