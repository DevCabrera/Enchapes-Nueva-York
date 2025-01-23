const Pago = require("../models/MySql/payment");
const Carro = require("../models/MySql/cart");
const CarroProd = require("../models/MySql/carro_prod");
const Producto = require("../models/MySql/product");
const OrderDetails = require("../models/MySql/orders");

// Subir comprobante de pago
const uploadPayment = async (req, res) => {
    try {
        const { id_carro } = req.body;

        const carrito = await Carro.findByPk(id_carro, {
            include: {
                model: CarroProd,
                as: "productos",
            },
        });

        if (!carrito) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        // Guardar comprobante en la base de datos
        const comprobanteUrl = req.file.path;
        const nuevoPago = await Pago.create({
            id_carro,
            comprobante: comprobanteUrl,
        });

        // Copiar productos del carrito a OrderDetails
        const detalles = carrito.productos.map((prod) => ({
            id_pago: nuevoPago.id_pago,
            id_producto: prod.id_producto,
            cantidad: prod.cantidad,
            subtotal: prod.subtotal,
        }));

        await OrderDetails.bulkCreate(detalles);

        // Vaciar el carrito
        await CarroProd.destroy({ where: { id_carro } });

        res.status(200).json({
            message: "Comprobante subido y detalles del pedido registrados correctamente.",
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
        const pago = await Pago.findByPk(id_pago);
        if (!pago) {
            return res.status(404).json({ message: "Pago no encontrado" });
        }

        // Actualizar el estado del pago a 'verificado'
        pago.estado = "verificado";
        await pago.save();

        res.status(200).json({ message: "Pago verificado correctamente", pago });
    } catch (error) {
        console.error("Error al verificar el pago:", error.message);
        res.status(500).json({ message: "Error al verificar el pago" });
    }
};

// Rechazar un pago
const rejectPayment = async (req, res) => {
    try {
        const { id_pago } = req.params;

        // Encontrar el pago
        const pago = await Pago.findByPk(id_pago);
        if (!pago) {
            return res.status(404).json({ message: "Pago no encontrado" });
        }

        // Actualizar el estado del pago a 'rechazado'
        pago.estado = "rechazado";
        await pago.save();

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
                        attributes: ["nombre"],
                    },
                },
                {
                    model: Carro,
                    as: "carro",
                    attributes: ["email"], // Asegúrate de incluir el campo "email"
                },
            ],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(pagos);
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
};
