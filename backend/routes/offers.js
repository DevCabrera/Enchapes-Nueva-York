const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middlewares/authMiddlerawe");
const {
    createOffer,
    updateOffer,
    deleteOffer,
    getOffers,
} = require("../controllers/offers");

// Ruta para obtener todas las ofertas 
router.get("/", getOffers);

// Rutas protegidas para crear, actualizar y eliminar ofertas (solo admin)
router.post("/", verifyToken, isAdmin, createOffer);
router.put("/:id_offer", verifyToken, isAdmin, updateOffer);
router.delete("/:id_offer", verifyToken, isAdmin, deleteOffer);

module.exports = router;
