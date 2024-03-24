const mongoose = require("mongoose");

const booking = new mongoose.Schema({
    customerName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true,
    },
    propertyiD:{
        type: mongoose.Schema.Types.String,
        ref: 'Property', 
        required: true
    }
})
module.exports = mongoose.model("booking", booking);