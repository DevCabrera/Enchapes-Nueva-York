const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

const Gallery = sequelize.define(
    "gallery",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            },
        },
        public_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true, 
        freezeTableName: true, 
    }
);

module.exports = Gallery;
