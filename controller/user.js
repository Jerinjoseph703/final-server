const user = require("../models/User");

module.exports={
    addUser: async (req,res)=>{
        try {
            console.log("Body:",{body: req.body});
            const result = await user.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                confirmPassword:req.body.confirmPassword,
                
            });
            res.status(201).json(result)
          
            
        } catch (error) {
            console.log("Error at controller/user.js addUser ::::", error);
            res.status(400).send(error.message);
        }
    },

    login: async (req, res)=> {
        try {
            const {email, password} = req.body;
            if(!email || !password){
                return res.status(400).json({
                    error:"Email and Password are required"
                });
            }
            const result = await user.findOne({email, password});
            if (!result){
                res.status(401).send("Username or password is incorrect");
            } else {
                res.status(200).send("User logged in successfully");
            }
            
        } catch (error) {
            console.log("Error at controller/user.js login ::::", error);
            res.status(500).send("Internal server error");
        }
    },

    listuser: async (req, res) => {
        try {
            const result = await user.find({});
            console.log({result});
            const users = [];
            for (const element of result) {
                let user = {};
                user._id = element._id;
                user.username = element.username;
                user.email = element.email;
                users.push(user);
            }
            res.status(201).json(users);
        } catch (error) {
            console.log("Error at controller/user.js listUser::", error);
            res.status(400).send(error.message);
        }
    },


}