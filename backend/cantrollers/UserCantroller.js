const User = require('../models/UserModel');

const userCantroller = {
    getAllUser : async(req, res) => {
        try {
            const users = await User.find();
            res.status(200).json({status: "ok", message: users});
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    registerUser : async(req, res) => {
        const { name, email, userName, password } = req.body;

        try {
            const newUser = await User.create({name, email, userName, password});
            res.status(200).json({status: "ok", message: newUser});
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    loginUser : async(req, res) => {
        const { userName, password } = req.body;
        try {
            const user = await User.find({userName, password});
            if (user){
                res.status(200).json({status: 'ok', message: 'Login valid'});
            }else{
                res.staus(500).json({error: 'Invalid user'})
            }
            
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = userCantroller;