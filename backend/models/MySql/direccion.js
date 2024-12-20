const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

const Direccion = sequelize.define(
    "direccion",
    {
        id_direccion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        favorita: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false, // Por defecto, ninguna dirección es favorita
        },
    },
    {
        timestamps: true,
        freezeTableName: true, // Evita que Sequelize pluralice o cambie el nombre

    }
);

// Relaciones

module.exports = Direccion;
