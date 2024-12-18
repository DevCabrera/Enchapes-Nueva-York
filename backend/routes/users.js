const express = require('express');
const router = express.Router();
const {verifyToken, isAdmin} = require('../middlewares/authMiddlerawe');

const {
    getUsers,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/users');

// Ruta para obtener todos los usuarios (Solo para admins)
router.get('/', verifyToken, isAdmin, getUsers);
// Ruta para obtener un usuario por email (Solo para usuarios autenticados)
router.get('/:email', verifyToken, getUserByEmail);

// Ruta para crear un nuevo usuario (Pública)
router.post('/', createUser);

// Ruta para actualizar un usuario (Autenticados y con permisos)
router.put('/:email', verifyToken, updateUser);

// Ruta para eliminar un usuario (Solo admins)
router.delete('/:email', verifyToken, isAdmin, deleteUser);

module.exports = router;
