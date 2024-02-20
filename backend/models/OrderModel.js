const mongoose = require('mongoose');
const currDay = new Date();

const orderSchema = mongoose.Schema({
    username: { type: String },
    order: [{
        item: { type: String },
        quantity: { type: Number },
        price: { type: Number }
    }],
    finalPrice: { type: Number },
    date: { type: String, default: `${currDay.getFullYear()}-${currDay.getMonth() + 1}-${currDay.getDate()}`},
    time: { type: String, default: `${currDay.getHours().toString().padStart(2, '0')}:${currDay.getMinutes().toString().padStart(2, '0')}:${currDay.getSeconds().toString().padStart(2, '0')}` }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
