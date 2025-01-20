const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
    uploadPayment,
    verifyPayment,
    rejectPayment,
    getPayments,
} = require("../controllers/payment");
const { verifyToken, isAdmin } = require("../middlewares/authMiddlerawe");

// Ruta para subir un comprobante de pago
router.post("/upload", verifyToken, upload.single("comprobante"), uploadPayment);

// Ruta para verificar un pago (solo admin)
router.put("/verify/:id_pago", [verifyToken, isAdmin], verifyPayment);

// Ruta para rechazar un pago (solo admin)
router.put("/reject/:id_pago", [verifyToken, isAdmin], rejectPayment);

// Ruta para obtener todos los pagos (opcional, solo admin)
router.get("/", [verifyToken], getPayments);

module.exports = router;
