const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

const OrderDetails = sequelize.define("order_details", {
    id_order_details: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_pago: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "pagos",
            key: "id_pago",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

module.exports = OrderDetails;
