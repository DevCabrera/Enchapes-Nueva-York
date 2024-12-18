const { DataTypes } = require('sequelize');
const sequelize = require('../../config/mysql');

const Contacto = sequelize.define(
    "contacto",
    {
        id_contact: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombres: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true, // Validación para asegurar que sea un correo válido
            },
        },
        comentario: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        asunto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
    timestamps: true, // Para agregar createdAt y updatedAt automáticamente
    freezeTableName: true, // Evita que Sequelize pluralice o cambie el nombre

});

module.exports = Contacto;
