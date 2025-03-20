import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel";
import BookModel from "./BookModel";

class AssessmentModel extends Model {}

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
      validate: {
        min: 1,
        max: 10,
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Assessment",
    tableName: "assessments",
  }
);

// Configuração de relacionamentos
UserModel.hasMany(AssessmentModel, { foreignKey: "userId", as: "assessments" });
BookModel.hasMany(AssessmentModel, { foreignKey: "bookId", as: "assessments" });

AssessmentModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });
AssessmentModel.belongsTo(BookModel, { foreignKey: "bookId", as: "book" });

export default AssessmentModel;
