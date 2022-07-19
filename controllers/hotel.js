const Hotel = require("../models/hotel");


exports.createHotel = async (req, res, next) => {
    try {
      const { hotelName, address, image} = req.body;
     
      const hotel = await Hotel.findOne({hotelName:hotelName});
      if (hotel) {
        throw new Error("hotel already exist");
      }
      
      const hotelAddress = await Hotel.findOne({address:address});

      if(hotelAddress) {
        console.log("hotel address already exist");
        return; 
      }
      
      const newHotel = new Hotel({
        hotelName: hotelName,
        address: address,
        image: image,
      });
      await newHotel.save();
      return res.status(200).json({
        message: "Hotel successfully created",
      });
    } catch (error) {
      next(error);
    }
  };

  exports.getHotels = async (req, res, next) => {
    const hotel = await Hotel.find({});

    return res.status(200).json({
        hotel
    })
  }