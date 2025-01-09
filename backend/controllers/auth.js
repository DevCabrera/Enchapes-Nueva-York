const Users = require("../models/MySql/users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TipoUsuario = require("../models/MySql/userRol");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({
            where: { email },
            include: {
                model: TipoUsuario,
                as: "tipoUsuario",
                attributes: ["nombre"],
            },
        });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({
            email: user.email,
            id_tipo_usuario: user.id_tipo_usuario
        }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false, // `false` en desarrollo
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24, // 1 día en milisegundos
        });


        res.status(200).json({
            message: "Inicio de sesión exitoso",
            user: {
                email: user.email,
                nombre: user.nombre,
                apellido: user.apellido,
                id_tipo_usuario: user.id_tipo_usuario,
                tipo_usuario: user.tipoUsuario?.nombre || null,
            }
        });

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
};


const verifyAuth = (req, res) => {
    if (req.user) {
        res.status(200).json({ user: req.user });
    } else {
        res.status(401).json({ message: "No autenticado" });
    }
};


module.exports = { loginUser, verifyAuth };
