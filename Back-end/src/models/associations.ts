import BookModel from "./BookModel";
import AuthorsModel from "./AuthorsModel";

BookModel.belongsToMany(AuthorsModel, {
  through: "author_books",
  as: "authors",
  foreignKey: "bookId",
});

AuthorsModel.belongsToMany(BookModel, {
  through: "author_books",
  as: "books",
  foreignKey: "authorId",
});
