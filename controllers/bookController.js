const { Sequelize } = require("sequelize");
const Format = require('../models/Format')
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../dev.sqlite",
});
const Book = require('../models/book')(sequelize, Sequelize);




exports.createBook = async (req, res) => {
    try {
      const book = await Book.create(req.body);
      res.status(201).json(book);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  exports.getAllBooks = async (req, res) => {
    try {
      const books = await Book.findAll();
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

exports.getBookById = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findByPk(id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  const id = req.params.id;
  try {
    const [rowsUpdated, [updatedBook]] = await Book.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rowsUpdated === 0) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json(updatedBook);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  const id = req.params.id;
  try {
    const rowsDeleted = await Book.destroy({ where: { id } });
    if (rowsDeleted === 0) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json({ message: "Book deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};