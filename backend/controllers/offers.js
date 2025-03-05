const Oferta = require("../models/MySql/offers");
const Producto = require("../models/MySql/product");

const createOffer = async (req, res) => {
    try {
        const { id_producto, porcentaje_descuento, fecha_inicio, fecha_fin } = req.body;

        console.log("ID del producto recibido:", id_producto); // Depuración

        // Verificar que el producto exista
        const producto = await Producto.findByPk(id_producto);
        if (!producto) {
            return res.status(404).json({ message: `Producto con ID ${id_producto} no encontrado` });
        }

        // Calcular el precio de la oferta
        const precio_oferta = producto.precio_m2 * (1 - porcentaje_descuento / 100);

        // Crear la oferta
        const nuevaOferta = await Oferta.create({
            id_producto,
            precio_oferta,
            porcentaje_descuento,
            fecha_inicio,
            fecha_fin,
            activa: true,
        });

        res.status(201).json({ message: "Oferta creada exitosamente", offer: nuevaOferta });
    } catch (error) {
        console.error("Error al crear la oferta:", error.message);
        res.status(500).json({ error: "Error al crear la oferta", details: error.message });
    }
};

const updateOffer = async (req, res) => {
    try {
        const { id_offer } = req.params;
        const { porcentaje_descuento, fecha_inicio, fecha_fin, activa } = req.body;

        const oferta = await Oferta.findByPk(id_offer);
        if (!oferta) {
            return res.status(404).json({ message: "Oferta no encontrada" });
        }

        // Calcular el nuevo precio de la oferta basado en el porcentaje de descuento
        const producto = await Producto.findByPk(oferta.id_producto);
        const precio_oferta = producto.precio_m2 * (1 - porcentaje_descuento / 100);

        await oferta.update({ precio_oferta, porcentaje_descuento, fecha_inicio, fecha_fin, activa });

        res.status(200).json({ message: "Oferta actualizada correctamente", offer: oferta });
    } catch (error) {
        console.error("Error al actualizar la oferta:", error.message);
        res.status(500).json({ error: "Error al actualizar la oferta" });
    }
};

const deleteOffer = async (req, res) => {
    try {
        const { id_offer } = req.params;
        const oferta = await Oferta.findByPk(id_offer);
        if (!oferta) {
            return res.status(404).json({ message: "Oferta no encontrada" });
        }

        await oferta.destroy();
        res.status(200).json({ message: "Oferta eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la oferta:", error.message);
        res.status500().json({ error: "Error al eliminar la oferta" });
    }
};

const getOffers = async (req, res) => {
    try {
        const offers = await Oferta.findAll({ order: [["createdAt", "DESC"]] });
        res.status(200).json(offers);
    } catch (error) {
        console.error("Error al obtener las ofertas:", error.message);
        res.status(500).json({ error: "Error al obtener las ofertas" });
    }
};

module.exports = {
    createOffer,
    updateOffer,
    deleteOffer,
    getOffers,
};