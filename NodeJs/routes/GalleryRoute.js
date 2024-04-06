const express = require('express');
const router = express.Router();
const GalleryController = require('../controllers/GalleryController')


//post gallery
router.post("/insertGallery",GalleryController.insertGallery);
//Get gallery 
router.route("/").get(GalleryController.getGallery);


module.exports = router;