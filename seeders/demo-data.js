const faker = require("faker");
const Format = require('../models/Format')

module.exports = {
  up: async (queryInterface, Sequelize) => {


    try {

      await queryInterface.bulkInsert('books', [
        {
            isbn: '2714493238',
            titre: 'Et c\'est ainsi que nous vivrons',
            auteur: 'Douglas Kennedy',
            editeur: 'Chloé Royer',
            format: Format.BROCHE,
        },
       
      ]);

    } catch (error) {
      console.log(error)
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('books', null, {});
  }
};