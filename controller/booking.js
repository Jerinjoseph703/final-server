const Booking =require("../models/bookings");
const Property =require("../models/Property");

module.exports={
    addBookings: async (req,res)=>{
        try {
            const { iD, customerName, email, phoneNo } = req.body;

            // Find the package by its ID
            const property = await Property.findOne({ iD }); 

            // Check if package exists
            if (!property) {
                return res.status(404).json({ error: 'Property not found' });
            }

            // Update booking status of the package
            property.isBooked = true; // Assuming you have a field like 'isBooked' in your package schema
            await property.save();

            // Save booking details to database (you might have a separate model for bookings)
            const booking = new Booking({ propertyiD: iD, customerName, email, phoneNo }); // Pass iD as propertyiD
            await booking.save();
           console.log("Details:",booking);
            res.status(200).json({ message: 'Booking successful' });
        } catch (error) {
            console.error('Error during booking:', error);
            res.status(500).json({ error: 'Failed to book property' });
        }  
    },

    listBookings: async (req, res) => {
        try {
            const result = await Booking.find({})
            const bookings = [];
            for (const ele of result) {
                let booking = {};
                booking._id = ele._id;
                booking.propertyiD = ele.propertyiD;
                booking.customerName = ele.customerName;
                booking.email = ele.email;
                booking.phoneNo = ele.phoneNo;
                bookings.push(booking);
            }
            console.log("Bookings:",bookings);
            res.status(201).json(bookings);

        } catch (error) {
            console.log("Error at controller/booking.js listBookings::", error);
            res.status(400).send(error.message);
        }
    }
}