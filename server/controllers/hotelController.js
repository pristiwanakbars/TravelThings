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

  static async addToMyHotel(req, res, next) {
    try {
      const { userId } = req.loginInfo;

      const { name, location, price, address, imageUrl } = req.body;

      const hotel = await Hotel.create({
        name,
        location,
        price,
        address,
        imageUrl,
      });

      await MyHotel.create({
        hotelId: hotel.id,
        userId: userId,
      });
      res.status(201).json(hotel);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = hotelController;
