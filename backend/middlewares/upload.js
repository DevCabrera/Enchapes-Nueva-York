const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'products', // Carpeta en Cloudinary donde se almacenarán las imágenes
        allowedFormats: ['jpg', 'png'],
    },
});

const upload = multer({ storage });

module.exports = upload;
