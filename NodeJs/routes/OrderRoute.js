const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

router.post('/createOrder',OrderController.createOrder);

router.post('/getOrder',OrderController.getOrder);

router.get('/findProduct/:productid',OrderController.findProducts);

router.get('/findOrderDetails/:OrderId',OrderController.findOrderDetails);

router.put('/updateStatus',OrderController.cancelOrder);

router.post('/delOrder',OrderController.delOrder);

module.exports = router;