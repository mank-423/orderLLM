const mongoose = require('mongoose')

const User = mongoose.Schema({
    name : {type: String},
    email: {type: String},
    userName: {type: String},
    password : {type: String},
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
},
{collection: 'user-data'});

module.exports = mongoose.model('User', User);

