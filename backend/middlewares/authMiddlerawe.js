const jwt = require('jsonwebtoken');

/**
 * Middleware para verificar el token JWT almacenado en cookies.
 */
const verifyToken = (req, res, next) => {
    //console.log("Cookies recibidas:", req.cookies);
    const token = req.cookies?.authToken;
    //console.log("mi AuthToken", token)
    if (!token) {
        console.error("Token no encontrado en las cookies");
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
      //  console.log("body del decoded('descriptada')", decoded)
        next();
    } catch (error) {
        console.error("Error al verificar el token:", error.message);
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};

/**
 * Middleware para verificar si el usuario tiene rol de administrador.
 */
const isAdmin = (req, res, next) => {
    if (req.user && req.user.id_tipo_usuario === 1) {
        // El usuario es administrador, continuar
        next();
    } else {
        // El usuario no tiene rol de administrador
        return res.status(403).json({ message: "Acceso denegado: se requiere rol de administrador" });
    }
};

module.exports = { verifyToken, isAdmin };
