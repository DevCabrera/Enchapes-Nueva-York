const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/authMiddlerawe');
const upload = require('../middlewares/upload');
const { getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct } = require('../controllers/product');

// Ruta para obtener todos los productos
router.get('/', getProducts);

// Ruta para obtener un producto por su SKU en vez de la id
router.get('/:id', getProduct);

// Ruta para crear un nuevo producto
router.post('/', verifyToken, isAdmin, upload.array('fotos', 5), createProduct);

// Ruta para actualizar un producto
router.put('/:id', verifyToken, isAdmin, upload.array('fotos', 5), updateProduct);

// Ruta para eliminar un producto
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

module.exports = router;
