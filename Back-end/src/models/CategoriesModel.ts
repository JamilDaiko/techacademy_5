import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize";
import BookModel from "./BookModel";

class CategoriesModel extends Model {
  static findByIdAndUpdate(id: string, body: any, arg2: { new: boolean }) {
    throw new Error("Method not implemented.");
  }
  id: number | undefined;
  categoria: string | undefined;
}

CategoriesModel.init(
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

BookModel.belongsToMany(CategoriesModel, {
  through: "books_categories",
  as: "categories",
});
CategoriesModel.belongsToMany(BookModel, {
  through: "books_categories",
  as: "books",
});

export default CategoriesModel;
