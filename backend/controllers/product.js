const Producto = require("../models/MySql/product");
const ImgPro = require("../models/MySql/img_pro");
const cloudinary = require('cloudinary').v2;

/**
 * Método para obtener todos los productos
 * @param {*} req
 * @param {*} res
 */
const getProducts = async (req, res) => {
    try {
        const data = await Producto.findAll({
            include: { model: ImgPro, as: 'imagenes' }
        });
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
        const data = await Producto.findOne({
            where: { sku: id },
            include: { model: ImgPro, as: 'imagenes' }
        });

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

        if (!sku || !nombre || !ancho || !alto || !espesor || !peso_m2 || !precio_m2) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        // Crear el producto
        const nuevoProducto = await Producto.create({
            sku,
            nombre,
            ancho,
            alto,
            espesor,
            peso_m2,
            precio_m2
        });

        // Subir imágenes y asociarlas al producto
        if (req.files) {
            const imageUploadPromises = req.files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'products',
                });
                return ImgPro.create({
                    id_producto: nuevoProducto.id_producto,
                    url: result.secure_url,
                    public_id: result.public_id,
                });
            });

            await Promise.all(imageUploadPromises);
        }

        return res.status(201).json({ message: 'Producto creado exitosamente', data: nuevoProducto });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        return res.status(500).json({ error: 'Ocurrió un error al crear el producto' });
    }
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

        const product = await Producto.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Actualizar el producto
        await product.update({ sku, nombre, ancho, alto, espesor, peso_m2, precio_m2 });

        // Si hay nuevas imágenes, subirlas y asociarlas al producto
        if (req.files.length > 0) {
            // Eliminar las imágenes antiguas del producto
            const existingImages = await ImgPro.findAll({ where: { id_producto: id } });
            const deletePromises = existingImages.map(async (image) => {
                await cloudinary.uploader.destroy(image.public_id);
                await image.destroy();
            });
            await Promise.all(deletePromises);

            // Subir nuevas imágenes
            const imageUploadPromises = req.files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'products',
                });
                return ImgPro.create({
                    id_producto: id,
                    url: result.secure_url,
                    public_id: result.public_id,
                });
            });
            await Promise.all(imageUploadPromises);
        }

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
        const product = await Producto.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Eliminar las imágenes del producto de Cloudinary
        const images = await ImgPro.findAll({ where: { id_producto: id } });
        const deletePromises = images.map(async (image) => {
            await cloudinary.uploader.destroy(image.public_id);
            await image.destroy();
        });
        await Promise.all(deletePromises);

        // Eliminar el producto
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
