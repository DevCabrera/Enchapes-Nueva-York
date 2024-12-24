const Direccion = require("../models/MySql/direccion");
const Users = require("../models/MySql/users");

// Crear una nueva dirección
const createDireccion = async (req, res) => {
    try {
        const { email } = req.params; // Extraer el email del parámetro
        const { direccion, favorita } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email no proporcionado" });
        }

        const user = await Users.findByPk(email);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if (favorita) {
            await Direccion.update({ favorita: false }, { where: { email } });
        }

        const newDireccion = await Direccion.create({
            direccion,
            favorita,
            email,
        });

        res.status(201).json(newDireccion);
    } catch (error) {
        console.error("Error al crear dirección:", error);
        res.status(500).json({ error: "Error al crear la dirección" });
    }
};


// Obtener todas las direcciones de un usuario
const getDirecciones = async (req, res) => {
    try {
        const { email } = req.params;

        const direcciones = await Direccion.findAll({
            where: { email },
            attributes: ["id_direccion", "direccion", "favorita"],
        });

        res.status(200).json(direcciones);
    } catch (error) {
        console.error("Error al obtener direcciones:", error);
        res.status(500).json({ error: "Error al obtener las direcciones" });
    }
};



// Actualizar una dirección (incluyendo favorita)
const updateDireccion = async (req, res) => {
    try {
        const { id } = req.params;
        const { direccion, favorita } = req.body;

        const dir = await Direccion.findByPk(id);
        if (!dir) {
            return res.status(404).json({ message: "Dirección no encontrada" });
        }

        // Si se marca como favorita, desmarcar otras favoritas
        if (favorita) {
            await Direccion.update({ favorita: false }, { where: { email: dir.email } });
        }

        await dir.update({ direccion, favorita });

        res.status(200).json(dir);
    } catch (error) {
        console.error("Error al actualizar dirección:", error);
        res.status(500).json({ error: "Error al actualizar la dirección" });
    }
};


// Eliminar una dirección
const deleteDireccion = async (req, res) => {
    try {
        const { id } = req.params;

        const dir = await Direccion.findByPk(id);
        if (!dir) {
            return res.status(404).json({ message: "Dirección no encontrada" });
        }

        await dir.destroy();
        res.status(200).json({ message: "Dirección eliminada exitosamente" });
    } catch (error) {
        console.error("Error al eliminar dirección:", error);
        res.status(500).json({ error: "Error al eliminar la dirección" });
    }
};


module.exports = {
    createDireccion,
    getDirecciones,
    updateDireccion,
    deleteDireccion,
};
