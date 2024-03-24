const mongoose = require("mongoose");

const property = new mongoose.Schema({
  iD: {
    type: String,
    reqired:true,
    unique: true
  },
  propertyName: {
    type: String,
    reqired:true
  },
  placeName: {
    type: String,
    reqired:true
  },
  description: {
    type: String,
    reqired:true
  },
  price: {
    type: Number,
    reqired:true
  },
  parking: {
    type: Boolean,
  },
  bedRooms: {
    type: Number,
    reqired:true
  },
  status: {
    type: Boolean,
    default: false // Assuming default status is inactive
  }
})
module.exports = mongoose.model("property", property);














// const mongoose = require("mongoose");

// const propertySchema = new mongoose.Schema({
//   iD:{
//     type:String,
//     reqired:true,
//      unique: true
//   },
//   name: {
//     type: String,
//     reqired:true
//   },
//   price: {
//     type: Number,
//     reqired:true
//   },
//   parking: {
//     type: Boolean,
//   },
//   bedroom: {
//     type: Number,
//     reqired:true
//   },
//   status: {
//     type: Boolean,
//     default:false // Assuming default status is inactive
//   }
// });

// const Property = mongoose.model("Property", propertySchema);

// module.exports = Property;
