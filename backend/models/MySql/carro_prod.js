const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

const CarroProd = sequelize.define(
    "carro_prod",
    {
        id_carro_prod: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_carro: {
            type: DataTypes.INTEGER,
            allowNull: false, // Obligatorio
        },
        id_producto: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        subtotal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);



module.exports = CarroProd;
