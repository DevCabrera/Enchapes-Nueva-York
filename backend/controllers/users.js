const Users = require("../models/MySql/users");
const TipoUsuario = require("../models/MySql/userRol");
/**
 * Método para obtener todos los usuarios
 * @param {*} req
 * @param {*} res
 */
const getUsers = async (req, res) => {
    try {
        // Verificar si el usuario es admin
        if (req.user.id_tipo_usuario !== 1) {
            return res.status(403).json({ message: "No tienes permiso para acceder a esta información" });
        }

        // Obtener todos los usuarios
        const users = await Users.findAll({
            attributes: ['email', 'nombre', 'apellido'],
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
};

/**
 * Método para obtener un usuario por su ID
 * @param {*} req
 * @param {*} res
 */
const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        console.log("Email recibido:", email);
        const user = await Users.findOne({
            where: { email },
            attributes: ['email', 'nombre', 'apellido'],
            include: {
                model: TipoUsuario,
                as: "tipoUsuario", // llamamos la relacion por su alias
                attributes: ['nombre'],
            },
        });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error al buscar el usuario:", error);
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
};

/**
 * Método para crear un nuevo usuario
 * @param {*} req
 * @param {*} res
 */

const createUser = async (req, res) => {
    try {
        console.log("Datos recibidos en el backend:", req.body);

        const { email, nombre, apellido, password } = req.body;

        if (!email || !nombre || !apellido || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }
        if (password.length < 6 || password.length > 16) {
            return res.status(400).json({ message: "La contraseña debe tener entre 6 y 16 caracteres." });
        }
        
        const id_tipo_usuario = req.body.id_tipo_usuario || 2;

        const newUser = await Users.create({
            email,
            nombre,
            apellido,
            password,
            id_tipo_usuario,
        });

        res.status(201).json({
            message: "Usuario creado exitosamente",
            user: {
                email: newUser.email,
                nombre: newUser.nombre,
                apellido: newUser.apellido,
            },
        });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ error: "Error al crear el usuario" });
    }
};

/**
 * Método para actualizar un usuario
 * @param {*} req
 * @param {*} res
 */
const updateUser = async (req, res) => {
    try {
        const { email } = req.params;
        const { nombre, apellido, password, id_tipo_usuario } = req.body;

        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Actualizamos los campos
        await user.update({
            nombre: nombre || user.nombre,
            apellido: apellido || user.apellido,
            password: password || user.password,
            id_tipo_usuario: id_tipo_usuario || user.id_tipo_usuario,
        });

        res.status(200).json({
            message: "Usuario actualizado exitosamente",
            user: {
                email: user.email,
                nombre: user.nombre,
                apellido: user.apellido,
                nuevoRol: user.id_tipo_usuario
            },
        });
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
};



/**
 * Método para eliminar un usuario
 * @param {*} req
 * @param {*} res
 */
const deleteUser = async (req, res) => {
    try {
        const { email } = req.params;

        const user = await Users.findOne({ where: { email } }); // buscaremos por email
        console.log("Email recibido para eliminación:", req.params.email);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await user.destroy();
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
};

module.exports = {
    getUsers,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
};
