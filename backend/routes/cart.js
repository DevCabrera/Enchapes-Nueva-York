const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCart, removeFromCart, clearCart, updateCartStatus } = require('../controllers/cart');
const { verifyToken } = require('../middlewares/authMiddlerawe');

// Obtener el carrito del usuario autenticado
router.get('/', verifyToken, getCart);

// Agregar un producto al carrito
router.post('/add', verifyToken, addToCart);

// Actualizar la cantidad de un producto en el carrito
router.put('/update', verifyToken, updateCart);

// Eliminar un producto del carrito
router.delete('/remove', verifyToken, removeFromCart);

// Vaciar el carrito
router.delete('/clear', verifyToken, clearCart);

//status carro
router.put('/status', verifyToken, updateCartStatus);


module.exports = router;
