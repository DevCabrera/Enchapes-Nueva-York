const express = require('express');
const router = express.Router();
const passport = require('../config/passPort');
const { OAuth2Client } = require('google-auth-library'); // Importar google-auth-library correctamente
const Users = require("../models/MySql/users");
const { loginUser, verifyAuth } = require('../controllers/auth');
const { verifyToken, isAdmin } = require('../middlewares/authMiddlerawe');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
    res.redirect('http://localhost:5173'); // Redirigir a la página principal después del inicio de sesión exitoso.
});

// Ruta para manejar el token enviado desde el frontend
router.post('/google', async (req, res) => {
    const { tokenId } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        const { email, name, family_name } = payload; // Ya no extraemos `picture`

        let user = await Users.findOne({ where: { email } });
        if (!user) {
            user = await Users.create({
                email,
                nombre: name,
                apellido: family_name,
                password: null,
                id_tipo_usuario: 2,
            });
        }

        // Iniciar sesión del usuario (esto puede variar dependiendo de cómo manejes las sesiones)
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al iniciar sesión' });
            }
            return res.json({ message: 'Inicio de sesión exitoso' });
        });
    } catch (error) {
        console.error('Error al verificar el token de Google:', error);
        res.status(400).json({ message: 'Token inválido' });
    }
});

module.exports = router;
