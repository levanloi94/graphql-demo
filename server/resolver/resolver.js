// const { books, authors } = require("../data/static");
const Author = require("../models/Author");
const Book = require("../models/Book");

const resolvers = {
  //QUERY
  Query: {
    books: async (parent, args, context) =>
      await context.mongoDataMethods.getAllBooks(),

    book: async (parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getBookById(id),

    authors: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllAuthors(),
    author: async (parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getAuthorById(id),
  },

  Author: {
    books: async ({ id }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllBooks({ authorId: id }),
  },

  Book: {
    author: async ({ authorId }, args, { mongoDataMethods }) =>
      // console.log(parent);
      await mongoDataMethods.getAuthorById(authorId),
  },
  // MUTATION
  Mutation: {
    createAuthor: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createAuthor(args),
    createBook: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createBook(args),
  },
};

module.exports = resolvers;
