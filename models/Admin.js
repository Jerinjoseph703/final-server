const mongoose = require("mongoose");

const admin = new mongoose.Schema({
    adminName: {
        type: String,
        reqired: true,
    },
    email: {
        type: String,
        reqired: true,
    },
   
    password: {
        type: String,
        reqired: true,
    },
})

module.exports = mongoose.model("admin", admin);














// const mongoose = require('mongoose')

// const adminSchema = mongoose.Schema({
//     name: {
//         type: String
//     },
//     email: {
//         type: String
//     },
//     password: {
//         type: String
//     }
// }, {
//     timestamp: true
// })

// const Admin = mongoose.model("Admin", adminSchema);

// module.exports = Admin;

