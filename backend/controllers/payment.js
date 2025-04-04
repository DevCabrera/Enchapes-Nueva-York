const Pago = require("../models/MySql/payment");
const Carro = require("../models/MySql/cart");
const CarroProd = require("../models/MySql/carro_prod");
const Producto = require("../models/MySql/product");
const OrderDetails = require("../models/MySql/orders");
const Direccion = require("../models/MySql/direccion");
const { sendOrderConfirmationEmail, sendPaymentConfirmationEmail, sendShippingStatusEmail, sendPaymentRefuseEmail } = require("../utils/emailSender");

// Subir comprobante de pago
const uploadPayment = async (req, res) => {
    try {
        const { id_carro, id_direccion } = req.body;

        // Validar que el carrito exista
        const carrito = await Carro.findByPk(id_carro, {
            include: {
                model: CarroProd,
                as: "productos",
            },
        });

        if (!carrito) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        // Validar que la dirección exista
        const direccion = await Direccion.findByPk(id_direccion);
        if (!direccion) {
            return res.status(404).json({ message: "Dirección no encontrada" });
        }

        // Subir el comprobante
        const comprobanteUrl = req.file.path;
        const nuevoPago = await Pago.create({
            id_carro,
            id_direccion,
            comprobante: comprobanteUrl,
        });

        // Registrar los productos en la tabla OrderDetails
        const detalles = carrito.productos.map((prod) => ({
            id_pago: nuevoPago.id_pago,
            id_producto: prod.id_producto,
            cantidad: prod.cantidad,
            subtotal: prod.subtotal,
        }));

        await OrderDetails.bulkCreate(detalles);

        // Vaciar el carrito
        await CarroProd.destroy({ where: { id_carro } });
        await sendOrderConfirmationEmail({
            id: nuevoPago.id_pago,
            userEmail: carrito.email,
        });
        res.status(200).json({
            message: "Pago registrado correctamente.",
            pago: nuevoPago,
        });
    } catch (error) {
        console.error("Error al subir el comprobante:", error.message);
        res.status(500).json({ message: "Error al subir el comprobante" });
    }
};

// Verificar un pago
const verifyPayment = async (req, res) => {
    try {
        const { id_pago } = req.params;

        // Encontrar el pago
        const pago = await Pago.findByPk(id_pago, {
            include: {
                model: Carro,
                as: "carro",
                attributes: ["email"],
            },
        });
        if (!pago) {
            return res.status(404).json({ message: "Pago no encontrado" });
        }

        // Actualizar el estado del pago a 'verificado'
        pago.estado = "verificado";
        await pago.save();
        await sendPaymentConfirmationEmail({
            id: pago.id_pago,
            userEmail: pago.carro.email,
        });
        res.status(200).json({ message: "Pago verificado correctamente", pago });
    } catch (error) {
        console.error("Error al verificar el pago:", error.message);
        res.status(500).json({ message: "Error al verificar el pago" });
    }
};

// Actualizar estado de envío
const updateShippingStatus = async (req, res) => {
    try {
        const { id_pago } = req.params;
        const { estado_envio } = req.body;

        // Encontrar el pago
        const pago = await Pago.findByPk(id_pago, {
            include: {
                model: Carro,
                as: "carro",
                attributes: ["email"],
            },
        });
        if (!pago) {
            return res.status(404).json({ message: "Pago no encontrado" });
        }

        // Actualizar el estado de envío
        pago.estado_envio = estado_envio;
        await pago.save();
        await sendShippingStatusEmail({
            id: pago.id_pago,
            userEmail: pago.carro.email,
            shippingStatus: estado_envio,
        });

        res.status(200).json({ message: "Estado de envío actualizado correctamente", pago });
    } catch (error) {
        console.error("Error al actualizar el estado de envío:", error.message);
        res.status(500).json({ message: "Error al actualizar el estado de envío" });
    }
};

// Rechazar un pago
const rejectPayment = async (req, res) => {
    try {
        const { id_pago } = req.params;

        // Buscar el pago e incluir el carrito relacionado
        const pago = await Pago.findByPk(id_pago, {
            include: {
                model: Carro,
                as: "carro",
                attributes: ["email"], // Incluir el correo del usuario
            },
        });

        if (!pago) {
            return res.status(404).json({ message: "Pago no encontrado" });
        }

        // Verificar si el correo del usuario está disponible
        if (!pago.carro || !pago.carro.email) {
            return res.status(400).json({ message: "El correo del usuario no está disponible" });
        }

        // Actualizar el estado del pago a 'rechazado'
        pago.estado = "rechazado";
        await pago.save();

        // Enviar correo de rechazo de pago
        await sendPaymentRefuseEmail({
            id: pago.id_pago,
            userEmail: pago.carro.email, // Usar el correo desde el modelo relacionado
            status: "rechazado",
        });

        res.status(200).json({ message: "Pago rechazado correctamente", pago });
    } catch (error) {
        console.error("Error al rechazar el pago:", error.message);
        res.status(500).json({ message: "Error al rechazar el pago" });
    }
};

// Obtener pagos (opcional para el administrador)
const getPayments = async (req, res) => {
    try {
        const pagos = await Pago.findAll({
            include: [
                {
                    model: OrderDetails,
                    as: "detalles",
                    include: {
                        model: Producto,
                        as: "producto",
                        attributes: ["nombre", "precio_m2"],
                    },
                },
                {
                    model: Carro,
                    as: "carro",
                    attributes: ["email"],
                },
                {
                    model: Direccion,
                    as: "direccion",
                    attributes: ["direccion"],
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        // Calcular el total por pago sumando los subtotales de los productos
        const pagosConTotal = pagos.map((pago) => {
            const total = pago.detalles.reduce((acc, detalle) => acc + detalle.subtotal, 0);
            return { ...pago.toJSON(), total };
        });

        res.status(200).json(pagosConTotal);
    } catch (error) {
        console.error("Error al obtener los pagos:", error.message);
        res.status(500).json({ message: "Error al obtener los pagos" });
    }
};

module.exports = {
    uploadPayment,
    verifyPayment,
    rejectPayment,
    getPayments,
    updateShippingStatus
};