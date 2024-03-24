const property= require("../models/Property");
const fs = require("fs");
const path =require("path")


module. exports={
    addProperty : async (req,res)=>{
        try {
            // console.log(req);
            console.log({ file: req.file });
            console.log({ files: req.files });
            const result = await property.create({
                iD: req.body.iD,
                propertyName: req.body.propertyName,
                placeName: req.body.placeName,
                description: req.body.description,
                price: req.body.price,
                parking: req.body.parking,
                bedRooms: req.body.bedRooms,
            });
            res.status(201).json(result)
            console.log("DONE CREATE");

        } catch (error) {
            console.log("Error at controller/property.js create ::::", error);
            res.status(400).send(error.message);
        }
    },
    getProperty: async (req, res) => {
        try {
            console.log("Query:", req.query);
            let result = [];
            if (req.query.status) {
                const status = req.query.status;
                result = await property.find({ status: status });
            } else {
                result = await property.find({});
            }
    
            console.log("Result:", result);
            const array = [];
            for (let ele in result) {
                console.log("ele:", result[ele]);
                let obj = {};
                const iD = result[ele].iD;
                const picName = iD ? `${iD}.jpg` : ''; // Ensure iD is not empty
                const imagePath = path.join(__dirname.split('controller')[0], 'uploads', picName);
                
                // Check if file exists before attempting to read
                if (fs.existsSync(imagePath)) {
                    const image = fs.readFileSync(imagePath);
                    obj._id = result[ele]._id;
                    obj.iD = iD;
                    obj.propertyName = result[ele].propertyName;
                    obj.description = result[ele].description;
                    obj.placeName = result[ele].placeName;
                    obj.price = result[ele].price;
                    obj.parking = result[ele].parking;
                    obj.bedRooms = result[ele].bedRooms;
                    obj.status = result[ele].status;
                    obj.image = image;
                    array.push(obj);
                } else {
                    console.error(`File does not exist: ${imagePath}`);
                }
            };
            // console.log({array});
            res.status(201).json(array);
        } catch (error) {
            console.log("Error at controller/property.js getProperty ::::", error);
            res.status(400).send(error.message);
        }
    },

    getPropertyById: async (req, res) => {
        try {
            let obj = {}
            const iD = req.query.iD;
            let result = await property.findOne({ iD });
            const picName = `${iD}.jpg`;
            const path = `${__dirname.split('controller')[0]}uploads\\${picName}`;
            const image = fs.readFileSync(path);
            obj.iD=result.iD;
            obj.propertyName = result.propertyName;
            obj.placeName = result.placeName;
            obj.description = result.description;
            obj.price = result.price;
            obj.parking = result.parking;
            obj.bedRooms = result.bedRooms;
            obj.image = image;
            console.log({ obj });
            res.status(201).json(obj);
        } catch (error) {
            console.log("Error at controller/property.js getPropertyById ::::", error);
            res.status(400).send(error.message);
        }
    },

    editProperty: async (req, res) => {
        try {
            console.log("iD:", req.params.iD);
            console.log({ params: req.params, body: req.body, file: req.file });

            const iD = req.params.iD;
            const propertyName = req.body?.propertyName;
            const placeName = req.body?.placeName;
            const description = req.body?.description;
            const price = req.body?.price;
            const parking = req.body?.parking;
            const bedRooms = req.body?.bedRooms;
            

            // Check if there's a file uploaded
            if (req.file) {
                // Construct the file path for the existing image
                const imagePath = path.join(__dirname, '..', 'uploads', `${iD}.jpg`);

                // Read the new image file
                const newImageData = fs.readFileSync(req.file.path);

                // Write the new image data to the existing image file (overwrite)
                fs.writeFileSync(imagePath, newImageData);
            }

            // Update other package details
            const result = await property.findOneAndUpdate(
                { iD: iD },
                { $set: { propertyName,placeName,description, price, parking, bedRooms } },
                { new: true }
            );

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error at editProperty:::::" });
        }
    },

    status: async (req, res) => {
        console.log('Request Body:', req.body);
        const { _id, status } = req.body;
        // const { _id, action}=req.params;
        console.log('_id:', _id);
        console.log('status:', status);

        try {
            let statusType;

            statusType = await property.findByIdAndUpdate(
                _id,
                { $set: { status } },
                { new: true }
            );
            res.json(statusType);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error:::" });
        }
    },



}