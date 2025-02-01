const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storageGallery = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "gallery",
        allowedFormats: ["jpg", "png"],
    },
});

const uploadGallery = multer({ storage: storageGallery });

module.exports = uploadGallery;
