const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

const Carrito = sequelize.define(
    "carro",
    {
        id_carrito: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        estatus: {
            type: DataTypes.ENUM("pendiente", "pagado", "cancelado"),
            defaultValue: "pendiente",
        },
    },
    {
        timestamps: true,
        freezeTableName: true, // Evita que Sequelize pluralice o cambie el nombre

    }
);

module.exports = Carrito;
