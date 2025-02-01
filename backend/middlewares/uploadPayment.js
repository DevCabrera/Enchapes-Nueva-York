const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storagePayment = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "payments",
        allowedFormats: ["jpg", "png"],
    },
});

const uploadPayments = multer({ storage: storagePayment });

module.exports = uploadPayments;
