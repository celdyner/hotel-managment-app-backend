const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    hotelName: {
        type: Schema.Types.ObjectId,
        required: true
      },
    
      name: {
        type: String,
        required: true
      },

      email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "pass a valid email"], 
        unique: true
      },

      phone: {
        type: Number,
        required: true,
        match: /^\d{11}/
      },
    
      address: {
        type: String,
        required: true
      },

      roomType: {
        type: String,
        required: true,
      },
    
      noOfRoom: {
        type: String,
        required: true
      },

      checkInDate: {
        type: String,
        required: true
      },

      checkOutDate: {
        type: String,
        required: true
      },
    
    }, {
      timestamps: true
    }
    );
    
    module.exports = mongoose.model("Reservation", reservationSchema);

    
