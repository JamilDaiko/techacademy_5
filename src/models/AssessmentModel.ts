import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel";
import BookModel from "./BookModel";

class AssessmentModel extends Model {
  id: number | undefined;
  userId: number | undefined;
  bookId: number | undefined;
  score: number | undefined;
}

AssessmentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: BookModel,
        key: "id",
      },
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "AssessmentModel",
    tableName: "assessments",
  }
);

UserModel.belongsToMany(BookModel, {
  through: AssessmentModel,
  foreignKey: "userId",
  as: "assessedBooks",
});

BookModel.belongsToMany(UserModel, {
  through: AssessmentModel,
  foreignKey: "bookId",
  as: "assessors",
});

export default AssessmentModel;
