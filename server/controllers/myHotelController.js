const { MyHotel, Hotel } = require("../models");

class MyHotelController {
  static async createMyHotel(req, res, next) {
    try {
      const { hotelId } = req.body;
      const { userId: userId } = req.loginInfo;

      const isExists = await MyHotel.findOne({ where: { hotelId, userId } });

      if (isExists) {
        return next({
          name: "duplicate",
          message: "Your hotel list already exist",
        });
      }

      const myhotel = await MyHotel.create({
        hotelId,
        userId,
      });

      res.status(201).json({
        message: "Success create myhotel",
        myhotel,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMyHotel(req, res, next) {
    try {
      const { userId: userId } = req.loginInfo;

      const myhotel = await MyHotel.findAll({
        where: { userId },
        include: Hotel,
      });

      res.status(200).json(myhotel);
    } catch (error) {
      next(error);
    }
  }

  static async deleteMyHotel(req, res, next) {
    try {
      const { id } = req.params;

      const myhotel = await MyHotel.findByPk(id);

      if (!myhotel) {
        return next({ status: 404, message: "MyHotel not found" });
      }

      await myhotel.destroy();

      res.status(200).json({ message: "MyHotel has been deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MyHotelController;
