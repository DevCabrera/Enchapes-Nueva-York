const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

const Oferta = sequelize.define(
    "ofertas",
    {
        id_offer: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_producto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "producto",
                key: "id_producto",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        precio_oferta: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        porcentaje_descuento: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        fecha_fin: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        activa: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        timestamps: true,
        freezeTableName: true,
    }
);

module.exports = Oferta;
