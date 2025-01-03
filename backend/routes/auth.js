const express = require('express');
const router = express.Router();
const passport = require('../config/passPort');
const { authenticateGoogleUser, updatePassword } = require('../controllers/GoogleController');
const { loginUser, verifyAuth } = require('../controllers/auth');
const { verifyToken, isAdmin } = require('../middlewares/authMiddlerawe');

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para verificar la autenticación (sólo para usuarios autenticados)
router.get('/check-auth', verifyToken, verifyAuth);

// Ruta para una función que sólo los administradores pueden acceder
router.get('/admin-only', verifyToken, isAdmin, (req, res) => {
    res.status(200).json({ message: "Acceso permitido: eres un administrador" });
});

// Ruta para iniciar la autenticación con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta para manejar el callback de Google
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('http://localhost:5173');
});

// Ruta para manejar el token enviado desde el frontend
router.post('/google', authenticateGoogleUser);

// Ruta para actualizar la contraseña
router.post('/set-password', verifyToken, updatePassword);

module.exports = router;
