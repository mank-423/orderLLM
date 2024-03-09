const express = require('express');
const router = express.Router();
const order = require('../cantrollers/OrderCantroller');

router.get('/allOrder', order.getAllOrder);
router.get('/allOrders/:email', order.getAllOrdersUser);
router.post('/order', order.chatOrder);
router.post('/confirm', order.confirmOrder);

module.exports = router;