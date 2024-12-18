const TipoUsuario = require("../models/MySql/userRol");

/**
 * Método para obtener todos los tipos de usuario
 * @param {*} req
 * @param {*} res
 */
const getUsuarios = async (req, res) => {
  try {
    // Usamos el modelo TipoUsuario para buscar todos los registros en la tabla
    const data = await TipoUsuario.findAll();
    // Enviamos los datos obtenidos al cliente con el código HTTP 200
    res.status(200).json(data);
  } catch (error) {
    // En caso de error, enviamos un mensaje indicando el problema
    res.status(500).json({ error: "Error al obtener los tipos de usuario" });
  }
};

/**
 * Método para obtener un tipo de usuario por su ID
 * @param {*} req
 * @param {*} res
 */
const getUsuarioById = async (req, res) => {
  try {
    // Obtenemos el ID desde los parámetros de la URL
    const { id } = req.params;
    // Buscamos un tipo de usuario con el ID proporcionado
    const data = await TipoUsuario.findOne({ where: { id_tipo_usuario: id } });

    // Validamos si el registro existe 
    if (!data) {
      return res.status(404).json({ message: "Tipo de usuario no encontrado" });
    }

    // Enviamos el registro encontrado al cliente
    res.status(200).json(data);
  } catch (error) {
    // Manejamos errores inesperados
    res.status(500).json({ error: "Error al obtener el tipo de usuario" });
  }
};

/**
 * Método para crear un nuevo tipo de usuario
 * @param {*} req
 * @param {*} res
 */
const createUsuario = async (req, res) => {
  try {
    // Obtenemos los datos enviados por el cliente desde el cuerpo de la solicitud
    const { nombre } = req.body;

    // Validamos que el nombre no esté vacío
    if (!nombre) {
      return res.status(400).json({ message: "El nombre es requerido" });
    }

    // Creamos un nuevo registro en la tabla TipoUsuario
    const data = await TipoUsuario.create({ nombre });

    // Enviamos la respuesta con el registro creado y el código HTTP 201
    res.status(201).json(data);
  } catch (error) {
    // Manejamos errores de base de datos o validación
    res.status(500).json({ error: "Error al crear el tipo de usuario" });
  }
};

/**
 * Método para actualizar un tipo de usuario existente
 * @param {*} req
 * @param {*} res
 */
const updateUsuario = async (req, res) => {
  try {
    // Obtenemos el ID desde los parámetros de la URL
    const { id } = req.params;
    // Obtenemos los datos enviados por el cliente desde el cuerpo de la solicitud
    const { nombre } = req.body;

    // Validamos que el nombre no esté vacío
    if (!nombre) {
      return res.status(400).json({ message: "El nombre es requerido" });
    }

    // Buscamos el registro a actualizar
    const data = await TipoUsuario.findByPk(id);
    if (!data) {
      return res.status(404).json({ message: "Tipo de usuario no encontrado" });
    }

    // Actualizamos el registro con los datos proporcionados
    data.nombre = nombre;
    await data.save();

    // Enviamos la respuesta con el registro actualizado
    res.status(200).json(data);
  } catch (error) {
    // Manejamos errores de base de datos o validación
    res.status(500).json({ error: "Error al actualizar el tipo de usuario" });
  }
};

/**
 * Método para eliminar un tipo de usuario
 * @param {*} req
 * @param {*} res
 */
const deleteUsuario = async (req, res) => {
  try {
    // Obtenemos el ID desde los parámetros de la URL
    const { id } = req.params;

    // Buscamos el registro a eliminar
    const data = await TipoUsuario.findByPk(id);
    if (!data) {
      return res.status(404).json({ message: "Tipo de usuario no encontrado" });
    }

    // Eliminamos el registro
    await data.destroy();

    // Enviamos una respuesta indicando éxito
    res.status(200).json({ message: "Tipo de usuario eliminado correctamente" });
  } catch (error) {
    // Manejamos errores de base de datos o validación
    res.status(500).json({ error: "Error al eliminar el tipo de usuario" });
  }
};

module.exports = {
  getUsuarios,
  createUsuario,
  getUsuarioById,
  updateUsuario,
  deleteUsuario
};
