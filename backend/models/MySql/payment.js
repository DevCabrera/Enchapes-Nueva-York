const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");
const crypto = require("crypto");

function generateRandomPaymentID() {
    return '#' + crypto.randomBytes(3).toString('hex').toUpperCase();
}

const Pago = sequelize.define("pago", {
    id_pago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_pago_azar: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: generateRandomPaymentID,
    },
    id_carro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "carro",
            key: "id_carro",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    id_direccion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "direccion",
            key: "id_direccion",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    comprobante: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM("pendiente", "verificado", "rechazado"),
        defaultValue: "pendiente",
    },
    estado_envio: {
        type: DataTypes.ENUM("pendiente", "enviado", "entregado"),
        defaultValue: "pendiente",
    },
});

module.exports = Pago;