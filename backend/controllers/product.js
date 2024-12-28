const Producto = require("../models/MySql/product");
const cloudinary = require('cloudinary').v2;
/**
 * Método para obtener todos los productos
 * @param {*} req
 * @param {*} res
 */
const getProducts = async (req, res) => {
    try {
        const data = await Producto.findAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "ERROR AL OBTENER LOS PRODUCTOS" });
    }
};

/**
 * Método para obtener un producto por su sku en vez de la id
 * @param {*} req
 * @param {*} res
 */
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Producto.findOne({ where: { sku: id } });

        if (!data) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto" });
    }
};

/**
 * Método para crear un producto
 * @param {*} req
 * @param {*} res
 */
const createProduct = async (req, res) => {
    try {
        const { sku, nombre, ancho, alto, espesor, peso_m2, precio_m2 } = req.body;
        const foto = req.file ? req.file.path : undefined;
        if (!sku || !nombre || !ancho || !alto || !espesor || !peso_m2 || !precio_m2) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios, excepto la foto.' });
        }
        const nuevoProducto = await Producto.create({
            sku,
            nombre,
            ancho,
            alto,
            espesor,
            peso_m2,
            foto,
            precio_m2
        });
        return res.status(201).json({ message: 'Producto creado exitosamente', data: nuevoProducto });
    } catch (error) { console.error('Error al crear el producto:', error); return res.status(500).json({ error: 'Ocurrió un error al crear el producto' }); }
};

/**
 * Método para actualizar un producto
 * @param {*} req
 * @param {*} res
 */
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { sku, nombre, ancho, alto, espesor, peso_m2, precio_m2 } = req.body;
        const foto = req.file ? req.file.path : null;

        const product = await Producto.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        if (foto) {
            // Eliminar la imagen anterior de Cloudinary si existe
            const publicId = product.foto ? product.foto.split('/').slice(-2).join('/').split('.')[0] : null;
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
            // Actualizar la imagen con la nueva URL
            product.foto = foto;
        }

        await product.update({ sku, nombre, ancho, alto, espesor, peso_m2, precio_m2, foto: product.foto || product.foto });

        res.status(200).json({ message: "Producto actualizado correctamente", data: product });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
};
/**
 * Método para eliminar un producto
 * @param {*} req
 * @param {*} res
 */
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`intentado deletear con: ${id}`);
        const product = await Producto.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Eliminar la imagen de Cloudinary si existe
        if (product.foto) {
            const publicId = product.foto.split('/').slice(-2).join('/').split('.')[0];
            console.log(`Deleting image from Cloudinary with publicId: ${publicId}`);
            const result = await cloudinary.uploader.destroy(publicId);
            console.log(`Cloudinary deletion result: ${JSON.stringify(result)}`);
        }

        await product.destroy();
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
