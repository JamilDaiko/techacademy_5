import sequelize from "../config/database";
import { DataTypes, Model, BelongsToManyAddAssociationsMixin } from "sequelize";

import AssessmentModel from "./AssessmentModel";

class Book extends Model {
  id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  date_published: Date | undefined;

  public assessments?: AssessmentModel[];

  public addAuthors!: BelongsToManyAddAssociationsMixin<any, number>;
  public addCategories!: BelongsToManyAddAssociationsMixin<any, number>;
}

Book.init(
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
  },
  {
    sequelize,
    modelName: "Book",
    tableName: "books",
  }
);

export default Book;
