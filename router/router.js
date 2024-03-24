const express = require('express');
const router = express.Router();
const multer = require("multer");


// :::::Storing image Using Multer::::::::

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     try {
       cb(null, 'uploads/')
     } catch (error) {
      console.log("Multer destination error");
      console.log(error);
     }
    },
    filename: function (req, file, cb) {
        try {
          const uniqueSuffix = req.body.iD+"."+file.originalname.split('.')[1]
          cb(null, uniqueSuffix)
        } catch (error) {
          
      console.log("Multer filename error");
      console.log(error);
        }
    }
  });

  const upload = multer({ storage: storage });


// ::::::::Importing Controller::::::::::

 const property=require("../controller/property");
 const user = require("../controller/user");
 const admin =require("../controller/admin");
 const booking =require("../controller/booking");


// ::::::Property Routes::::::

 router.post("/addProperty",upload.single('image'), property.addProperty);
 router.get("/getProperty",property.getProperty);
 router.get("/getPropertyById",property.getPropertyById);
 router.put("/editProperty/:iD",upload.single('image'), property.editProperty);
 router.put("/status",property.status);


//  :::::::User Routes::::::

router.post("/addUser",user.addUser);
router.post("/login",user.login);
router.get("/listUser",user.listuser);

// :::::::::Admin Routes::::::

router.post("/addAdmin",admin.addAdmin);
router.post("/adminLogin",admin.adminLogin);
router.get("/listAdmin",admin.listAdmin);


//::::::::::Booking Routes::::::::

router.post("/addBookings",booking.addBookings);
router.get("/listBookings",booking.listBookings);

module.exports = router;