const express = require("express");
const router = express.Router();
const uploadPayments = require("../middlewares/uploadPayment");
const {
    uploadPayment,
    verifyPayment,
    rejectPayment,
    getPayments,
    updateShippingStatus
} = require("../controllers/payment");
const { verifyToken, isAdmin } = require("../middlewares/authMiddlerawe");

// Ruta para subir un comprobante de pago
router.post("/upload", verifyToken, uploadPayments.single("comprobante"), uploadPayment);

// Ruta para verificar un pago (solo admin)
router.put("/verify/:id_pago", [verifyToken, isAdmin], verifyPayment);

// Ruta para rechazar un pago (solo admin)
router.put("/reject/:id_pago", [verifyToken, isAdmin], rejectPayment);

//Ruta para actualizar el estado de envío
router.put("/updateShippingStatus/:id_pago", [verifyToken, isAdmin], updateShippingStatus);

// Ruta para obtener todos los pagos (opcional, solo admin)
router.get("/", [verifyToken], getPayments);

module.exports = router;
