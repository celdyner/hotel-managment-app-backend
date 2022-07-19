const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  hotelName: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },

  image: {
    type: String,
    required: true
},
  
  rooms: [],
});

module.exports = mongoose.model("Hotel", hotelSchema);
