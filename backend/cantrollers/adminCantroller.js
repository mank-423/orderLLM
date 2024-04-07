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

            // Group orders by month and calculate total order numbers and prices for each month
            const monthlyOrders = {};

            // Create an array of all unique usernames
            const usernamesArray = allUsers.map(user => user.userName); // Assuming username is stored in 'userName' field

            allOrders.forEach(order => {
                const orderDate = new Date(order.date);
                const monthYearKey = `${orderDate.getMonth() + 1}/${orderDate.getFullYear()}`;
                if (!monthlyOrders[monthYearKey]) {
                    monthlyOrders[monthYearKey] = {
                        orderQuantity: 0,
                        orderPrice: 0
                    };
                }
                monthlyOrders[monthYearKey].orderQuantity++;
                monthlyOrders[monthYearKey].orderPrice += order.finalPrice;
            });

            // Convert monthlyOrders object to array of objects
            const monthlyOrdersArray = Object.entries(monthlyOrders).map(([key, value]) => ({
                monthYear: key,
                orderQuantity: value.orderQuantity,
                orderPrice: value.orderPrice
            }));

            const totalPrice = allOrders.reduce((total, item) => total + item.finalPrice, 0);
            const totalOrder = allOrders.length;
            const totalActiveUsers = allUsers.length;
            const totalProducts = 3;

            res.status(200).json({ details: { totalPrice, totalOrder, totalActiveUsers, totalProducts, monthlyOrdersArray, usernamesArray } })
        } catch (error) {
            console.log('Error:', error);
        }
    }
}

module.exports = adminCantroller;
