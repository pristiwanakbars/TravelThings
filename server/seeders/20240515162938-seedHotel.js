"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hotels = require("../mocks/hotels.json");
    hotels.forEach((el) => {
      el.updatedAt = el.createdAt = new Date();
    });

    await queryInterface.bulkInsert("Hotels", hotels, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Hotels", null, {});
  },
};
