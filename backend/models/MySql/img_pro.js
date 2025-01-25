const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

const ImgPro = sequelize.define(
    "img_pro",
    {
        id_imgpro: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_producto: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        public_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = ImgPro;
