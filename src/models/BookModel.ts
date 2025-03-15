import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize";

class BookModel extends Model {
  id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  date_published: Date | undefined;
}

BookModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_published: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Book",
    tableName: "books",
  }
);

export default BookModel;
