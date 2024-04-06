const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartContoller');
const checkAuth = require('../middleware/CheckAuth');

router.post('/createCart',CartController.cartCreate);

router.post('/userCart',CartController.getUserCart);

router.post('/delProduct',CartController.delcart);

router.put('/quantity',CartController.quantity);

module.exports = router;