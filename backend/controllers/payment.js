const Pago = require("../models/MySql/payment");
const Carro = require("../models/MySql/cart");
const CarroProd = require("../models/MySql/carro_prod");
const Producto = require("../models/MySql/product");

// Subir comprobante de pago
const uploadPayment = async (req, res) => {
    try {
        const { id_carro } = req.body;

        const carrito = await Carro.findByPk(id_carro);
        if (!carrito) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        // Guardar comprobante en la base de datos
        const comprobanteUrl = req.file.path;
        const nuevoPago = await Pago.create({
            id_carro,
            comprobante: comprobanteUrl,
        });

        // vaciaremos el carrito, paara mantener el id_carro y poder llamar a carro_prod, donde tengo almacenados los productos de ese carro, 
        await CarroProd.update(
            { cantidad: 0, subtotal: 0 },
            { where: { id_carro } }
        );

        res.status(200).json({
            message: "Comprobante subido y carrito vaciado correctamente",
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
                    model: Carro,
                    as: "carro",
                    include: [
                        {
                            model: CarroProd,
                            as: "productos",
                            include: {
                                model: Producto,
                                as: "producto",
                                attributes: ["nombre"], // Solo el nombre del producto
                            },
                        },
                    ],
                    attributes: ["email", "id_carro"],
                },
            ],
            order: [["createdAt", "DESC"]], // Ordenar por fecha de creación, reciente primero
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
