const Producto = require("../models/MySql/product");



/**
 * Método para obtener todos los productros
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
 * Método para obtener un producto por su sku en ves de la id
 * @param {*} req
 * @param {*} res
 */
const getProduct = async (req, res) => {
    try {
        // Obtenemos el ID desde los parámetros de la URL
        const { id } = req.params;
        // Buscamos un producto por el sku
        const data = await Producto.findOne({ where: { sku: id } });

        // Validamos si el registro existe 
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
        // extraemos los datos que tendra el body
        const {
            sku,
            nombre,
            ancho,
            alto,
            espesor,
            peso_m2,
            foto,
            precio_m2
        } = req.body;

        // Validamos que todos los campos esten llamados y rellenados
        if (
            !sku ||
            !nombre ||
            !ancho ||
            !alto ||
            !espesor ||
            !peso_m2 ||
            !precio_m2
        ) {
            return res.status(400).json({
                error: 'Todos los campos son obligatorios, excepto la foto.'
            });
        }

        // Creamos el nuevo producto en la base de datos
        const nuevoProducto = await Producto.create({
            sku,
            nombre,
            ancho,
            alto,
            espesor,
            peso_m2,
            foto: foto || null,
            precio_m2
        });
        console.log("Modelo Producto:", Producto);

        // Respondemos con el producto creado
        return res.status(201).json({
            message: 'Producto creado exitosamente',
            data: nuevoProducto
        });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        return res.status(500).json({
            error: 'Ocurrió un error al crear el producto'
        });
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
        const {
            sku,
            nombre,
            ancho,
            alto,
            espesor,
            peso_m2,
            foto,
            precio_m2
        } = req.body;

        // Buscamos el producto en la base de datos
        const producto = await Producto.findByPk(id);

        // Si no existe, devolvemos un error
        if (!producto) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        // Actualizamos los campos del producto
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

        // Respondemos con el producto actualizado
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
        // Obtenemos el ID desde los parámetros de la URL
        const { id } = req.params;

        // Buscamos el registro a eliminar
        const data = await Producto.findByPk(id);
        if (!data) {
            return res.status(404).json({ message: "Producto no existente" });
        }

        // Eliminamos el registro
        await data.destroy();

        // Enviamos una respuesta indicando éxito
        res.status(200).json({ message: "producto eliminado" });
    } catch (error) {
        // Manejamos errores de base de datos o validación
        res.status(500).json({ error: `Error al eliminar el producto: ${id}` });
    }
};


module.exports =
{
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};