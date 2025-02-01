const Gallery = require("../models/MySql/gallery");
const cloudinary = require("cloudinary").v2;

/**
 * Subir imagen a la galería
 */
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No se ha subido ninguna imagen" });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "gallery",
        });

        const newImage = await Gallery.create({
            url: result.secure_url,
            public_id: result.public_id,
        });

        res.status(201).json({ message: "Imagen subida correctamente", data: newImage });
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        res.status(500).json({ message: "Error al subir la imagen" });
    }
};

/**
 * Obtener todas las imágenes de la galería
 */
const getImages = async (req, res) => {
    try {
        const images = await Gallery.findAll();
        res.status(200).json(images);
    } catch (error) {
        console.error("Error al obtener las imágenes:", error);
        res.status(500).json({ message: "Error al obtener las imágenes" });
    }
};

/**
 * Eliminar imagen de la galería
 */
const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Gallery.findByPk(id);

        if (!image) {
            return res.status(404).json({ message: "Imagen no encontrada" });
        }

        // Eliminar de Cloudinary
        await cloudinary.uploader.destroy(image.public_id);

        // Eliminar de la base de datos
        await image.destroy();

        res.status(200).json({ message: "Imagen eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la imagen:", error);
        res.status(500).json({ message: "Error al eliminar la imagen" });
    }
};

module.exports = {
    uploadImage,
    getImages,
    deleteImage,
};
