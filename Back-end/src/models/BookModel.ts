import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize";
import AssessmentModel from "./AssessmentModel";

class Book extends Model {
  id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  date_published: Date | undefined;
  public assessments?: AssessmentModel[];
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
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

export default Book;
