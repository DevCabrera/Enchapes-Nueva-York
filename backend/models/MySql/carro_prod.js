const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");
const Carrito = require("./cart");
const Producto = require("./product");

const CarroProd = sequelize.define(
    "carro_prod",
    {
        id_carro_prod: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1, // Por defecto, se agrega una unidad del producto
        },
        subtotal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        freezeTableName: true, // Evita que Sequelize pluralice o cambie el nombre

    }
);

// Relaciones de carrito a carro_prod y de producto a este
CarroProd.belongsTo(Carrito, {
    foreignKey: "id_carrito",
    as: "carrito",
});

CarroProd.belongsTo(Producto, {
    foreignKey: "id_producto",
    as: "producto",
});

module.exports = CarroProd;
