const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'please add a name']
    },

    email: {
        type: String,
        required: [true, 'please add an email'], 
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "please add a valid email"]
      },
      role:{
        type: String,
        required: ['user', 'admin'],
        default: 'user'
    },

    password: {
        type: String,
        required: true,
    
    },



    
resetPasswordToken: String,
resetPasswordExpire: Date,


    createdAt:{
           type: Date,
           default: Date.now     
    }
});

module.exports = mongoose.model("User", userSchema);