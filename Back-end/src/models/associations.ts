import BookModel from "./BookModel";
import AuthorsModel from "./AuthorsModel";
import CategoriesModel from "./CategoriesModel";

// Livro <-> Autor
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

// Livro <-> Categoria
BookModel.belongsToMany(CategoriesModel, {
  through: "book_categories",
  as: "categories",
  foreignKey: "bookId",
});

CategoriesModel.belongsToMany(BookModel, {
  through: "book_categories",
  as: "books",
  foreignKey: "categoryId",
});
