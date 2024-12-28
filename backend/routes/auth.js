const express = require('express');
const router = express.Router();
const { loginUser, verifyAuth } = require('../controllers/auth');
const { verifyToken, isAdmin } = require('../middlewares/authMiddlerawe');
const passport = require('passport');

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para verificar la autenticación (sólo para usuarios autenticados)
router.get('/check-auth', verifyToken, verifyAuth);

// Ruta para una función que sólo los administradores pueden acceder
router.get('/admin-only', verifyToken, isAdmin, (req, res) => {
    res.status(200).json({ message: "Acceso permitido: eres un administrador" });
});

// google Login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/'); // Redirigir a la página principal después del inicio de sesión exitoso.
});

module.exports = router;
