const admin = require("../models/Admin");

module.exports={
    addAdmin: async (req, res) => {
        try {
            const result = await admin.create({
                adminName: req.body.adminName,
                email: req.body.email,
                password: req.body.password
            });
            res.status(201).json(result)
        } catch (err) {
            console.log("Error  at  Creating Admin /admin.js::::", err);
            res.status(400).send(err.message);
        }
    },
    adminLogin: async (req, res) => {
        try {
            console.log("Body:", req.body);
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    error: "email and Password are required"
                });
            }
            const result = await admin.findOne({ email, password });
            if (!result) {
                res.status(401).send("Email or password is incorrect");
            } else {
                res.status(200).send("Admin logged in successfully");
            }
        } catch (error) {
            console.log("Error at controller/admin.js adminlogin ::::", error);
            res.status(500).send("Internal server error");
        }
    },

    listAdmin: async (req, res) => {
        try {
            const result = await admin.find({});
            console.log({ result });
            const admins = [];
            for (const ele of result) {
                let admin = {};
                admin._id = ele._id;
                admin.adminName = ele.adminName;
                admin.email = ele.email;
                admins.push(admin);
            }
            res.status(201).json(admins);
        } catch (error) {
            console.log("Error at controller/admin.js listAdmin::", error);
            res.status(400).send(error.message);
        }
    }

}