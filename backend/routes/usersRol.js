const express = require("express");
const {
    getUsuarios,
    createUsuario,
    getUsuarioById,
    updateUsuario,
    deleteUsuario
} = require("../controllers/usersRol");

const router = express.Router();

// CRUD
router.get("/", getUsuarios); // Obtener todos los usuarios
router.get("/:id", getUsuarioById); // Obtener un usuario por ID
router.post("/", createUsuario); // Crear un nuevo usuario
router.put("/:id", updateUsuario); // Actualizar un usuario existente
router.delete("/:id", deleteUsuario); // Eliminar un usuario

module.exports = router;
