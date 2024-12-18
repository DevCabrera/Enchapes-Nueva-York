const jwt = require('jsonwebtoken');

/**
 * Middleware para verificar el token JWT
 */
const verifyToken = (req, res, next) => {
    // Obtener el token de los headers

    const token = req.cookies.authToken; // Extraer el token de la cookie

    // Verificar si el token fue proporcionado
    if (!token) {
        return res.status(401).json({ message: "Acceso denegado, token no proporcionado" });
    }

    try {
        // Verificar el token con la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Adjuntar la información del usuario al request
        req.user = decoded;

        // Continuar al siguiente middleware o controlador
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};
const isAdmin = (req, res, next) => { 
    if (req.user && req.user.id_tipo_usuario === 1) 
        { next(); } 
    else { 
        return res.status(403).json({ message: "Acceso denegado, se requiere rol de administrador" }); 
    } 
};

module.exports = { isAdmin, verifyToken };
