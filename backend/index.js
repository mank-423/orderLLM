const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes')
const {connectDB} = require('./config/dbconfig');

const app = express();

app.use(cors());
app.use(express.json());

// Dotenv configuration
require('dotenv').config();
const PORT = 8000;
const MONGO_URL = process.env.MONGO_URL;

app.use('/api/generate', orderRouter);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) =>{
    res.send('Server is runing')
})
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
    connectDB(MONGO_URL);
});
