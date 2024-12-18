const express = require('express');
const router = express.Router();
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

module.exports = router;
