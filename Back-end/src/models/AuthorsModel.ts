import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize";
import BookModel from "./BookModel";

class Authors extends Model {
  id: number | undefined;
  name: string | undefined;
  biography: string | undefined;
}

Authors.init(
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
    modelName: "Authors",
    tableName: "authors",
  }
);

BookModel.belongsToMany(Authors, {
  through: "books_authors",
  as: "authors",
});
Authors.belongsToMany(BookModel, {
  through: "books_authors",
  as: "books",
});

export default Authors;
