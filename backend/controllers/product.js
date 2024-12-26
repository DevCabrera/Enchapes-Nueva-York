const Producto = require("../models/MySql/product");

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
        const foto = req.file ? req.file.path : undefined;

        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        await producto.update({
            sku: sku || producto.sku,
            nombre: nombre || producto.nombre,
            ancho: ancho || producto.ancho,
            alto: alto || producto.alto,
            espesor: espesor || producto.espesor,
            peso_m2: peso_m2 || producto.peso_m2,
            foto: foto || producto.foto,
            precio_m2: precio_m2 || producto.precio_m2
        });

        return res.status(200).json({
            message: 'Producto actualizado exitosamente',
            data: producto
        });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        return res.status(500).json({
            error: 'Ocurrió un error al actualizar el producto'
        });
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

        const data = await Producto.findByPk(id);
        if (!data) {
            return res.status(404).json({ message: "Producto no existente" });
        }

        await data.destroy();

        res.status(200).json({ message: "producto eliminado" });
    } catch (error) {
        res.status(500).json({ error: `Error al eliminar el producto: ${id}` });
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
