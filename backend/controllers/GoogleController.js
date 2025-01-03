const { OAuth2Client } = require('google-auth-library');
const Users = require("../models/MySql/users");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authenticateGoogleUser = async (req, res) => {
    const { tokenId } = req.body;

    if (!tokenId) {
        return res.status(400).json({ message: 'TokenId es requerido' });
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        const { email, name, family_name } = payload;

        let user = await Users.findOne({ where: { email } });
        let newUser = false;

        if (!user) {
            user = await Users.create({
                email,
                nombre: name,
                apellido: family_name,
                password: 'TEMPORARY_PASSWORD', // Asignar una contraseña temporal
                id_tipo_usuario: 2,
            });
            newUser = true; // Marcar como nuevo usuario
        }

        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al iniciar sesión' });
            }
            return res.json({ message: 'Inicio de sesión exitoso', user, newUser });
        });
    } catch (error) {
        console.error('Error al verificar el token de Google:', error);
        res.status(400).json({ message: 'Token inválido' });
    }
};

const updatePassword = async (req, res) => {
    const { password } = req.body;

    try {
        // Asumiendo que `verifyToken` agrega el usuario autenticado a `req.user`
        await Users.update({ password }, { where: { id: req.user.id } });
        res.json({ message: 'Contraseña establecida exitosamente' });
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        res.status(500).json({ message: 'Error al actualizar la contraseña' });
    }
};

module.exports = {
    authenticateGoogleUser,
    updatePassword,
};
