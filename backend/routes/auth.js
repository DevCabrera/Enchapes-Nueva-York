const express = require('express');
const router = express.Router();
const passport = require('../config/passPort');
const { authenticateGoogleUser, updatePassword } = require('../controllers/GoogleController');
const { loginUser, verifyAuth } = require('../controllers/auth');
const { verifyToken, isAdmin } = require('../middlewares/authMiddlerawe');

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para verificar la autenticación (sólo para usuarios autenticados)
router.get('/check-auth', verifyToken, verifyAuth, (req, res) => {
    res.status(200).json({ user: req.user });
});
//Ruta para cerrar la sesion xddd
router.get('/logout', (req, res) => {
    console.log("Cerrando sesión para el usuario:", req.user || "No autenticado");
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    });
    res.status(200).json({ message: 'Sesión cerrada con éxito' });
});


// Ruta para una función que sólo los administradores pueden acceder
router.get('/admin-only', verifyToken, isAdmin, (req, res) => {
    res.status(200).json({ message: "Acceso permitido: eres un administrador" });
});

// Ruta para iniciar la autenticación con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta para manejar el callback de Google
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    const token = req.user.token; // Asume que el token JWT está en req.user.token

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24, // 1 día
    });

    res.redirect('http://localhost:5173'); // Redirige al frontend después de establecer la cookie
});


// Ruta para manejar el token enviado desde el frontend
router.post('/google', authenticateGoogleUser);

// Ruta para actualizar la contraseña
router.post('/set-password', verifyToken, updatePassword);

module.exports = router;
