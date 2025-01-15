const Carrito = require("./cart");
const CarroProd = require("./carro_prod");
const Producto = require("./product");

// Configurar relaciones
Carrito.hasMany(CarroProd, { foreignKey: "id_carro", as: "productos" });
CarroProd.belongsTo(Carrito, { foreignKey: "id_carro", as: "carrito" });
CarroProd.belongsTo(Producto, { foreignKey: "id_producto", as: "producto" });

module.exports = { Carrito, CarroProd, Producto };
