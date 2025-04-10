import sequelize from "../config/database";
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToManyAddAssociationsMixin,
} from "sequelize";

import AssessmentModel from "./AssessmentModel";

class Book extends Model<
  InferAttributes<Book, { omit: "assessments" }>, // tudo que o model tem
  InferCreationAttributes<Book, { omit: "assessments" }> // tudo que precisa pra criar
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;

  declare assessments?: AssessmentModel[];

  declare addAuthors: BelongsToManyAddAssociationsMixin<any, number>;
  declare addCategories: BelongsToManyAddAssociationsMixin<any, number>;
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
