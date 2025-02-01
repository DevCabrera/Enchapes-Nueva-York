const express = require("express");
const router = express.Router();
const uploadGallery = require("../middlewares/uploadGallery");
const { uploadImage, getImages, deleteImage } = require("../controllers/gallery");

router.get("/", getImages);
router.post("/upload", uploadGallery.single("image"), uploadImage);
router.delete("/:id", deleteImage);

module.exports = router;
