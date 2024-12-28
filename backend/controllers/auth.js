const Users = require("../models/MySql/users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Función para manejar el login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Crear el token JWT
        const token = jwt.sign({
            email: user.email,
            id_tipo_usuario: user.id_tipo_usuario
        }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Configurar la cookie con opciones seguras
        res.cookie("authToken", token, {
            httpOnly: true, // Solo accesible desde el servidor
            secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
            sameSite: "strict", // Protege contra ataques CSRF
            maxAge: 60 * 60 * 1000, // 1 hora
        });

        res.status(200).json({
            message: "Inicio de sesión exitoso",
            user: {
                email: user.email,
                nombre: user.nombre,
                apellido: user.apellido,
                id_tipo_usuario: user.id_tipo_usuario // Incluye el tipo de usuario en la respuesta
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
