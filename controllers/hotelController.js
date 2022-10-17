const Hotel = require("../models/hotel");

exports.createHotel = async (req, res, next) => {
    try {
      const { hotelName, noOfRoom, roomType, state, address, hotelManagerName, phone, email, image,price} = req.body;
      const hotel = await Hotel.findOne({hotelName:hotelName});
      if (hotel) {
        throw new Error("Hotel already Exist");
      }
      
      
      const newHotel = await new Hotel({
        hotelName: hotelName,
        noOfRoom: noOfRoom,
        // roomType: roomType,
        state: state,
        address: address,
        hotelManagerName: hotelManagerName,
        phone: phone,
        email: email,
        image: image,
        price:price,
      });
      await newHotel.save();
      return res.status(200).json({
        message: "Hotel successfully Created",
        data:newHotel
      });
    } catch (error) {
      next(error);
      console.log(error);
    }
  };

  exports.viewAllHotel = async (req, res, next) => {
    const hotel = await Hotel.find();
    return res.status(200).json({
        message: "Hotels Obtained Successfully",
        data: {
          hotel
        }
    })

  }

  exports.viewHotel = async (req, res) => {
    const id = req.params.id;

    const hotel = await Hotel.find({_id: id});
    return res.status(200).json({
      message: "Hotel obtained Successfully",
      data: hotel
      
    })
  }

  exports.update = async (req, res) => {
    const data = req.body;
    const hotelId = req.params.id;

    const availableFields = ["hotelName", "noOfRoom", "roomType", "state", "address", "hotelManagerName", "phone", "email", "image"]

    const isPart = Object.keys(data).filter(key => {
      return !availableFields.includes(key)
    });

    if(isPart.length !== 0){
      return res.status(400).json({
        message: "You must select at least a Field to Update"
      })
    }

    await Hotel.updateOne({_id: hotelId }, data);

    return res.status(200).json({
      message: "Field updated successfully.",
    })
  }

  exports.deleteHotel = async(req, res) => {
    const hotelId = req.params.id;

    try{
      await Hotel.deleteOne({_id: hotelId});
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        message: "An Error occured, Please try again later."
      })
    }

    return res.status(200).json({
      message: "Hotel deleted successfully.",
    })
  }