const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

const TipoUsuario = sequelize.define(
    "tipo_usuario",
    {
        id_tipo_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false, 
        freezeTableName: true, // Evita que Sequelize pluralice o cambie el nombre

    }
);

module.exports = TipoUsuario;
