const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");
const CarroProd = require("./carro_prod");

const Carrito = sequelize.define(
    "carro",
    {
        id_carro: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.0,
        },
        estatus: {
            type: DataTypes.ENUM("pagado", "no_pagado"),
            allowNull: false,
            defaultValue: "no_pagado",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);



module.exports = Carrito;
