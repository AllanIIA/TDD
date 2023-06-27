'use strict';
const Format = require('../models/Format')
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    isbn: DataTypes.STRING,
    titre: DataTypes.STRING,
    auteur: DataTypes.STRING,
    editeur: DataTypes.STRING,
    format: Format.BROCHE,
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};