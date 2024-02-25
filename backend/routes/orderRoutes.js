const express = require('express');
const router = express.Router();
const order = require('../cantrollers/OrderCantroller');

router.get('/allOrders', order.getAllOrders);
router.post('/order', order.chatOrder);
router.post('/confirm', order.confirmOrder);

module.exports = router;