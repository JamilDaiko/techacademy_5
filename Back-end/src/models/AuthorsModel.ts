import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize";
import BookModel from "./BookModel";

class AuthorsModel extends Model {
  id: number | undefined;
  name: string | undefined;
  biography: string | undefined;
}

AuthorsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "AuthorsModel",
    tableName: "authors",
  }
);

BookModel.belongsToMany(AuthorsModel, {
  through: "books_authors",
  as: "authors",
});
AuthorsModel.belongsToMany(BookModel, {
  through: "books_authors",
  as: "books",
});

export default AuthorsModel;
