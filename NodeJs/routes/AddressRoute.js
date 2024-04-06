const express = require('express');
const router = express.Router();

const AddressController = require('../controllers/AddressController');

router.post('/createAddress',AddressController.createAddress);

router.post('/getAddress',AddressController.getAddress);

router.post('/oneAddress',AddressController.oneAddress);

router.put('/updateAddress',AddressController.updateAddress);

router.post('/delAddress',AddressController.delAddress);

module.exports = router;