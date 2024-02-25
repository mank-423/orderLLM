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
    },

    authUser : async(req, res) => {
        try {
            const { name, email, userName, password } = req.body;

            // If the user already exists
            const user = await User.findOne({email});
            let isAlreadyRegistered = false;
            if (user){
                newUser = user;
                isAlreadyRegistered = true;
            }
            // If new user then create user
            else{
                newUser = await User.create({name, email, userName, password});
            }
            res.status(200).json({status: "ok", message: newUser, registered: isAlreadyRegistered});
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = userCantroller;