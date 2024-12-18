const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

const Producto = sequelize.define(
    "producto",
    {
        id_producto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sku: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Cada SKU debe ser único
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        precio_m2: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ancho: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        alto: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        espesor: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        peso_m2: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        foto: {
            type: DataTypes.STRING,
            allowNull: true, // opcional de momento
            validate: {
                isUrl: true, // Asegura que sea una URL válida
            },
        },
    },
    {
        timestamps: false, // Incluye createdAt y updatedAt
        freezeTableName: true, // Evita que Sequelize pluralice o cambie el nombre

    }
);



module.exports = Producto;
