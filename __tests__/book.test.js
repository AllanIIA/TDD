const SequelizeMock = require("sequelize-mock");
const { createBook, getAllBooks } = require("../controllers/bookController");
const Format = require('../models/Format');

describe("book controller", () => {
  let sequelizeMock;
  let Book;

  beforeAll(() => {
    sequelizeMock = new SequelizeMock();
    Book = sequelizeMock.define("Book", {
      isbn: { type: SequelizeMock.STRING },
      titre: { type: SequelizeMock.STRING },
      auteur: { type: SequelizeMock.STRING },
      editeur: { type: SequelizeMock.STRING },
      format: { type: SequelizeMock.STRING },
    });
  });

  describe("createBook", () => {
    it("should create a new book", async () => {
      const book = {
        isbn: '2714493238',
        titre: 'Et c\'est ainsi que nous vivrons',
        auteur: 'Douglas Kennedy',
        editeur: 'Chloé Royer',
        format: Format.BROCHE
      };
      Book.$queueResult(Book.build(book));
      const response = await createBook({ body: book });
      expect(response.statusCode).toBe(201);
      expect(response.body.isbn).toBe(book.isbn);
      expect(response.body.titre).toBe(book.titre);
      expect(response.body.auteur).toBe(book.auteur);
      expect(response.body.editeur).toBe(book.editeur);
      expect(response.body.format).toBe(book.format);
    });

    it("should return 400 if request body is invalid", async () => {
      const book = { 
        isbn: '2714493238',
        titre: 'Et c\'est ainsi que nous vivrons',
        auteur: 'Douglas Kennedy',
        editeur: 'Chloé Royer',
        format: Format.BROCHE 
      };
      const response = await createBook({ body: book });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });

  describe("getAllBooks", () => {
    it("should return all books", async () => {
      const books = [
        {
          isbn: '2714493238',
          titre: 'Et c\'est ainsi que nous vivrons',
          auteur: 'Douglas Kennedy',
          editeur: 'Chloé Royer',
          format: Format.BROCHE 
        },
      ];
      Book.$queueResult(books.map((book) => Book.build(book)));
      const response = await getAllBooks();
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(books.length);
      expect(response.body[0].isbn).toBe(books[0].isbn);
      expect(response.body[0].titre).toBe(books[0].titre);
      expect(response.body[0].auteur).toBe(books[0].auteur);
      expect(response.body[0].editeur).toBe(books[0].editeur);
      expect(response.body[0].format).toBe(books[0].format);
    });
  });
});