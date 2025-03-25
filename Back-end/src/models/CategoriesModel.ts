import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize";
import BookModel from "./BookModel";
import Book from "./BookModel";

class Categories extends Model {
  static findByIdAndUpdate(id: string, body: any, arg2: { new: boolean }) {
    throw new Error("Method not implemented.");
  }
  id: number | undefined;
  categoria: string | undefined;
}

Categories.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categories: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CategoriesModel",
    tableName: "categories",
  }
);

BookModel.belongsToMany(Categories, {
  through: "books_categories",
  as: "categories",
});
Categories.belongsToMany(Book, {
  through: "books_categories",
  as: "books",
});

export default Categories;
