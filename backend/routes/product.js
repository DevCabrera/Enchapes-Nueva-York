const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product');

// Ruta para obtener todos los productos
router.get('/', getProducts);

// Ruta para obtener un producto por su SKU en ves de la id
router.get('/:id', getProduct);

// Ruta para crear un nuevo producto
router.post('/', createProduct);

// Ruta para actualizar un producto
router.put('/:id', updateProduct);

// Ruta para eliminar un producto
router.delete('/:id', deleteProduct);

module.exports = router;
