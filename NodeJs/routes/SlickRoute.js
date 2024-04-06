const express = require("express");
const router = express.Router();
const SlickController = require('../controllers/SlickController');

//post slick
router.route("/create").post(SlickController.create_slick);
//get slick
router.route("/").get(SlickController.get_slick);
// Update Student
router.route("/update/:id").put(SlickController.update_slick);

module.exports = router;