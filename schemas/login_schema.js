const mongoose = require('mongoose');

const login_Schema = mongoose.Schema

const LoginSchema = new login_Schema({
    username : {
        type : String,
        require : true,
    },
    password : {
        type : String,
        require : true,
    }
}, {timestamps : true})

module.exports = mongoose.model('Login' , LoginSchema);