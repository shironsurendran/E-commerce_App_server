const express = require('express');
const router = express.Router();
const WhislistController = require('../controllers/WhislistController');

router.post('/createWhislist',WhislistController.createWhislist);

router.post('/getWhislist',WhislistController.getWhislist);

router.post('/delWhislist',WhislistController.delWhislist);

router.post('/productWhislist',WhislistController.productToWhislist);

router.post('/womenWhislist',WhislistController.womenToWhislist);

module.exports = router;