const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

const Pago = sequelize.define("pago", {
    id_pago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
});

module.exports = Pago;
