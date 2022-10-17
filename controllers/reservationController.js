const Reservation = require('../models/reservation');

exports.create = async (req, res) => {
    const data = req.body;
    const requiredFields =  ["hotelName", "name", "email", "phone", "address", "roomType", "noOfRoom", "checkInDate", "checkOutDate" ] ;

    const missingFields = requiredFields.filter(key => {
        return !Object.keys(data).includes(key);
    });

    if(missingFields.length !==0) {
        return res.status(400).json({
            message: "Some Fields are missing, please check your json input"
        })
    }

    const reservation = await Reservation.create(data);

    if (!reservation) {
        return res.status(400).json({
            message: "Reservation Booking Failed, Please try again"
        })
    }

    return res.status(200).json({
        message: "Reservation Booked Successfully."
    })
    
  };


  exports.viewAll = async (req, res, next) => {
    const reservation = await Reservation.find();
    return res.status(200).json({
        message: "Reservations Obtained Successfully",
        data: {
          reservation
        }
    })

  }

  exports.view = async (req, res) => {
    const id = req.params.id;

    const reservation = await Reservation.find({_id: id});
    return res.status(200).json({
      message: "Reservation obtained Successfully",
      data: reservation
      
    })
  }

  exports.update = async (req, res) => {
    const data = req.body;
    const reservationId = req.params.id;

    const availableFields = ["hotelName", "name", "email", "phone", "address", "roomType", "noOfRoom", "checkInDate", "checkOutDate" ];

    const isPart = Object.keys(data).filter(key => {
      return !availableFields.includes(key)
    });

    if(isPart.length !== 0){
      return res.status(400).json({
        message: "You must select at least a Field to Update"
      })
    }

    await Reservation.updateOne({_id: reservationId }, data);

    return res.status(200).json({
      message: "Field updated successfully.",
    })
  }


  exports.deleteReservation = async(req, res) => {
    const reservationId = req.params.id;

    try{
      await Reservation.deleteOne({_id: reservationId});
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        message: "An Error occured, Please try again later."
      })
    }

    return res.status(200).json({
      message: "Reservation deleted successfully.",
    })
  }