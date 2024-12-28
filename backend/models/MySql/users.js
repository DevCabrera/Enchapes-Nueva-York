const TipoUsuario = require("./userRol");
const Direccion = require("./direccion");
const Carrito = require("./cart");

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/mysql');
const bcrypt = require('bcryptjs');

const Users = sequelize.define('usuario', {
    email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    celular: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    id_tipo_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
    freezeTableName: true,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            // Verificar si el campo "password" ha cambiado antes de encriptarlo con el campo changed
            if (user.changed("password")) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
    },
});


// Relaciones
Users.belongsTo(TipoUsuario, {
    foreignKey: "id_tipo_usuario", // Campo en la tabla Usuario
    as: "tipoUsuario",
});

Users.hasMany(Direccion, {
    foreignKey: "email", // Cambiamos de "email_usuario" a "email"
    as: "direcciones",
});
Direccion.belongsTo(Users, {
    foreignKey: "email", // Relación inversa, usando "email"
    as: "usuario",
});
Users.hasOne(Carrito, {
    foreignKey: "email", // Llave foránea en Carrito
    as: "carrito",
});

module.exports = Users;
