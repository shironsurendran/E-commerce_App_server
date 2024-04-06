const express = require('express');
const router = express.Router();
const womenController = require('../controllers/womenController');
const checkAuth = require('../middleware/CheckAuth')

//post product
router.post('/insertWomen',checkAuth,womenController.insertWomen);
//Get product
router.route("/").get(womenController.get_product);

router.post('/filter',womenController.filter);

router.get('/:code',womenController.getProductByCode);

router.put('/:code',womenController.updateProduct);

module.exports = router;