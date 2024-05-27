const { where } = require("sequelize");
const openAI = require("../helpers/openai");
const { Hotel } = require("../models/index");

class AiController {
  static async reviewHotel(req, res, next) {
    try {
      const { id } = req.params;
      const hotel = await Hotel.findOne({
        where: {
          id,
        },
      });
      const { name, location, price, address, imageUrl } = hotel;

      const resAI = await openAI(name, location, price, address, imageUrl);

      res.status(200).json({ resAI });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = AiController;
