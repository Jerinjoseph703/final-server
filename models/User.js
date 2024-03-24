const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username: {
        type: String,
        reqired: true,
       
    },
    email: {
        type: String,
        reqired: true,
        unique: true
    
    },
    password: {
        type: String,
        reqired: true
    },
    confirmPassword: {
        type: String,
        reqired: true
    },
})
 
module.exports = mongoose.model("user", user);


















// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//         },
//         email: {
//             type: String,
//             required: true,
//         },
//         password: {
//             type: String,
//             required: String,
//         }
//     },
//     {
//         timestamps: true,
//     }
// );

// const User = mongoose.model("User", userSchema);

// module.exports = User;