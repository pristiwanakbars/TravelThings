const e = require("express");
const { Hotel, MyHotel } = require("../models/index");

class hotelController {
  static async getHotel(req, res, next) {
    try {
      const hotel = await Hotel.findAll();
      res.status(200).json({ hotel });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = hotelController;
