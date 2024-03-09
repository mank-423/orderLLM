const Order = require('../models/OrderModel');
const User = require('../models/UserModel');

const adminCantroller = {
    adminDetails: async (req, res) => {
        try {
            const allUsers = await User.find({});
            const allOrders = await Order.find({});

            if (!allUsers) {
                res.status(500).json({ details: 'No user found' });
            }
            if (!allOrders) {
                res.status(500).json({ details: 'No orders found' })
            }

            const totalPrice = allOrders.reduce((total, item) => total + item.finalPrice, 0);
            const totalOrder = allOrders.length;
            const totalActiveUsers = allUsers.length;
            const totalProducts = 3;

            res.status(200).json({ details: { totalPrice, totalOrder, totalActiveUsers, totalProducts } })
        } catch (error) {
            console.log('Error:',error);
        }
    }
}

module.exports = adminCantroller;
