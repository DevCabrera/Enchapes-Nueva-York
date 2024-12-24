const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddlerawe');
const {
    createDireccion,
    getDirecciones,
    updateDireccion,
    deleteDireccion,
} = require('../controllers/address');

// Crear una nueva dirección
router.post('/:email', verifyToken, createDireccion);

// Obtener todas las direcciones de un usuario
router.get('/:email', verifyToken, getDirecciones);

// Actualizar una dirección
router.put('/:id', verifyToken, updateDireccion);

// Eliminar una dirección
router.delete('/:id', verifyToken, deleteDireccion);

module.exports = router;
